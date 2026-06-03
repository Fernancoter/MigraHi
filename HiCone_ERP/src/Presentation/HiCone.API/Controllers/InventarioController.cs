using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HiCone.Application.Services.Inventario;

namespace HiCone.API.Controllers.v1
{
    [Authorize]
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
        
        [HttpDelete("silo/{id}")]
        public async Task<IActionResult> DeleteSilo(Guid id)
        {
            var result = await _inventarioService.DeleteSiloAsync(id);
            return Ok(result);
        }

        [HttpPost("silo/{id}/consumo")]
        public async Task<IActionResult> RegistrarConsumo(Guid id, [FromBody] ConsumoSiloDto consumoDto)
        {
            try
            {
                var username = User.Identity?.Name ?? "Sistema";
                var result = await _inventarioService.RegistrarConsumoSiloAsync(id, consumoDto.Kilos, consumoDto.Motivo, username);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
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

        [HttpPut("lote/{id}")]
        public async Task<IActionResult> UpdateLote(Guid id, [FromBody] LoteDto loteDto)
        {
            loteDto.Id = id;
            var result = await _inventarioService.UpdateLoteAsync(loteDto);
            return Ok(result);
        }

        [HttpDelete("lote/{id}")]
        public async Task<IActionResult> DeleteLote(Guid id)
        {
            var result = await _inventarioService.DeleteLoteAsync(id);
            return Ok(result);
        }

        [HttpGet("audit/{entityName}/{entityId}")]
        public async Task<IActionResult> GetAuditHistory(string entityName, string entityId)
        {
            var result = await _inventarioService.GetAuditHistoryAsync(entityName, entityId);
            return Ok(result);
        }

        [HttpPost("existencia-producto/guardar")]
        public async Task<IActionResult> GuardarExistenciaProducto([FromBody] List<ExistenciaProductoDto> items)
        {
            var result = await _inventarioService.GuardarExistenciaProductoAsync(items);
            return result ? Ok(new { success = true }) : BadRequest("No se pudieron guardar las existencias de producto.");
        }

        [HttpGet("existencias")]
        public async Task<IActionResult> GetExistencias()
        {
            var result = await _inventarioService.GetExistenciasAsync();
            return Ok(result);
        }

        [HttpPost("existencia/abrir")]
        public async Task<IActionResult> AbrirExistencia([FromBody] AbrirExistenciaRequest request)
        {
            try
            {
                var username = User.Identity?.Name ?? "Sistema";
                var result = await _inventarioService.AbrirExistenciaAsync(username, request.Observaciones);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
