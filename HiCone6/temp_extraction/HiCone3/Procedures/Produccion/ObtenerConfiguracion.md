# Procedure: ObtenerConfiguracion

- **Module:** Produccion
- **Description:** Obtener Configuracion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ConfiguracionKey | Parameter | VARCHAR | in | Configuracion Key |
| ConfiguracionValor | Parameter | LONGVARCHAR | out | Configuracion Valor |
| Configuracion | Variable | NUMERIC |  | Configuracion |
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
FOR EACH DB.Configuracion
	WHERE ConfiguracionKey = &ConfiguracionKey
	&ConfiguracionValor = ConfiguracionValor
	EXIT
WHEN NONE
	new 
		ConfiguracionKey = &ConfiguracionKey
		ConfiguracionValor = ''
	endnew
	commit
ENDFOR
```

### Rules (Rules)

```genexus
PARM(IN:&ConfiguracionKey, OUT:&ConfiguracionValor);
```

