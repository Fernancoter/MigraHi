# Procedure: ObtenerExtrusionId

- **Module:** Produccion
- **Description:** Obtener Extrusion Id
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| OperadorId | Variable | NUMERIC |  | Operador Id |
| GamUser | Variable | GX_EXTERNAL_OBJECT |  | Gam User |
| GamUserAttribute | Variable | GX_EXTERNAL_OBJECT |  | Gam User Attribute |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| ExtrusionId | Parameter | NUMERIC | out | Extrusion Id |
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
&GamUserAttribute = &GamUser.GetAttribute(!"ExtrusionID", &Errors)
&ExtrusionId  = &GamUserAttribute.Value.ToNumeric()
```

### Rules (Rules)

```genexus
parm(out:&ExtrusionId);
```

