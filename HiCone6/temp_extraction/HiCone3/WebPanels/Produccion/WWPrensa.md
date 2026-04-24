# WebPanel: WWPrensa

- **Module:** Produccion
- **Description:** Work With Prensa
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| Session | Variable | GX_USRDEFTYP |  | Session |
| HTTPRequest | Variable | GX_USRDEFTYP |  | HTTPRequest |
| GridState | Variable | GX_SDT |  | Grid State |
| TrnContext | Variable | GX_SDT |  | Trn Context |
| TrnContextAtt | Variable | GX_SDT |  | Trn Context Att |
| PrensaNombre | Variable | VARCHAR |  | Prensa Nombre |
| Update | Variable | CHARACTER |  | Update |
| Delete | Variable | CHARACTER |  | Delete |
| ADVANCED_LABEL_TEMPLATE | Variable | CHARACTER |  | ADVANCED_LABEL_TEMPLATE |
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Start (Event)

```genexus
If not IsAuthorized(&PgmName)
		NotAuthorized(&PgmName)
	Endif
	Grid.Rows = 10
	&Update = "GXM_update"
	&Delete = "GX_BtnDelete"
	Form.Caption = 'Prensas'
	Do 'PrepareTransaction'
	Grid.LoadSessionState()
```

### Refresh (Event)

```genexus
Grid.SaveSessionState()
```

### Grid.Load (Event)

```genexus
&Update.Link = DB.Prensa.Link(TrnMode.Update, PrensaId)
	&Delete.Link = DB.Prensa.Link(TrnMode.Delete, PrensaId)
	PrensaNombre.Link = ViewPrensa.Link(PrensaId, "")
```

### 'DoInsert' (Event)

```genexus
DB.Prensa(TrnMode.Insert, nullvalue(PrensaId))
```

