using EF_DbFirst.DB_Model;
using EF_DbFirst.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SPA.Controllers
{
    public class EmployeeInfoAPIController : ApiController
    {
        [HttpPost]
        public dynamic Fetch_Coures(HttpRequestMessage request, [FromBody] List<Filter> filters)
        {
            List<Filter> filter = new List<Filter>();
            filter.Add(new Filter { PropertyName = "ID", Operation = Op.Equals, Value = 1 });

            GenericUnitOfWork uow = new EF_DbFirst.Repository.GenericUnitOfWork();
            var item = uow.Repository<T_COURSES>().FindAll(filter).FirstOrDefault();

            return item;
        }      

        [HttpGet]
        public dynamic GetAll_Course()
        {
            GenericUnitOfWork uow = new EF_DbFirst.Repository.GenericUnitOfWork();
            var item = uow.Repository<T_COURSES>().GetAll();
            return item;
        }

        [HttpPost]
        public string Manage_Course(HttpRequestMessage request, [FromBody] T_COURSES Entity)
        {
            GenericUnitOfWork uow = new EF_DbFirst.Repository.GenericUnitOfWork();
            uow.Repository<T_COURSES>().Add(Entity);
            uow.SaveChanges();

            return string.Empty;
        }
    }
}
