# Procedure: SDPGetPDFUrlSample

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet PDFUrl Sample
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| file | Variable | GX_USRDEFTYP |  | file |
| ServerUrl | Parameter | VARCHAR | in | Server Url |
| path | Variable | VARCHAR |  | path |
| PDFBlob | Variable | BINARY |  | PDFBlob |
| PDFUrl | Parameter | VARCHAR | out | PDFUrl |
| TemporalFileName | Variable | VARCHAR |  | Temporal File Name |
| TransactionWithBlobId | Parameter | NUMERIC | in | Transaction With Blob Id |
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
/* 
You should call this procedure from the device and then invoke Interop.OpenInBrowser
e.g.
Event 'DownloadPDF'
	&ServerUrl = Network.ApplicationServerURL
	&PDFUrl = SDPGetPDFUrlSample(&ServerUrl, <Place your transaction id here>)
	Interop.OpenInBrowser(&PDFUrl)
EndEvent
*/

/*
Use your transaction Id load the PDF in the &PDFBlob variable
e.g.
	&TransactionWithBlob.Load(&TransactionWithBlobId)
	&PDFBlob = &TransactionWithBlob.TransactionWithBlobPDF
or
	For Each
		Where TransactionWithBlobId = &TransactionWithBlobId
			&PDFBlob = TransactionWithBlobPDF
			exit
	EndFor
*/

&file.Open()
&file.Source = &PDFBlob

&TemporalFileName = &file.GetName()
&TemporalFileName = &TemporalFileName.Replace(".tmp",".pdf")

&path = &file.GetAbsoluteName().Replace(".tmp",".pdf")

&file.Copy(&path)
&file.Close()

&PDFUrl = &ServerUrl + "PublicTempStorage/" + &TemporalFileName
```

### Rules (Rules)

```genexus
Parm(in:&ServerUrl, in:&TransactionWithBlobId, out:&PDFUrl);
```

