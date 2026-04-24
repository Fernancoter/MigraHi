# Procedure: WWP_SearchMenuOptions

- **Module:** WWPBaseObjects
- **Description:** WWP_Search Menu Options
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SearchText | Parameter | VARCHAR | in | Search Text |
| MenuData | Parameter | GX_SDT | in | Menu Data |
| MenuOptions | Parameter | GX_SDT | inout | Menu Options |
| MenuOptionsPaths | Parameter | VARCHAR | inout | Menu Options Paths |
| MenuOptionsPath | Variable | VARCHAR |  | Menu Options Path |
| MenuDataItem | Variable | GX_SDT |  | Menu Data Item |
| CurrentMenuOptionPath | Parameter | VARCHAR | in | Current Menu Option Path |
| NewMenuOptionPath | Variable | VARCHAR |  | New Menu Option Path |
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

For &MenuDataItem in &MenuData
	&MenuOptionsPath = &CurrentMenuOptionPath.ToJson()
	If (not &MenuDataItem.link.IsEmpty()) AND (&MenuDataItem.caption.ToLower().Contains(&SearchText.Trim().ToLower())
												OR &MenuOptionsPath.ToLower().Contains(&SearchText.Trim().ToLower()))
		&MenuOptions.Add(&MenuDataItem)
		&MenuOptionsPaths.Add(&MenuOptionsPath)
	EndIf
	If &MenuDataItem.subItems.Count > 0
		&NewMenuOptionPath.FromJson(&MenuOptionsPath)
		&NewMenuOptionPath.Add(&MenuDataItem.caption)
		WWPBaseObjects.WWP_SearchMenuOptions(&SearchText, &MenuDataItem.subItems, &NewMenuOptionPath, &MenuOptions, &MenuOptionsPaths)
	EndIf
EndFor
```

### Rules (Rules)

```genexus

parm(in:&SearchText, in:&MenuData, in:&CurrentMenuOptionPath, inout:&MenuOptions, inout:&MenuOptionsPaths);
```

