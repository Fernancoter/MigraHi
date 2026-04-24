# Procedure: WWP_SendMail

- **Module:** WWPBaseObjects.Mail
- **Description:** Send Mail
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Address | Variable | LONGVARCHAR |  | Address |
| Attachment | Variable | GX_BUSCOMP_LEVEL |  | Attachment |
| BCCAddressList | Variable | LONGVARCHAR |  | BCCAddress List |
| CCAddressList | Variable | LONGVARCHAR |  | CCAddress List |
| FileExists | Variable | Boolean |  | File Exists |
| Mail | Variable | GX_BUSCOMP |  | Mail |
| MailId | Parameter | NUMERIC | in | Mail Id |
| MailMessage | Variable | GX_USRDEFTYP |  | Mail Message |
| MailRecipient | Variable | GX_USRDEFTYP |  | Mail Recipient |
| SendStatus | Parameter | NUMERIC | out | Send Status |
| SMTPSession | Parameter | GX_USRDEFTYP | in | SMTPSession |
| StatusMessage | Variable | LONGVARCHAR |  | Status Message |
| ToAddressList | Variable | LONGVARCHAR |  | To Address List |
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
&SendStatus = -1
&Mail.Load(&MailId)

If &Mail.Fail()
	WWP_Logger.Error(&Pgmname, !"Mail not found with id: " + &MailId.ToString())
	return
EndIf

If &Mail.WWPMailSenderAddress.IsEmpty() or &Mail.WWPMailSenderName.IsEmpty()
	WWP_Logger.Error(&Pgmname, !"Sender address/name cannot be empty: " + &MailId.ToString())
	WWP_UpdateMailStatus(&MailId, WWPBaseObjects.Mail.WWP_StatusMail.Error, !"Sender address/name cannot be empty")
	return
EndIf

If &Mail.SAE.WWPMailSubject.IsEmpty() or &Mail.WWPMailBody.IsEmpty()
	WWP_Logger.Error(&Pgmname, !"Mail subject/body cannot be empty: " + &MailId.ToString())
	WWP_UpdateMailStatus(&MailId, WWP_StatusMail.Error, !"Mail subject/body cannot be empty")
	return
EndIf

If &Mail.WWPMailTo.IsEmpty() and &Mail.WWPMailCC.IsEmpty() and &Mail.WWPMailBCC.IsEmpty()
	WWP_Logger.Error(&Pgmname, !"Mail recipient cannot be empty: " + &MailId.ToString())
	WWPBaseObjects.Mail.WWP_UpdateMailStatus(&MailId, WWP_StatusMail.Error, !"Mail recipient cannot be empty")
	return
EndIf

&ToAddressList = WWP_ParseMailAddressList(&Mail.WWPMailTo)
If not &Mail.WWPMailTo.IsEmpty() and &ToAddressList.Count = 0
	WWPBaseObjects.WWP_Logger.Error(&Pgmname, !"Mail recipient is not valid address list: " + &MailId.ToString())
	WWPBaseObjects.Mail.WWP_UpdateMailStatus(&MailId, WWP_StatusMail.Error, !"Mail To is invalid")
	return
EndIf

&CCAddressList = WWP_ParseMailAddressList(&Mail.WWPMailCC)
If not &Mail.WWPMailCC.IsEmpty() and &CCAddressList.Count = 0
	WWP_Logger.Error(&Pgmname, !"Mail recipient is not valid address list: " + &MailId.ToString())
	WWP_UpdateMailStatus(&MailId, WWPBaseObjects.Mail.WWP_StatusMail.Error, !"Mail CC is invalid")
	return
EndIf

&BCCAddressList = WWP_ParseMailAddressList(&Mail.WWPMailBCC)
If not &Mail.WWPMailBCC.IsEmpty() and &BCCAddressList.Count = 0
	WWP_Logger.Error(&Pgmname, !"Mail recipient is not valid address list: " + &MailId.ToString())
	WWP_UpdateMailStatus(&MailId, WWP_StatusMail.Error, !"Mail BCC is invalid")
	return
EndIf

For &Attachment in &Mail.Attachments
	&FileExists = (FileExist(&Attachment.WWPMailAttachmentFile) = 1)
	If not &FileExists
		WWP_Logger.Error(&Pgmname, !"Attachment is not a valid file: " + &Attachment.WWPMailAttachmentFile)
		WWP_UpdateMailStatus(&MailId, WWPBaseObjects.Mail.WWP_StatusMail.Error, !"Attachment invalid")
		return
	EndIf
EndFor

&MailMessage = new()
&MailMessage.From.Address = &Mail.WWPMailSenderAddress
&MailMessage.From.Name = &Mail.WWPMailSenderName
&MailMessage.Subject = &Mail.WWPMailSubject
&MailMessage.HTMLText = &Mail.WWPMailBody

&MailRecipient = new()
&MailRecipient.Address = &Mail.WWPMailSenderAddress
&MailRecipient.Name = &Mail.WWPMailSenderName
&SMTPSession.Sender = &MailRecipient

For &Address in &ToAddressList
	&MailRecipient = new()
	&MailRecipient.Address = &Address
	&MailMessage.To.Add(&MailRecipient)
EndFor

For &Address in &CCAddressList
	&MailRecipient = new()
	&MailRecipient.Address = &Address
	&MailMessage.CC.Add(&MailRecipient)
EndFor

For &Address in &BCCAddressList
	&MailRecipient = new()
	&MailRecipient.Address = &Address
	&MailMessage.BCC.Add(&MailRecipient)
EndFor

For &Attachment in &Mail.Attachments
	&MailMessage.Attachments.Add(&Attachment.WWPMailAttachmentFile)
EndFor

&SendStatus = &SmtpSession.Send(&MailMessage)
&StatusMessage = WWP_GetStatusCodeMessage(&SendStatus)

If &SendStatus <> 0
	WWP_Logger.Error(&Pgmname, Format(!"Error sending mail with id: %1 - Code: %2 - %3", &MailId.ToString(), &SendStatus.ToString().Trim(), &StatusMessage))
	WWPBaseObjects.Mail.WWP_UpdateMailStatus(&MailId, Mail.WWP_StatusMail.Error, Format(!"Code: %1 - Message: %2", &SendStatus.ToString().Trim(), &StatusMessage))
	return
EndIf

WWP_UpdateMailStatus(&MailId, WWPBaseObjects.Mail.WWP_StatusMail.Sent, !"OK")
commit
```

### Rules (Rules)

```genexus
parm(in:&MailId, in:&SMTPSession, out:&SendStatus);
```

