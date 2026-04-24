# WebPanel: WWPrensaProducto

- **Module:** DB
- **Description:** Prensa Productoes
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
| PrensaProductoId | Variable | NUMERIC |  | Prensa Producto Id |
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
	Form.Caption = 'Prensa Productoes'
	Do 'PrepareTransaction'
	Grid.LoadSessionState()
```

### Refresh (Event)

```genexus
Grid.SaveSessionState()
```

### Grid.Load (Event)

```genexus
&Update.Link = PrensaProducto.Link(TrnMode.Update, PrensaProductoId)
	&Delete.Link = PrensaProducto.Link(TrnMode.Delete, PrensaProductoId)
	PrensaProductoId.Link = ViewPrensaProducto.Link(PrensaProductoId, "")
```

### 'DoInsert' (Event)

```genexus
PrensaProducto(TrnMode.Insert, nullvalue(PrensaProductoId))
```

