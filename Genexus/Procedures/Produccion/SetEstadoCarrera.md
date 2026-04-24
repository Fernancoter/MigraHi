# Procedure: SetEstadoCarrera

- **Module:** Produccion
- **Description:** Set Estado Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Carrera | Variable | GX_BUSCOMP |  | Carrera |
| CarreraEstado | Parameter | VARCHAR | in | Carrera Estado |
| CarreraId | Parameter | NUMERIC | in | Carrera Id |
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
         
	 &Carrera.Load(&CarreraId)
	 &Carrera.CarreraEstado = &CarreraEstado
	 
	 if(&CarreraEstado = EstadoCarrera.Validada)
		 &Carrera.CarreraFechaValidacion = Now()
	 endif
 
	 &Carrera.Save()
	 
	 if(&Carrera.Success())
		 commit
     endif
```

### Rules (Rules)

```genexus
parm(in:&CarreraId, in:&CarreraEstado);
```

