# Procedure: GuardarBarCode

- **Module:** PrinterSD
- **Description:** Guardar Bar Code
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BarCodeValue | Parameter | VARCHAR | in | Bar Code Value |
| ImgBlob | Parameter | BINARY | in | Img Blob |
| datetime | Variable | DATETIME |  | datetime |
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
For Each
	Where BarCodeValue = &BarCodeValue
	delete
EndFor
&datetime = datetime.Now()
&datetime = &datetime.AddDays(-1)
For Each
	Where BarCodeDateTime < &datetime or BarCodeDateTime.IsNull()
	delete
EndFor


New
	BarCodeValue = &BarCodeValue
	BarCodeImage = &ImgBlob
	BarCodeDateTime = datetime.Now()
endnew
commit
```

### Rules (Rules)

```genexus
parm(In:&BarCodeValue,In: &ImgBlob);
```

