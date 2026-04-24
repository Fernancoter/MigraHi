# Procedure: WWP_ValidateVerificationCode

- **Module:** WWPBaseObjects.SMS
- **Description:** Validate Verification Code
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BasicAuthHeader | Variable | LONGVARCHAR |  | Basic Auth Header |
| Code | Parameter | LONGVARCHAR | in | Code |
| HttpClient | Variable | GX_USRDEFTYP |  | Http Client |
| PhoneNumber | Parameter | LONGVARCHAR | in | Phone Number |
| RequestBody | Variable | LONGVARCHAR |  | Request Body |
| RequestURL | Variable | VARCHAR |  | Request URL |
| Response | Variable | LONGVARCHAR |  | Response |
| SMSParametersSDT | Variable | GX_SDT |  | SMSParameters SDT |
| Success | Parameter | Boolean | out | Success |
| ValidateVerificationCodeResultSDT | Parameter | GX_SDT | out | Validate Verification Code Result SDT |
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

If &Code.IsEmpty()
	WWP_Logger.Error(&Pgmname, !"Verification code cannot be empty")
	return
EndIf

&SMSParametersSDT = WWP_GetSMSParameters()
&BasicAuthHeader = !"Basic " + ToBase64(&SMSParametersSDT.ApplicationKey + !":" + &SMSParametersSDT.ApplicationSecret)

&RequestBody = !'{ "method": "sms", "sms": { "code": "%1" } }'
&RequestBody = Format(&RequestBody, &Code.Trim())

&RequestURL = Format(!"verifications/number/%1", &PhoneNumber.Trim())

&HttpClient.Secure = 1
&HttpClient.Host = !"verificationapi-v1.sinch.com"
&HttpClient.BaseUrl = !"verification/v1/"
&HttpClient.AddHeader(!"Content-Type", !"application/json")
&HttpClient.AddHeader(!"Authorization", &BasicAuthHeader)
&HttpClient.AddString(&RequestBody)
&HttpClient.Execute(!"PUT", &RequestURL)

&Response = &HttpClient.ToString()
WWPBaseObjects.WWP_Logger.Debug(&Pgmname, !"Sinch API response: " + &Response)
&ValidateVerificationCodeResultSDT.FromJson(&Response)

If &HttpClient.StatusCode <> 200
	WWPBaseObjects.WWP_Logger.Error(&Pgmname, Format(!"Error validating SMS code - Code: %1 - %2", &HttpClient.ErrCode.ToString().Trim(), &HttpClient.ErrDescription))
	return
EndIf

&Success = True
```

### Rules (Rules)

```genexus
parm(in:&PhoneNumber, in:&Code, out:&Success, out:&ValidateVerificationCodeResultSDT);
```

