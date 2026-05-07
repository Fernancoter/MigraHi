using Microsoft.AspNetCore.Mvc;
using HiCone.Application.Services.Inventario;

namespace HiCone.API.Controllers.v1
{
    [ApiController]
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

        [HttpPut("silo/{id}")]
        public async Task<IActionResult> UpdateSilo(Guid id, [FromBody] SiloDto siloDto)
        {
            siloDto.Id = id;
            var result = await _inventarioService.UpdateSiloAsync(siloDto);
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

        [HttpPost("existencia-silo/guardar")]
        public async Task<IActionResult> UpdateExistenciasSilos([FromBody] List<ExistenciaSiloDto> ajustes)
        {
            var result = await _inventarioService.UpdateExistenciasSilosAsync(ajustes);
            return result ? Ok(new { success = true }) : BadRequest("No se pudieron guardar las existencias.");
        }

        [HttpGet("lotes")]
        public async Task<IActionResult> GetLotes()
        {
            var result = await _inventarioService.GetLotesAsync();
            return Ok(result);
        }

        [HttpPost("lote")]
        public async Task<IActionResult> CreateLote([FromBody] LoteDto loteDto)
        {
            try
            {
                var result = await _inventarioService.CreateLoteAsync(loteDto);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("lote/{id}")]
        public async Task<IActionResult> DeleteLote(Guid id)
        {
            var result = await _inventarioService.DeleteLoteAsync(id);
            return Ok(result);
        }
    }
}
