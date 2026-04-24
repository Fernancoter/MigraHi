# Procedure: NotificarSupervisor

- **Module:** Embarques
- **Description:** Notificar Supervisor
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Body | Variable | LONGVARCHAR |  | Body |
| EmbarqueId | Parameter | NUMERIC | in | Embarque Id |
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
	
	//1.Contiene Pallets Externos
	&SDTPalletExterno.Clear()
	for each DB.EmbarquePallet
		where EmbarqueDetalleId > 0
		where EmbarqueId = &EmbarqueId
		where EmbarqueEstatus = EstatusEmbarque.Finalizado
		&EmbCodigo = EmbarqueCodigo
		&EmbNoPallet = EmbarquePalletNoPallet
		
		for each DB.Palet
			where PaletId > 0
			where PaletNoSerie = &EmbNoPallet
			where PaletTipo = TipoPalet.Externo
			
			&PalletItem = New()
			&PalletItem.PaletId = PaletId
			&PalletItem.PaletNoSerie = PaletNoSerie
			&SDTPalletExterno.Add(&PalletItem)
			//Exit
		endfor
	endfor

	//2.Preparar plantilla de correo con relación de pallets externos
	if &SDTPalletExterno.Count > 0
		msg('Aviso pallets externos')
		
		&tabHTML = '<table align="left" border="1" cellpadding="1" cellspacing="1" style="width:150px">'
    		&tabHTML += '<thead><tr><th>Pallets</th></tr></thead>'
		&tabHTML += '<tbody>'
		
		for &PalletItem in &SDTPalletExterno
			&tabHTML += '<tr><td>' + &PalletItem.PaletNoSerie + '</td></tr>'
		endfor
		
    		&tabHTML += '</tbody>'
    		&tabHTML += '</table>'
		
		//3.Enviar correo a los supervisores
		do 'Init_SMTP'
	endif

	Sub 'Init_SMTP'	
		WWPBaseObjects.WWP_GetParameter.Text(!"SMTP_Host", &Parameter)
		&SMTPSession.Host = &Parameter
		WWP_GetParameter.Integer(!"SMTP_Port", &IntParameter)
    	&SMTPSession.Port = &IntParameter
		WWP_GetParameter.Integer(!"SMTP_Timeout", &IntParameter)
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
		&TempMail.Load('EMB_PALLET_EXT')
		If &TempMail.Fail() = false
			&Body = &TempMail.WWPMailTemplateBody
			&Body = &Body.Replace('@EmbCodigo', &EmbCodigo)
			&Body = &Body.Replace('@TabPalExt', &tabHTML)
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
			&Mail.WWPMailSenderAddress = &TempMail.DB.WWPMailTemplateSenderAddress
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
parm(in:&EmbarqueId);
```

