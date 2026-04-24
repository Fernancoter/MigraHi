# Procedure: AuditTransaction

- **Module:** WWPBaseObjects
- **Description:** Audit Transaction
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
| AuditingObjectAttribute | Variable | GX_SDT |  | Auditing Object Attribute |
| isOK | Variable | Boolean |  | is OK |
| UserGUID | Variable | VARCHAR |  | User GUID |
| UserEmail | Variable | VARCHAR |  | User Email |
| UserName | Variable | VARCHAR |  | User Name |
| GAMUser | Variable | GX_EXTERNAL_OBJECT |  | GAMUser |
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
&UserGUID = &WWPContext.UserGUID

if(&UserGUID.IsEmpty())
	 &UserGUID = GamUser.GetId()
endif

&GAMUser.Load(&UserGUID)

&AuditPrimaryKey = ""
&FirstRecord = True
For &AuditingObjectRecordItem in &AuditingObject.Record

	&ActualMode = &AuditingObject.Mode
	&AuditingObjectAttribute = new()
	&AuditingObjectAttribute.Attribute.FromJson(&AuditingObjectRecordItem.Attribute.ToJson())

	&isOK = AuditHasChange.Udp(&AuditingObjectAttribute, &ActualMode)
	
	if(&isOK)
		
		&Audit = new()
		&Audit.AuditDate = now()
		&Audit.GAMUserGUID = &UserGUID
		&Audit.SecUserName = &GAMUser.FirstName + ' ' + &GAMUser.LastName
		&Audit.WWPBaseObjects.SecUserEmail = &GAMUser.EMail
		//&Audit.SecUserId = &WWPContext.UserId
		&Audit.AuditTableName = &AuditingObjectRecordItem.TableName
		
		For &AuditingObjectRecordItemAttributeItem in &AuditingObjectRecordItem.Attribute
			If (&AuditingObjectRecordItemAttributeItem.IsPartOfKey)
				do case
					Case &ActualMode = TrnMode.Insert
						&Audit.AuditAction = "Insert"
						&Audit.AuditTableKey = &AuditingObjectRecordItemAttributeItem.NewValue.ToNumeric()
						exit
					Case &ActualMode = TrnMode.Update
						&Audit.AuditAction = "Update"
						&Audit.AuditTableKey = &AuditingObjectRecordItemAttributeItem.OldValue.ToNumeric()
						exit
					Case &ActualMode = TrnMode.Delete
						&Audit.AuditAction = "Delete"
						&Audit.AuditTableKey = &AuditingObjectRecordItemAttributeItem.OldValue.ToNumeric()
						exit
				EndCase
				
			endif
		endfor
		
		&Audit.AuditDescription = &AuditingObjectAttribute.ToJson()
		&Audit.AuditShortDescription = ''
		&Audit.Save()
		
		If &Audit.Success()
			Commit
		EndIf
	endif

EndFor

//Finally, apply WorkWithPlus Pattern to Audit, removing actions of Insert, Update and Delete
//Audit transaction cannot have Auditing enabled, because it will enter in loop
//So, make sure that property 'Enable Auditing' is False in Audit transaction
```

### Rules (Rules)

```genexus
parm(in:&AuditingObject, in:&CallerName);
```

