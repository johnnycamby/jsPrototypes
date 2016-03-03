using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Web.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            this.Logs = new List<AspNetUserLog>();
            this.Notes = new List<AspNetUserNote>();
            this.Logs = new List<AspNetUserLog>();
            this.CreatedAt = DateTime.Now;
        }

        public override string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Bio { get; set; }
        public string Twitter { get; set; }

        public DateTime CreatedAt { get; set; }
        public ICollection<AspNetUserNote> Notes { get; set; }
        public ICollection<AspNetUserLog> Logs { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }

        public static dynamic GetSummarySet(string id = null, int limit = 50, string searchBy = "")
        {
            var ctx = new ApplicationDbContext();
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(ctx));
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(ctx));

            var users = new List<dynamic>();
            var roles = new List<dynamic>();
            var logs = new List<dynamic>();
            var notes = new List<dynamic>();
            var assignments = new List<dynamic>();

            var thingy = roleManager.Roles.ToList();

            foreach (var role in thingy)
            {
                roles.Add(new
                {
                    id = role.Id,
                    name = role.Name,
                    membership = new List<string>()
                });
            }

            foreach (var user in userManager.Users.Include("Notes").Include("Logs").ToList())
            {
                users.Add(new
                {
                    id = user.Id,
                    userName = user.UserName,
                    email = user.Email,
                    firstname = user.Firstname,
                    lastname = user.Lastname,
                    bio = user.Bio,
                    twitter = user.Twitter,
                    notes = user.Notes.Select(n => n.Id).ToArray(),
                    logs = user.Logs.Select(l => l.Id).ToArray(),
                    membership = new List<string>(),
                    create_at = user.CreatedAt
                });

                // Notes
                foreach (var note in user.Notes.OrderByDescending(n => n.CreatedAt))
                {
                    notes.Add(new
                    {
                        id = note.Id,
                        note = note.Note,
                        user = user.Id,
                        created_at = note.CreatedAt
                    });
                }

                // Logs
                foreach (var log in user.Logs)
                {
                    logs.Add(new
                    {
                        id = log.Id,
                        entry = log.Entry,
                        user = user.Id,
                        created_at = log.CreatedAt
                    });
                }

                // assignments
                foreach (var r in user.Roles)
                {
                    var membershipId = user.Id + "|" + r.RoleId;
                    assignments.Add(new
                    {
                        id = membershipId,
                        user = user.Id,
                        role = r.RoleId
                    });

                    // update the role output
                    var roler = roles.First(x => x.id == r.RoleId);
                    roler.membership.Add(membershipId);
                    var userx = users.FirstOrDefault(x => x.id == user.Id);
                    userx.membership.Add(membershipId);
                }
            }

            return new
            {
                users = users,
                roles = roles,
                notes = notes,
                logs = logs,
                membership = assignments
            };
        }
    }



    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public DbSet<AspNetUserLog> UserLogs { get; set; }
        public DbSet<AspNetUserNote> UserNotes { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }

    public class AspNetUserNote
    {
        public AspNetUserNote()
        {
            this.CreatedAt = DateTime.Now;
        }

        [Key]
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public string Note { get; set; }
        public string EnteredBy { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class AspNetUserLog
    {
        public AspNetUserLog()
        {
            this.CreatedAt = DateTime.Now;
        }

        [Key]
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public string Entry { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}