# Procedure: ObtenerSDTEtiquetaPalet

- **Module:** PrinterSD
- **Description:** Obtener SDTEtiqueta Palet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EtiquetaPaletSDT | Parameter | GX_SDT | out | Etiqueta Palet SDT |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| PaletProductoId | Variable | NUMERIC |  | Palet Producto Id |
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


For each	
	Where PaletId = &PaletId
	
	&EtiquetaPaletSDT.PaletProductoNombre = PaletProductoNombre
	&EtiquetaPaletSDT.PaletNoSerie = PaletNoSerie
	&EtiquetaPaletSDT.PaletNo = PaletNo
	&EtiquetaPaletSDT.PaletNoCarretes = DB.DB.PaletNoCarretes
	&EtiquetaPaletSDT.PaletProductoDescripcion = PaletProductoDescripcion
	&EtiquetaPaletSDT.PaletHoraFinEnsamble = PaletHoraFinEnsamble
	&EtiquetaPaletSDT.PaletPrensaNombre = PaletPrensaNombre
	
	&PaletProductoId = PaletProductoId
	Do 'ObtenerDatosProductoTerminado'	
EndFor

Sub 'ObtenerDatosProductoTerminado'
	For Each
		Where TerminadoProductoId = &PaletProductoId
		&EtiquetaPaletSDT.ProductoTerminadoPaletMillar = ProductoTerminadoPaletMillar
		
		if(ProductoTerminadoCodigoSAP.IsEmpty())
			&EtiquetaPaletSDT.ProductoTerminadoCodigoSAP = 'N/A'
		else
			&EtiquetaPaletSDT.ProductoTerminadoCodigoSAP = ProductoTerminadoCodigoSAP
		endif
	When None
		&EtiquetaPaletSDT.ProductoTerminadoPaletMillar = 0
		&EtiquetaPaletSDT.ProductoTerminadoCodigoSAP = 'N/A'
	EndFor
EndSub
```

### Rules (Rules)

```genexus
parm(in:&PaletId, out:&EtiquetaPaletSDT);
```

