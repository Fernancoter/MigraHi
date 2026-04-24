# Procedure: WWP_UpdateMailStatus

- **Module:** WWPBaseObjects.Mail
- **Description:** Update Mail Status
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Mail | Variable | GX_BUSCOMP |  | Mail |
| MailDetail | Parameter | LONGVARCHAR | in | Mail Detail |
| MailId | Parameter | NUMERIC | in | Mail Id |
| MailStatus | Parameter | NUMERIC | in | Mail Status |
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
&Mail.Load(&MailId)

If &Mail.Fail()
	WWP_Logger.Error(&Pgmname, !"Mail not found with id: " + &MailId.ToString())
	return
EndIf

&Mail.WWPMailProcessed = ServerNow()
&Mail.WWPMailStatus = &MailStatus
&Mail.WWPMailDetail = &MailDetail
&Mail.Save()

If &Mail.Fail()
	WWP_Logger.Error(&Pgmname, !"Error updating mail status with id: " + &MailId.ToString())
	return
EndIf
```

### Rules (Rules)

```genexus
parm(in:&MailId, in:&MailStatus, in:&MailDetail);
```

