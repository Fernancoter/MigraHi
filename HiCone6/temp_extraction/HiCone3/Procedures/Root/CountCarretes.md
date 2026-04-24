# Procedure: CountCarretes

- **Module:** 
- **Description:** Count Carretes
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PaletId | Parameter | NUMERIC | in | Palet Id |
| PaletNoCarretesEtiquetados | Parameter | NUMERIC | out | Palet No Carretes Etiquetados |
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
&PaletNoCarretesEtiquetados = 0

For each DB.PaletCarrete
	where PaletId = &PaletId
	where CarreteEstado = EstadoCarrete.Etiquetado
	&PaletNoCarretesEtiquetados += 1
EndFor



//&PaletNoCarretesEtiquetados = count(PaletCarreteId, PaletId = &PaletId and CarreteEstado = EstadoCarrete.Etiquetado)
```

### Rules (Rules)

```genexus
parm(in:&PaletId, out:&PaletNoCarretesEtiquetados);
```

