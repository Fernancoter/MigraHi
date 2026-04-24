# Procedure: SDRevertirValidacionCarreteId

- **Module:** Produccion
- **Description:** SDRevertir Validacion Carrete Id
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteId | Parameter | NUMERIC | inout | Carrete Id |
| Carrete | Variable | GX_BUSCOMP |  | Carrete |
| Palet | Variable | GX_BUSCOMP |  | Palet |
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


for each DB.PaletCarrete
	where CarreteId = &CarreteId
	&Palet.Load(PaletId)
	&Palet.PaletNoCarretes =&Palet.PaletNoCarretes -1
	&Palet.Save()
	
	delete
endfor



&Carrete.Load(&CarreteId)
&Carrete.CarreteEstado = EstadoCarrete.EnRevision
&Carrete.Save()
commit
```

### Rules (Rules)

```genexus
parm(&CarreteId);
```

