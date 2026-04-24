# Procedure: PaletReportMain

- **Module:** PrinterSD
- **Description:** Palet Report Main
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EtiquetaPaletSDT | Variable | GX_SDT |  | Etiqueta Palet SDT |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| linkURL | Variable | VARCHAR |  | link URL |
| QRImage | Variable | BITMAP |  | QRImage |
| PDFNombre | Parameter | VARCHAR | in | PDFNombre |
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
&EtiquetaPaletSDT = ObtenerSDTEtiquetaPalet.Udp(&PaletId)

//&linkURL='https://barcode.tec-it.com/barcode.ashx?data='+&EtiquetaPaletSDT.PaletNoSerie+ '&code=Code128'
//&QRImage.FromURL(&linkURL)
debugger.Call(niveldebug.Informativo, &Pgmname, &EtiquetaPaletSDT.ToJson())
&QRImage = ObtenerBarCode.Udp(&EtiquetaPaletSDT.PaletNoSerie)

print printBlock1
print printBlock1
print printBlock1
print printBlock1
```

### Rules (Rules)

```genexus
Output_File(&PDFNombre, 'PDF');
Parm(in:&PaletId,in:&PDFNombre);
```

