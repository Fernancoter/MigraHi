# Procedure: DesvincularPallet

- **Module:** Produccion
- **Description:** Desvincular Pallet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DeleteEmbarquePallet | Variable | GX_BUSCOMP |  | Delete Embarque Pallet |
| DeletePaletExterno | Variable | GX_BUSCOMP |  | Delete Palet Externo |
| EmbarqueDetalle | Variable | GX_BUSCOMP |  | Embarque Detalle |
| EmbarqueDetalleId | Parameter | NUMERIC | in | Embarque Detalle Id |
| NoPallet | Parameter | VARCHAR | in | No Pallet |
| PaletId | Variable | NUMERIC |  | Palet Id |
| PaletTipo | Variable | VARCHAR |  | Palet Tipo |
| PaletEstatus | Variable | VARCHAR |  | Palet Estatus |
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
	
	//Eliminar referencia EmbarquePalet
	&DeleteEmbarquePallet.Load(&EmbarqueDetalleId, &NoPallet)
	&DeleteEmbarquePallet.Delete()
	commit
	
	//Descontar Pallet desvinculado
	&EmbarqueDetalle.Load(&EmbarqueDetalleId)
	&EmbarqueDetalle.EmbarqueDetalleEmbarcado = false
	&EmbarqueDetalle.Save()
	commit
	
	
	//Cambiar estatus del Palet (Embarcado -> Terminado)
	for each DB.Palet
		where PaletId > 0
		where PaletNoSerie.Trim() = &NoPallet.Trim()
		&PaletId = PaletId
		&PaletEstatus = PaletEstatus
		&PaletTipo = PaletTipo
		
		Do Case
			Case  &PaletTipo = TipoPalet.Externo
			      do 'EliminarPExterno'
			      
			Case  &PaletTipo = TipoPalet.Interno
			      
			      if(&PaletEstatus = EstatusPalet.Embarcado)
				      SetEstatusPalet.Call(&PaletId,EstatusPalet.Terminado)
			      endif
		EndCase

		Exit
	endfor


        Sub 'EliminarPExterno'
		&DeletePaletExterno.Load(&PaletId)
		&DeletePaletExterno.Delete()
		Commit
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&EmbarqueDetalleId, in:&NoPallet);
```

