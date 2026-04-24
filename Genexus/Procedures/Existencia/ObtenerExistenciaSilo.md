# Procedure: ObtenerExistenciaSilo

- **Module:** Existencia
- **Description:** Obtener Existencia Silo
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Categoria | Variable | VARCHAR |  | Categoria |
| ESId | Variable | NUMERIC |  | ESId |
| ESItem | Variable | GX_SDT |  | ESItem |
| ExistenciaId | Parameter | NUMERIC | in | Existencia Id |
| SDTExistenciaSilo | Parameter | GX_SDT | out | SDTExistencia Silo |
| SiloId | Variable | NUMERIC |  | Silo Id |
| SiloNombre | Variable | VARCHAR |  | Silo Nombre |
| SiloEstadoMaterial | Variable | NUMERIC |  | Estado Material |
| SiloTipoMaterial | Variable | VARCHAR |  | Tipo Material |
| LoteEmbarque | Variable | VARCHAR |  | Lote NO. |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |

## Business Logic

### Source (Source)

```genexus

&SDTExistenciaSilo.Clear()

for each DB.Silo
	where SiloId > 0
	where SiloActivo = True
	&SiloId = SiloId
	&SiloNombre = SiloNombre
	&SiloTipoMaterial = SiloTipoMaterial
	&SiloEstadoMaterial = SiloEstadoMaterial

	for each DB.ExistenciaSilo
		where ExistenciaSiloId > 0
		where SiloId = &SiloId
		where ExistenciaId = &ExistenciaId
		&ESId = ExistenciaSiloId

		&ESItem = New()
		&ESItem.ExistenciaSiloId = &ESId
		&ESItem.SiloId = &SiloId
		&ESItem.SiloNombre = &SiloNombre
		&ESItem.SiloTipoMaterial = &SiloTipoMaterial
		&ESItem.SiloEstadoMaterial = &SiloEstadoMaterial
		&ESItem.ExistenciaId = &ExistenciaId
		&ESItem.ExistenciaSiloCantidad = ExistenciaSiloCantidad
		&ESItem.ExistenciaSiloVirgenLote = ExistenciaSiloVirgenLote
		&SDTExistenciaSilo.Add(&ESItem)
		Exit

	when none



		&ESItem = New()
		&ESItem.ExistenciaSiloId = 0
		&ESItem.SiloId = &SiloId
		&ESItem.SiloNombre = &SiloNombre
		&ESItem.SiloTipoMaterial = &SiloTipoMaterial
		&ESItem.SiloEstadoMaterial = &SiloEstadoMaterial
		&ESItem.ExistenciaId = &ExistenciaId
		&ESItem.ExistenciaSiloCantidad = 0

		if(&SiloEstadoMaterial = EstadoMaterial.Virgen)
			do 'LoteSilo'
			&ESItem.ExistenciaSiloVirgenLote = &LoteEmbarque
		else
			&ESItem.ExistenciaSiloVirgenLote = 'N/A'
		endif

		&SDTExistenciaSilo.Add(&ESItem)

        endfor

endfor

Sub 'LoteSilo'

	&LoteEmbarque.SetEmpty()

	for each DB.Lote
		Order (LoteFechaRegistro)
		where LoteId > 0
		where LoteSiloId = &SiloId
		&LoteEmbarque = LoteEmbarque
		Exit
	endfor

EndSub
```

### Rules (Rules)

```genexus
parm(in:&ExistenciaId, out:&SDTExistenciaSilo);
```

