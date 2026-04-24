# Procedure: WWP_SendVerificationCode

- **Module:** WWPBaseObjects.SMS
- **Description:** Send Verification Code
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BasicAuthHeader | Variable | LONGVARCHAR |  | Basic Auth Header |
| HttpClient | Variable | GX_USRDEFTYP |  | Http Client |
| PhoneNumber | Parameter | LONGVARCHAR | in | Phone Number |
| RequestBody | Variable | LONGVARCHAR |  | Request Body |
| SendVerificationCodeResultSDT | Parameter | GX_SDT | out | Send Verification Code Result SDT |
| SMSParametersSDT | Variable | GX_SDT |  | SMSParameters SDT |
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

If &PhoneNumber.IsEmpty()
	WWP_Logger.Error(&Pgmname, !"Phone number cannot be empty")
	return
EndIf

&SMSParametersSDT = SMS.WWP_GetSMSParameters()
&BasicAuthHeader = !"Basic " + ToBase64(&SMSParametersSDT.ApplicationKey + !":" + &SMSParametersSDT.ApplicationSecret)

&RequestBody = !'{ "identity": { "type":"number", "endpoint":"%1" }, "method": "sms" }'
&RequestBody = Format(&RequestBody, &PhoneNumber.Trim())

WWP_Logger.Debug(&Pgmname, !"Calling Sinch API with header: " + &BasicAuthHeader)
WWP_Logger.Debug(&Pgmname, !"Calling Sinch API with body: " + &RequestBody)

&HttpClient = new()
&HttpClient.Secure = 1
&HttpClient.Host = !"verificationapi-v1.sinch.com"
&HttpClient.BaseUrl = !"verification/v1/"
&HttpClient.AddHeader(!"Content-Type", !"application/json")
&HttpClient.AddHeader(!"Authorization", &BasicAuthHeader)
&HttpClient.AddString(&RequestBody)
&HttpClient.Execute(!"POST", !"verifications")

&Response = &HttpClient.ToString()
WWP_Logger.Debug(&Pgmname, !"Sinch API response: " + &Response)
&SendVerificationCodeResultSDT.FromJson(&Response)

If &HttpClient.StatusCode <> 200
	WWP_Logger.Error(&Pgmname, Format(!"Error sending verification SMS - Code: %1 - %2", &HttpClient.ErrCode.ToString().Trim(), &HttpClient.ErrDescription))
	return
EndIf

&Success = True
```

### Rules (Rules)

```genexus
parm(in:&PhoneNumber, out:&Success, out:&SendVerificationCodeResultSDT);
```

