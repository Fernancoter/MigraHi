# Procedure: WWP_GetSMTPParameters

- **Module:** WWPBaseObjects.Mail
- **Description:** Get SMTPParameters
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BooleanParameter | Variable | Boolean |  | Boolean Parameter |
| IntegerParameter | Variable | NUMERIC |  | Integer Parameter |
| SMTPParametersSDT | Parameter | GX_SDT | out | SMTPParameters SDT |
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
WWP_Logger.Debug(&Pgmname, !"Getting SMTP Parameters")
&SMTPParametersSDT = new()

WWPBaseObjects.WWP_GetParameter.Text(!"SMTP_Host", &TextParameter)
&SMTPParametersSDT.Host = &TextParameter

WWP_GetParameter.Integer(!"SMTP_Port", &IntegerParameter)
&SMTPParametersSDT.Port = &IntegerParameter

WWP_GetParameter.Text(!"SMTP_Username", &TextParameter)
&SMTPParametersSDT.Username = &TextParameter

WWP_GetParameter.Text(!"SMTP_Password", &TextParameter)
&SMTPParametersSDT.Password = &TextParameter

WWPBaseObjects.WWP_GetParameter.Boolean(!"SMTP_Authentication", &BooleanParameter)
If &BooleanParameter
	&SMTPParametersSDT.Authentication = 1
Else	
	&SMTPParametersSDT.Authentication = 0
EndIf

WWP_GetParameter.Boolean(!"SMTP_Secure", &BooleanParameter)
If &BooleanParameter
	&SMTPParametersSDT.Secure = 1
Else	
	&SMTPParametersSDT.Secure = 0
EndIf

WWPBaseObjects.WWP_GetParameter.Integer(!"SMTP_Timeout", &IntegerParameter)
&SMTPParametersSDT.Timeout = &IntegerParameter

WWP_Logger.Debug(&Pgmname, !"SMTP Parameters: " + &SMTPParametersSDT.ToJson())
```

### Rules (Rules)

```genexus
Parm(out:&SMTPParametersSDT);
```

