# Procedure: CrearPrensadoBobina

- **Module:** Produccion
- **Description:** Crear Prensado Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaId | Parameter | NUMERIC | in | Bobina Id |
| PrensadoBobina | Variable | GX_BUSCOMP |  | Prensado Bobina |
| PrensadoBobinaId | Variable | NUMERIC |  | Prensado Bobina Id |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PBId | Parameter | NUMERIC | out | PBId |
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

	&PrensadoBobina = New()
	&PrensadoBobina.PrensadoId = &PrensadoId
        &PrensadoBobina.BobinaId = &BobinaId
        &PrensadoBobina.Save()

	if(&PrensadoBobina.Success())
		&PBId = &PrensadoBobina.PrensadoBobinaId
		commit
	endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&BobinaId, out:&PBId);
```

