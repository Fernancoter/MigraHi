# Procedure: DVMessageGetBasicNotificationMsg

- **Module:** WWPBaseObjects
- **Description:** DVMessage Get Basic Notification Msg
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AnimateSpeed | Variable | NUMERIC |  | Animate Speed Milliseconds |
| ClickRedirectURL | Parameter | VARCHAR | in | Click Redirect URL |
| ControlSelector | Parameter | CHARACTER | in | Control Selector |
| Hide | Parameter | CHARACTER | in | Hide |
| Parms | Parameter | VARCHAR | out | Parms |
| Text | Parameter | CHARACTER | in | Text |
| Title | Parameter | CHARACTER | in | Title |
| Type | Parameter | CHARACTER | in | Type |
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

&Parms = DVMessageGetAdvancedNotificationMsg(&Title, &Text, &Type, &ControlSelector, &Hide, WWPBaseObjects.DVMessageBoolean.False, '', &ClickRedirectURL)
```

### Rules (Rules)

```genexus
parm(in:&Title, in:&Text, in:&Type, in:&ControlSelector, in:&Hide, in:&ClickRedirectURL, out:&Parms);
```

