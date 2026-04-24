# Procedure: SDPMDFFieldGetCharValue

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPMDFField Get Char Value
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DynamicFormField | Parameter | GX_SDT | in | Dynamic Form Field |
| FieldValue | Parameter | VARCHAR | out | Field Value |
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

&FieldValue = &DynamicFormField.MDFDynamicFieldValue

if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Boolean
	&FieldValue = trim(&DynamicFormField.MDFDynamicFieldValueCheck.ToString())
endif

if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Date
	&FieldValue = trim(&DynamicFormField.MDFDynamicFieldValueDate.ToString())
endif

if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Decimal
	&FieldValue = trim(&DynamicFormField.MDFDynamicFieldValueDecimal.ToString())
endif

if &DynamicFormField.MDFDynamicFieldType = WorkWithPlus.NativeMobile.SDPMDFFieldType.Numeric
	&FieldValue = trim(&DynamicFormField.MDFDynamicFieldValueNumeric.ToString())
endif
```

### Rules (Rules)

```genexus
parm(in:&DynamicFormField, out:&FieldValue);
```

