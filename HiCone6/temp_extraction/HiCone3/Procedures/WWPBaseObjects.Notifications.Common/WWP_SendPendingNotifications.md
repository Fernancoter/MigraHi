# Procedure: WWP_SendPendingNotifications

- **Module:** WWPBaseObjects.Notifications.Common
- **Description:** Send Pending Notifications
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SMTPParametersSDT | Variable | GX_SDT |  | SMTPParameters SDT |
| SmtpSession | Variable | GX_USRDEFTYP |  | Smtp Session |
| SMSParametersSDT | Variable | GX_SDT |  | SMSParameters SDT |
| SendStatus | Variable | NUMERIC |  | Send Status |
| Success | Variable | Boolean |  | Success |
| SendSMSResultSDT | Variable | GX_SDT |  | Send SMSResult SDT |
| StatusCode | Variable | NUMERIC |  | Status Code |
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
Do 'SendPendingMails'

Do 'SendPendingSMS'

Do 'SendPendingWebNotifications'

Do 'SendPendingMobileNotifications'


Sub 'SendPendingMails'
	&SMTPParametersSDT = WWP_GetSMTPParameters()
	
	&SmtpSession = new()
	&SmtpSession.Host = &SMTPParametersSDT.Host
	&SmtpSession.Port = &SMTPParametersSDT.Port
	&SmtpSession.Username = &SMTPParametersSDT.Username
	&SmtpSession.Password = &SMTPParametersSDT.Password
	&SmtpSession.Authentication = &SMTPParametersSDT.Authentication
	&SmtpSession.Secure = &SMTPParametersSDT.Secure
	&SmtpSession.Timeout = &SMTPParametersSDT.Timeout
	
	&StatusCode = &SmtpSession.Login()
	If &StatusCode <> 0
		WWP_Logger.Error(&Pgmname, !"Error during SMTP Login: " + &SmtpSession.ErrDescription)
	Else
		For Each WWP_Mail
			Where WWPMailStatus = WWPBaseObjects.Mail.WWP_StatusMail.Pending
			
			&StatusCode = WWP_SendMail(WWPMailId, &SmtpSession)
		
		EndFor
		
		&SmtpSession.Logout()
	EndIf
EndSub


Sub 'SendPendingSMS'
	&SMSParametersSDT = WWP_GetSMSParameters()
	For Each WWP_SMS
		Where WWPSMSStatus = WWPBaseObjects.SMS.WWP_StatusSMS.Pending
		WWP_SendSMS(WWPSMSId, &SMSParametersSDT, &Success, &SendSMSResultSDT)
	EndFor
EndSub


Sub 'SendPendingWebNotifications'
	For Each WWPBaseObjects.Notifications.Web.WWP_WebNotification
		Where WWPWebNotificationStatus = WWP_StatusWebNotification.Pending
		
		&SendStatus = WWP_SendWebNotification(WWPWebNotificationId)
	EndFor
	
EndSub

Sub 'SendPendingMobileNotifications'
EndSub
```

