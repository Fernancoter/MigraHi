# Procedure: WWP_IsReceivedWebNotification

- **Module:** WWPBaseObjects.Notifications.Web
- **Description:** Is Received Web Notification
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WebNotificationId | Parameter | NUMERIC | in | Web Notification Id |
| IsRecived | Parameter | Boolean | out | Is Recived |
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
&IsRecived = false
for each 
	where WWPWebNotificationId = &WebNotificationId
	if WWPWebNotificationReceived
		&IsRecived = true
	endif
	exit
endfor
```

### Rules (Rules)

```genexus
parm(in:&WebNotificationId, out:&IsRecived);
```

