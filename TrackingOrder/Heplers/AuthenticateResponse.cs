using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TrackingOrder.Entities;

namespace TrackingOrder.Heplers
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string RoleCode { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }

        public AuthenticateResponse(Account account, string jwtToken, string refreshToken)
        {
            Id = account.ID;
            Username = account.UserName;
            RoleCode = account.Role.Code;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}
