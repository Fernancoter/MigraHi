# Procedure: ObtenerPrensaValoresPredeterminados

- **Module:** Produccion
- **Description:** Obtener Prensa Valores Predeterminados
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| EnumTurno | Variable | NUMERIC |  | Enum Turno |
| DefaultOperadorId | Parameter | NUMERIC | out | Operador Id |
| DefaultProductoId | Parameter | NUMERIC | out | Producto Id |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
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
&DefaultProductoId = 0
&DefaultOperadorId = 0
&EnumTurno.FromString(&TurnoId.ToString())

For each DB.PrensaProducto	
	Where DB.PrensaId = &PrensaId	
	Where ComercialProductoActivo = true
	&DefaultProductoId = ComercialProductoId
	exit
endfor

For each 	
	Where PrensaId = &PrensaId	
	Where PrensaTurnoId = &EnumTurno
	&DefaultOperadorId = PrensaOperadorId
	exit
endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensaId, in:&TurnoId, out:&DefaultProductoId, out:&DefaultOperadorId);
```

