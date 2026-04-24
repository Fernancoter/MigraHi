# DataProvider: WWP_GetNotificationsForUser

- **Module:** WWPBaseObjects.Notifications.Common
- **Description:** Get Notifications For User
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DateTime | Variable | DATETIME |  | Date Time |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
WWP_SDTNotificationsData
{

	WWP_SDTNotificationsDataItem From WWP_Notification Order (WWPNotificationCreated)
	Where WWPUserExtendedId = WWPBaseObjects.WWP_GetLoggedUserId()
	Where Not WWPNotificationIsRead 
	{
		NotificationId = WWPNotificationId
		NotificationIconClass = ThemeClass:NotificationFontIcon + " " + WWPNotificationIcon
		NotificationTitle = WWPNotificationTitle
		NotificationDescription = WWPNotificationShortDescription
		NotificationDatetime = WWPNotificationCreated
	    NotificationLink = WWPNotificationLink
	}
}
```

