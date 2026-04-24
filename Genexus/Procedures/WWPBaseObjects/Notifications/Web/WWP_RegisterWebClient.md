# Procedure: WWP_RegisterWebClient

- **Module:** WWPBaseObjects.Notifications.Web
- **Description:** Register Web Client
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BrowserId | Parameter | NUMERIC | in | Browser Id |
| BrowserVersion | Parameter | LONGVARCHAR | in | Browser Version |
| ClientId | Parameter | CHARACTER | in | Client Id |
| DeviceType | Variable | NUMERIC |  | Device Type |
| GAMBrowser | Variable | NUMERIC |  | GAMBrowser |
| GAMBrowserId | Variable | NUMERIC |  | GAMBrowser Id |
| UserGUID | Parameter | CHARACTER | in | User GUID |
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
WWP_Logger.Debug(&Pgmname, !"Begin Web Client Registration")
If Not WWP_ExistsUserExtended(&UserGUID)
	WWP_Logger.Debug(&Pgmname, format(!'Creating User Extended %1...', &UserGUID))
	WWP_CreateUserExtended(&UserGUID, '')
EndIf
For each WWP_WebClient
    where WWPWebClientId = &ClientId
	WWPBaseObjects.WWP_Logger.Debug(&Pgmname, !"Updating Web Client")
	WWPWebClientBrowserId = GAMBrowser.Convert(&BrowserId)
	WWPWebClientBrowserVersion = &BrowserVersion
	WWPWebClientLastRegistered = ServerNow()
	WWPUserExtendedId = &UserGUID
when none
	WWPBaseObjects.WWP_Logger.Debug(&Pgmname, !"Creating Web Client")
	New 
		WWPWebClientId = &ClientId
		WWPWebClientBrowserId = GAMBrowser.Convert(&BrowserId)
		WWPWebClientBrowserVersion = &BrowserVersion
		WWPWebClientFirstRegistered = ServerNow()
		WWPWebClientLastRegistered = ServerNow()
		WWPUserExtendedId = &UserGUID
	EndNew
EndFor

WWP_Logger.Debug(&Pgmname, !"Completed Web Client Registration")
```

### Rules (Rules)

```genexus
parm(in:&ClientId, in:&BrowserId, in:&BrowserVersion, in:&UserGUID);
```

