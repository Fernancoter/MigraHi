# Procedure: SDRetiquetarPallet

- **Module:** Produccion
- **Description:** SDRetiquetar Pallet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteId | Variable | NUMERIC |  | Carrete Id |
| Compatible | Variable | Boolean |  | Compatible |
| EPId | Variable | NUMERIC |  | EPId |
| Mensaje | Variable | GX_SDT |  | Mensaje |
| Mensajes | Variable | GX_SDT |  | Mensajes |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| PEtiqueta | Variable | GX_BUSCOMP |  | PEtiqueta |
| PEtiquetaNombre | Variable | VARCHAR |  | PEtiqueta Nombre |
| ProductoEtiquetaId | Parameter | NUMERIC | in | Producto Etiqueta Id |
| ProductoNombre | Variable | VARCHAR |  | Producto Nombre |
| Str1 | Variable | CHARACTER |  | Str1 |
| Str2 | Variable | CHARACTER |  | Str2 |
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
       &Palet.PaletProductoId = &ProductoEtiquetaId
       &Palet.PaletEstatus= EstatusPalet.Etiquetando
       &Palet.Save()
       
       if(&Palet.Success())
	     commit
	     do 'EtiquetandoCarretes'
       endif

       Sub 'EtiquetandoCarretes'
	       
	       for each DB.PaletCarrete
		       where PaletId = &PaletId
		       where CarreteId > 0
		       where CarreteEstado in (EstadoCarrete.EnPalet)
		       &CarreteId = CarreteId
		       SetEstadoCarrete.Call(&CarreteId, EstadoCarrete.Etiquetar, false)
	       endfor
       EndSub
```

### Rules (Rules)

```genexus
parm(in:&PaletId, in:&ProductoEtiquetaId);
```

