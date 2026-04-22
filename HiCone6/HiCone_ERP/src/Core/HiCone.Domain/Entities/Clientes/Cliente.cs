using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Clientes;

public class Cliente : TenantEntity
{
    public string Codigo { get; set; } = null!; // CL_COD_CLI
    public string Nombre { get; set; } = null!; // CL_NOM_CLI
    public string? Direccion { get; set; }      // CL_DIR_CLI
    public string? Telefono { get; set; }       // CL_TEL_CLI
    public string? Email { get; set; }          // CL_EMAIL_CLI
    public string? Rfc { get; set; }            // CL_RFC_CLI
    
    public bool IsActive { get; set; } = true;
    public decimal? LimiteCredito { get; set; }
}
