using EF_DbFirst.DB_Model;
using EF_DbFirst.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EF_DbFirst.Repository;

namespace Samples
{

    class Program
    {
        static void Main(string[] args)
        {

            GenericUnitOfWork uow = new EF_DbFirst.Repository.GenericUnitOfWork();
            uow.Repository<T_COURSES>().Add(new T_COURSES { Descriptions = "Basic operation", Course_Name = "Course 1" });
            uow.SaveChanges();

           
        }
    }
}
