# Transaction: WWP_Mail

- **Module:** WWPBaseObjects.Mail
- **Description:** Mail
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPContext | Variable | GX_SDT |  | WWPContext |
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| AuditingObject | Variable | GX_SDT |  | Auditing Object |
| TrnContext | Variable | GX_SDT |  | Trn Context |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| Insert_WWPNotificationId | Variable | NUMERIC |  | Insert_WWPNotification Id |
| TrnContextAtt | Variable | GX_SDT |  | Trn Context Att |
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |
| GxRemove | Variable | NUMERIC |  | Gx Remove |
| Mode | Variable | CHARACTER |  | Mode |
| WWPMailId | Attribute | Resolved via KB |  |  |
| WWPMailSubject | Attribute | Resolved via KB |  |  |
| WWPMailBody | Attribute | Resolved via KB |  |  |
| WWPMailTo | Attribute | Resolved via KB |  |  |
| WWPMailCC | Attribute | Resolved via KB |  |  |
| WWPMailBCC | Attribute | Resolved via KB |  |  |
| WWPMailSenderAddress | Attribute | Resolved via KB |  |  |
| WWPMailSenderName | Attribute | Resolved via KB |  |  |
| WWPMailStatus | Attribute | Resolved via KB |  |  |
| WWPMailCreated | Attribute | Resolved via KB |  |  |
| WWPMailScheduled | Attribute | Resolved via KB |  |  |
| WWPMailProcessed | Attribute | Resolved via KB |  |  |
| WWPMailDetail | Attribute | Resolved via KB |  |  |
| WWPNotificationId | Attribute | Resolved via KB |  |  |
| WWPNotificationCreated | Attribute | Resolved via KB |  |  |
| WWPMailAttachmentName | Attribute | Resolved via KB |  |  |
| WWPMailAttachmentFile | Attribute | Resolved via KB |  |  |

## Business Logic

### Start (Event)

```genexus
// Empty block or parsing failed
```

### After Trn (Event)

```genexus
// Empty block or parsing failed
```

### Rules (Rules)

```genexus

default(WWPMailStatus, WWPBaseObjects.Mail.WWP_StatusMail.Pending);
default(WWPMailCreated, ServerNow());
default(WWPMailScheduled, ServerNow());
```

