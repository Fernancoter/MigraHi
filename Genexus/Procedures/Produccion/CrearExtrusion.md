# Procedure: CrearExtrusion

- **Module:** Produccion
- **Description:** Crear Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| ExtrusionFecha | Parameter | DATETIME | in | Extrusion Fecha |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| Result | Variable | NUMERIC |  | Result |
| Exito | Variable | Boolean |  | Exito |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| OperadorId | Parameter | NUMERIC | in | Operador Id |
| ExtrusionCalibre | Variable | VARCHAR |  | Calibre |
| ExtrusionAncho | Variable | VARCHAR |  | Ancho |
| ExtrusionLongitud | Variable | VARCHAR |  | Longitud |
| ExtrusionId | Parameter | NUMERIC | out | Extrusion Id |
| Turno | Variable | GX_BUSCOMP |  | Turno |
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
&ExtrusionCalibre.SetEmpty()
&ExtrusionAncho.SetEmpty()
&ExtrusionLongitud.SetEmpty()

do 'CalibrarExtrusion'

&Extrusion = New()
&Extrusion.ExtrusionExtrusoraId = &ExtrusoraId 
&Extrusion.ExtrusionTurnoId = &TurnoId

&Extrusion.ExtrusionFecha = &ExtrusionFecha
&Extrusion.ExtrusionProductoId = &ProductoId
if(&OperadorId>0)
	&Extrusion.ExtrusionOperadorId = &OperadorId
else
	&Extrusion.ExtrusionOperadorId.SetNull()
endif

&Extrusion.ExtrusionEstado = EstadoExtrusion.PorProgramar
&Extrusion.ExtrusionSiloId.SetNull()
&Extrusion.ExtrusionSiloMolidoId.SetNull()

&Extrusion.ExtrusionCalibre = &ExtrusionCalibre
&Extrusion.ExtrusionAncho = &ExtrusionAncho
&Extrusion.ExtrusionLongitud = &ExtrusionLongitud

&Extrusion.Save()
if(&Extrusion.Success())
	commit
	&ExtrusionId = &Extrusion.ExtrusionId
Else
	debugger.Call(niveldebug.Informativo, &Pgmname, &Extrusion.ToJson())
	setnotSuccessMessagesLog.Call(&Extrusion.GetMessages(), &Pgmname)
	&ExtrusionId = 0
endif


Sub 'CalibrarExtrusion'
	for each DB.ExtrusoraProducto
		where ExtrusoraProductoId > 0
		where ExtrusoraId = &ExtrusoraId
		where ProductoId = &ProductoId
		
		&ExtrusionCalibre = ExtrusoraProductoCalibre
                &ExtrusionAncho = ExtrusoraProductoAncho
                &ExtrusionLongitud = ExtrusoraProductoLongitud
		Exit
	endfor
EndSub
```

### Rules (Rules)

```genexus
parm(in:&TurnoId, in:&ExtrusoraId, in:&ExtrusionFecha,in:&ProductoId,in:&OperadorId,out:&ExtrusionId);
```

