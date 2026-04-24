# Procedure: ObtenerPrensadoBobina

- **Module:** Produccion
- **Description:** Obtener Prensado Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensadoBobinaId | Parameter | NUMERIC | out | Prensado Bobina Id |
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

for each DB.PrensadoBobina
	where PrensadoBobinaId > 0
	where PrensadoId = &PrensadoId
	where BobinaId > 0 
	where BobinaEstado = EstadoBobina.EnPrensado
	&PrensadoBobinaId = PrensadoBobinaId
	Exit
endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&PrensadoBobinaId);
```

