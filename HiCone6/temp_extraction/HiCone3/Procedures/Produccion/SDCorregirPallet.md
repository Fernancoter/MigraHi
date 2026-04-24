# Procedure: SDCorregirPallet

- **Module:** Produccion
- **Description:** SDCorregir Pallet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DeletePaletCarrete | Variable | GX_BUSCOMP |  | Delete Palet Carrete |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| Carretes | Parameter | NUMERIC | in | Carretes |
| PaletCarretes | Variable | NUMERIC |  | Palet Carretes |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PCId | Variable | NUMERIC |  | PCId |
| CarreteId | Variable | NUMERIC |  | Carrete Id |
| Password | Parameter | VARCHAR | in | Password |
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
     &PaletCarretes = &Palet.PaletNoCarretes
     &Palet.PaletNoCarretes = &Carretes
     &Palet.Save()
     
     if(&Palet.Success())
	     commit
     endif
	
     if(&PaletCarretes > 0)
	     for each DB.PaletCarrete
		     where PaletCarreteId > 0
		     where CarreteId > 0
		     where PaletId = &PaletId
		     &CarreteId = CarreteId
		     &PCId = PaletCarreteId
		     
		     //Eliminar Referencia
		     &DeletePaletCarrete.Load(&PCId)
		     &DeletePaletCarrete.Delete()
		     commit
		     
		     //Carrete en Pallet Desconocido
		     SetEstadoCarrete.Call(&CarreteId, EstadoCarrete.EnPaletDesconocido, false)
	     endfor
     endif
```

### Rules (Rules)

```genexus
parm(in:&PaletId,in:&Carretes,in:&Password );
```

