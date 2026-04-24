# Procedure: SDToleranciaTurno

- **Module:** Produccion
- **Description:** SDTolerancia Turno
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Configuracion | Variable | GX_BUSCOMP |  | Configuracion |
| ConfiguracionValor | Variable | LONGVARCHAR |  | Configuracion Valor |
| ToleranciaTurno | Parameter | NUMERIC | out | Tolerancia Turno |
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
		where ConfiguracionKey = 'ToleranciaTurno'
		&ConfiguracionValor = ConfiguracionValor
	when none
		
		//Valor predeterminado en minutos (30 minutos)
		&ConfiguracionValor = '30'
		
		//Registro de paramtero TiempoMinLaboral
		&Configuracion = New()
		&Configuracion.ConfiguracionKey = 'ToleranciaTurno'
		&Configuracion.ConfiguracionValor = &ConfiguracionValor
		&Configuracion.Save()
		
		if(&Configuracion.Success())
			commit
		endif
	endfor

        &ToleranciaTurno =  &ConfiguracionValor.ToNumeric()
```

### Rules (Rules)

```genexus
parm(out:&ToleranciaTurno);
```

