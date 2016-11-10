using EF_DbFirst.DB_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EF_DbFirst.Repository
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll(Func<T, bool> predicate = null);
        T Get(Func<T, bool> predicate);
        void Add(T entity);
        void Attach(T entity);
        void Delete(T entity);
    }

}
