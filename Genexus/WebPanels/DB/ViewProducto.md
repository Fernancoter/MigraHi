# WebPanel: ViewProducto

- **Module:** DB
- **Description:** View Producto
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| TabCode | Variable | CHARACTER |  | Tab Code |
| SelectedTabCode | Variable | CHARACTER |  | Selected Tab Code |
| Tabs | Variable | GX_SDT |  | Tabs |
| Tab | Variable | GX_SDT |  | Tab |
| Exists | Variable | Boolean |  | Exists |
| LoadAllTabs | Variable | Boolean |  | LoadAllTabs |
| ProductoId | Variable | NUMERIC |  | Producto Id |

## Business Logic

### Start (Event)

```genexus
If not IsAuthorized(&PgmName)
		NotAuthorized(&PgmName)
	Endif
	For each
		Where ProductoId = &ProductoId
		Form.Caption = ProductoNombre.ToString()
		ViewAll.Link = WWProducto.Link()
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
parm(in:&ProductoId, in:&TabCode);
```

