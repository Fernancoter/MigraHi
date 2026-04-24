# Procedure: ValidarCarreraCompleta

- **Module:** Produccion
- **Description:** Validar Carrera Completa
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraId | Parameter | NUMERIC | inout | Carrera Id |
| AunPorValidar | Variable | Boolean |  | Aun Por Validar |
| ValidacionCompleta | Variable | Boolean |  | Validacion Completa |
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
&ValidacionCompleta = true

For each DB.Carrete
	Where CarreteCarreraId = &CarreraId
	
	if(CarreteEstado = EstadoCarrete.EnRevision)
		&ValidacionCompleta = false
		Exit
	endif
Endfor

If(&ValidacionCompleta)

	SetEstadoCarrera.Call(&CarreraId, EstadoCarrera.Validada)
	SDEliminarNotificacion.Call(&CarreraId,NotificacionTipo.Carrera)
Endif
```

### Rules (Rules)

```genexus
parm(&CarreraId);
```

