using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TrackingOrder.Entities
{
    public class Invoice
    {
        [Key]
        [Required]
        public int ID { get; set; }
        public string InvoiceNo { get; set; }
        public string Other1 { get; set; }
        public string Other2 { get; set; }
        public string Carrier { get; set; }

        public string Description { get; set; }
        public string VesselName { get; set; }

        public string StatusCode { get; set; }
        public int? ContainerID { get; set; }
        public string ContainerNo { get; set; } // bien so xe
        public string BLNO { get; set; }
        public int CompanyID { get; set; }
        public virtual Company Company { get; set; }
        public virtual Container Container { get; set; }

        public DateTime? ETA { get; set; }
        public DateTime? ETD { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
    }
}
