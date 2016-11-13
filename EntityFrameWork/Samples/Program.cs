using EF_DbFirst.DB_Model;
using EF_DbFirst.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Samples
{

    class Program
    {
        static void Main(string[] args)
        {
            //AddCoures();
            UpdateCoures();
            Console.ReadLine();
        }

        public static void AddCoures()
        {
            GenericUnitOfWork uow = new EF_DbFirst.Repository.GenericUnitOfWork();
            uow.Repository<T_COURSES>().Add(new T_COURSES { Descriptions = "Basic operation12", Course_Name = "Course 12" });
            uow.SaveChanges();
        }

        public static void UpdateCoures()
        {
            List<Filter> filter = new List<Filter>();
            filter.Add(new Filter { PropertyName = "ID", Operation = Op.Equals, Value = 1 });

            GenericUnitOfWork uow = new EF_DbFirst.Repository.GenericUnitOfWork();
            var item = uow.Repository<T_COURSES>().FindAll(filter).FirstOrDefault();

            item.Course_Name = "Updated Coures 3";
            item.Descriptions = "Updated 3";

            uow.SaveChanges();
        }
    }
}
