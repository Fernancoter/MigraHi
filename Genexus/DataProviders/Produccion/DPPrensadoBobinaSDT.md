# DataProvider: DPPrensadoBobinaSDT

- **Module:** Produccion
- **Description:** DPPrensado Bobina SDT
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoBobinaId | Parameter | NUMERIC | inout | Prensado Bobina Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTPrensadoBobina
Where PrensadoBobinaId = &PrensadoBobinaId
{
	SDTPrensadoBobinaItem
	{
		PrensadoBobinaId  = PrensadoBobinaId 
		PrensadoId  = PrensadoId 
		BobinaId  = BobinaId 
		BobinaNoSerie  = BobinaNoSerie 
		BobinaEstado  = BobinaEstado 
		BobinaNo  = BobinaNo 
		BobinaOrigen  = BobinaOrigen 
		BobinaKg  = BobinaKg 
		BobinaKgTexto  = trim( BobinaKg.ToFormattedString())
		PrensadoBobinaCantCarrera  = PrensadoBobinaCantCarrera 
		BobinaHoraSalida = BobinaHoraSalida
		
	}
}
```

### Rules (Rules)

```genexus
parm(&PrensadoBobinaId);
```

