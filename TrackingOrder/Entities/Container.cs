using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TrackingOrder.Entities
{
    public class Container
    {
        [Key]
        [Required]
        public int ID { get; set; }
        public string ContainerNo { get; set; }
        public string Size { get; set; }
        public string SealNo { get; set; }
        public string DeliveryTo { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public string GW { get; set; }
        public string ATN { get; set; }
        public string DeliveryOrder { get; set; }

        public int? InvoiceID { get; set; }
        [JsonIgnore]
        public virtual Invoice Invoice { get; set; }

        public DateTime CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }

    }
}
