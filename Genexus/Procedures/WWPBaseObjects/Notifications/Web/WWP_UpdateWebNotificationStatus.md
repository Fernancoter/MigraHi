# Procedure: WWP_UpdateWebNotificationStatus

- **Module:** WWPBaseObjects.Notifications.Web
- **Description:** Update Web Notification Status
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WebNotification | Variable | GX_BUSCOMP |  | Web Notification |
| WebNotificationId | Parameter | NUMERIC | in | Web Notification Id |
| WebNotificationStatus | Parameter | NUMERIC | in | Web Notification Status |
| WebNotificationDetail | Parameter | LONGVARCHAR | in | Web Notification Detail |
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
&WebNotification.Load(&WebNotificationId)

If &WebNotification.Fail()
	WWP_Logger.Error(&Pgmname, !"Web notificaiton not found with id: " + &WebNotificationId.ToString())
	return
EndIf

&WebNotification.WWPWebNotificationProcessed = ServerNow()
&WebNotification.WWPWebNotificationStatus = &WebNotificationStatus
&WebNotification.WWPWebNotificationDetail = &WebNotificationDetail
&WebNotification.Save()

If &WebNotification.Fail()
	WWP_Logger.Error(&Pgmname, !"Error updating web notification status with id: " + &WebNotificationId.ToString())
	return
EndIf
```

### Rules (Rules)

```genexus
parm(in:&WebNotificationId, in:&WebNotificationStatus, in:&WebNotificationDetail);
```

