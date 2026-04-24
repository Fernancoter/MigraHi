# Procedure: MDFLoadSampleFieldsSession

- **Module:** WorkWithPlus.NativeMobile
- **Description:** MDFLoad Sample Fields Session
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DynamicFormFields | Variable | GX_SDT |  | Dynamic Form Fields |
| DynamicFormField | Variable | GX_SDT |  | Dynamic Form Field |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
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

&DynamicFormFields = MDFLoadSampleFields()

&WebSession.Set(!"DynamicFormFields", &DynamicFormFields.ToJson())
```

