# Procedure: MDFLoadSampleFields2

- **Module:** WorkWithPlus.NativeMobile
- **Description:** MDFLoad Sample Fields2
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DynamicFormFields | Parameter | GX_SDT | out | Dynamic Form Fields |
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
	&DynamicFormFields = new()
		
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field2"
	&DynamicFormField.MDFDynamicFieldValue = !"value 1"
	&DynamicFormField.MDFDynamicFieldDescription = !"Text Field"
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Character
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = false
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field3"	
	&DynamicFormField.MDFDynamicFieldDescription = !"Boolean field"
	&DynamicFormField.MDFDynamicFieldType = WorkWithPlus.NativeMobile.SDPMDFFieldType.Boolean
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = false
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field5"	
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Numeric
	&DynamicFormField.MDFDynamicFieldDescription = !"Numeric field"
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = false
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field7"	
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Decimal
	&DynamicFormField.MDFDynamicFieldDescription = !"Decimal field"
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = false
		
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field10"	
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Date
	&DynamicFormField.MDFDynamicFieldDescription = !"Date field"
	&DynamicFormField.MDFDynamicFieldValueDate = today()
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = false	

	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"FieldCombo2"
	&DynamicFormField.MDFDynamicFieldComboValues =  !"1:Descripcion 1;2:Descripcion 2;3:Descripcion 3"
	&DynamicFormField.MDFDynamicFieldValue = !"2"
	&DynamicFormField.MDFDynamicFieldDescription = !"Enum field"
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Combo
```

### Rules (Rules)

```genexus
parm(out:&DynamicFormFields);
```

