# DataProvider: DPCarreteInfo

- **Module:** Produccion
- **Description:** DPCarrete Info
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteId | Parameter | NUMERIC | inout | Carrete Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTCarreteInfo
Where CarreteId = &CarreteId
{
	SDTCarreteInfoItem
	{
		PaletId  = PaletId 
PaletNoSerie  = PaletNoSerie 
PaletNo  = PaletNo 
PaletOperadorId  = PaletOperadorId 
PaletProductoId  = PaletProductoId 
PaletProductoNombre  = PaletProductoNombre 
PaletProductoDescripcion  = PaletProductoDescripcion 
PaletHoraInicioEnsamble  = PaletHoraInicioEnsamble 
PaletHoraFinEnsamble  = PaletHoraFinEnsamble 
PaletEstatus  = PaletEstatus 
PaletPrensaId  = PaletPrensaId 
PaletPrensadoId  = PaletPrensadoId 
PaletCapacidad  = WWPBaseObjects.PaletCapacidad 
PaletNoCarretes  = PaletNoCarretes 

	}
}
```

### Rules (Rules)

```genexus
parm(&CarreteId);
```

