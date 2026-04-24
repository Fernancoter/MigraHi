# Procedure: CrearPrensado

- **Module:** Produccion
- **Description:** Crear Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Exito | Variable | Boolean |  | Exito |
| OperadorId | Parameter | NUMERIC | in | Operador Id |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoFecha | Parameter | DATETIME | in | Prensado Fecha |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| Result | Variable | NUMERIC |  | Result |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| PrensadoId | Parameter | NUMERIC | out | Prensado Id |
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
&Prensado = New()
&Prensado.PrensadoPrensaId = &PrensaId 
&Prensado.PrensadoTurnoId = &TurnoId
&Prensado.PrensadoFecha = &PrensadoFecha 
&Prensado.PrensadoProductoId = &ProductoId
if(&OperadorId>0)
	&Prensado.PrensadoOperadorId = &OperadorId
else
	&Prensado.PrensadoOperadorId.SetNull()
endif

&Prensado.PrensadoTroquelId.SetNull()
&Prensado.PrensadoEstado = EstadoPrensado.PorProgramar
&Prensado.PrensadoLevasUnidadMedida = UnidadMedida.kg
&Prensado.PrensadoRodillosUnidadMedida = UnidadMedida.kg


&Prensado.Save()
if(&Prensado.Success())
	commit
	&PrensadoId = &Prensado.PrensadoId
else
	&PrensadoId = 0
endif
```

### Rules (Rules)

```genexus
parm(in:&TurnoId, in:&PrensaId, in:&PrensadoFecha,in:&ProductoId,in:&OperadorId,out:&PrensadoId);
```

