# Procedure: SDCerrarPrensado

- **Module:** Produccion
- **Description:** SDCerrar Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DiaExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| Disponible | Variable | Boolean |  | Disponible |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionEstado | Variable | VARCHAR |  | Extrusion Estado |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| GAMUser | Variable | GX_EXTERNAL_OBJECT |  | GAMUser |
| GAMUserAttribute | Variable | GX_EXTERNAL_OBJECT |  | GAMUser Attribute |
| GUID | Variable | VARCHAR |  | GUID |
| isOK | Variable | Boolean |  | is OK |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaCarrera | Variable | GX_BUSCOMP |  | Prensa Carrera |
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
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
      
      
      do 'PrensaCarreras'
      SetEstadoPrensado.Call(&PrensadoId, EstadoPrensado.Terminado)
      Produccion.SDLimpiarNotificaciones.Call(&PrensadoId, NotificacionTipo.Carrera)
      do 'LiberarOperador'
      
      Sub 'LiberarOperador'
	      &Prensado.Load(&PrensadoId)
	      &GUID = &Prensado.PrensadoOperadorGUID
	      
	      &GAMUser.Load(&GUID)
	      &GAMUserAttribute.Id = 'PrensadoID'
	      &GAMUserAttribute.Value = '0'
	      &isOK = &GAMUser.SetAttribute(&GAMUserAttribute,&Errors)
	      
	      if &isOK
		    commit
	      endif
      Endsub

      Sub 'PrensaCarreras'
	      for each
		      where CarreraId > 0
		      where InicioPBPrensadoId = &PrensadoId
		      where CarreraEstado in (EstadoCarrera.EnProceso, EstadoCarrera.Terminada)
		      &PrensaId = InicioPBPrensaId
		      &CarreraId = DB.CarreraId
		      
		      &PrensaCarrera = New()
		      &PrensaCarrera.CarreraId = &CarreraId
		      &PrensaCarrera.PrensaId = &PrensaId
		      &PrensaCarrera.Save()
		      
		      if(&PrensaCarrera.Success())
			      commit
		      endif
	      endfor
      EndSub
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId);
```

