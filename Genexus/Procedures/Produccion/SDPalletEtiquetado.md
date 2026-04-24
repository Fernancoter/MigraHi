# Procedure: SDPalletEtiquetado

- **Module:** Produccion
- **Description:** SDPalletEtiquetado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Compatible | Variable | Boolean |  | Compatible |
| Mensaje | Variable | GX_SDT |  | Mensaje |
| Mensajes | Variable | GX_SDT |  | Mensajes |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletId | Variable | NUMERIC |  | Palet Id |
| PaletItem | Variable | GX_SDT |  | Palet Item |
| ProductoEtiquetaId | Variable | NUMERIC |  | Producto Etiqueta Id |
| SDTPalet | Parameter | GX_SDT | out | SDTPalet |
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
       &SDTPalet.Clear()
       
       for each DB.ProductoTerminado
	       where WWPBaseObjects.ProductoTerminadoId > 0
	       where TerminadoProductoActivo = true
	       where ProductoTerminadoConEtiqueta = true
	       &ProductoEtiquetaId = TerminadoProductoId
	       
	       for each DB.Palet
		      where PaletId > 0
		      where PaletEstatus in (EstatusPalet.Terminado)
		      where PaletProductoId = &ProductoEtiquetaId
		      
		      &PaletItem = New()
		      &PaletItem.PaletId = PaletId
		      &PaletItem.PaletNoSerie = PaletNoSerie
		      &PaletItem.PaletNo = PaletNo
		      &PaletItem.PaletNoCarretes = PaletNoCarretes
		      &PaletItem.PaletOperadorId = PaletOperadorId
		      &PaletItem.PaletProductoId = PaletProductoId
		      &PaletItem.PaletPrensaId = PaletPrensaId
		      &PaletItem.PaletProductoNombre = PaletProductoNombre
		      &PaletItem.PaletHoraInicioEnsamble = PaletHoraInicioEnsamble
                      &PaletItem.PaletHoraFinEnsamble = PaletHoraFinEnsamble
		      &PaletItem.PaletEstatus = PaletEstatus
		      &PaletItem.PaletPrensadoId = PaletPrensadoId
		      &PaletItem.PaletPrensadoFinId = PaletPrensadoFinId
		      &SDTPalet.Add(&PaletItem)
	       endfor     
       endfor
```

### Rules (Rules)

```genexus
parm(out:&SDTPalet);
```

