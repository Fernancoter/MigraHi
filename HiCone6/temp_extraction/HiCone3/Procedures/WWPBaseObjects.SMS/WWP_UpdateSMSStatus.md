# Procedure: WWP_UpdateSMSStatus

- **Module:** WWPBaseObjects.SMS
- **Description:** Update SMS Status
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SMSDetail | Parameter | LONGVARCHAR | in | SMSDetail |
| SMSStatus | Parameter | NUMERIC | in | SMSStatus |
| SMSId | Parameter | NUMERIC | in | SMSId |
| SMS | Variable | GX_BUSCOMP |  | SMS |
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
&SMS.Load(&SMSId)

If &SMS.Fail()
	WWP_Logger.Error(&Pgmname, !"SMS not found with id: " + &SMSId.ToString())
	return
EndIf

&SMS.WWPBaseObjects.Mail.DB.WWPSMSProcessed = ServerNow()
&SMS.WWPSMSStatus = &SMSStatus
&SMS.WWPSMSDetail = &SMSDetail
&SMS.Save()

If &SMS.Fail()
	WWP_Logger.Error(&Pgmname, !"Error updating SMS status with id: " + &SMSId.ToString())
	return
EndIf
```

### Rules (Rules)

```genexus
parm(in:&SMSId, in:&SMSStatus, in:&SMSDetail);
```

