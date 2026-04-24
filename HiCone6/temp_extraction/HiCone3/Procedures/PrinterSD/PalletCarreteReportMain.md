# Procedure: PalletCarreteReportMain

- **Module:** PrinterSD
- **Description:** Pallet Carrete Report Main
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EtiquetaCarretaSDT | Variable | GX_SDT |  | Etiqueta Carreta SDT |
| CarreteId | Variable | NUMERIC |  | Carrete Id |
| EtiquetaCarreraSDT | Variable | GX_SDT |  | Etiqueta Carrera SDT |
| linkURL | Variable | VARCHAR |  | link URL |
| QRImage | Variable | BITMAP |  | QRImage |
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| PDFNombre | Parameter | VARCHAR | in | PDFNombre |
| PaletId | Parameter | NUMERIC | in | Palet Id |
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
if(&PaletId > 0)
	for each DB.PaletCarrete
		where DB.PaletId = &PaletId
		where CarreteId > 0
		&CarreteId = CarreteId
		
		&EtiquetaCarretaSDT = ObtenerSDTEtiquetaCarrete.Udp(&CarreteId)
		&EtiquetaCarreraSDT.EtiquetaCarreteSDT.Add(&EtiquetaCarretaSDT)
	endfor
endif

For &EtiquetaCarretaSDT in &EtiquetaCarreraSDT.EtiquetaCarreteSDT
//	&linkURL='https://barcode.tec-it.com/barcode.ashx?data='+&EtiquetaCarretaSDT.CarreteNoSerie + '&code=Code128'
	//&linkURL='https://sdx.genexus.com/agetqrcode.aspx?'+&EtiquetaCarretaSDT.CarreteNoSerie
	
//	&QRImage.FromURL(&linkURL)

	&QRImage = ObtenerBarCode.Udp(&EtiquetaCarretaSDT.CarreteNoSerie)

	print printBlock1
Endfor
```

### Rules (Rules)

```genexus
Parm(in:&PaletId,in:&PDFNombre);
Output_File(&PDFNombre, 'PDF');
```

