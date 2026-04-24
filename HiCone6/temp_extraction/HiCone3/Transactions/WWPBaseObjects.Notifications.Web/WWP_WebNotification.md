# Transaction: WWP_WebNotification

- **Module:** WWPBaseObjects.Notifications.Web
- **Description:** WWP_Web Notification
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |
| GxRemove | Variable | NUMERIC |  | Gx Remove |
| Mode | Variable | CHARACTER |  | Mode |
| WWPWebNotificationId | Attribute | Resolved via KB |  |  |
| WWPWebNotificationTitle | Attribute | Resolved via KB |  |  |
| WWPNotificationId | Attribute | Resolved via KB |  |  |
| WWPNotificationCreated | Attribute | Resolved via KB |  |  |
| WWPNotificationMetadata | Attribute | Resolved via KB |  |  |
| WWPNotificationDefinitionName | Attribute | Resolved via KB |  |  |
| WWPWebNotificationText | Attribute | Resolved via KB |  |  |
| WWPWebNotificationIcon | Attribute | Resolved via KB |  |  |
| WWPWebNotificationClientId | Attribute | Resolved via KB |  |  |
| WWPWebNotificationStatus | Attribute | Resolved via KB |  |  |
| WWPWebNotificationCreated | Attribute | Resolved via KB |  |  |
| WWPWebNotificationScheduled | Attribute | Resolved via KB |  |  |
| WWPWebNotificationProcessed | Attribute | Resolved via KB |  |  |
| WWPWebNotificationRead | Attribute | Resolved via KB |  |  |
| WWPWebNotificationDetail | Attribute | Resolved via KB |  |  |
| WWPWebNotificationReceived | Attribute | Resolved via KB |  |  |

## Business Logic

### Rules (Rules)

```genexus
default(WWPWebNotificationStatus, WWP_StatusWebNotification.Pending);
default(WWPWebNotificationCreated, ServerNow());
default(WWPWebNotificationScheduled, ServerNow());
```

