# Procedure: BobinaReportMain

- **Module:** PrinterSD
- **Description:** Bobina Report Main
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaId | Parameter | NUMERIC | in | Bobina Id |
| EtiquetaBobinaSDT | Variable | GX_SDT |  | Etiqueta Bobina SDT |
| linkURL | Variable | VARCHAR |  | link URL |
| NamePDF | Variable | VARCHAR |  | Name PDF |
| PDFNombre | Parameter | VARCHAR | in | PDFNombre |
| QRImage | Variable | BITMAP |  | QRImage |
| BobinaNoserie | Variable | VARCHAR |  | Bobina No Serie |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |
| Page | Standard Variable | NUMERIC |  | Page |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Time | Standard Variable | CHARACTER |  | Time |
| Today | Standard Variable | DATE |  | Today |

## Business Logic

### Source (Source)

```genexus

&EtiquetaBobinaSDT = ObtenerSDTEtiquetaBobina.Udp(&BobinaId)

&BobinaNoserie = &EtiquetaBobinaSDT.BobinaNoSerie

//&linkURL='https://sdx.genexus.com/agetqrcode.aspx?'+&EtiquetaBobinaSDT.BobinaNoSerie
//&linkURL='https://barcode.tec-it.com/barcode.ashx?data='+&EtiquetaBobinaSDT.BobinaNoSerie + '&code=Code128'
//&QRImage.FromURL(&linkURL)

&QRImage = ObtenerBarCode.Udp(&EtiquetaBobinaSDT.BobinaNoSerie)

print printBlock1
```

### Rules (Rules)

```genexus
Parm(in:&BobinaId,in:&PDFNombre);
Output_File(&PDFNombre, 'PDF');
```

