# Procedure: CarreteReportMain

- **Module:** PrinterSD
- **Description:** Carrete Report Main
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EtiquetaCarretaSDT | Variable | GX_SDT |  | Etiqueta Carreta SDT |
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| EtiquetaCarreraSDT | Variable | GX_SDT |  | Etiqueta Carrera SDT |
| linkURL | Variable | VARCHAR |  | link URL |
| QRImage | Variable | BITMAP |  | QRImage |
| CarreraId | Parameter | NUMERIC | in | Carrera Id |
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
if(&CarreraId>0)
	for each DB.Carrete
		Where CarreteCarreraId = &CarreraId
		
		&EtiquetaCarretaSDT = PrinterSD.ObtenerSDTEtiquetaCarrete.Udp(CarreteId)
		&EtiquetaCarreraSDT.EtiquetaCarreteSDT.Add(&EtiquetaCarretaSDT)
	endfor
else
	&EtiquetaCarretaSDT = ObtenerSDTEtiquetaCarrete.Udp(&CarreteId)
	&EtiquetaCarreraSDT.EtiquetaCarreteSDT.Add(&EtiquetaCarretaSDT)
endif

For &EtiquetaCarretaSDT in &EtiquetaCarreraSDT.EtiquetaCarreteSDT
//	&linkURL='https://barcode.tec-it.com/barcode.ashx?data='+&EtiquetaCarretaSDT.CarreteNoSerie + '&code=Code128'
	//&linkURL='https://sdx.genexus.com/agetqrcode.aspx?'+&EtiquetaCarretaSDT.CarreteNoSerie
	
//	&QRImage.FromURL(&linkURL)

	&QRImage = PrinterSD.ObtenerBarCode.Udp(&EtiquetaCarretaSDT.CarreteNoSerie)

	print printBlock1
Endfor
```

### Rules (Rules)

```genexus
Parm(in:&CarreteId,in:&CarreraId,in:&PDFNombre);
Output_File(&PDFNombre, 'PDF');
```

