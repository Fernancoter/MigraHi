using HiCone.Application.Interfaces;
using HiCone.Application.Services.SAE;
using HiCone.Domain.Entities.SAE;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace HiCone.API.Controllers;

[Authorize]
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

    [HttpGet("ordenes")]
    public async Task<ActionResult<IEnumerable<SaeOrder>>> GetAllOrdenes()
    {
        var result = await _saeService.GetAllOrdersAsync();
        return Ok(result);
    }

    [HttpGet("ordenes/{orderDoc}")]
    public async Task<IActionResult> GetOrderDetail(string orderDoc)
    {
        var order = await _saeService.GetOrderByDocAsync(orderDoc);
        if (order == null) return NotFound();
        var remisiones = await _saeService.GetRemisionesAsync(orderDoc);
        return Ok(new { order, remisiones });
    }

    [HttpGet("clientes")]
    public async Task<ActionResult<IEnumerable<SaeCustomer>>> GetClientes()
    {
        var result = await _saeService.GetClientesSAEAsync();
        return Ok(result);
    }

    [HttpGet("salespersons")]
    public async Task<ActionResult<IEnumerable<SaeSalesPerson>>> GetSalesPersons()
    {
        var result = await _saeService.GetSalesPersonsAsync();
        return Ok(result);
    }

    [HttpGet("budgets")]
    public async Task<IActionResult> GetBudgets([FromQuery] int year, [FromQuery] string? consolidatedName, [FromQuery] string? productNumber)
    {
        var result = await _saeService.GetBudgetsAsync(year, consolidatedName, productNumber);
        return Ok(result);
    }

    [HttpPost("budgets")]
    public async Task<IActionResult> SaveBudgets([FromBody] List<SaeBudget> budgets)
    {
        var result = await _saeService.SaveBudgetsAsync(budgets);
        return Ok(new { success = result });
    }

    [HttpGet("reporte-ftb")]
    public async Task<IActionResult> GetFTBReport([FromQuery] int anio, [FromQuery] int mes)
    {
        var result = await _saeService.GetFTBReportAsync(anio, mes);
        return Ok(result);
    }

    [HttpGet("kpis")]
    public async Task<IActionResult> GetKPIs()
    {
        var result = await _saeService.GetKPIsAsync();
        return Ok(result);
    }

    [HttpPost("finalizar-remision")]
    public async Task<IActionResult> FinalizarRemision([FromBody] FinalizarRemisionRequest request)
    {
        var result = await _saeService.FinalizarRemisionSAEAsync(request.OrderDoc, request.RemissionDoc);
        return Ok(new { success = result });
    }

    [HttpGet("itw-outlook")]
    public async Task<IActionResult> GetItwOutlook()
    {
        var result = await _saeService.GetItwOutlookAsync();
        return Ok(result);
    }

    [HttpGet("realtime-inventory")]
    public async Task<IActionResult> GetRealtimeInventory()
    {
        var result = await _saeService.GetRealtimeInventoryAsync();
        return Ok(result);
    }
}

public class FinalizarRemisionRequest
{
    public string OrderDoc { get; set; } = null!;
    public string RemissionDoc { get; set; } = null!;
}
