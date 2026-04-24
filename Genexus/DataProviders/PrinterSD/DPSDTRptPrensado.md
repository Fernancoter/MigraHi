# DataProvider: DPSDTRptPrensado

- **Module:** PrinterSD
- **Description:** DPSDTRpt Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | inout | Prensado Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTRptPrensado
Where PrensadoId = &PrensadoId
{
	PrensadoId  = PrensadoId 
	PrensadoFecha  = PrensadoFecha 
	PrensadoPrensaId  = PrensadoPrensaId 
	PrensadoPrensaNombre  = PrensadoPrensaNombre 
	PrensadoTurnoId  = PrensadoTurnoId 
	PrensadoTurnoNombre  = PrensadoTurnoNombre 
	PrensadoProductoId  = PrensadoProductoId 
	PrensadoProductoNombre  = PrensadoProductoNombre 
	PrensadoProductoTipoMaterial  = PrensadoProductoTipoMaterial 
	PrensadoOperadorId  = PrensadoOperadorId 
	PrensadoOperadorNombre  = PrensadoOperadorNombre 
	PrensadoBobinaMermaKg  = PrensadoBobinaMermaKg 
	PrensadoEstado  = PrensadoEstado 
	PrensadoLevasUnidadMedida  = PrensadoLevasUnidadMedida 
	PrensadoRodillosUnidadMedida  = PrensadoRodillosUnidadMedida 
	PrensadoLevasKgEntrada  = PrensadoLevasKgEntrada 
	PrensadoLevasKgSalida  = PrensadoLevasKgSalida 
	PrensadoLevasGradosEntrada  = PrensadoLevasGradosEntrada 
	PrensadoLevasGradosSalida  = PrensadoLevasGradosSalida 
	PrensadoRodillosKgEntrada  = PrensadoRodillosKgEntrada 
	PrensadoRodillosKgSalida  = PrensadoRodillosKgSalida 
	PrensadoRodillosGradosEntrada  = PrensadoRodillosGradosEntrada 
	PrensadoRodillosGradosSalida  = PrensadoRodillosGradosSalida 
	PrensadoMotivoAnticipado  = WWPBaseObjects.Notifications.PrensadoMotivoAnticipado 
	PrensadoTroquelId  = PrensadoTroquelId 
	PrensadoTroquelNombre  = PrensadoTroquelNombre 
	PrensadoHoraIniciaProceso  = PrensadoHoraIniciaProceso 
	PrensadoHoraFinProceso  = PrensadoHoraFinProceso 
	PrensadoProductoDescripcion  = PrensadoProductoDescripcion 
	PrensadoMeta  = PrensadoMeta 

}
```

### Rules (Rules)

```genexus
parm(&PrensadoId);
```

