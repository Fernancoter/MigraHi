# Procedure: RptPrensado

- **Module:** PrinterSD
- **Description:** Rpt Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EtiquetaBobinaSDT | Variable | GX_SDT |  | Etiqueta Bobina SDT |
| FajillasAlMolino | Variable | NUMERIC |  | Fajillas Al Molino |
| IsInMolino | Variable | Boolean |  | Is In Molino |
| PDFNombre | Parameter | VARCHAR | in | PDFNombre |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| SDTCarrera | Variable | GX_SDT |  | SDTCarrera |
| SDTCarreraItem | Variable | GX_SDT |  | SDTCarrera Item |
| SDTCarrete | Variable | GX_SDT |  | SDTCarrete |
| SDTCarreteCalidad | Variable | GX_SDT |  | SDTCarrete Calidad |
| SDTCarreteItem | Variable | GX_SDT |  | SDTCarrete Item |
| SDTPrensadoBobina | Variable | GX_SDT |  | SDTPrensado Bobina |
| SDTPrensadoBobinaItem | Variable | GX_SDT |  | SDTPrensado Bobina Item |
| SDTPrensadoResultado | Variable | GX_SDT |  | SDTPrensado Resultado |
| SDTProductoTerminado | Variable | GX_SDT |  | SDTProducto Terminado |
| SDTRptPrensado | Variable | GX_SDT |  | SDTRpt Prensado |
| InterrupcionHoraInicio | Variable | DATETIME |  | Interrupcion Hora Inicio |
| InterrupcionHoraFin | Variable | DATETIME |  | Interrupcion Hora Fin |
| InterrupcionMotivo | Variable | VARCHAR |  | Interrupcion Motivo |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
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
&SDTRptPrensado = DPSDTRptPrensado.Udp(&PrensadoId)
&SDTPrensadoResultado = DPPrensadoResultado.Udp(&PrensadoId)
&SDTProductoTerminado = DPProductoTerminado.Udp(&SDTRptPrensado.PrensadoProductoId)

header
	print pb_header
end

&SDTCarrera = CarreraDP.Udp(&PrensadoId)

For &SDTCarreraItem In &SDTCarrera
	
	&SDTPrensadoBobina = DPPrensadoBobinaSDT.Udp(&SDTCarreraItem.InicioPrensadoBobinaId)
	&SDTPrensadoBobinaItem = &SDTPrensadoBobina.Item(1)
	
	&EtiquetaBobinaSDT = ObtenerSDTEtiquetaBobina.Udp(&SDTPrensadoBobinaItem.BobinaId)
	
	&SDTCarrete = CarreteDP.Udp(&SDTCarreraItem.CarreraId, Orden.Ascendente)
	
	&FajillasAlMolino = 0
	
	For &SDTCarreteItem In &SDTCarrete
		&IsInMolino = &SDTCarreteItem.CarreteEstado = EstadoCarrete.Molino
		If &IsInMolino
			&FajillasAlMolino += &SDTProductoTerminado.ProductoTerminadoCarreteMillar
		EndIf
		
		Do Case
			Case &SDTCarreteItem.CarreteNoLinea = 1
				&SDTCarreteCalidad.SDTCarreteCalidad1 = iif(&IsInMolino,"X",chr(10003))
			Case &SDTCarreteItem.CarreteNoLinea = 2
				&SDTCarreteCalidad.SDTCarreteCalidad2 = iif(&IsInMolino,"X",chr(10003))
			Case &SDTCarreteItem.CarreteNoLinea = 3
				&SDTCarreteCalidad.SDTCarreteCalidad3 = iif(&IsInMolino,"X",chr(10003))
			Case &SDTCarreteItem.CarreteNoLinea = 4
				&SDTCarreteCalidad.SDTCarreteCalidad4 = iif(&IsInMolino,"X",chr(10003))
			Case &SDTCarreteItem.CarreteNoLinea = 5
				&SDTCarreteCalidad.SDTCarreteCalidad5 = iif(&IsInMolino,"X",chr(10003))
			Case &SDTCarreteItem.CarreteNoLinea = 6
				&SDTCarreteCalidad.SDTCarreteCalidad6 = iif(&IsInMolino,"X",chr(10003))
		EndCase
		
	EndFor
	
	&SDTCarreteCalidad.CarretePaletSerie = &SDTCarreteItem.CarretePaletSerie
	
	&SDTCarreteCalidad.SDTCarreteCalidadFajillasMolino = &FajillasAlMolino
	
	print pb_prensado_body
	
EndFor

print Interrupcion_header
for each 
	where PrensadoId = &PrensadoId
	&InterrupcionHoraInicio  = InterrupcionHoraInicio
	&InterrupcionHoraFin = InterrupcionHoraFin
	&InterrupcionMotivo = InterrupcionMotivo
	
	print Interrupcion_Body
	
when none
	
endfor


print pb_footer
```

### Rules (Rules)

```genexus
Parm(in:&PrensadoId,in:&PDFNombre);
Output_File(&PDFNombre, 'PDF');
```

