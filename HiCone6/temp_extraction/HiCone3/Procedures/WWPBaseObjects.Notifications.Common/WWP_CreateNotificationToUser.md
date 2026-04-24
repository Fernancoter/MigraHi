# Procedure: WWP_CreateNotificationToUser

- **Module:** WWPBaseObjects.Notifications.Common
- **Description:** Create Notification To User
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SenderName | Variable | VARCHAR |  | Sender Name |
| SenderAddress | Variable | VARCHAR |  | Sender Address |
| WWPNotificationDefinitionIcon | Parameter | VARCHAR | in | WWPNotification Definition Icon |
| WWPNotificationDefinitionTitle | Parameter | VARCHAR | in | WWPNotification Definition Title |
| WWPNotificationDefinitionShortDescription | Parameter | VARCHAR | in | WWPNotification Definition Short Description |
| WWPNotificationDefinitionLongDescription | Parameter | VARCHAR | in | WWPNotification Definition Long Description |
| WWPNotificationDefinitionLink | Parameter | VARCHAR | inout | WWPNotification Definition Link |
| WWPNotificationMetadata | Parameter | LONGVARCHAR | in | WWPNotification Metadata |
| WWPUserExtendedId | Parameter | CHARACTER | in | WWPUser Extended Id |
| WWPNotificationDefinitionId | Parameter | NUMERIC | in | WWPNotification Definition Id |
| WWPNotificationID | Variable | NUMERIC |  | WWPNotification Id |
| Mail | Variable | GX_BUSCOMP |  | Mail |
| WebNotification | Variable | GX_BUSCOMP |  | Web Notification |
| SMS | Variable | GX_BUSCOMP |  | SMS |
| MailBody | Variable | LONGVARCHAR |  | Mail Body |
| WWP_Notification | Variable | GX_BUSCOMP |  | WWP_Notification |
| MailTemplate | Variable | GX_BUSCOMP |  | Mail Template |
| IsDiscussionNotification | Parameter | Boolean | in | Is Discussion Notification |
| Notification_BaseUrl | Variable | VARCHAR |  | Notification_Base Url |
| Url | Variable | VARCHAR |  | Url |
| WWPUserExtendedEmail | Variable | VARCHAR |  | WWPUser Extended Email |
| WWPUserExtendedPhone | Variable | CHARACTER |  | WWPUser Extended Phone |
| SmsAndMailUrl | Variable | VARCHAR |  | Sms And Mail Url |
| TextParameter | Variable | VARCHAR |  | Text Parameter |
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
For Each WWPBaseObjects.WWP_UserExtended
	Where WWPUserExtendedId = &WWPUserExtendedId
	&WWP_Notification = New()
	&WWP_Notification.WWPUserExtendedId = &WWPUserExtendedId
	&WWP_Notification.WWPNotificationDefinitionId = &WWPNotificationDefinitionId
	&WWP_Notification.WWPNotificationTitle = &WWPNotificationDefinitionTitle
	&WWP_Notification.WWPNotificationShortDescription = &WWPNotificationDefinitionShortDescription
	&WWP_Notification.WWPNotificationIcon = &WWPNotificationDefinitionIcon
	WWP_CleanNotificationURL(&WWPNotificationDefinitionLink)
	
	&WWP_Notification.WWPNotificationLink = &WWPNotificationDefinitionLink
	&WWP_Notification.WWPNotificationMetadata = &WWPNotificationMetadata
	&WWP_Notification.Save()
	&WWPNotificationID = &WWP_Notification.WWPNotificationId
	
	&SmsAndMailUrl = Notifications.Common.WWP_VisualizeNotification.Link(&WWPNotificationID)
	WWPBaseObjects.Notifications.Common.WWP_CleanNotificationURL(&SmsAndMailUrl)
	
	WWPBaseObjects.WWP_GetParameter.Text("Notification_BaseURL", &Notification_BaseUrl)
	&SmsAndMailUrl = Format("%1%2", &Notification_BaseUrl, &SmsAndMailUrl) 
	
	If WWPUserExtendedEmaiNotif
		&WWPUserExtendedEmail = WWPUserExtendedEmail
		Do 'CreateMail'
	EndIf
	
	If &IsDiscussionNotification Or WWPUserExtendedDesktopNotif
		Do 'CreateDesktopNotification'
	EndIf
	
	If WWPUserExtendedMobileNotif
		Do 'CreateMobileNotification'
	EndIf
	
	If WWPUserExtendedSMSNotif
		If Not WWPUserExtendedPhone.IsEmpty()
			&WWPUserExtendedPhone = WWPUserExtendedPhone 
			Do 'CreateSMS'
		EndIf
	EndIf
	
