# Procedure: GenerarPaletNo

- **Module:** Produccion
- **Description:** Generar Palet No
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Inventario | Variable | GX_BUSCOMP |  | Inventario |
| InventarioFecha | Variable | DATETIME |  | Inventario Fecha |
| InventarioItem | Variable | GX_SDT |  | Inventario Item |
| PaletNo | Parameter | NUMERIC | out | Palet No |
| PrenId | Variable | NUMERIC |  | Pren Id |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| ConfiguracionValor | Variable | LONGVARCHAR |  | Configuracion Valor |
| AuxPaletNo | Variable | NUMERIC |  | Palet No |
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
        
	&PaletNo = 0
	&InventarioItem = SDInventarioItem.Udp(&ProductoId)
	
	&ConfiguracionValor =  ObtenerConfiguracion.Udp(!'PaletNo_' + &PrensaId.ToString().Trim() +'_'+ &InventarioItem.InventarioFechaHora.Day().ToString().Trim()+'_' +&InventarioItem.InventarioFechaHora.Month().ToString().Trim() + '_' +&InventarioItem.InventarioFechaHora.Year().ToString().Trim() )
	&PaletNo = &ConfiguracionValor.ToNumeric()
	
	if(&PaletNo>0)
		
		&AuxPaletNo = &PaletNo + 1	
		&ConfiguracionValor = &AuxPaletNo.ToString().Trim()
		GuardarConfiguracion.Call(!'PaletNo_' + &PrensaId.ToString().Trim() +'_'+ &InventarioItem.InventarioFechaHora.Day().ToString().Trim()+'_' +&InventarioItem.InventarioFechaHora.Month().ToString().Trim() + '_' +&InventarioItem.InventarioFechaHora.Year().ToString().Trim(),  &ConfiguracionValor)
	else
		
		for each DB.Palet
			where PaletId > 0
			where PaletTipo = TipoPalet.Interno
			where PaletPrensaId = &PrensaId
			where PaletHoraInicioEnsamble > &InventarioItem.InventarioFechaHora
			
			
			
			&PaletNo += 1	
		endfor
		
	endif
```

### Rules (Rules)

```genexus
parm(in:&PrensaId, in:&ProductoId, out:&PaletNo);
```

