# Procedure: SDBobinaDesmontada

- **Module:** Produccion
- **Description:** SDBobina Desmontada
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| BobinaId | Parameter | NUMERIC | out | Bobina Id |
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

for each DB.PrensadoBobina
	where PrensadoBobinaId > 0
	where PrensadoId = &PrensadoId
	where BobinaId > 0
	where BobinaEstado = Produccion.EstadoBobina.Desmontada
	&BobinaId = BobinaId
	Exit
when none
	&BobinaId = 0
endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&BobinaId);
```

