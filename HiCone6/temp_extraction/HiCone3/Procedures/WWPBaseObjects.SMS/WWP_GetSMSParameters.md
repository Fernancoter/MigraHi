# Procedure: WWP_GetSMSParameters

- **Module:** WWPBaseObjects.SMS
- **Description:** Get SMS Parameters
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SMSParametersSDT | Parameter | GX_SDT | out | SMSParameters SDT |
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
WWP_Logger.Debug(&Pgmname, !"Getting SMS Parameters")
&SMSParametersSDT = new()

WWPBaseObjects.WWP_GetParameter.Text(!"SMS_ServicePlanId", &TextParameter)
&SMSParametersSDT.ServicePlanId = &TextParameter

WWPBaseObjects.WWP_GetParameter.Text(!"SMS_Token", &TextParameter)
&SMSParametersSDT.Token = &TextParameter

WWP_GetParameter.Text(!"SMS_ApplicationKey", &TextParameter)
&SMSParametersSDT.ApplicationKey = &TextParameter

WWPBaseObjects.WWP_GetParameter.Text(!"SMS_ApplicationSecret", &TextParameter)
&SMSParametersSDT.ApplicationSecret = &TextParameter

WWP_GetParameter.Text(!"SMS_DefaultSender", &TextParameter)
&SMSParametersSDT.DefaultSender = &TextParameter

WWP_Logger.Debug(&Pgmname, !"SMS Parameters: " + &SMSParametersSDT.ToJson())
```

### Rules (Rules)

```genexus
Parm(out:&SMSParametersSDT);
```

