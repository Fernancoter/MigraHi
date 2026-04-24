# Procedure: EscaneoPaletExterno

- **Module:** Produccion
- **Description:** Escaneo Palet Externo
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Configuracion | Variable | GX_BUSCOMP |  | Configuracion |
| ConfiguracionValor | Variable | LONGVARCHAR |  | Configuracion Valor |
| TiempoLaboralMinutos | Variable | NUMERIC |  | Tiempo Laboral Minutos |
| AceptaPaletExterno | Parameter | NUMERIC | out | Acepta Palet Externo |
| Valor | Variable | NUMERIC |  | Valor |
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
	&AceptaPaletExterno = true
	
	for each
		where ConfiguracionKey = 'EscaneoPaletExterno'
		&ConfiguracionValor = ConfiguracionValor
	when none
		
		//Valor predeterminado en minutos (7 horas)
		&ConfiguracionValor = '1'
		
		//Registro de paramtero TiempoMinLaboral
		&Configuracion = New()
		&Configuracion.ConfiguracionKey = 'EscaneoPaletExterno'
		&Configuracion.ConfiguracionValor = &ConfiguracionValor
		&Configuracion.Save()
		
		if(&Configuracion.Success())
			commit
		endif
	endfor

        &Valor = &ConfiguracionValor.ToNumeric()
        
	if(&Valor = 0)
		&AceptaPaletExterno = false
	endif
```

### Rules (Rules)

```genexus
parm(out:&AceptaPaletExterno);
```

