# Procedure: SDPDoubleMenuFromLaunchpad

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPDouble Menu From Launchpad
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDPDoubleMenuOptions | Parameter | GX_SDT | out | SDPDouble Menu Options |
| SDPDoubleMenuOptionsItem | Variable | GX_SDT |  | SDPDouble Menu Options Item |
| SDPDoubleMenuOptionsLastItem | Variable | GX_SDT |  | SDPDouble Menu Options Last Item |
| SDPLaunchpadOptions | Parameter | GX_SDT | in | SDPLaunchpad Options |
| SDPLaunchpadOptionsItem | Variable | GX_SDT |  | SDPLaunchpad Options Item |
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
//Type:
//		0 = 2 items per row (information for both options must be provided)
//		1 = 1 item full row
//		2 = only left option
//
&SDPDoubleMenuOptionsLastItem = new()
&SDPDoubleMenuOptionsLastItem.Type = 10

For &SDPLaunchpadOptionsItem in &SDPLaunchpadOptions
	&SDPDoubleMenuOptionsItem = new()

	if &SDPDoubleMenuOptionsLastItem.Type = 2 And &SDPLaunchpadOptionsItem.TileType = SDPTileSize.OneBlock
		&SDPDoubleMenuOptionsLastItem.Option2ComponentToCall = &SDPLaunchpadOptionsItem.Link
		&SDPDoubleMenuOptionsLastItem.Option2Id = &SDPLaunchpadOptionsItem.Name
		&SDPDoubleMenuOptionsLastItem.Option2Image = &SDPLaunchpadOptionsItem.Icon
		&SDPDoubleMenuOptionsLastItem.Option2Subtitle = &SDPLaunchpadOptionsItem.Description
		&SDPDoubleMenuOptionsLastItem.Option2Title = &SDPLaunchpadOptionsItem.Information
		&SDPDoubleMenuOptionsLastItem.Type = 0
	Else		
		&SDPDoubleMenuOptions.Add(&SDPDoubleMenuOptionsItem)
		
		&SDPDoubleMenuOptionsItem.Option1ComponentToCall = &SDPLaunchpadOptionsItem.Link
		&SDPDoubleMenuOptionsItem.Option1Id = &SDPLaunchpadOptionsItem.Name
		&SDPDoubleMenuOptionsItem.Option1Image = &SDPLaunchpadOptionsItem.Icon
		&SDPDoubleMenuOptionsItem.Option1Subtitle = &SDPLaunchpadOptionsItem.Description
		&SDPDoubleMenuOptionsItem.Option1Title = &SDPLaunchpadOptionsItem.Information
		
		if &SDPLaunchpadOptionsItem.TileType = SDPTileType.Image
			&SDPDoubleMenuOptionsItem.Type = 1
		Else
			&SDPDoubleMenuOptionsItem.Type = 2
		EndIf
	EndIf

	&SDPDoubleMenuOptionsLastItem = &SDPDoubleMenuOptionsItem
EndFor
```

### Rules (Rules)

```genexus
Parm(in:&SDPLaunchpadOptions, out:&SDPDoubleMenuOptions);
```

