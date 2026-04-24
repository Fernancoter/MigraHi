# Procedure: SDEtiquetadoOperador

- **Module:** Produccion
- **Description:** SDEtiquetado Operador
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| Compatible | Variable | Boolean |  | Compatible |
| EOId | Variable | NUMERIC |  | EOId |
| EtiquetadoOperador | Variable | GX_BUSCOMP |  | Etiquetado Operador |
| EtiquetadoPalletId | Variable | NUMERIC |  | Etiquetado Pallet Id |
| Etiquetadora | Parameter | VARCHAR | in | Etiquetadora |
| isOK | Parameter | Boolean | out | is OK |
| ObservacionCarrete | Parameter | VARCHAR | in | Observacion Carrete |
| OperadorId | Variable | NUMERIC |  | Operador Id |
| OrdenEtiquetadoId | Parameter | NUMERIC | in | Orden Etiquetado Id |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| VoBo | Parameter | Boolean | in | Vo Bo |
| MotivoMolinoEtiquetado | Parameter | VARCHAR | in | Motivo Molino Etiquetado |
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
       &isOK = false

       //Registrar Etiquetado Operador
       for each DB.EtiquetadoOperador
	       where DB.EtiquetadoOperadorId > 0
	       where CarreteEtiquetadoId = &CarreteId
	       where OrdenEtiquetadoId = &OrdenEtiquetadoId
	       &EOId = EtiquetadoOperadorId

	       &EtiquetadoOperador.Load(&EOId)
	       &EtiquetadoOperador.EtiquetadoOperadorFechaHora = Now()
	       &EtiquetadoOperador.EtiquetadoOperadorVoBoCarrete = &VoBo
	       &EtiquetadoOperador.EtiquetadoOperadorLineaEtiquetadora = &Etiquetadora
	       &EtiquetadoOperador.EtiquetadoOperadorObservacionCarrete = &ObservacionCarrete
		   &EtiquetadoOperador.EtiquetadoOperadorMotivoMolino = &MotivoMolinoEtiquetado
	       &EtiquetadoOperador.Save()

	       if(&EtiquetadoOperador.Success())
		   commit
		   &isOK = true
	       endif

	       Exit
	when none

	       &EtiquetadoOperador = new()
	       &EtiquetadoOperador.CarreteEtiquetadoId = &CarreteId
	       &EtiquetadoOperador.OrdenEtiquetadoId = &OrdenEtiquetadoId
	       &EtiquetadoOperador.PalletEtiquetadoId = &PaletId
	       &EtiquetadoOperador.EtiquetadoOperadorObservacionCarrete = &ObservacionCarrete
		   &EtiquetadoOperador.EtiquetadoOperadorMotivoMolino = &MotivoMolinoEtiquetado
	       &EtiquetadoOperador.EtiquetadoOperadorFechaHora = Now()
	       &EtiquetadoOperador.EtiquetadoOperadorLineaEtiquetadora = &Etiquetadora
	       &EtiquetadoOperador.EtiquetadoOperadorVoBoCarrete = &VoBo
	       &EtiquetadoOperador.Save()

	       if(&EtiquetadoOperador.Success())
		   commit
		   &isOK = true
	       endif

        endfor
```

### Rules (Rules)

```genexus
parm(in:&CarreteId, in:&PaletId, in:&OrdenEtiquetadoId, in:&Etiquetadora, in:&ObservacionCarrete, in:&VoBo, in:&MotivoMolinoEtiquetado, out:&isOK);
```

