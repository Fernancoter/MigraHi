# Procedure: RptExtrusion

- **Module:** PrinterSD
- **Description:** Rpt Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTExtrusionResultado | Variable | GX_SDT |  | SDTExtrusion Resultado |
| ABobinaKg | Variable | NUMERIC |  | Bobina Kg |
| ABobinaMermaKg | Variable | NUMERIC |  | Bobina Merma Kg |
| BBobinaKg | Variable | NUMERIC |  | Bobina Kg |
| BBobinaMermaKg | Variable | NUMERIC |  | Bobina Merma Kg |
| BobinaKg | Variable | NUMERIC |  | Bobina Kg |
| BobinaMermaKg | Variable | NUMERIC |  | Bobina Merma Kg |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| PDFNombre | Parameter | VARCHAR | in | PDFNombre |
| SDTBobina | Variable | GX_SDT |  | SDTBobina |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| SDTPrensadoResultado | Variable | GX_SDT |  | SDTPrensado Resultado |
| SDTRptExtrusion | Variable | GX_SDT |  | SDTRpt Extrusion |
| InterrupcionHoraInicio | Variable | DATETIME |  | Interrupcion Hora Inicio |
| InterrupcionHoraFin | Variable | DATETIME |  | Interrupcion Hora Fin |
| InterrupcionMotivo | Variable | VARCHAR |  | Interrupcion Motivo |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
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
&SDTRptExtrusion = DPSDTRptExtrusion.Udp(&ExtrusionId)
&SDTExtrusionResultado = DPExtrusionResultado.Udp(&ExtrusionId)
//debugger.Call(niveldebug.Informativo, &Pgmname, &SDTRptExtrusion.ToJson())
header
	
	print pb_header
	
end

&SDTBobina = BobinaDP.Udp(&ExtrusionId, '', 0)
//debugger.Call(niveldebug.Informativo, &Pgmname, &SDTBobina.ToJson())

print pb_header_bobina_a

For &SDTBobinaItem In &SDTBobina
	
	Do Case
		
		Case &SDTBobinaItem.BobinaOrigen = OrigenBobina.A
			print If detail
			print pb_body_bobina_a
			&ABobinaKg += &SDTBobinaItem.BobinaKg
			&ABobinaMermaKg += &SDTBobinaItem.BobinaMermaKg
	EndCase
	
EndFor

&SDTRptExtrusion.ABobinaTotalKgTexto = &ABobinaKg.ToString().Trim()

print pb_foot_bobina_a

print pb_header_bobina_b

For &SDTBobinaItem In &SDTBobina
	
	Do Case
		
		Case &SDTBobinaItem.BobinaOrigen = OrigenBobina.B
			print If detail
			print pb_body_bobina_b
			&BBobinaKg += &SDTBobinaItem.BobinaKg
			&BBobinaMermaKg += &SDTBobinaItem.BobinaMermaKg
	EndCase
	
EndFor

&SDTRptExtrusion.BBobinaTotalKgTexto = &BBobinaKg.ToString().Trim()

print pb_foot_bobina_b


print Interrupcion_header
for each 
	where ExtrusionId = &ExtrusionId
	&InterrupcionHoraInicio  = InterrupcionHoraInicio
	&InterrupcionHoraFin = InterrupcionHoraFin
	&InterrupcionMotivo = InterrupcionMotivo
	
	print Interrupcion_Body
	
when none

endfor

	
	




&BobinaKg = &ABobinaKg + &BBobinaKg
&BobinaMermaKg = &ABobinaMermaKg + &BBobinaMermaKg

&SDTRptExtrusion.KgUtilesTexto = &BobinaKg.ToFormattedString()
&SDTRptExtrusion.kgMermaTexto = &BobinaMermaKg.ToFormattedString()

print pb_footer
```

### Rules (Rules)

```genexus
Parm(in:&ExtrusionId,in:&PDFNombre);
Output_File(&PDFNombre, 'PDF');
```

