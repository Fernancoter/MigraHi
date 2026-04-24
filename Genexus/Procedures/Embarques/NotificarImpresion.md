# Procedure: NotificarImpresion

- **Module:** Embarques
- **Description:** Notificar Impresion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Body | Variable | LONGVARCHAR |  | Body |
| EmbarqueId | Variable | NUMERIC |  | Embarque Id |
| EmbCodigo | Variable | VARCHAR |  | Emb Codigo |
| EmbNoPallet | Variable | VARCHAR |  | Emb No Pallet |
| IntParameter | Variable | NUMERIC |  | Int Parameter |
| Mail | Variable | GX_BUSCOMP |  | Mail |
| MAIL_TO_SUP | Variable | LONGVARCHAR |  | MAIL_TO_SUP |
| MailId | Variable | NUMERIC |  | Mail Id |
| PalletItem | Variable | GX_SDT |  | Pallet Item |
| Parameter | Variable | LONGVARCHAR |  | Parameter |
| ret | Variable | NUMERIC |  | ret |
| SDTPalletExterno | Variable | GX_SDT |  | SDTPallet Externo |
| SMTPSession | Variable | GX_USRDEFTYP |  | SMTPSession |
| Status | Variable | NUMERIC |  | Status |
| tabHTML | Variable | VARCHAR |  | tab HTML |
| TempMail | Variable | GX_BUSCOMP |  | Temp Mail |
| TextParameter | Variable | VARCHAR |  | Text Parameter |
| PaletNoSerie | Parameter | VARCHAR | in | Palet No Serie |
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

	do 'Init_SMTP'
	
	Sub 'Init_SMTP'	
	WWP_GetParameter.Text(!"SMTP_Host", &Parameter)
		&SMTPSession.Host = &Parameter
	WWPBaseObjects.WWP_GetParameter.Integer(!"SMTP_Port", &IntParameter)
    	&SMTPSession.Port = &IntParameter
		WWPBaseObjects.WWP_GetParameter.Integer(!"SMTP_Timeout", &IntParameter)
    	&SMTPSession.Timeout = &IntParameter
		WWPBaseObjects.WWP_GetParameter.Text(!"Sender_Address", &Parameter)
    	&SMTPSession.Sender.Address  = &Parameter
		WWPBaseObjects.WWP_GetParameter.Text(!"Sender_Name", &Parameter)
    	&SMTPSession.Sender.Name = &Parameter
		WWPBaseObjects.WWP_GetParameter.Text(!"SMTP_Username", &Parameter)
		&SMTPSession.UserName = &Parameter
		WWP_GetParameter.Text(!"SMTP_Password", &Parameter)
    	&SMTPSession.Password = &Parameter
		&SMTPSession.Secure = 1
    	&SMTPSession.Authentication = 1
		

		
	&ret = &SMTPSession.Login() 
    	if &SMTPSession.ErrCode = 0 
       		  do 'MailTemplate'
			  &SMTPSession.Logout()
		else
			 Msg('SMTP: ' + &ret.ToString() + ':error al autenticarse')
    	endif
	EndSub

	Sub 'MailTemplate'
		&TempMail.Load('REIMPRESION_PALLET')
		If &TempMail.Fail() = false
			&Body = &TempMail.WWPMailTemplateBody
			&Body = &Body.Replace('@PaletNoSerie', &PaletNoSerie)

			do 'SendMail'
		endif
	EndSub

	Sub 'SendMail'
		&MAIL_TO_SUP = ObtenerConfiguracion.Udp(!'NOTIFICACION_EMBARQUE')
		
		if &MAIL_TO_SUP.IsEmpty() = false
			&MailId = 0
			&Mail = New()
			&Mail.WWPNotificationId.SetNull()
			&Mail.WWPMailSubject = &TempMail.WWPMailTemplateSubject
			&Mail.WWPMailSenderAddress = &TempMail.WWPMailTemplateSenderAddress
			&Mail.WWPMailSenderName = &TempMail.WWPMailTemplateSenderName
			&Mail.WWPMailTo = &MAIL_TO_SUP
			&Mail.WWPMailBody = &Body
			&Mail.Save()
			
			if &Mail.Success()
				&MailId = &Mail.WWPMailId
				commit
			else
				Msg('ErrMail: ' + &Mail.GetMessages().ToJson())
			endif
			
			if &MailId > 0
				WWP_SendMail(&MailId, &SMTPSession, &Status)
			endif
		endif
	
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&PaletNoSerie);
```

