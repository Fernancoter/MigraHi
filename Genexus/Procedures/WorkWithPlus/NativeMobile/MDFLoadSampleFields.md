# Procedure: MDFLoadSampleFields

- **Module:** WorkWithPlus.NativeMobile
- **Description:** MDFLoad Sample Fields
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
	&DynamicFormField.MDFDynamicFieldName = !"Field1"
	&DynamicFormField.MDFDynamicFieldDescription = !"Sample text field"
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Character
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = true
	/*
	//Change Field and/or label class
	&DynamicFormField.MDFDynamicFieldClass = !"TestField"
	&DynamicFormField.MDFDynamicFieldDescriptionClass = !"TestLabel"
	*/
		
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field2"
	&DynamicFormField.MDFDynamicFieldValue = !"value"
	&DynamicFormField.MDFDynamicFieldDescription = !"Text field with value"
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Character
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = false
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field3"	
	&DynamicFormField.MDFDynamicFieldDescription = !"Bool field"
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Boolean
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = false
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field4"	
	&DynamicFormField.MDFDynamicFieldType = WorkWithPlus.NativeMobile.SDPMDFFieldType.Boolean
	&DynamicFormField.MDFDynamicFieldDescription = !"Checked field"
	&DynamicFormField.MDFDynamicFieldValueCheck = true
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
	&DynamicFormField.MDFDynamicFieldName = !"Field6"	
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Numeric
	&DynamicFormField.MDFDynamicFieldDescription = !"Numeric with value"
	&DynamicFormField.MDFDynamicFieldValueNumeric = 123
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = true
	
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field7"	
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Decimal
	&DynamicFormField.MDFDynamicFieldDescription = !"Decimal field"
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = false
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field8"	
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Decimal
	&DynamicFormField.MDFDynamicFieldDescription = !"Decimal with value"
	&DynamicFormField.MDFDynamicFieldValueDecimal = 125.05
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = true

	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field9"	
	&DynamicFormField.MDFDynamicFieldType = WorkWithPlus.NativeMobile.SDPMDFFieldType.Date
	&DynamicFormField.MDFDynamicFieldDescription = !"Date field"
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = true
	/**/
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field10"	
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Date
	&DynamicFormField.MDFDynamicFieldDescription = !"Date with value"
	&DynamicFormField.MDFDynamicFieldValueDate = today()
	&DynamicFormField.MDFDynamicFieldEnabled = true
	&DynamicFormField.MDFDynamicFieldRequired = false
	/**/
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field11"	
	&DynamicFormField.MDFDynamicFieldType = WorkWithPlus.NativeMobile.SDPMDFFieldType.Decimal
	&DynamicFormField.MDFDynamicFieldDescription = !"Disabled field"
	&DynamicFormField.MDFDynamicFieldValueDecimal = 125.05
	&DynamicFormField.MDFDynamicFieldEnabled = false
	&DynamicFormField.MDFDynamicFieldRequired = false
	

	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"Field12"	
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Date
	&DynamicFormField.MDFDynamicFieldDescription = !"Disabled date"
	&DynamicFormField.MDFDynamicFieldValueDate = today()
	&DynamicFormField.MDFDynamicFieldEnabled = false
	&DynamicFormField.MDFDynamicFieldRequired = false
	
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"FieldCombo1"	
	&DynamicFormField.MDFDynamicFieldComboValues =  !"cval 1:CVombo Valor 1;cval 2:CVombo Valor 2;cval 3:CVombo Valor 3"
	&DynamicFormField.MDFDynamicFieldDescription = !"Enum field"
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Combo
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"FieldCombo2"
	&DynamicFormField.MDFDynamicFieldComboValues =  !"vvv 1:Descripcion 1;vv 2:Descripcion 2;vv 3:Descripcion 3"
	&DynamicFormField.MDFDynamicFieldValue = !"vv 2"
	&DynamicFormField.MDFDynamicFieldDescription = !"Enum with selected value"
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Combo
	
	&DynamicFormField = new()
	&DynamicFormFields.Add(&DynamicFormField)
	&DynamicFormField.MDFDynamicFieldName = !"FieldCombo3Dis"
	&DynamicFormField.MDFDynamicFieldComboValues =  !"1:D1;2:No Editable2;3:D3"
	&DynamicFormField.MDFDynamicFieldValue = !"2"
	&DynamicFormField.MDFDynamicFieldDescription = !"Disabled enum"
	&DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Combo
	&DynamicFormField.MDFDynamicFieldEnabled = false
```

### Rules (Rules)

```genexus
parm(out:&DynamicFormFields);
```

