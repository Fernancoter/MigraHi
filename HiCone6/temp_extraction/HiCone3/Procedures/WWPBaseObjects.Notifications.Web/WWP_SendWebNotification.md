# Procedure: WWP_SendWebNotification

- **Module:** WWPBaseObjects.Notifications.Web
- **Description:** Send Web Notification
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ServerSocket | Variable | GX_EXTERNAL_OBJECT |  | Server Socket |
| webnotification | Variable | GX_BUSCOMP |  | webnotification |
| WebNotificationId | Parameter | NUMERIC | in | Web Notification Id |
| SendStatus | Parameter | NUMERIC | out | Send Status |
| ClientId | Variable | CHARACTER |  | Client Id |
| NotificationInfo | Variable | GX_SDT |  | Notification Info |
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
&WebNotification.Load(&WebNotificationId)

If &WebNotification.Fail()
	WWP_Logger.Error(&Pgmname, !"Web Notification not found with id: " + &WebNotificationId.ToString().Trim())
	return
EndIf

If &WebNotification.WWPBaseObjects.WWPWebNotificationTitle.IsEmpty() or &WebNotification.Notifications.WWPWebNotificationText.IsEmpty()
	WWP_Logger.Error(&Pgmname, !"Title/Text cannot be empty: " + &WebNotificationId.ToString().Trim())
	WWP_UpdateWebNotificationStatus(&WebNotificationId, WWP_StatusWebNotification.Error, !"Title/Text cannot be empty")
	return
EndIf

If &WebNotification.WWPWebNotificationClientId.IsEmpty()
	WWPBaseObjects.WWP_Logger.Error(&Pgmname, !"Client Id cannot be empty: " + &WebNotificationId.ToString().Trim())
	WWP_UpdateWebNotificationStatus(&WebNotificationId, WWP_StatusWebNotification.Error, !"Client Id cannot be empty")
	return
EndIf

&NotificationInfo.Id = !"WebNotification#" + &WebNotificationId.ToString().Trim()
&NotificationInfo.Message = &WebNotification.ToJson()

&ClientId = &WebNotification.WWPWebNotificationClientId

&SendStatus = &ServerSocket.NotifyClient(&ClientId, &NotificationInfo)

If &SendStatus > 0
	WWP_Logger.Error(&Pgmname, Format(!"Error sending web notification with id: %1 - %2 - %3 - %4", &WebNotificationId.ToString().Trim(), &SendStatus, &ServerSocket.ErrCode.ToString().Trim(), &ServerSocket.ErrDescription))
	WWP_UpdateWebNotificationStatus(&WebNotificationId, WWP_StatusWebNotification.Error, Format(!"%1 - %2 - %3", &SendStatus, &ServerSocket.ErrCode.ToString().Trim(), &ServerSocket.ErrDescription))
	return
EndIf

WWP_UpdateWebNotificationStatus(&WebNotificationId, WWP_StatusWebNotification.Sent, !"OK")

commit
```

### Rules (Rules)

```genexus
parm(in:&WebNotificationId, out:&SendStatus);
```

