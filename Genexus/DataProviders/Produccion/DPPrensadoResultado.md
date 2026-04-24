# DataProvider: DPPrensadoResultado

- **Module:** Produccion
- **Description:** DPPrensado Resultado
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
SDTPrensadoResultado
Where Produccion.PrensadoId = &PrensadoId
{
	PrensadoResultadoId  = PrensadoResultadoId 
PrensadoResultadoPiezasBuenas  = PrensadoResultadoPiezasBuenas 
PrensadoResultadoPiezasMolino  = PrensadoResultadoPiezasMolino 
PrensadoResultadoMermaKg  = PrensadoResultadoMermaKg 
PrensadoResultadoNoPalets  = PrensadoResultadoNoPalets 
PrensadoResultadoCarretesSobrantes  = PrensadoResultadoCarretesSobrantes 
PrensadoResultadoObservaciones  = PrensadoResultadoObservaciones 
PrensadoResultadoRPMLinea  = PrensadoResultadoRPMLinea 
PrensadoResultadoGPMPrensa  = DB.PrensadoResultadoGPMPrensa 
PrensadoResultadoGPMTotal  = PrensadoResultadoGPMTotal 
PrensadoResultadoHerramientas  = PrensadoResultadoHerramientas 
PrensadoId  = PrensadoId 
PrensadoLevasUnidadMedida  = PrensadoLevasUnidadMedida 
PrensadoLevasKgEntrada  = PrensadoLevasKgEntrada 
PrensadoLevasKgSalida  = PrensadoLevasKgSalida 
PrensadoLevasGradosEntrada  = PrensadoLevasGradosEntrada 
PrensadoLevasGradosSalida  = PrensadoLevasGradosSalida 
PrensadoRodillosUnidadMedida  = PrensadoRodillosUnidadMedida 
PrensadoRodillosKgEntrada  = PrensadoRodillosKgEntrada 
PrensadoRodillosKgSalida  = PrensadoRodillosKgSalida 
PrensadoRodillosGradosEntrada  = PrensadoRodillosGradosEntrada 
PrensadoRodillosGradosSalida  = PrensadoRodillosGradosSalida 

}
```

### Rules (Rules)

```genexus
parm(&PrensadoId);
```

