# Transaction: WWP_WebClient

- **Module:** WWPBaseObjects.Notifications.Web
- **Description:** WWP_Web Client
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
| WWPWebClientId | Attribute | Resolved via KB |  |  |
| WWPWebClientBrowserId | Attribute | Resolved via KB |  |  |
| WWPWebClientBrowserVersion | Attribute | Resolved via KB |  |  |
| WWPWebClientFirstRegistered | Attribute | Resolved via KB |  |  |
| WWPWebClientLastRegistered | Attribute | Resolved via KB |  |  |
| WWPUserExtendedId | Attribute | Resolved via KB |  |  |

## Business Logic

### Rules (Rules)

```genexus
default(WWPWebClientFirstRegistered, ServerNow());
default(WWPWebClientLastRegistered, ServerNow());
```

