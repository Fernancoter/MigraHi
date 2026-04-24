# Procedure: GuardarConfiguracion

- **Module:** Produccion
- **Description:** Guardar Configuracion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ConfiguracionKey | Parameter | VARCHAR | in | Configuracion Key |
| ConfiguracionValor | Parameter | LONGVARCHAR | in | Configuracion Valor |
| Configuracion | Variable | GX_BUSCOMP |  | Configuracion |
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
&Configuracion.Load(&ConfiguracionKey)
&Configuracion.ConfiguracionValor = &ConfiguracionValor
&Configuracion.Save()


commit
```

### Rules (Rules)

```genexus
PARM(IN:&ConfiguracionKey, in:&ConfiguracionValor);
```

