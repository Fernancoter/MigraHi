# Procedure: SDOrdenEtiquetado

- **Module:** Produccion
- **Description:** SDOrden Etiquetado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AuxPaletId | Variable | NUMERIC |  | Palet Id |
| CarreteMillar | Variable | NUMERIC |  | Carrete Millar |
| CarretesEtiquetado | Variable | NUMERIC |  | Carretes Etiquetado |
| CarretesMolino | Variable | NUMERIC |  | Carretes Molino |
| OrdenEtiquetado | Variable | GX_BUSCOMP |  | Orden Etiquetado |
| OrdenEtiquetadoId | Parameter | NUMERIC | in | Orden Etiquetado Id |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletId | Variable | NUMERIC |  | Palet Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| ProductoTerminado | Variable | GX_BUSCOMP |  | Producto Terminado |
| SDTOrdenEtiquetado | Parameter | GX_SDT | out | SDTOrden Etiquetado |
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
	
		do 'CarretesRegistrados'
		
		&OrdenEtiquetado.Load(&OrdenEtiquetadoId)
		
		&SDTOrdenEtiquetado = New()
		&SDTOrdenEtiquetado.OrdenEtiquetadoId = &OrdenEtiquetadoId
		&SDTOrdenEtiquetado.OrdenEtiquetadoFechaInicio = &OrdenEtiquetado.OrdenEtiquetadoFechaInicio
		&SDTOrdenEtiquetado.OrdenEtiquetadoFechaTermina = &OrdenEtiquetado.OrdenEtiquetadoFechaTermina
		&SDTOrdenEtiquetado.OrdenEtiquetadoPiezasBuenas = &CarretesEtiquetado
		&SDTOrdenEtiquetado.OrdenEtiquetadoPiezasMolino = &CarretesMolino
		&SDTOrdenEtiquetado.OrdenEtiquetadoEstado = &OrdenEtiquetado.OrdenEtiquetadoEstado
		&SDTOrdenEtiquetado.TurnoEtiquetadoId =  &OrdenEtiquetado.TurnoEtiquetadoId
		&SDTOrdenEtiquetado.TurnoEtiquetadoNombre = &OrdenEtiquetado.TurnoEtiquetadoNombre
		&SDTOrdenEtiquetado.OperadorEtiquetadoId = &OrdenEtiquetado.OperadorEtiquetadoId

		Sub 'CarretesRegistrados'

                        &PaletId = 0
			&CarretesMolino = 0
			&CarretesEtiquetado = 0
			
			for each DB.EtiquetadoOperador
				Order PalletEtiquetadoId
				where EtiquetadoOperadorId > 0
				where OrdenEtiquetadoId = &OrdenEtiquetadoId
				&AuxPaletId = PalletEtiquetadoId
				
				if(&AuxPaletId <> &PaletId)
					&PaletId = &AuxPaletId
					do 'ProductoTerminado'
				endif
			
				if(EtiquetadoOperadorVoBoCarrete)
					&CarretesEtiquetado += &CarreteMillar
				else
					&CarretesMolino += &CarreteMillar
				endif
			endfor
			
		EndSub
		
		Sub 'ProductoTerminado'
			
			&Palet.Load(&PaletId)
			&ProductoId = &Palet.PaletProductoId
			&CarreteMillar = 0
			
			for each DB.ProductoTerminado
				where ProductoTerminadoId > 0
				where ProductoTerminadoConEtiqueta = true
				where TerminadoProductoId = &ProductoId
	                        &CarreteMillar = ProductoTerminadoCarreteMillar
				Exit
			endfor
		EndSub
```

### Rules (Rules)

```genexus
parm(in:&OrdenEtiquetadoId, out:&SDTOrdenEtiquetado);
```

