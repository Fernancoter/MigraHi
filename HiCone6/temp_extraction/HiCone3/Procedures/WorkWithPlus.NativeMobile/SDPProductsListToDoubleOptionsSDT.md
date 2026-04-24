# Procedure: SDPProductsListToDoubleOptionsSDT

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPProducts List To Double Options SDT
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDPProductData | Variable | GX_SDT |  | SDPProduct Data |
| IsFirstItem | Variable | Boolean |  | Is First Item |
| ItemCount | Variable | NUMERIC |  | Item Count |
| SDPDoubleMenuOptions | Parameter | GX_SDT | out | SDPDouble Menu Options |
| SDPDoubleMenuOptionsItem | Variable | GX_SDT |  | SDPDouble Menu Options Item |
| SDPProductDataList | Parameter | GX_SDT | in | SDPProduct Data List |
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
&IsFirstItem = true
for &SDPProductData in &SDPProductDataList	
	if &IsFirstItem
		&SDPDoubleMenuOptionsItem = new()
		&SDPDoubleMenuOptionsItem.Option1ComponentToCall = &SDPProductData.ComponentToCall
		&SDPDoubleMenuOptionsItem.Option1Id = &SDPProductData.Id
		&SDPDoubleMenuOptionsItem.Option1Image = &SDPProductData.Image
		&SDPDoubleMenuOptionsItem.Option1Information1 = &SDPProductData.Information1
		&SDPDoubleMenuOptionsItem.Option1Information2 = &SDPProductData.Information2
		&SDPDoubleMenuOptionsItem.Option1Subtitle = &SDPProductData.Subtitle
		&SDPDoubleMenuOptionsItem.Option1Title = &SDPProductData.Title
		
		&SDPDoubleMenuOptions.Add(&SDPDoubleMenuOptionsItem)
		&IsFirstItem = false
	Else
		&SDPDoubleMenuOptionsItem.Option2ComponentToCall = &SDPProductData.ComponentToCall
		&SDPDoubleMenuOptionsItem.Option2Id = &SDPProductData.Id
		&SDPDoubleMenuOptionsItem.Option2Image = &SDPProductData.Image
		&SDPDoubleMenuOptionsItem.Option2Information1 = &SDPProductData.Information1
		&SDPDoubleMenuOptionsItem.Option2Information2 = &SDPProductData.Information2
		&SDPDoubleMenuOptionsItem.Option2Subtitle = &SDPProductData.Subtitle
		&SDPDoubleMenuOptionsItem.Option2Title = &SDPProductData.Title
		
		&IsFirstItem = true
	EndIf	
EndFor
```

### Rules (Rules)

```genexus
Parm(in:&SDPProductDataList, out:&SDPDoubleMenuOptions);
```

