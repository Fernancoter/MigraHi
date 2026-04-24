# Procedure: BobinaReportMainMulti

- **Module:** PrinterSD
- **Description:** Bobina Report Main Multi
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| EtiquetaBobinaSDT | Variable | GX_SDT |  | Etiqueta Bobina SDT |
| linkURL | Variable | VARCHAR |  | link URL |
| NamePDF | Variable | VARCHAR |  | Name PDF |
| PDFNombre | Parameter | VARCHAR | in | PDFNombre |
| QRImage | Variable | BITMAP |  | QRImage |
| BobinaNoserie | Variable | VARCHAR |  | Bobina No Serie |
| CollectionBobinaNoSerie | Parameter | VARCHAR | in | Bobina No Serie |
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



for each
	where BobinaNoSerie in &CollectionBobinaNoSerie
	
	
	
	&EtiquetaBobinaSDT = ObtenerSDTEtiquetaBobina.Udp(BobinaId)
	
	&BobinaNoserie = &EtiquetaBobinaSDT.BobinaNoSerie
	
	//&linkURL='https://sdx.genexus.com/agetqrcode.aspx?'+&EtiquetaBobinaSDT.BobinaNoSerie
	//&linkURL='https://barcode.tec-it.com/barcode.ashx?data='+&EtiquetaBobinaSDT.BobinaNoSerie + '&code=Code128'
	//&QRImage.FromURL(&linkURL)
	
	&QRImage = ObtenerBarCode.Udp(&EtiquetaBobinaSDT.BobinaNoSerie)
	
	print printBlock1

endfor
```

### Rules (Rules)

```genexus
Parm(in:&CollectionBobinaNoSerie,in:&PDFNombre);
Output_File(&PDFNombre, 'PDF');
```

