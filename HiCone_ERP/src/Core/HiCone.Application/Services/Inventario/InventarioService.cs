using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.Inventario;
using Microsoft.EntityFrameworkCore;
using HiCone.Application.Common.Interfaces;

namespace HiCone.Application.Services.Inventario
{
    public interface IInventarioService
    {
        Task<IEnumerable<ExistenciaProductoDto>> GetExistenciaProductoAsync(Guid existenciaId, string categoria, string tipoProducto);
        Task<IEnumerable<ExistenciaSiloDto>> GetExistenciaSiloAsync(Guid existenciaId);
        Task<IEnumerable<SiloDto>> GetSilosAsync();
        Task<SiloDto> CreateSiloAsync(SiloDto siloDto);
        Task<SiloDto> UpdateSiloAsync(SiloDto siloDto);
        Task<IEnumerable<LoteDto>> GetLotesAsync();
        Task<LoteDto> CreateLoteAsync(LoteDto loteDto);
        Task<bool> DeleteLoteAsync(Guid id);
        Task<bool> UpdateExistenciasSilosAsync(List<ExistenciaSiloDto> ajustes);
    }

    public class InventarioService : IInventarioService
    {
        private readonly IApplicationDbContext _context;

        public InventarioService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SiloDto>> GetSilosAsync()
        {
            return await _context.Silos
                .Where(s => !s.IsDeleted)
                .Select(s => new SiloDto
                {
                    Id = s.Id,
                    Nombre = s.Nombre,
                    Codigo = s.Codigo,
                    CapacidadMaxima = s.CapacidadMaxima,
                    ExistenciaActual = s.ExistenciaActual,
                    KgMinimo = s.KgMinimo,
                    KgMaximo = s.KgMaximo,
                    EstadoMaterial = s.EstadoMaterial,
                    TipoMaterial = s.TipoMaterial,
                    Activo = s.Activo,
                    Estado = s.Estado,
                    Ubicacion = s.Ubicacion
                })
                .ToListAsync();
        }

        public async Task<SiloDto> CreateSiloAsync(SiloDto siloDto)
        {
            var silo = new Silo
            {
                Id = siloDto.Id ?? Guid.NewGuid(),
                Nombre = siloDto.Nombre ?? "Nuevo Silo",
                Codigo = siloDto.Codigo ?? (siloDto.Nombre?.Substring(0, Math.Min(3, siloDto.Nombre.Length)).ToUpper() ?? "SIL") + DateTime.Now.Ticks.ToString().Substring(10),
                CapacidadMaxima = siloDto.CapacidadMaxima,
                ExistenciaActual = 0,
                KgMinimo = siloDto.KgMinimo,
                KgMaximo = siloDto.KgMaximo,
                EstadoMaterial = siloDto.EstadoMaterial ?? "Virgen (pelet)",
                TipoMaterial = siloDto.TipoMaterial ?? "PCR",
                Activo = siloDto.Activo,
                Estado = siloDto.Estado ?? "Operativo",
                Ubicacion = siloDto.Ubicacion ?? "N/A",
                IsDeleted = false
            };

            _context.Silos.Add(silo);
            await _context.SaveChangesAsync(default);

            siloDto.Id = silo.Id;
            return siloDto;
        }

        public async Task<SiloDto> UpdateSiloAsync(SiloDto siloDto)
        {
            if (siloDto.Id == null) throw new ArgumentException("Id cannot be null for update");
            
            var silo = await _context.Silos.FindAsync(siloDto.Id);
            if (silo == null || silo.IsDeleted) throw new KeyNotFoundException("Silo not found");

            silo.Nombre = siloDto.Nombre ?? silo.Nombre;
            silo.Codigo = siloDto.Codigo ?? silo.Codigo;
            silo.CapacidadMaxima = siloDto.CapacidadMaxima;
            silo.KgMinimo = siloDto.KgMinimo;
            silo.KgMaximo = siloDto.KgMaximo;
            silo.EstadoMaterial = siloDto.EstadoMaterial ?? silo.EstadoMaterial;
            silo.TipoMaterial = siloDto.TipoMaterial ?? silo.TipoMaterial;
            silo.Activo = siloDto.Activo;
            silo.Estado = siloDto.Estado ?? silo.Estado;
            silo.Ubicacion = siloDto.Ubicacion ?? silo.Ubicacion;

            await _context.SaveChangesAsync(default);
            return siloDto;
        }

