using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HiCone.Application.Services.Inventario;

namespace HiCone.API.Controllers.v1
{
    [ApiController]
    [Authorize]
    [Route("api/v1/[controller]")]
    public class InventarioController : ControllerBase
    {
        private readonly IInventarioService _inventarioService;

        public InventarioController(IInventarioService inventarioService)
        {
            _inventarioService = inventarioService;
        }

        [HttpGet("silos")]
        public async Task<IActionResult> GetSilos()
        {
            var result = await _inventarioService.GetSilosAsync();
            return Ok(result);
        }

        [HttpPost("silo")]
        public async Task<IActionResult> CreateSilo([FromBody] SiloDto siloDto)
        {
            var result = await _inventarioService.CreateSiloAsync(siloDto);
            return Ok(result);
        }

        [HttpGet("existencia-producto")]
        public async Task<IActionResult> GetExistenciaProducto([FromQuery] Guid existenciaId, [FromQuery] string categoria, [FromQuery] string tipoProducto)
        {
            var result = await _inventarioService.GetExistenciaProductoAsync(existenciaId, categoria, tipoProducto);
            return Ok(result);
        }

        [HttpGet("existencia-silo")]
        public async Task<IActionResult> GetExistenciaSilo([FromQuery] Guid existenciaId)
        {
            var result = await _inventarioService.GetExistenciaSiloAsync(existenciaId);
            return Ok(result);
        }
    }
}
