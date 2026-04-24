# Procedure: SDLimpiarNotificaciones

- **Module:** Produccion
- **Description:** SDLimpiar Notificaciones
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CurrentItem | Variable | GX_SDT |  | Current Item |
| Id | Variable | NUMERIC |  | Id |
| Notificaciones | Variable | GX_SDT |  | Notificaciones |
| TipoNotificacion | Variable | VARCHAR |  | Tipo Notificacion |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |
| ExtrusionId | Parameter | Unknown | in |  |

## Business Logic

### Source (Source)

```genexus
&Notificaciones = SDPCartProductsList()

for &CurrentItem in &Notificaciones
	
	Do Case
		Case &TipoNotificacion = NotificacionTipo.Bobina
		     if(&CurrentItem.ExtrusionId = &Id)
		          SDPCartProductsRemove(&CurrentItem.ProductId, 0)
	             endif	
	        
		Case &TipoNotificacion = NotificacionTipo.Carrera
		     if(&CurrentItem.PrensadoId = &Id)
		          SDPCartProductsRemove(&CurrentItem.ProductId, 0)
	             endif
	EndCase
endfor
```

### Rules (Rules)

```genexus
//parm(in:&ExtrusionId);
parm(in:&Id, in:&TipoNotificacion);
```

