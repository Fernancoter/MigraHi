# Procedure: SDPFieldsToJSON

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPMDFFields To JSON
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DynamicFormFields | Parameter | GX_SDT | in | Dynamic Form Fields |
| FormFieldsJson | Parameter | CHARACTER | out | Form Fields Json |
| DynamicFormField | Variable | GX_SDT |  | Dynamic Form Field |
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
//Se cargan los valores dependiendo del tipo de dato del campo

for &DynamicFormField in &DynamicFormFields
	&FormFieldsJson += !"{"+ &DynamicFormField.MDFDynamicFieldName + !":"
	if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Character
		&FormFieldsJson += &DynamicFormField.MDFDynamicFieldValue
	endif
	if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Boolean
		&FormFieldsJson += &DynamicFormField.MDFDynamicFieldValueCheck.ToString()
	endif
	if &DynamicFormField.MDFDynamicFieldType = WorkWithPlus.NativeMobile.SDPMDFFieldType.Date
		&FormFieldsJson += &DynamicFormField.MDFDynamicFieldValueDate.ToString()
	endif
	if &DynamicFormField.MDFDynamicFieldType = WorkWithPlus.NativeMobile.SDPMDFFieldType.Numeric
		&FormFieldsJson += &DynamicFormField.MDFDynamicFieldValueNumeric.ToString()
	endif
	if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Decimal
		&FormFieldsJson += &DynamicFormField.MDFDynamicFieldValueDecimal.ToString()
	endif
	if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Combo
		&FormFieldsJson += &DynamicFormField.MDFDynamicFieldValue
	endif
	&FormFieldsJson += !"}"
endfor
```

### Rules (Rules)

```genexus
parm(in:&DynamicFormFields, out:&FormFieldsJson);
```

