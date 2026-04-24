# Procedure: GetGAMAttribute

- **Module:** Produccion
- **Description:** Get GAMAttribute
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| GamUser | Variable | GX_EXTERNAL_OBJECT |  | Gam User |
| GamUserAttribute | Variable | GX_EXTERNAL_OBJECT |  | Gam User Attribute |
| Key | Parameter | CHARACTER | in | Key |
| Value | Parameter | CHARACTER | out | Value |
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
&GAMUser = GamUser.Get()
&GAMUserAttribute = &GAMUser.GetAttribute(&Key.Trim(), &Errors)
&Value = &GamUserAttribute.Value
```

### Rules (Rules)

```genexus
parm(in:&Key, out:&Value);
```

