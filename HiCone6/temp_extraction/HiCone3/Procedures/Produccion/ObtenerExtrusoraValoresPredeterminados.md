# Procedure: ObtenerExtrusoraValoresPredeterminados

- **Module:** Produccion
- **Description:** Obtener Extrusora Valores Predeterminados
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| EnumTurno | Variable | NUMERIC |  | Enum Turno |
| DefaultOperadorId | Parameter | NUMERIC | out | Operador Id |
| DefaultProductoId | Parameter | NUMERIC | out | Producto Id |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
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

For each DB.ExtrusoraProducto
	Where ExtrusoraId = &ExtrusoraId
	Where ProductoActivo = True
	
	&DefaultProductoId = ProductoId
	
	
	exit
	

endfor

For each 
	Where ExtrusoraId = &ExtrusoraId
	Where ExtrusoraTurnoId = &EnumTurno
	
	&DefaultOperadorId = ExtrusoraOperadorId
	
	exit
	

endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusoraId, in:&TurnoId, out:&DefaultProductoId, out:&DefaultOperadorId);
```

