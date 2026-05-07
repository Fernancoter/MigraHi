using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.SAE;
using Microsoft.AspNetCore.Mvc;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class SAEController : ControllerBase
{
    private readonly ISAEService _saeService;

    public SAEController(ISAEService saeService)
    {
        _saeService = saeService;
    }

    [HttpGet("productos")]
    public async Task<ActionResult<IEnumerable<SaeProduct>>> GetProductos()
    {
        var result = await _saeService.GetProductosSAEAsync();
        return Ok(result);
    }

    [HttpGet("ordenes-pendientes")]
    public async Task<ActionResult<IEnumerable<SaeOrder>>> GetOrdenes()
    {
        var result = await _saeService.GetOrdenesPendientesAsync();
        return Ok(result);
    }

    [HttpGet("remisiones/{orderDoc}")]
    public async Task<ActionResult<IEnumerable<SaeRemission>>> GetRemisiones(string orderDoc)
    {
        var result = await _saeService.GetRemisionesAsync(orderDoc);
        return Ok(result);
    }

    [HttpPost("sincronizar")]
    public async Task<IActionResult> Sincronizar()
    {
        var result = await _saeService.SincronizarSAEAsync();
        return Ok(new { success = result, message = "Sincronización con SAE completada exitosamente" });
    }
}
