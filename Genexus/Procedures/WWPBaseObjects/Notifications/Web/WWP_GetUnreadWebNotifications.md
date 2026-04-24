# Procedure: WWP_GetUnreadWebNotifications

- **Module:** WWPBaseObjects.Notifications.Web
- **Description:** Get Unread Web Notifications
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTNotificationsData | Parameter | GX_SDT | out | SDTNotifications Data |
| SDTNotificationsDataItem | Variable | GX_SDT |  | SDTNotifications Data Item |
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
WWP_Logger.Debug(&Pgmname, !"Getting unread notifications")

&SDTNotificationsData = new()

For Each WWPBaseObjects.Notifications.Web.WWP_WebNotification 
	Order (WWPWebNotificationCreated)
  	Where WWPUserExtendedId = &UserGUID
	Where WWPWebNotificationRead.IsNull() or WWPWebNotificationRead.IsEmpty()
	
	&SDTNotificationsDataItem = new()
	&SDTNotificationsDataItem.NotificationIconClass = WWPWebNotificationIcon
	&SDTNotificationsDataItem.NotificationTitle = WWPWebNotificationTitle
	&SDTNotificationsDataItem.NotificationDescription = WWPWebNotificationText
	&SDTNotificationsDataItem.NotificationDatetime = WWPWebNotificationCreated
	&SDTNotificationsData.Add(&SDTNotificationsDataItem)
when none
	WWPBaseObjects.WWP_Logger.Debug(&Pgmname, !"No unread notifications found")
EndFor
```

### Rules (Rules)

```genexus
parm(in:&UserGUID, out:&SDTNotificationsData);
```

