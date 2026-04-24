# Procedure: SDPGetImageFromBase64

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet Image From Base64
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BlobImage | Variable | BINARY |  | Blob Image |
| CaptureImage | Variable | BITMAP |  | Capture Image |
| ImageBase64 | Parameter | LONGVARCHAR | in | Image Base64 |
| ImageBase64NoLines | Variable | LONGVARCHAR |  | Image Base64 No Lines |
| NewLine | Variable | VARCHAR |  | New Line |
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
//&BlobImage.FromBase64String(&ImageBase64)
//ImageBase64 includes linebreaks and java does not support them

&NewLine = CHR(10)
&ImageBase64NoLines = StrReplace(&ImageBase64, &NewLine, "")
&BlobImage.FromBase64String(&ImageBase64NoLines) 

&CaptureImage = &BlobImage

// You can use &CaptureImage to store the signature in the transaction
// e.g
// &Client = new()
// &Client.ClientSignatureImage = &CaptureImage
// &Client.Save()
```

### Rules (Rules)

```genexus
Parm(in:&ImageBase64);
```

