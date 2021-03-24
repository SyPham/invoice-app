using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TrackingOrder.Entities
{
    public class Account
    {
        [Key]
        [Required]
        public int ID { get; set; }
        public string UserName { get; set; }
        [JsonIgnore]
        public byte[] PasswordHash { get; set; }
        [JsonIgnore]
        public byte[] PasswordSalt { get; set; }
        public int RoleID { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public Role Role { get; set; }
        [JsonIgnore]
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}
