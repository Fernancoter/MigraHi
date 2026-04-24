# Procedure: SDEliminarNotificacion

- **Module:** Produccion
- **Description:** SDEliminar Notificacion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CurrentItem | Variable | GX_SDT |  | Current Item |
| Id | Parameter | NUMERIC | in | Id |
| Notificaciones | Variable | GX_SDT |  | Notificaciones |
| TipoNotificacion | Parameter | VARCHAR | in | Tipo Notificacion |
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
&Notificaciones = SDPCartProductsList()

for &CurrentItem in &Notificaciones
	
	Do Case
		Case &TipoNotificacion = NotificacionTipo.Bobina
		     if(&CurrentItem.ItemId = &Id)
		          SDPCartProductsRemove(&CurrentItem.ProductId, 0)
			  Exit
	             endif	
	        
		Case &TipoNotificacion = NotificacionTipo.Carrera
		    if(&CurrentItem.ItemId = &Id)
		          SDPCartProductsRemove(&CurrentItem.ProductId, 0)
			  Exit
	        endif
	EndCase
endfor
```

### Rules (Rules)

```genexus
parm(in:&Id, in:&TipoNotificacion);
```

