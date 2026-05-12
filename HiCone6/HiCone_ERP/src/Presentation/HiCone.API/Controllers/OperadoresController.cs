using HiCone.Application.Services.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OperadoresController : ControllerBase
{
    private readonly IIdentityService _identityService;

    public OperadoresController(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    /// <summary>Lista todos los operadores registrados.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _identityService.GetOperadoresAsync());
    }

    /// <summary>Crea un nuevo operador.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOperadorDto dto)
    {
        var result = await _identityService.CreateOperadorAsync(dto);
        return Ok(result);
    }

    /// <summary>Deshabilita un operador y su acceso al repositorio.</summary>
    [HttpPost("{id:guid}/deshabilitar")]
    public async Task<IActionResult> Deshabilitar(Guid id)
    {
        var result = await _identityService.DeshabilitarOperadorAsync(id);
        if (!result) return NotFound(new { message = "Operador no encontrado." });
        return Ok(new { isOk = true });
    }

    /// <summary>Habilita un operador y su acceso al repositorio.</summary>
    [HttpPost("{id:guid}/habilitar")]
    public async Task<IActionResult> Habilitar(Guid id)
    {
        var result = await _identityService.HabilitarOperadorAsync(id);
        if (!result) return NotFound(new { message = "Operador no encontrado." });
        return Ok(new { isOk = true });
    }
}
