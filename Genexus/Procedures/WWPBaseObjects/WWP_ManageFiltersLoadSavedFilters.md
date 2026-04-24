# Procedure: WWP_ManageFiltersLoadSavedFilters

- **Module:** WWPBaseObjects
- **Description:** WWP_Manage Filters Load Saved Filters
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Key | Parameter | VARCHAR | in | Key |
| HasAdvancedFilters | Parameter | Boolean | in | Has Advanced Filters |
| ManageFiltersData | Parameter | GX_SDT | out | Manage Filters Data |
| ManageFiltersDataItem | Variable | GX_SDT |  | Manage Filters Data Item |
| ManageFiltersItem | Variable | GX_SDT |  | Manage Filters Item |
| ManageFiltersItems | Variable | GX_SDT |  | Manage Filters Items |
| CleanJSFormat | Parameter | VARCHAR | in | Clean JSFormat |
| TableInternalName | Parameter | VARCHAR | in | Table Internal Name |
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

&ManageFiltersData = new()

&ManageFiltersDataItem = new()
&ManageFiltersDataItem.Title = 'WWP_CleanFiltersCaption'
&ManageFiltersDataItem.EventKey = !'<#Clean#>'
&ManageFiltersDataItem.IsDivider = False
&ManageFiltersDataItem.FontIcon = !'fa fa-times-circle'
If not &CleanJSFormat.IsEmpty()
	&ManageFiltersDataItem.JSonclickEvent = format(&CleanJSFormat, &TableInternalName)
EndIf
&ManageFiltersData.Add(&ManageFiltersDataItem)

&ManageFiltersDataItem = new()
&ManageFiltersDataItem.Title = 'WWP_SaveFilterAsOption'
&ManageFiltersDataItem.EventKey = !'<#Save#>'
&ManageFiltersDataItem.IsDivider = False
&ManageFiltersDataItem.FontIcon = !'fa fa-save'
&ManageFiltersData.Add(&ManageFiltersDataItem)

If &HasAdvancedFilters
	&ManageFiltersDataItem = new()
	&ManageFiltersDataItem.Title = 'WWP_ShowAdvancedFilters' + !'|' + 'WWP_HideAdvancedFilters'
	&ManageFiltersDataItem.EventKey = !'<#ADV#>'
	&ManageFiltersDataItem.IsDivider = False
	&ManageFiltersDataItem.FontIcon = !'fas fa-filter'
	&ManageFiltersData.Add(&ManageFiltersDataItem)
EndIf

&ManageFiltersItems.FromXml(udp(LoadManageFiltersState, &Key))
If &ManageFiltersItems.Count > 0
	&ManageFiltersDataItem = new()
	&ManageFiltersDataItem.IsDivider = True
	&ManageFiltersData.Add(&ManageFiltersDataItem)
	
	For &ManageFiltersItem in &ManageFiltersItems
		&ManageFiltersDataItem = new()
		&ManageFiltersDataItem.Title = &ManageFiltersItem.Title
		&ManageFiltersDataItem.EventKey = &ManageFiltersItem.Title
		&ManageFiltersDataItem.IsDivider = False
		If not &CleanJSFormat.IsEmpty()
			&ManageFiltersDataItem.JSonclickEvent = format(&CleanJSFormat, &TableInternalName)
		EndIf
		&ManageFiltersData.Add(&ManageFiltersDataItem)
	
		If &ManageFiltersData.Count = 13
			Exit
		EndIf
	EndFor

	&ManageFiltersDataItem = new()
	&ManageFiltersDataItem.IsDivider = True
	&ManageFiltersData.Add(&ManageFiltersDataItem)

	&ManageFiltersDataItem = new()
	&ManageFiltersDataItem.Title = 'WWP_ManageFiltersOption'
	&ManageFiltersDataItem.EventKey = !'<#Manage#>'
	&ManageFiltersDataItem.IsDivider = False
	&ManageFiltersDataItem.FontIcon = !'fa fa-cog'
	&ManageFiltersDataItem.JSonclickEvent = ''
	&ManageFiltersData.Add(&ManageFiltersDataItem)
EndIf
```

### Rules (Rules)

```genexus

parm(in:&Key, in:&CleanJSFormat, in:&TableInternalName, in:&HasAdvancedFilters, out:&ManageFiltersData);
```

