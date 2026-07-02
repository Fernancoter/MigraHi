using System;
using System.ComponentModel.DataAnnotations;

namespace HiCone.Domain.Entities.SAE
{
    public class SaeSalesPerson
    {
        [Key]
        [MaxLength(100)]
        public string SalesPersonName { get; set; } = string.Empty;

        public bool SalesPersonActive { get; set; }
    }
}
