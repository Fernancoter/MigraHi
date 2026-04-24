# Procedure: WWP_ChangeNotificationStatus

- **Module:** WWPBaseObjects.Notifications.Common
- **Description:** Set Notification Read/Unread
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPNotificationId | Variable | NUMERIC |  | WWPNotification Id |
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
Stub SetNotificationReadUnreadById(&WWPNotificationId)
	For Each WWP_Notification
		Where WWPNotificationId = &WWPNotificationId
		If WWPNotificationIsRead
			WWPNotificationIsRead = False
		Else
			WWPNotificationIsRead = True
		Endif
	EndFor
EndStub

Stub SetNotificationReadById(&WWPNotificationId)
	For Each WWP_Notification
		Where WWPNotificationId = &WWPNotificationId
			WWPNotificationIsRead = True
	EndFor
EndStub

Stub SetAllNotificationsOfLoggedUserRead()
	For Each WWP_Notification
		Where DB.WWPUserExtendedId = WWP_GetLoggedUserId()
		WWPNotificationIsRead = true
	EndFor
EndStub
```