        public async Task<IEnumerable<ExistenciaProductoDto>> GetExistenciaProductoAsync(Guid existenciaId, string categoria, string tipoProducto)
        {
            var existencia = await _context.Existencias.FindAsync(existenciaId);
            if (existencia == null) return new List<ExistenciaProductoDto>();

            var productos = await _context.Productos
                .Include(p => p.Categoria)
                .Where(p => p.Categoria.Nombre == categoria && p.IsActive && !p.IsDeleted)
                .ToListAsync();

            var result = new List<ExistenciaProductoDto>();

            foreach (var producto in productos)
            {
                var ep = await _context.ExistenciaProductos
                    .FirstOrDefaultAsync(x => x.ProductoId == producto.Id && x.ExistenciaId == existenciaId);

                int cantidadSistema = 0;
                // ... (logic for system counts)
                result.Add(new ExistenciaProductoDto
                {
                    ProductoId = producto.Id,
                    ProductoNombre = producto.Nombre,
                    ExistenciaId = existenciaId,
                    CantidadReal = ep?.CantidadReal ?? 0,
                    CantidadSistema = 0, // Placeholder
                    MillarSistema = 0 
                });
            }

            return result;
        }

        public async Task<IEnumerable<ExistenciaSiloDto>> GetExistenciaSiloAsync(Guid existenciaId)
        {
            var silos = await _context.Silos.Where(s => !s.IsDeleted).ToListAsync();
            var result = new List<ExistenciaSiloDto>();

            foreach (var silo in silos)
            {
                var es = await _context.ExistenciasSilos
                    .FirstOrDefaultAsync(x => x.SiloId == silo.Id && x.ExistenciaId == existenciaId);

                string loteVirgen = "N/A";
                if (silo.Estado == "Operativo")
                {
                    var ultimoLote = await _context.Lotes
                        .Where(l => l.LoteSiloId == silo.Id)
                        .OrderByDescending(l => l.LoteFechaRegistro)
                        .Select(l => l.LoteEmbarque)
                        .FirstOrDefaultAsync();
                    
                    loteVirgen = ultimoLote ?? "Sin Lote";
                }

                result.Add(new ExistenciaSiloDto
                {
                    SiloId = silo.Id,
                    SiloNombre = silo.Nombre,
                    TipoMaterial = silo.TipoMaterial ?? "N/A",
                    CantidadReal = es?.Cantidad ?? 0,
                    LoteVirgen = loteVirgen
                });
            }

            return result;
        }

        public async Task<IEnumerable<LoteDto>> GetLotesAsync()
        {
            return await _context.Lotes
                .Include(l => l.Extrusiones) // Example link, might not need it for basic list
                .OrderByDescending(l => l.LoteFechaRegistro)
                .Select(l => new LoteDto
                {
                    Id = l.Id,
                    LoteEmbarque = l.LoteEmbarque,
                    LotePO = l.LotePO,
                    LoteFechaRegistro = l.LoteFechaRegistro,
                    LoteTrunkNo = l.LoteTrunkNo,
                    LoteTipoMaterial = l.LoteTipoMaterial,
                    LoteSiloId = l.LoteSiloId,
                    LoteKg = l.LoteKg,
                    LoteConsumido = l.LoteConsumido,
                    LotePaqueteAditivos = l.LotePaqueteAditivos
                })
                .ToListAsync();
        }

