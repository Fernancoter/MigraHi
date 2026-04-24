# Procedure: SDPMDFFieldsFromJSON

- **Module:** WorkWithPlus.NativeMobile
- **Description:** Fields From JSON
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DynamicFormFields | Parameter | GX_SDT | out | Dynamic Form Fields |
| FormFieldsJson | Parameter | CHARACTER | in | Form Fields Json |
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
&DynamicFormFields.FromJson( &FormFieldsJson)
```

### Rules (Rules)

```genexus
parm(in:&FormFieldsJson, out:&DynamicFormFields);
```

