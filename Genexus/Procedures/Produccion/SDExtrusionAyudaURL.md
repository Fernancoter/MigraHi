# Procedure: SDExtrusionAyudaURL

- **Module:** Produccion
- **Description:** SDExtrusion Ayuda URL
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Configuracion | Variable | GX_BUSCOMP |  | Configuracion |
| ConfiguracionValor | Variable | LONGVARCHAR |  | Configuracion Valor |
| TiempoLaboralMinutos | Variable | NUMERIC |  | Tiempo Laboral Minutos |
| URL | Parameter | VARCHAR | out | URL |
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
		where WWPBaseObjects.ConfiguracionKey = 'ExtrusionAyudaURL'
		&ConfiguracionValor = ConfiguracionValor
	when none
		
		//Valor predeterminado en minutos (7 horas)
		&ConfiguracionValor = 'https://www.google.com'
		
		//Registro de paramtero TiempoMinLaboral
		&Configuracion = New()
		&Configuracion.ConfiguracionKey = 'ExtrusionAyudaURL'
		&Configuracion.ConfiguracionValor = &ConfiguracionValor
		&Configuracion.Save()
		
		if(&Configuracion.Success())
			commit
		endif
	endfor

        &URL =  &ConfiguracionValor
```

### Rules (Rules)

```genexus
parm(out:&URL);
```

