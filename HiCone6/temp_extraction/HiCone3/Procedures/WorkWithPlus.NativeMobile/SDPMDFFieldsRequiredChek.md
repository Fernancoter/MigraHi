# Procedure: SDPMDFFieldsRequiredChek

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPMDFFields Required Chek
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DynamicFormField | Variable | GX_SDT |  | Dynamic Form Field |
| DynamicFormFields | Parameter | GX_SDT | in | Dynamic Form Fields |
| error | Variable | Boolean |  | error |
| Message | Variable | GX_SDT |  | Message |
| Messages | Parameter | GX_SDT | out | Messages |
| text | Variable | CHARACTER |  | text |
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

for &DynamicFormField in &DynamicFormFields
	if &DynamicFormField.MDFDynamicFieldRequired
		&error = false		
		
		if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Character and &DynamicFormField.MDFDynamicFieldValue.IsEmpty()
			&error = true
		endif
		
		//+ Old versions of iOS must compare using "<null>"
		if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Date  //and &DynamicFormField.MDFDynamicFieldValueDate.IsEmpty()
			&text = &DynamicFormField.MDFDynamicFieldValueDate.ToString().Trim()
			if &text.IsEmpty() or &text = !"<null>" or &DynamicFormField.MDFDynamicFieldValueDate.IsEmpty()
				&error = true
			endif
		endif		
		if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Decimal  //and &DynamicFormField.MDFDynamicFieldValueDecimal.IsEmpty()
			&text = &DynamicFormField.MDFDynamicFieldValueDecimal.ToString().Trim()
			if &text.IsEmpty() or &text = !"<null>" or &DynamicFormField.MDFDynamicFieldValueDecimal.IsEmpty()
				&error = true
			endif
		endif		
		if &DynamicFormField.MDFDynamicFieldType = SDPMDFFieldType.Numeric  //and &DynamicFormField.MDFDynamicFieldValueNumeric.IsEmpty()
			&text = &DynamicFormField.MDFDynamicFieldValueNumeric.ToString().Trim()
			if &text.IsEmpty() or &text = !"<null>" or &DynamicFormField.MDFDynamicFieldValueNumeric.IsEmpty()
				&error = true
			endif
		endif
	
		if &error
			&Message = new()
			&Messages.Add(&Message)
			
			&Message.Type = MessageTypes.Error
			&Message.Description = format("The field '%1' is required", &DynamicFormField.MDFDynamicFieldDescription)
		endif	
	endif
endfor
```

### Rules (Rules)

```genexus
parm(in:&DynamicFormFields, out:&Messages);
```

