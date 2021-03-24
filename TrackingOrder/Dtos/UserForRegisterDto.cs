using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TrackingOrder.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 1, ErrorMessage = "You must specify a password between 1 and 8 characters")]
        public string Password { get; set; }

        [Required]
        public int RoleID { get; set; }

    }
}
