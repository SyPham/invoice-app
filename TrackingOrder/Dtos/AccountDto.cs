using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TrackingOrder.Entities;

namespace TrackingOrder.Dtos
{
    public class AccountDto
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public int RoleID { get; set; }
    }
}