        public async Task<LoteDto> CreateLoteAsync(LoteDto loteDto)
        {
            var lote = new Lote
            {
                Id = loteDto.Id ?? Guid.NewGuid(),
                LoteEmbarque = loteDto.LoteEmbarque,
                LotePO = loteDto.LotePO,
                LoteFechaRegistro = loteDto.LoteFechaRegistro ?? DateTime.Now,
                LoteTrunkNo = loteDto.LoteTrunkNo,
                LoteTipoMaterial = loteDto.LoteTipoMaterial,
                LoteSiloId = loteDto.LoteSiloId,
                LoteKg = loteDto.LoteKg,
                LoteConsumido = loteDto.LoteConsumido,
                LotePaqueteAditivos = loteDto.LotePaqueteAditivos,
                Codigo = loteDto.LoteEmbarque ?? "LOTE-" + DateTime.Now.Ticks.ToString().Substring(10),
                IsDeleted = false
            };

            if (loteDto.LoteSiloId.HasValue)
            {
                var silo = await _context.Silos.FindAsync(loteDto.LoteSiloId.Value);
                if (silo != null)
                {
                    if (silo.ExistenciaActual + loteDto.LoteKg > silo.CapacidadMaxima)
                    {
                        throw new InvalidOperationException($"No se puede registrar el lote. La cantidad excede la capacidad máxima del silo '{silo.Nombre}' ({silo.CapacidadMaxima} kg).");
                    }
                    silo.ExistenciaActual += loteDto.LoteKg;
                }
            }

            _context.Lotes.Add(lote);
            await _context.SaveChangesAsync(default);

            loteDto.Id = lote.Id;
            return loteDto;
        }

        public async Task<bool> DeleteLoteAsync(Guid id)
        {
            var lote = await _context.Lotes.FindAsync(id);
            if (lote == null) return false;

            lote.IsDeleted = true;
            await _context.SaveChangesAsync(default);
            return true;
        }

        public async Task<bool> UpdateExistenciasSilosAsync(List<ExistenciaSiloDto> ajustes)
        {
            if (ajustes == null || !ajustes.Any()) return false;

            foreach (var ajuste in ajustes)
            {
                var silo = await _context.Silos.FindAsync(ajuste.SiloId);
                if (silo != null)
                {
                    // Update actual existence with the manual physical count
                    silo.ExistenciaActual = ajuste.CantidadReal;
                    
                    // Note: Here we could also update or create an ExistenciaSilo record 
                    // for physical inventory history, but the primary target is the Silo's current stock.
                }
            }

            return await _context.SaveChangesAsync(default) > 0;
        }
    }

    public class SiloDto
    {
        public Guid? Id { get; set; }
        public string? Nombre { get; set; }
        public string? Codigo { get; set; }
        public decimal CapacidadMaxima { get; set; }
        public decimal ExistenciaActual { get; set; }
        public decimal KgMinimo { get; set; }
        public decimal KgMaximo { get; set; }
        public string? EstadoMaterial { get; set; }
        public string? TipoMaterial { get; set; }
        public bool Activo { get; set; }
        public string? Estado { get; set; }
        public string? Ubicacion { get; set; }
    }

    public class LoteDto
    {
        public Guid? Id { get; set; }
        public string? LoteEmbarque { get; set; }
        public string? LotePO { get; set; }
        public DateTime? LoteFechaRegistro { get; set; }
        public string? LoteTrunkNo { get; set; }
        public string? LoteTipoMaterial { get; set; }
        public Guid? LoteSiloId { get; set; }
        public string? LoteSiloNombre { get; set; }
        public decimal LoteKg { get; set; }
        public bool LoteConsumido { get; set; }
        public string? LotePaqueteAditivos { get; set; }
    }

    public class ExistenciaProductoDto
    {
        public Guid ProductoId { get; set; }
        public string ProductoNombre { get; set; }
        public Guid ExistenciaId { get; set; }
        public decimal CantidadReal { get; set; }
        public decimal CantidadSistema { get; set; }
        public decimal MillarSistema { get; set; }
    }

    public class ExistenciaSiloDto
    {
        public Guid SiloId { get; set; }
        public string SiloNombre { get; set; }
        public string TipoMaterial { get; set; }
        public decimal CantidadReal { get; set; }
        public string LoteVirgen { get; set; }
    }
}
