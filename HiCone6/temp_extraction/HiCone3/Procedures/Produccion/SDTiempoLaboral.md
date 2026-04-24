# Procedure: SDTiempoLaboral

- **Module:** Produccion
- **Description:** SDTiempo Laboral
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Configuracion | Variable | GX_BUSCOMP |  | Configuracion |
| ConfiguracionValor | Variable | LONGVARCHAR |  | Configuracion Valor |
| TiempoLaboralMinutos | Parameter | NUMERIC | out | Tiempo Laboral Minutos |
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
	for each
		where ConfiguracionKey = 'TiempoLaboral'
		&ConfiguracionValor = ConfiguracionValor
	when none
		
		//Valor predeterminado en minutos (7 horas)
		&ConfiguracionValor = '420'
		
		//Registro de paramtero TiempoMinLaboral
		&Configuracion = New()
		&Configuracion.ConfiguracionKey = 'TiempoLaboral'
		&Configuracion.ConfiguracionValor = &ConfiguracionValor
		&Configuracion.Save()
		
		if(&Configuracion.Success())
			commit
		endif
	endfor

        &TiempoLaboralMinutos =  &ConfiguracionValor.ToNumeric()
```

### Rules (Rules)

```genexus
parm(out:&TiempoLaboralMinutos);
```

