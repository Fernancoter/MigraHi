# Procedure: NotificationsRegistrationHandler

- **Module:** 
- **Description:** Notifications Registration Handler
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DeviceId | Parameter | CHARACTER | in | Device Id |
| DeviceName | Parameter | CHARACTER | in | Device Name |
| DeviceToken | Parameter | CHARACTER | in | Device Token |
| DeviceType | Parameter | NUMERIC | in | Device Type |
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
/* 
   Typical implementation of Notification Registration Handler
   Store Device Data in order to send notifications later.
*/
msg(&DeviceToken.ToString().Trim(), status)
/*
for each
   where DeviceType = &DeviceType // enum domain SmartDeviceType
   where DeviceId  = &DeviceId   // Character(128)
   DeviceToken = &DeviceToken    // Character(1000)
   DeviceName = &DeviceName       // Character(128)
when none
   new
      DeviceType  = &DeviceType
      DeviceId = &DeviceId
      DeviceToken = &DeviceToken
      DeviceName = &DeviceName
   endnew
endfor
*/
```

### Rules (Rules)

```genexus
parm(in: &DeviceType, in:&DeviceID, in:&DeviceToken, in:&DeviceName);

//"Warning: Input Parameters definition (name, type) cannot be changed"
```

