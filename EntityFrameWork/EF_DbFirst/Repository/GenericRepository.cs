using EF_DbFirst.DB_Model;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Linq.Expressions;

namespace EF_DbFirst.Repository
{
    class GenericRepository<T> : IRepository<T> where T : class
    {
        private DB_FristEntities entities = null;
        DbSet<T> _objectSet;

        public GenericRepository(DB_FristEntities _entities)
        {
            entities = _entities;
            _objectSet = entities.Set<T>();
        }

        public IEnumerable<T> GetAll(Func<T, bool> predicate = null)
        {
            if (predicate != null)
            {
                return _objectSet.Where(predicate);
            }

            return _objectSet.AsEnumerable();
        }

        public T Get(Func<T, bool> predicate)
        {
            return _objectSet.First(predicate);
        }

        public IEnumerable<T> FindAll(List<Filter> filters)
        {
            var deleg = ExpressionBuilder.GetExpression<T>(filters).Compile();
            return _objectSet.Where(deleg);
        }

        public void Add(T entity)
        {
            _objectSet.Add(entity);
        }

      

        public void Attach(T entity)
        {
            _objectSet.Attach(entity);
        }

        public void Delete(T entity)
        {
            _objectSet.Remove(entity);
        }
    }
}
