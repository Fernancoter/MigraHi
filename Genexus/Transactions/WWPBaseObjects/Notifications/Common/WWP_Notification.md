# Transaction: WWP_Notification

- **Module:** WWPBaseObjects.Notifications.Common
- **Description:** Notification
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
| WWPNotificationId | Attribute | Resolved via KB |  |  |
| WWPNotificationDefinitionId | Attribute | Resolved via KB |  |  |
| WWPNotificationDefinitionName | Attribute | Resolved via KB |  |  |
| WWPNotificationCreated | Attribute | Resolved via KB |  |  |
| WWPNotificationIcon | Attribute | Resolved via KB |  |  |
| WWPNotificationTitle | Attribute | Resolved via KB |  |  |
| WWPNotificationShortDescription | Attribute | Resolved via KB |  |  |
| WWPNotificationLink | Attribute | Resolved via KB |  |  |
| WWPNotificationIsRead | Attribute | Resolved via KB |  |  |
| WWPUserExtendedId | Attribute | Resolved via KB |  |  |
| WWPUserExtendedFullName | Attribute | Resolved via KB |  |  |
| WWPNotificationMetadata | Attribute | Resolved via KB |  |  |

## Business Logic

### Rules (Rules)

```genexus
WWPUserExtendedId.SetNull() If WWPUserExtendedId.IsEmpty() On AfterValidate;
Default(WWPNotificationCreated, ServerNow());
```

