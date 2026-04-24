# Procedure: SDCerrarExtrusion

- **Module:** Produccion
- **Description:** SDCerrar Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DiaExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| Disponible | Variable | Boolean |  | Disponible |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionEstado | Variable | VARCHAR |  | Extrusion Estado |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| GAMUser | Variable | GX_EXTERNAL_OBJECT |  | GAMUser |
| GAMUserAttribute | Variable | GX_EXTERNAL_OBJECT |  | GAMUser Attribute |
| GUID | Variable | VARCHAR |  | GUID |
| isOK | Variable | Boolean |  | is OK |
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
      
      SDPausarBobinas.Call(&ExtrusionId)
      SetEstadoExtrusion.Call(&ExtrusionId, EstadoExtrusion.Terminada)
      SDLimpiarNotificaciones.Call(&ExtrusionId, Produccion.NotificacionTipo.Bobina)
      do 'LiberarOperador'
      
      Sub 'LiberarOperador'
	      &Extrusion.Load(&ExtrusionId)
	      &GUID = &Extrusion.ExtrusionOperadorGUID
	      
	      &GAMUser.Load(&GUID)
	      &GAMUserAttribute.Id = 'ExtrusionID'
	      &GAMUserAttribute.Value = '0'
	      &isOK = &GAMUser.SetAttribute(&GAMUserAttribute,&Errors)
	      
	      if &isOK
		    commit
	      endif
      Endsub
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId);
```

