# Procedure: DVMessageGetDesktopNotificationMsg

- **Module:** WWPBaseObjects
- **Description:** DVMessage Get Desktop Notification Msg
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ClickRedirectURL | Parameter | VARCHAR | in | Click Redirect URL |
| DesktopNotificationIconUrl | Parameter | VARCHAR | in | Desktop Notification Icon Url |
| Parms | Parameter | VARCHAR | out | Parms |
| Text | Parameter | CHARACTER | in | Text |
| Title | Parameter | CHARACTER | in | Title |
| Type | Variable | CHARACTER |  | Type |
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

&Parms = WWPBaseObjects.DVMessageGetAdvancedNotificationMsg(&Title, &Text, &Type, '', DVMessageBoolean.NoSpecify, WWPBaseObjects.DVMessageBoolean.True, &DesktopNotificationIconUrl, &ClickRedirectURL)
```

### Rules (Rules)

```genexus
parm(in:&Title, in:&Text, in:&DesktopNotificationIconUrl, in:&ClickRedirectURL, out:&Parms);
```

