# Procedure: LlenarLoteReporte

- **Module:** Embarques
- **Description:** Llenar Lote Reporte
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EmbarqueId | Parameter | NUMERIC | in | Embarque Id |
| EmbarqueDetalleProducto | Variable | VARCHAR |  | Embarque Detalle Producto |
| EmbarqueDetalleId | Variable | NUMERIC |  | Embarque Detalle Id |
| EmbarquePalletNoPallet | Variable | VARCHAR |  | Embarque Pallet No Pallet |
| NumFila | Variable | NUMERIC |  | Num Fila |
| LoteReporteNumero | Variable | NUMERIC |  | Lote Reporte Numero |
| FilasLoteReporte | Parameter | NUMERIC | in | Filas Lote Reporte |
| i | Variable | NUMERIC |  | i |
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
	Where EmbarqueId = &EmbarqueId
	Where LoteReporteId > 0
	delete
EndFor

For Each
	Where EmbarqueId = &EmbarqueId
	&EmbarqueDetalleProducto = EmbarqueDetalleProducto
	&EmbarqueDetalleId = EmbarqueDetalleId
	Do 'LenarDetallePallet'
EndFor

Sub 'LenarDetallePallet'
	
	&LoteReporteNumero += 1
	
	New
		LoteReporteDato = &EmbarqueDetalleProducto
		LoteReporteNumero = &LoteReporteNumero
		EmbarqueId = &EmbarqueId
	endnew
	
	&NumFila = 1
	
	For Each

		Where EmbarqueDetalleId = &EmbarqueDetalleId
		
		&EmbarquePalletNoPallet = EmbarquePalletNoPallet
		&NumFila +=1
		&LoteReporteNumero += 1
		
		If &NumFila > &FilasLoteReporte
			
			&NumFila = 2
			
			New
				LoteReporteDato = &EmbarqueDetalleProducto
				LoteReporteNumero = &LoteReporteNumero
				EmbarqueId = &EmbarqueId
			endnew
			
			&LoteReporteNumero += 1
			
			New
				LoteReporteDato = &EmbarquePalletNoPallet
				LoteReporteNumero = &LoteReporteNumero
				EmbarqueId = &EmbarqueId
			endnew
			
		Else
			
			New
				LoteReporteDato = &EmbarquePalletNoPallet
				LoteReporteNumero = &LoteReporteNumero
				EmbarqueId = &EmbarqueId
			endnew
			
		EndIf
		
	EndFor

	If mod(&NumFila, &FilasLoteReporte) <> 0
		
		Do while &NumFila < &FilasLoteReporte
			&LoteReporteNumero += 1
			New
				LoteReporteDato.SetNull()
				LoteReporteNumero = &LoteReporteNumero
				EmbarqueId = &EmbarqueId
			endnew
			
			&NumFila += 1
			
		enddo
		
	EndIf

EndSub
```

### Rules (Rules)

```genexus
parm(In:&EmbarqueId, In:&FilasLoteReporte);
```

