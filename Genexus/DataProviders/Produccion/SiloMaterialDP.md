# DataProvider: SiloMaterialDP

- **Module:** Produccion
- **Description:** Silo Material DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EstadoMaterial | Parameter | NUMERIC | in | Estado Material |
| TipoMaterial | Parameter | VARCHAR | in | Tipo Material |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTSilo
where SiloId > 0
where SiloActivo = True
where SiloEstadoMaterial = &EstadoMaterial when &EstadoMaterial > 0
where SiloTipoMaterial = &TipoMaterial when Not &TipoMaterial.IsEmpty()
{
	SDTSiloItem
	{
		SiloId = SiloId
		SiloNombre = SiloNombre
		SiloKgMinimo = SiloKgMinimo
		SiloKgMaximo = SiloKgMaximo
		SiloEstadoMaterial = SiloEstadoMaterial
		SiloTipoMaterial = SiloTipoMaterial
	}
}
```

### Rules (Rules)

```genexus
parm(in:&EstadoMaterial, in:&TipoMaterial);
```

