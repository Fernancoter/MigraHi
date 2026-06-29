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
        Task<IEnumerable<ExistenciaDto>> GetExistenciasAsync();
    }

    public class InventarioService : IInventarioService
    {
        private readonly IApplicationDbContext _context;

        public InventarioService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExistenciaDto>> GetExistenciasAsync()
        {
            return await _context.Existencias
                .OrderByDescending(e => e.FechaHora)
                .Select(e => new ExistenciaDto
                {
                    Id = e.Id,
                    FechaHora = e.FechaHora,
                    Usuario = e.Usuario,
                    Estado = e.Estado,
                    Observaciones = e.Observaciones
                })
                .ToListAsync();
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
                Nombre = siloDto.Nombre,
                Codigo = siloDto.Codigo ?? siloDto.Nombre.Substring(0, Math.Min(3, siloDto.Nombre.Length)).ToUpper() + DateTime.Now.Ticks.ToString().Substring(10),
                CapacidadMaxima = siloDto.CapacidadMaxima,
                ExistenciaActual = 0,
                KgMinimo = siloDto.KgMinimo,
                KgMaximo = siloDto.KgMaximo,
                EstadoMaterial = siloDto.EstadoMaterial,
                TipoMaterial = siloDto.TipoMaterial,
                Activo = siloDto.Activo,
                Estado = "Operativo",
                Ubicacion = siloDto.Ubicacion,
                IsDeleted = false
            };

            _context.Silos.Add(silo);
            await _context.SaveChangesAsync(default);

            siloDto.Id = silo.Id;
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
    }

    public class SiloDto
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        public decimal CapacidadMaxima { get; set; }
        public decimal ExistenciaActual { get; set; }
        public decimal KgMinimo { get; set; }
        public decimal KgMaximo { get; set; }
        public string EstadoMaterial { get; set; }
        public string TipoMaterial { get; set; }
        public bool Activo { get; set; }
        public string Estado { get; set; }
        public string Ubicacion { get; set; }
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

    public class ExistenciaDto
    {
        public Guid Id { get; set; }
        public DateTime FechaHora { get; set; }
        public string Usuario { get; set; } = null!;
        public string Estado { get; set; } = null!;
        public string? Observaciones { get; set; }
    }
}
