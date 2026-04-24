# Procedure: SDPrensaDisponible

- **Module:** Produccion
- **Description:** SDPrensa Disponible
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Disponible | Parameter | Boolean | out | Disponible |
| PrensadoEstado | Variable | VARCHAR |  | Prensado Estado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
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
 
 &Disponible = true
 
 for each DB.Prensado
	 where PrensadoId > 0
	 where Not PrensadoId = &PrensadoId
	 where PrensadoPrensaId = &PrensaId
	 &PrensadoEstado = PrensadoEstado
	 
	 if(&PrensadoEstado = EstadoPrensado.EnProceso)
	      &Disponible = false
	      Exit
	 endif
 Endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&PrensaId, out:&Disponible);
```

