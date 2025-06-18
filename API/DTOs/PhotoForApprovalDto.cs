using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API
{
    public class PhotoForApprovalDto
    {
        public int Id { get; set; }
        public required string Url { get; set; }
        public string? Username { get; set; }
        public bool IsApproved { get; set; } = false;
    }
}