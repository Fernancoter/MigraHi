# Procedure: GetBookmarkFontIcon

- **Module:** WWPBaseObjects
- **Description:** Get Bookmark Font Icon
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DVelop_MenuItem | Variable | GX_SDT |  | DVelop_Menu Item |
| DVelop_Menu | Parameter | GX_SDT | in | DVelop_Menu |
| FontIcon | Parameter | VARCHAR | out | Font Icon |
| LinkToFind | Parameter | VARCHAR | in | Link To Find |
| LinkFound | Variable | Boolean |  | Link Found |
| HttpRequest | Variable | GX_USRDEFTYP |  | Http Request |
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

For &DVelop_MenuItem in &DVelop_Menu
	If &DVelop_MenuItem.link = &LinkToFind
		&FontIcon = &DVelop_MenuItem.iconClass
		Exit
	Else
		&FontIcon = GetBookmarkFontIcon(&LinkToFind, &DVelop_MenuItem.subItems)
		If &FontIcon <> ''
			Exit
		EndIf
	EndIf
EndFor
```

### Rules (Rules)

```genexus
parm(in:&LinkToFind, in:&DVelop_Menu, out:&FontIcon);
```