EndFor

Sub 'CreateMail'
	&Mail = New()
	&Mail.WWPBaseObjects.WWPNotificationId = &WWPNotificationID
	
	&MailTemplate.Load(!"MailNotification")
	If &MailTemplate.Success()
		
		&Mail.WWPMailSenderName = &MailTemplate.WWPMailTemplateSenderName
		&Mail.WWPMailSenderAddress = &MailTemplate.Subscriptions.WWPMailTemplateSenderAddress
		&MailBody = &MailTemplate.WWPMailTemplateBody
	Else
		WWP_GetParameter.Text(!"Sender_Name", &SenderName)
		&Mail.WWPMailSenderName = &SenderName
		
		WWPBaseObjects.WWP_GetParameter.Text(!"Sender_Address", &SenderAddress)
		&Mail.WWPMailSenderAddress = &SenderAddress
    
		&MailBody = &WWPNotificationDefinitionLongDescription
		
	Endif
	&MailBody = &MailBody.Replace(!"[SHORT_DESCRIPTION]", &WWPNotificationDefinitionShortDescription)
	&MailBody = &MailBody.Replace(!"[LONG_DESCRIPTION]", &WWPNotificationDefinitionLongDescription)
	&MailBody = &MailBody.Replace(!"[TITLE]", &WWPNotificationDefinitionTitle)
	&MailBody = &MailBody.Replace(!"[LINK]", &SmsAndMailUrl)		
	&MailBody = &MailBody.Replace(!"[BASE_URL]", &Notification_BaseUrl)		
	&Mail.WWPMailBody = &MailBody
	&Mail.WWPMailTo = &WWPUserExtendedEmail
	&Mail.WWPMailSubject = &WWPNotificationDefinitionTitle
	&Mail.Save()
EndSub


Sub 'CreateDesktopNotification'
	For Each Web.WWP_WebClient
		Where WWPUserExtendedId = &WWPUserExtendedId 
		&WebNotification = New()
		&WebNotification.WWPNotificationId = &WWPNotificationID
		&WebNotification.WWPWebNotificationClientId = WWPWebClientId
		&WebNotification.WWPWebNotificationTitle = &WWPNotificationDefinitionTitle
		&WebNotification.WWPWebNotificationIcon = &WWPNotificationDefinitionIcon
		&WebNotification.WWPWebNotificationText = &WWPNotificationDefinitionShortDescription
		&WebNotification.Save()
	EndFor
EndSub

Sub 'CreateSMS'
	&SMS = New()
	&SMS.WWPNotificationId = &WWPNotificationID
	&SMS.WWPSMSMessage = &WWPNotificationDefinitionShortDescription
	&SMS.WWPSMSRecipientNumbers = &WWPUserExtendedPhone
	WWPBaseObjects.WWP_GetParameter.Text(!"SMS_DefaultSender", &TextParameter)
	&SMS.WWPSMSSenderNumber = &TextParameter
	&SMS.Save()
EndSub


Sub 'CreateMobileNotification'
EndSub
```

### Rules (Rules)

```genexus
parm(in:&WWPUserExtendedId, in:&WWPNotificationDefinitionId, in:&WWPNotificationDefinitionTitle, in:&WWPNotificationDefinitionShortDescription, in:&WWPNotificationDefinitionLongDescription, inout:&WWPNotificationDefinitionLink, in:&WWPNotificationMetadata, in:&WWPNotificationDefinitionIcon, in:&IsDiscussionNotification);
```

