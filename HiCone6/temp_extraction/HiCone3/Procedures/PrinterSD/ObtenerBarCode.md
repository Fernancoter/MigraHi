# Procedure: ObtenerBarCode

- **Module:** PrinterSD
- **Description:** Obtener Bar Code
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BarCodeValue | Parameter | VARCHAR | in | Bar Code Value |
| BarCodeImage | Parameter | BITMAP | out | Bar Code Image |
| ImgBlob | Variable | BINARY |  | Img Blob |
| ImgTxt | Variable | LONGVARCHAR |  | Img Txt |
| StringLibrary | Variable | GX_EXTERNAL_OBJECT |  | String Library |
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
&ImgTxt = &StringLibrary.GetBarCodeBase64(&BarCodeValue,2)
&ImgBlob.FromBase64String(&ImgTxt)
PrinterSD.GuardarBarCode.Call(&BarCodeValue, &ImgBlob)

For Each
	Where BarCodeValue = &BarCodeValue
	&BarCodeImage = BarCodeImage
	Exit
EndFor
```

### Rules (Rules)

```genexus
parm(In:&BarCodeValue, Out:&BarCodeImage);
```

