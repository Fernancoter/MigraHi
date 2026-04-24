# Procedure: SDPAddNotification

- **Module:** 
- **Description:** SDPAdd Notification
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| Count | Variable | NUMERIC |  | Count |
| Id | Parameter | NUMERIC | in | Id |
| ProductId | Variable | VARCHAR |  | Product Id |
| ProductsInCart | Variable | GX_SDT |  | Products In Cart |
| ProductsInCartItem | Variable | GX_SDT |  | Products In Cart Item |
| ProductsInCartTxt | Variable | VARCHAR |  | Products In Cart Txt |
| TipoNotificacion | Parameter | VARCHAR | in | Tipo Notificacion |
| Carrera | Variable | GX_BUSCOMP |  | Carrera |
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
Do Case
	Case &TipoNotificacion = NotificacionTipo.Bobina
		
	      &Bobina.Load(&Id)
		
	      &ProductsInCartItem = new()
	      &ProductsInCartItem.ItemId = &Id
	      &ProductsInCartItem.ProductId = &Bobina.BobinaNo.ToString().Trim() + &Bobina.BobinaOrigen.ToString().Trim() 
	      &ProductsInCartItem.Count = 1
	      &ProductsInCartItem.Promotion = &Bobina.BobinaEstado
	      &ProductsInCartItem.Variant = 'Bobina'
	      &ProductsInCartItem.ExtrusionId = &Bobina.ExtrusionId
	      &ProductsInCartItem.Notificacion = NotificacionTipo.Bobina
		
	Case &TipoNotificacion = NotificacionTipo.Carrera
	
	      &Carrera.Load(&Id)

	      &ProductsInCartItem = new()
	      &ProductsInCartItem.ItemId = &Id
	      &ProductsInCartItem.ProductId = 'C' + &Carrera.CarreraNo.ToString().Trim()
	      &ProductsInCartItem.Count = 1
	      &ProductsInCartItem.Promotion = &Carrera.SAE.CarreraEstado
	      &ProductsInCartItem.Variant = 'Carrera'
	      &ProductsInCartItem.PrensadoId = &Carrera.InicioPBPrensadoId
	      &ProductsInCartItem.Notificacion = NotificacionTipo.Carrera
EndCase



&ProductsInCartTxt = &WebSession.Get(!"ProductsInCart")
&ProductsInCart.FromJson(&ProductsInCartTxt)
&ProductsInCart.Add(&ProductsInCartItem)
&ProductsInCartTxt = &ProductsInCart.ToJson()
&WebSession.Set(!"ProductsInCart", &ProductsInCartTxt)
```

### Rules (Rules)

```genexus
Parm(in:&Id, in:&TipoNotificacion);
```

