# Procedure: LoadBreadcrumb

- **Module:** WWPBaseObjects
- **Description:** Load Breadcrumb
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Breadcrumb | Parameter | VARCHAR | inout | Breadcrumb |
| DVelop_Menu | Parameter | GX_SDT | in | DVelop_Menu |
| DVelop_Menu_Item | Variable | GX_SDT |  | DVelop_Menu_Item |
| MenuOptionFounded | Parameter | Boolean | inout | Menu Option Founded |
| MenuOptionToFind | Parameter | VARCHAR | in | Menu Option To Find |
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
&MenuOptionFounded = False
For &DVelop_Menu_Item In &DVelop_Menu
	If &DVelop_Menu_Item.link.ToLower().Trim() = &MenuOptionToFind.ToLower().Trim()
		&Breadcrumb =  Format(!'<span class="BreadCrumb">%1</span>', &DVelop_Menu_Item.caption)
		&MenuOptionFounded = true
		Exit
	Else
		LoadBreadCrumb(&DVelop_Menu_Item.subItems, &MenuOptionToFind, &Breadcrumb, &MenuOptionFounded)
		If &MenuOptionFounded
			&Breadcrumb =  Format(!'<span class="%3">%1</span><i class="fa fa-angle-right %4"></i>%2', &DVelop_Menu_Item.caption, &Breadcrumb, ThemeClass:BreadCrumb, ThemeClass:BreadCrumbIcon)
			Exit
		Endif
	EndIf
EndFor
```

### Rules (Rules)

```genexus
parm(In:&DVelop_Menu, In:&MenuOptionToFind, InOut:&Breadcrumb, InOut:&MenuOptionFounded);
```

