using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TrackingOrder.Entities
{
    public class Company
    {
        [Key]
        [Required]
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }

        public ICollection<Invoice> Invoices { get; set; }
    }
}
