# Procedure: AuditTransactionOriginal

- **Module:** WWPBaseObjects
- **Description:** Audit Transaction Original
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AuditingObject | Parameter | GX_SDT | in | Auditing Object |
| AuditingObjectRecordItem | Variable | GX_SDT |  | Auditing Object Record Item |
| AuditingObjectRecordItemAttributeItem | Variable | GX_SDT |  | Auditing Object Record Item Attribute Item |
| CallerName | Parameter | VARCHAR | in | Caller Name |
| Audit | Variable | GX_BUSCOMP |  | Audit |
| AuditDescription | Variable | LONGVARCHAR |  | Audit Description |
| AuditShortDescription | Variable | VARCHAR |  | Audit Short Description |
| AuditPrimaryKey | Variable | VARCHAR |  | Audit Primary Key |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| FirstRecord | Variable | Boolean |  | First Record |
| ActualMode | Variable | CHARACTER |  | Actual Mode |
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


//This is a procedure in which you has to define the behaviour of auditing after a record has
//being inserted, modified or deleted (when the transaction has auditing enabled).
//There is an example below of a way to audit the actions of record, saving them in DataBase
//(but this can be modified to do whatever you want):
LoadWWPContext.call(&WWPContext)
&AuditPrimaryKey = ""
&FirstRecord = True
For &AuditingObjectRecordItem in &AuditingObject.Record

	&Audit = new()
	&Audit.AuditDate = now()
	&Audit.SecUserId = &WWPContext.UserId
	&Audit.AuditTableName = &AuditingObjectRecordItem.TableName
	
	If &FirstRecord
		&AuditShortDescription = "Record with key '"
		&AuditDescription = "Record with key '"
		&ActualMode = &AuditingObject.Mode
	Else
		&AuditShortDescription = &AuditPrimaryKey
		&AuditDescription = &AuditPrimaryKey
		&ActualMode = &AuditingObjectRecordItem.Mode
	Endif
	do case
		Case &ActualMode = TrnMode.Insert
			&Audit.AuditAction = "Insert"
		Case &ActualMode = TrnMode.Update
			&Audit.AuditAction = "Update"
		Case &ActualMode = TrnMode.Delete
			&Audit.AuditAction = "Delete"
	EndCase
	For &AuditingObjectRecordItemAttributeItem in &AuditingObjectRecordItem.Attribute
		
		If (&AuditingObjectRecordItemAttributeItem.IsPartOfKey)
			
			&Audit.AuditTableKey = &AuditingObjectRecordItemAttributeItem.NewValue.ToNumeric()
			
			If &ActualMode = TrnMode.Insert
				&AuditShortDescription += &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.NewValue	+ " "		
				&AuditDescription += &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.NewValue	+ " "		
			else
				&AuditShortDescription += &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.OldValue	+ " "		
				&AuditDescription += &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.OldValue	+ " "		
			EndIf
		EndIf
		If (&AuditingObjectRecordItemAttributeItem.IsDescriptionAttribute)
			If &ActualMode = TrnMode.Insert
				&AuditShortDescription += "- " + &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.NewValue	+ " "		
				&AuditDescription += "- " + &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.NewValue	+ " "		
			else
				&AuditShortDescription += "- " + &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.OldValue	+ " "		
				&AuditDescription += "- " + &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.OldValue	+ " "		
			EndIf
		EndIf
	EndFor
	
	If &FirstRecord
		&FirstRecord = False
		&AuditPrimaryKey = &AuditShortDescription
	Endif
	&AuditShortDescription += "' was "
	&AuditDescription += "' was "
	Do Case 
		Case &ActualMode = TrnMode.Insert
			&AuditShortDescription += "inserted"
			&AuditDescription += "inserted." + NewLine() + " Attributes:" + NewLine()
		Case &ActualMode = TrnMode.Update
			&AuditShortDescription += "updated"
			&AuditDescription += "updated." + NewLine() + " Modified attributes:" + NewLine()
		Case &ActualMode = TrnMode.Delete
			&AuditShortDescription += "deleted"
			&AuditDescription += "deleted." + NewLine() + " Attributes:" + NewLine()
	EndCase
	&AuditShortDescription += "."
	
	For &AuditingObjectRecordItemAttributeItem in &AuditingObjectRecordItem.Attribute
		If not(&AuditingObjectRecordItemAttributeItem.IsPartOfKey) 
			Do Case 
				Case &ActualMode = TrnMode.Insert
					If not &AuditingObjectRecordItemAttributeItem.NewValue.IsEmpty()
						&AuditDescription += &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.NewValue  + NewLine()
					EndIf
				Case &ActualMode = TrnMode.Update
					If (&AuditingObjectRecordItemAttributeItem.NewValue <> &AuditingObjectRecordItemAttributeItem.OldValue)
						&AuditDescription += &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.NewValue + " (Old value = " + &AuditingObjectRecordItemAttributeItem.OldValue + ")" + NewLine()
					EndIf
				Case &ActualMode = TrnMode.Delete
					If not (&AuditingObjectRecordItemAttributeItem.OldValue.IsEmpty())
						&AuditDescription += &AuditingObjectRecordItemAttributeItem.Description + " = " + &AuditingObjectRecordItemAttributeItem.OldValue + NewLine()
					EndIf
			EndCase	
		EndIf
	EndFor
	&Audit.AuditDescription = &AuditDescription
	&Audit.AuditShortDescription = &AuditShortDescription
	&Audit.Save()
	If &Audit.Success()
		Commit
	EndIf
EndFor

//Finally, apply WorkWithPlus Pattern to Audit, removing actions of Insert, Update and Delete
//Audit transaction cannot have Auditing enabled, because it will enter in loop
//So, make sure that property 'Enable Auditing' is False in Audit transaction
```

### Rules (Rules)

```genexus
parm(in:&AuditingObject, in:&CallerName);
```

