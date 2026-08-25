using HiCone.Domain.Entities.Produccion;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HiCone.Persistence.Configurations;

public class ExtrusionConfiguration : IEntityTypeConfiguration<Extrusion>
{
    public void Configure(EntityTypeBuilder<Extrusion> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Codigo).IsRequired().HasMaxLength(50);
        
        builder.Ignore("MaquinaId1");

        builder.HasOne(e => e.Extrusora)
            .WithMany(ex => ex.Extrusiones)
            .HasForeignKey(e => e.ExtrusoraId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(e => e.Bobinas)
            .WithOne(b => b.Extrusion)
            .HasForeignKey(b => b.ExtrusionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.Resultado)
            .WithOne(r => r.Extrusion)
            .HasForeignKey<ExtrusionResultado>(r => r.ExtrusionId);
    }
}

public class PrensadoConfiguration : IEntityTypeConfiguration<Prensado>
{
    public void Configure(EntityTypeBuilder<Prensado> builder)
    {
        builder.HasKey(p => p.Id);

        builder.HasMany(p => p.Carreras)
            .WithOne(c => c.Prensado)
            .HasForeignKey(c => c.PrensadoId);

        builder.HasOne(p => p.Resultado)
            .WithOne(r => r.Prensado)
            .HasForeignKey<PrensadoResultado>(r => r.PrensadoId);
    }
}

public class CarreraConfiguration : IEntityTypeConfiguration<Carrera>
{
    public void Configure(EntityTypeBuilder<Carrera> builder)
    {
        builder.HasMany(c => c.Carretes)
            .WithOne(ca => ca.Carrera)
            .HasForeignKey(ca => ca.CarreraId);
    }
}

public class PaletCarreteConfiguration : IEntityTypeConfiguration<PaletCarrete>
{
    public void Configure(EntityTypeBuilder<PaletCarrete> builder)
    {
        builder.HasKey(pc => new { pc.PaletId, pc.CarreteId });

        builder.HasOne(pc => pc.Palet)
            .WithMany(p => p.PaletCarretes)
            .HasForeignKey(pc => pc.PaletId);

        builder.HasOne(pc => pc.Carrete)
            .WithMany(c => c.PaletCarretes)
            .HasForeignKey(pc => pc.CarreteId);
    }
}
