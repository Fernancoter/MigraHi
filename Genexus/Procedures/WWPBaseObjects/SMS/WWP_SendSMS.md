# Procedure: WWP_SendSMS

- **Module:** WWPBaseObjects.SMS
- **Description:** Send SMS
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HttpClient | Variable | GX_USRDEFTYP |  | Http Client |
| RecipientPhoneList | Variable | LONGVARCHAR |  | Recipient Phone List |
| RequestBody | Variable | LONGVARCHAR |  | Request Body |
| Response | Variable | LONGVARCHAR |  | Response |
| SendSMSResultSDT | Parameter | GX_SDT | out | Send SMSResult SDT |
| SMS | Variable | GX_BUSCOMP |  | SMS |
| SMSId | Parameter | NUMERIC | in | SMSId |
| SMSParametersSDT | Parameter | GX_SDT | in | SMSParameters SDT |
| Success | Parameter | Boolean | out | Success |
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
&Success = False
&SMS.Load(&SMSId)

If &SMS.Fail()
	WWP_Logger.Error(&Pgmname, !"SMS not found with id: " + &SMSId.ToString().Trim())
	return
EndIf

If &SMS.Produccion.WWPSMSMessage.IsEmpty()
	WWP_Logger.Error(&Pgmname, !"SMS message cannot be empty: " + &SMSId.ToString().Trim())
	WWP_UpdateSMSStatus(&SMSId, WWPBaseObjects.SMS.WWP_StatusSMS.Error, !"SMS message cannot be empty")
	return
EndIf

If &SMS.WWPSMSSenderNumber.IsEmpty()
	WWPBaseObjects.WWP_Logger.Error(&Pgmname, !"SMS sender cannot be empty: " + &SMSId.ToString().Trim())
	WWPBaseObjects.SMS.WWP_UpdateSMSStatus(&SMSId, WWP_StatusSMS.Error, !"SMS sender cannot be empty")
	return
EndIf

If &SMS.WWPSMSRecipientNumbers.IsEmpty()
	WWPBaseObjects.WWP_Logger.Error(&Pgmname, !"SMS recipient cannot be empty: " + &SMSId.ToString().Trim())
	WWP_UpdateSMSStatus(&SMSId, WWP_StatusSMS.Error, !"SMS recipient cannot be empty")
	return
EndIf

&RecipientPhoneList = WWPBaseObjects.SMS.WWP_ParsePhoneNumbersList(&SMS.WWPSMSRecipientNumbers)
If not &SMS.WWPSMSRecipientNumbers.IsEmpty() and &RecipientPhoneList.Count = 0
	WWP_Logger.Error(&Pgmname, !"SMS recipient is not valid phone list: " + &SMSId.ToString().Trim())
	WWPBaseObjects.SMS.WWP_UpdateSMSStatus(&SMSId, WWP_StatusSMS.Error, !"SMS recipient is not valid")
	return
EndIf

&RequestBody = !'{"from": "%1", "to": %2, "body": "%3" }'
&RequestBody = Format(&RequestBody, &SMS.WWPSMSSenderNumber.Trim(), &RecipientPhoneList.ToJson(), &SMS.WWPSMSMessage.Trim())

WWPBaseObjects.WWP_Logger.Debug(&Pgmname, !"Calling Sinch API with body: " + &RequestBody)

&HttpClient = new()
&HttpClient.Secure = 1
&HttpClient.Host = !"sms.api.sinch.com"
&HttpClient.BaseUrl = Format(!"xms/v1/%1/", &SMSParametersSDT.ServicePlanId)
&HttpClient.AddHeader(!"Authorization", !"Bearer " + &SMSParametersSDT.Token.Trim())
&HttpClient.AddHeader(!"Content-Type", !"application/json")
&HttpClient.AddString(&RequestBody)
&HttpClient.Execute(!"POST", !"batches")

&Response = &HttpClient.ToString()
WWPBaseObjects.WWP_Logger.Debug(&Pgmname, !"Sinch API response: " + &Response)
&SendSMSResultSDT.FromJson(&Response)

If &HttpClient.StatusCode <> 201
	WWP_Logger.Error(&Pgmname, Format(!"Error sending sms with id: %1 - Code: %2 - %3", &SMSId.ToString().Trim(), &HttpClient.ErrCode.ToString().Trim(), &HttpClient.ErrDescription))
	WWP_UpdateSMSStatus(&SMSId, WWP_StatusSMS.Error, Format(!"Code: %1 - %2", &HttpClient.ErrCode.ToString().Trim(), &HttpClient.ErrDescription))
	return
EndIf

WWP_UpdateSMSStatus(&SMSId, WWP_StatusSMS.Sent, &Response)
&Success = True
commit
```

### Rules (Rules)

```genexus
parm(in:&SMSId, in:&SMSParametersSDT, out:&Success, out:&SendSMSResultSDT);
```

