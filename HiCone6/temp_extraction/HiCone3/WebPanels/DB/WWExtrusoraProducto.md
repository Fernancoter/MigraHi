# WebPanel: WWExtrusoraProducto

- **Module:** DB
- **Description:** Extrusora Productoes
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| Session | Variable | GX_USRDEFTYP |  | Session |
| HTTPRequest | Variable | GX_USRDEFTYP |  | HTTPRequest |
| GridState | Variable | GX_SDT |  | Grid State |
| TrnContext | Variable | GX_SDT |  | Trn Context |
| TrnContextAtt | Variable | GX_SDT |  | Trn Context Att |
| ExtrusoraProductoId | Variable | NUMERIC |  | Extrusora Producto Id |
| Update | Variable | CHARACTER |  | Update |
| Delete | Variable | CHARACTER |  | Delete |
| ADVANCED_LABEL_TEMPLATE | Variable | CHARACTER |  | ADVANCED_LABEL_TEMPLATE |

## Business Logic

### Start (Event)

```genexus
If not IsAuthorized(&PgmName)
		NotAuthorized(&PgmName)
	Endif
	Grid.Rows = 10
	&Update = "GXM_update"
	&Delete = "GX_BtnDelete"
	Form.Caption = 'Extrusora Productoes'
	Do 'PrepareTransaction'
	Grid.LoadSessionState()
```

### Refresh (Event)

```genexus
Grid.SaveSessionState()
```

### Grid.Load (Event)

```genexus
&Update.Link = ExtrusoraProducto.Link(TrnMode.Update, ExtrusoraProductoId)
	&Delete.Link = ExtrusoraProducto.Link(TrnMode.Delete, ExtrusoraProductoId)
	ExtrusoraProductoId.Link = ViewExtrusoraProducto.Link(ExtrusoraProductoId, "")
	ProductoNombre.Link = ViewProducto.Link(ProductoId, "")
	ExtrusoraNombre.Link = ViewExtrusora.Link(ExtrusoraId, "")
```

### 'DoInsert' (Event)

```genexus
ExtrusoraProducto(TrnMode.Insert, nullvalue(ExtrusoraProductoId))
```

