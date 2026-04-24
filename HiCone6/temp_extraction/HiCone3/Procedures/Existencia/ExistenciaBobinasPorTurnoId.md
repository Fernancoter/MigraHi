# Procedure: ExistenciaBobinasPorTurnoId

- **Module:** Existencia
- **Description:** Existencia Bobinas Por Turno Id
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| ExistenciaFecha | Parameter | DATETIME | in | Existencia Fecha |
| ExistenciaProductoCantidadTurnoSistema | Parameter | NUMERIC | out | Existencia Producto Cantidad Turno Sistema |
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
Debugger.Call(NivelDebug.Informativo, &Pgmname, 'Entra a Existencias Bobina por Turno')
&ExistenciaProductoCantidadTurnoSistema = 0
for each DB.ExtrusionResultado
	Where ExtrusionFecha.ToDate() = &ExistenciaFecha.ToDate()
	Where ExtrusionTurnoId = &TurnoId
	Where ExtrusionProductoId = &ProductoId
	
	&ExistenciaProductoCantidadTurnoSistema = &ExistenciaProductoCantidadTurnoSistema+  ExtrusionResultadoBobinasReposo
	Debugger.Call(NivelDebug.Informativo, &Pgmname, 'Bobina por Turno: ' + ExtrusionResultadoBobinasReposo.ToString())
endfor
```

### Rules (Rules)

```genexus
parm(in:&TurnoId,in:&ProductoId,in:&ExistenciaFecha, out:&ExistenciaProductoCantidadTurnoSistema);
```

