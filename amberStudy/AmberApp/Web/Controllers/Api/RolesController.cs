using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web.Models;

namespace Web.Controllers.Api
{
    [Authorize(Roles = "Administrator") ]
    public class RolesController : ApiController
    {
        // GET: api/Roles
        public dynamic Get()
        {
            var db = new ApplicationDbContext();
            var roles = new List<dynamic>();

            foreach (var role in db.Roles)
            {
                roles.Add(new
                {
                    id = role.Id,
                    name = role.Name
                });
            }

            return new {roles = roles };
        }

        // GET: api/Roles/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Roles
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Roles/5
        public void Put(int id, dynamic value)
        {
            var slonst = value;
        }

        // DELETE: api/Roles/5
        public void Delete(int id)
        {
        }
    }
}
