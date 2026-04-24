# Procedure: WWP_ToggleWebNotificationRead

- **Module:** WWPBaseObjects.Notifications.Web
- **Description:** Toggle Web Notification Read
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WebNotification | Variable | GX_BUSCOMP |  | Web Notification |
| WebNotificationId | Parameter | NUMERIC | in | Notification Id |
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
	WWP_Logger.Error(&Pgmname, !"Notification not found with id: " + &WebNotificationId.ToString().Trim())
	return
EndIf

If &WebNotification.WWPWebNotificationRead.IsNull() or &WebNotification.WWPWebNotificationRead.IsEmpty()
	&WebNotification.WWPWebNotificationRead = ServerNow()
Else
	&WebNotification.WWPWebNotificationRead.SetNull()
EndIf

&WebNotification.Save()
Commit
```

### Rules (Rules)

```genexus
parm(in:&WebNotificationId);
```

