# Procedure: SDPrensaOcupada

- **Module:** Produccion
- **Description:** SDPrensa Ocupada
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Disponible | Variable | Boolean |  | Disponible |
| PrensadoEstado | Variable | VARCHAR |  | Prensado Estado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| PrenActivoId | Parameter | NUMERIC | out | Pren Activo Id |
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
 
 &PrenActivoId = 0
 
 for each DB.Prensado
	 where PrensadoId > 0
	 where Not PrensadoId = &PrensadoId
	 where PrensadoPrensaId = &PrensaId
	 where PrensadoEstado = EstadoPrensado.EnProceso
	 &PrenActivoId = PrensadoId
	 Exit
 Endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&PrensaId, out:&PrenActivoId);
```

