# Procedure: PaletReport

- **Module:** PrinterSD
- **Description:** Palet Report
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PaletId | Parameter | NUMERIC | in | Palet Id |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletProductoId | Variable | NUMERIC |  | Palet Producto Id |
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

&Palet.Load(&PaletId)
&PaletProductoId = &Palet.PaletProductoId

do 'ProductoTerminado'

Sub 'ProductoTerminado'
	For Each DB.ProductoTerminado
		where ProductoTerminadoId > 0
		where TerminadoProductoId > 0
		where TerminadoProductoId = &PaletProductoId

                if(ProductoTerminadoConEtiqueta or ProductoTerminadoEtiquetable)
			if(ProductoTerminadoCodigoSAP.IsEmpty())
				PaletReportMain.Call(&PaletId, &PDFNombre)
			else
				PaletReportSAP.Call(&PaletId, &PDFNombre)
			endif
	        else
			PaletReportMain.Call(&PaletId, &PDFNombre)
		endif
	EndFor
EndSub
```

### Rules (Rules)

```genexus
Parm(in:&PaletId, in:&PDFNombre);
```

