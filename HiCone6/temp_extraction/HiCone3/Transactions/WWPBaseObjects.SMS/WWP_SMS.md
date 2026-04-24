# Transaction: WWP_SMS

- **Module:** WWPBaseObjects.SMS
- **Description:** WWP_SMS
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
| WWPSMSId | Attribute | Resolved via KB |  |  |
| WWPSMSMessage | Attribute | Resolved via KB |  |  |
| WWPSMSSenderNumber | Attribute | Resolved via KB |  |  |
| WWPSMSRecipientNumbers | Attribute | Resolved via KB |  |  |
| WWPSMSStatus | Attribute | Resolved via KB |  |  |
| WWPSMSCreated | Attribute | Resolved via KB |  |  |
| WWPSMSScheduled | Attribute | Resolved via KB |  |  |
| WWPSMSProcessed | Attribute | Resolved via KB |  |  |
| WWPSMSDetail | Attribute | Resolved via KB |  |  |
| WWPNotificationId | Attribute | Resolved via KB |  |  |
| WWPNotificationCreated | Attribute | Resolved via KB |  |  |

## Business Logic

### Rules (Rules)

```genexus

default(WWPSMSStatus, WWPBaseObjects.SMS.WWP_StatusSMS.Pending);
default(WWPSMSCreated, ServerNow());
default(WWPSMSScheduled, ServerNow());
```

