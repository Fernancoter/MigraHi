# Procedure: ObtenerPrensaPorTroquelId

- **Module:** Produccion
- **Description:** Obtener Prensa Por Troquel Id
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| TroquelId | Parameter | NUMERIC | in | Troquel Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| PrensaNombre | Parameter | VARCHAR | out | Prensa Nombre |
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

	for each DB.PrensaTroquel
		Where TroquelEstado = EstadoTroquel.EnPrensa
		Where TroquelId = &TroquelId
		&PrensaId = PrensaId
		&PrensaNombre = PrensaNombre
		Exit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&TroquelId, out:&PrensaNombre );
```

