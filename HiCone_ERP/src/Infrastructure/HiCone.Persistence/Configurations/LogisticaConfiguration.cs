using HiCone.Domain.Entities.Logistica;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HiCone.Persistence.Configurations;

public class EmbarqueConfiguration : IEntityTypeConfiguration<Embarque>
{
    public void Configure(EntityTypeBuilder<Embarque> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Codigo).IsRequired().HasMaxLength(50);
        builder.Property(e => e.OrderDoc).IsRequired().HasMaxLength(50);
        builder.Property(e => e.RemissionDoc).IsRequired().HasMaxLength(50);

        builder.HasMany(e => e.Detalles)
            .WithOne(d => d.Embarque)
            .HasForeignKey(d => d.EmbarqueId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(e => e.Pallets)
            .WithOne(p => p.Embarque)
            .HasForeignKey(p => p.EmbarqueId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class EmbarqueDetalleConfiguration : IEntityTypeConfiguration<EmbarqueDetalle>
{
    public void Configure(EntityTypeBuilder<EmbarqueDetalle> builder)
    {
        builder.HasKey(d => d.Id);
        builder.Property(d => d.ProductoSAE).HasMaxLength(100);
    }
}
