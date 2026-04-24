# Procedure: GuardarPrensado

- **Module:** Produccion
- **Description:** Guardar Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Correcto | Parameter | Boolean | out | Correcto |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| SDTPrensadoItem | Parameter | GX_SDT | in | SDTPrensado Item |
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
	&Correcto = false
	
	&PrensadoId = &SDTPrensadoItem.PrensadoId
	&Prensado.Load(&PrensadoId)
	&Prensado.PrensadoFecha = &SDTPrensadoItem.PrensadoFecha
	
	//Llaves foraneas
	&Prensado.PrensadoPrensaId = &SDTPrensadoItem.PrensadoPrensaId
	&Prensado.PrensadoTurnoId = &SDTPrensadoItem.PrensadoTurnoId    
	&Prensado.PrensadoProductoId = &SDTPrensadoItem.PrensadoProductoId
	&Prensado.PrensadoOperadorId = &SDTPrensadoItem.PrensadoOperadorId 
	&Prensado.PrensadoTroquelId = &SDTPrensadoItem.PrensadoTroquelId
	
	//Estado y Progreso
	&Prensado.PrensadoEstado = &SDTPrensadoItem.PrensadoEstado
	&Prensado.PrensadoHoraIniciaProceso = &SDTPrensadoItem.PrensadoHoraIniciaProceso
	&Prensado.PrensadoHoraFinProceso = &SDTPrensadoItem.PrensadoHoraFinProceso
	&Prensado.PrensadoMeta = &SDTPrensadoItem.PrensadoMeta
	&Prensado.PrensadoMotivoAnticipado = &SDTPrensadoItem.PrensadoMotivoAnticipado
	
	//Levas
	&Prensado.PrensadoLevasUnidadMedida = &SDTPrensadoItem.PrensadoLevasUnidadMedida
	&Prensado.PrensadoLevasKgEntrada = &SDTPrensadoItem.PrensadoLevasKgEntrada
	&Prensado.PrensadoLevasKgSalida = &SDTPrensadoItem.PrensadoLevasKgSalida
	&Prensado.PrensadoLevasGradosEntrada = &SDTPrensadoItem.PrensadoLevasGradosEntrada
	&Prensado.PrensadoLevasGradosSalida = &SDTPrensadoItem.PrensadoLevasGradosSalida
	
	//Rodillos
	&Prensado.PrensadoRodillosUnidadMedida = &SDTPrensadoItem.PrensadoRodillosUnidadMedida
	&Prensado.PrensadoRodillosKgEntrada = &SDTPrensadoItem.PrensadoRodillosKgEntrada
	&Prensado.PrensadoRodillosKgSalida = &SDTPrensadoItem.PrensadoRodillosKgSalida
	&Prensado.PrensadoRodillosGradosEntrada = &SDTPrensadoItem.PrensadoRodillosGradosEntrada 
	&Prensado.PrensadoRodillosGradosSalida = &SDTPrensadoItem.PrensadoRodillosGradosSalida
	
	&Prensado.Save()
	
	if(&Prensado.Success())
		commit
		&Correcto = true
	endif
```

### Rules (Rules)

```genexus
parm(in:&SDTPrensadoItem,out:&Correcto);
```

