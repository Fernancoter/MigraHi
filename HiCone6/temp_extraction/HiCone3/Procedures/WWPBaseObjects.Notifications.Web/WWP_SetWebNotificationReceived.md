# Procedure: WWP_SetWebNotificationReceived

- **Module:** WWPBaseObjects.Notifications.Web
- **Description:** Set Web Notification Received
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WebNotificationId | Parameter | NUMERIC | in | Web Notification Id |
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
For Each WWP_WebNotification 
	where WWPWebNotificationId = &WebNotificationId
	WWPWebNotificationReceived = true
EndFor
Commit
```

### Rules (Rules)

```genexus
parm(in:&WebNotificationId);
```

