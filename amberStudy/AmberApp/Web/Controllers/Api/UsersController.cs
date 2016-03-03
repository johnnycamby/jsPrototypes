using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using Web.Models;

namespace Web.Controllers.Api
{
    [Authorize(Roles = "Administrator")]
    public class UsersController : ApiController
    {

        // GET api/users
        public dynamic Get(int limit = 50, string q = "")
        {
            return ApplicationUser.GetSummarySet(limit: limit, searchBy: q);
        }

        // GET api/users/5
        public dynamic Get(string id)
        {
            return ApplicationUser.GetSummarySet(id: id);
        }

        // POST api/users
        public void Post([FromBody] string value)
        {}

        // PUT api/users/5
        public dynamic Put(string id, dynamic model)
        {
            using (var db = new ApplicationDbContext())
            {
                var user = db.Users.FirstOrDefault(u => u.Id == id);

                if (user != null)
                {
                    user.UserName = model.user.userName;
                    user.Firstname = model.user.firstName;
                    user.Lastname = model.user.lastName;
                    user.Email = model.user.email;
                    user.Bio = model.user.bio;
                    user.Twitter = model.user.twitter;

                    db.SaveChanges();

                }
            }

            model.user.id = id;
            return model;
        }

        // DELETE api/users/5
        public void Delete(string id)
        {}

    }
}
