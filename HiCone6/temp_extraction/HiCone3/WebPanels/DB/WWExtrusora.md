# WebPanel: WWExtrusora

- **Module:** DB
- **Description:** Extrusoras
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
| ExtrusoraNombre | Variable | VARCHAR |  | Extrusora Nombre |
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
	Form.Caption = 'Extrusoras'
	Do 'PrepareTransaction'
	Grid.LoadSessionState()
```

### Refresh (Event)

```genexus
Grid.SaveSessionState()
```

### Grid.Load (Event)

```genexus
&Update.Link = Extrusora.Link(TrnMode.Update, ExtrusoraId)
	&Delete.Link = Extrusora.Link(TrnMode.Delete, ExtrusoraId)
	ExtrusoraNombre.Link = ViewExtrusora.Link(ExtrusoraId, "")
```

### 'DoInsert' (Event)

```genexus
Extrusora(TrnMode.Insert, nullvalue(ExtrusoraId))
```

