# Procedure: ExistenciaPalletPorTurnoId

- **Module:** Existencia
- **Description:** Existencia Pallet Por Turno Id
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
Debugger.Call(NivelDebug.Informativo, &Pgmname, 'Entra a Existencias Pallet por Turno ' + &TurnoId.ToString())

&ExistenciaProductoCantidadTurnoSistema = 0
for each DB.PrensadoResultado
	Where PrensadoFecha.ToDate() = &ExistenciaFecha.ToDate()
	Where PrensadoTurnoId = &TurnoId
	Where PrensadoProductoId = &ProductoId
	
	&ExistenciaProductoCantidadTurnoSistema = &ExistenciaProductoCantidadTurnoSistema+  PrensadoResultadoNoPalets
	Debugger.Call(NivelDebug.Informativo, &Pgmname, 'Pallets por Turno: ' + PrensadoResultadoNoPalets.ToString())
endfor
```

### Rules (Rules)

```genexus
parm(in:&TurnoId,in:&ProductoId,in:&ExistenciaFecha, out:&ExistenciaProductoCantidadTurnoSistema);
```

