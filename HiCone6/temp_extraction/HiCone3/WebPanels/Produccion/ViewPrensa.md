# WebPanel: ViewPrensa

- **Module:** Produccion
- **Description:** View Prensa
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| TabCode | Variable | CHARACTER |  | Tab Code |
| SelectedTabCode | Variable | CHARACTER |  | Selected Tab Code |
| Tabs | Variable | GX_SDT |  | Tabs |
| Tab | Variable | GX_SDT |  | Tab |
| Exists | Variable | Boolean |  | Exists |
| LoadAllTabs | Variable | Boolean |  | LoadAllTabs |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
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
	For each
		Where PrensaId = &PrensaId
		Form.Caption = PrensaNombre.ToString()
		ViewAll.Link = WWPrensa.Link()
		&Exists = True
	When none
		Form.Caption = "Record not found"
		ViewAll.Visible = false
		&Exists = False
	Endfor
	&LoadAllTabs = false
	If &Exists
		&SelectedTabCode = &TabCode
		Tab.ActivePageControlName = &SelectedTabCode
		Do 'Load Tab'
	Endif
```

### Tab.TabChanged (Event)

```genexus
&SelectedTabCode = Tab.ActivePageControlName
	&LoadAllTabs = false
	Do 'Load Tab'
```

### Rules (Rules)

```genexus
parm(in:&PrensaId, in:&TabCode);
```

