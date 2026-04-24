# Procedure: WWP_CleanNotificationURL

- **Module:** WWPBaseObjects.Notifications.Common
- **Description:** Clean Notification URL
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Url | Parameter | VARCHAR | inout | Url |
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
&Url = &Url.Substring(&Url.LastIndexOf("/") + 1)
```

### Rules (Rules)

```genexus
parm(inout:&Url);
```

