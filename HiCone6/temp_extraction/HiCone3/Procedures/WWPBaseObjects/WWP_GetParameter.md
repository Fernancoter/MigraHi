# Procedure: WWP_GetParameter

- **Module:** WWPBaseObjects
- **Description:** Get Parameter
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BooleanParameter | Variable | Boolean |  | Boolean Parameter |
| DateParameter | Variable | DATE |  | Date Parameter |
| DateTimeParameter | Variable | DATETIME |  | Date Time Parameter |
| DecimalParameter | Variable | NUMERIC |  | Decimal Parameter |
| HTTPRequest | Variable | GX_USRDEFTYP |  | HTTPRequest |
| IntegerParameter | Variable | NUMERIC |  | Integer Parameter |
| ParameterName | Variable | VARCHAR |  | Parameter Name |
| TextParameter | Variable | LONGVARCHAR |  | Text Parameter |
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


Stub Text(in:&ParameterName, inout:&TextParameter)
	Do Case
		
		//SMPT Parameters (Sample SMTP Parameters for a GMAIL email account)
		Case &ParameterName = !"SMTP_Host"
			&TextParameter = !"smtp.ionos.mx" 
		Case &ParameterName = !"SMTP_Username"
			&TextParameter = !"contact@erphi-cone.com" //Your GMAIL account
		Case &ParameterName = !"SMTP_Password"
			&TextParameter = !"wMV13ZBrkU@" //Your GMAIL account password
			
		//SMS Parameters (From Sinch Account)
		Case &ParameterName = !"SMS_ServicePlanId"
			&TextParameter = !'9361a7469c1344ee8f4c957e36226d93'
		Case &ParameterName = !"SMS_Token"
			&TextParameter = !'fcd01c5592574e2d9b07248b2a6b9ab4'
		Case &ParameterName = !"SMS_ApplicationKey"
			&TextParameter = !"dddddddd-dddd-dddd-dddd-dddddddddddd"
		Case &ParameterName = !"SMS_ApplicationSecret"
			&TextParameter = !"dddddddddddddddddddddd=="
		Case &ParameterName = !"SMS_DefaultSender"
			&TextParameter = !'+447537455299'

		//Mail Sender Parameters
		Case &ParameterName = !"Sender_Name"
			&TextParameter = !"Hi-Cone" 
		Case &ParameterName = !"Sender_Address"
			&TextParameter = !"contact@erphi-cone.com" //Your GMAIL account
      
		//Notification Parameters
		Case &ParameterName = !"Notification_BaseURL"
			//This should be replaced with your fixed BaseURL if you will send Notifications by an scheduled process 
			&TextParameter = &HTTPRequest.BaseUrl 
	EndCase
EndStub


Stub Integer(in:&ParameterName, inout:&IntegerParameter)
	Do Case
		//SMPT Parameters (Sample SMTP Parameters for a GMAIL email account)
		Case &ParameterName = !"SMTP_Port"
			&IntegerParameter = 587
			
		Case &ParameterName = !"SMTP_Timeout"
			&IntegerParameter = 30
	EndCase
EndStub

Stub Decimal(in:&ParameterName, inout:&DecimalParameter)

EndStub

Stub Boolean(in:&ParameterName, inout:&BooleanParameter)
	Do Case
		//SMPT Parameters (Sample SMTP Parameters for a GMAIL email account)
		Case &ParameterName = !"SMTP_Authentication"
		&BooleanParameter = True
		Case &ParameterName = !"SMTP_Secure"
			csharp [!&BooleanParameter!] = true;
			java [!&BooleanParameter!] = false;
	EndCase
EndStub

Stub Date(in:&ParameterName, inout:&DateParameter)

EndStub

Stub DateTime(in:&ParameterName, inout:&DateTimeParameter)

EndStub
```

