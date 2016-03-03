using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web.Models;

namespace Web.Controllers.Api
{
    public class NotesController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[]{"v1","v2"};
        } 

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "v";
        }

        // POST api/<controller>
        public dynamic Post([FromBody] dynamic model)
        {
            using (var db = new ApplicationDbContext())
            {
                string id = model.note.user;
                var user = db.Users.FirstOrDefault(u => u.Id == id);
                var note = new AspNetUserNote
                {
                    CreatedAt = DateTime.Now,
                    EnteredBy = User.Identity.Name,
                    Note = model.note.note
                };
                user.Notes.Add(note);

                db.SaveChanges();
            }

            return model;
        }
    }
}
