# Procedure: WWP_GetNotificationDefinitionByName

- **Module:** WWPBaseObjects.Notifications.Common
- **Description:** WWP_Get Notification Definition By Name
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPEntityId | Parameter | NUMERIC | in | Entity Id |
| WWPNotificationDefinitionId | Parameter | NUMERIC | out | Notification Definition Id |
| WWPNotificationDefinitionName | Parameter | VARCHAR | in | Notification Definition Internal Name |
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
&WWPNotificationDefinitionId = 0
For Each WWP_NotificationDefinition
	Where WWPNotificationDefinitionName = &WWPNotificationDefinitionName
	Where WWPEntityId = &WWPEntityId
	&WWPNotificationDefinitionId = WWPNotificationDefinitionId
	Exit
EndFor
```

### Rules (Rules)

```genexus
Parm(in:&WWPNotificationDefinitionName, in:&WWPEntityId, out:&WWPNotificationDefinitionId);
```

