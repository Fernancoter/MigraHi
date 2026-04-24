# Procedure: ObtenerOperadorId

- **Module:** Produccion
- **Description:** Obtener Operador Id
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| OperadorId | Parameter | NUMERIC | out | Operador Id |
| GamUser | Variable | GX_EXTERNAL_OBJECT |  | Gam User |
| GamUserAttribute | Variable | GX_EXTERNAL_OBJECT |  | Gam User Attribute |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
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
&GamUser = GamUser.Get()
&GamUserAttribute = &GamUser.GetAttribute(!"OperadorId", &Errors)
&OperadorId  = &GamUserAttribute.Value.ToNumeric()
```

### Rules (Rules)

```genexus
parm(out:&OperadorId);
```

