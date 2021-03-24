using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrackingOrder.Entities
{
    public class Role
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public ICollection<Account> Accounts { get; set; }
    }
}
