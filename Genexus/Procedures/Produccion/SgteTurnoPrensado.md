# Procedure: SgteTurnoPrensado

- **Module:** Produccion
- **Description:** Sgte Turno Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| NextExtId | Variable | NUMERIC |  | Next Ext Id |
| ExtrusionFecha | Variable | DATETIME |  | Fecha |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensadoFecha | Variable | DATETIME |  | Prensado Fecha |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| NextPrenId | Parameter | NUMERIC | out | Next Pren Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
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
   
   &Prensado.Load(&PrensadoId)
   &PrensadoFecha = &Prensado.PrensadoFecha
   &PrensaId = &Prensado.PrensadoPrensaId
   
   //Obtener el sgte turno para la Prensa
   for each Order PrensadoFecha
	   where PrensadoId > 0
	   where PrensadoFecha >= &PrensadoFecha
	   where PrensadoPrensaId = &PrensaId
	   where PrensadoEstado = EstadoPrensado.Programado
	   &NextPrenId = DB.PrensadoId
	   Exit
   when none
	   &NextPrenId = 0	
   endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&NextPrenId);
```

