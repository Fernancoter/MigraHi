# Procedure: SDRevertirCarrete

- **Module:** Produccion
- **Description:** SDRevertir Carrete
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| EOId | Variable | NUMERIC |  | EOId |
| EtiquetadoOperador | Variable | GX_BUSCOMP |  | Etiquetado Operador |
| isOK | Variable | Boolean |  | is OK |
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
       &isOK = false
       
       //Registrar Etiquetado Operador
       for each DB.EtiquetadoOperador
	       where EtiquetadoOperadorId > 0
	       where CarreteEtiquetadoId = &CarreteId
	       &EOId = EtiquetadoOperadorId
	       
	       &EtiquetadoOperador.Load(&EOId)
	       &EtiquetadoOperador.Delete()
	       commit
	       
	       &isOK = true
	       Exit       
        endfor

        if(&isOK)
		Produccion.SetEstadoCarrete.Call(&CarreteId, EstadoCarrete.Etiquetar, false)
        endif
```

### Rules (Rules)

```genexus
parm(in:&CarreteId);
```

