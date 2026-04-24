# Procedure: WWP_HasSubscriptionsToDisplay

- **Module:** WWPBaseObjects.Subscriptions
- **Description:** WWP_Has Subscriptions To Display
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPEntityId | Variable | NUMERIC |  | Entity Id |
| HasSubscriptions | Parameter | Boolean | out | Has Subscriptions |
| WWPNotificationAppliesTo | Parameter | NUMERIC | in | WWPNotification Applies To |
| WWPEntityName | Parameter | VARCHAR | in | Entity Name |
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
&WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(&WWPEntityName)
&HasSubscriptions = False
For Each WWP_NotificationDefinition
	Where WWPNotificationDefinitionAllowUserSubscription = true
	Where WWPNotificationDefinitionAppliesTo = &WWPNotificationAppliesTo
	Where WWPEntityId = &WWPEntityId
	Where WWPNotificationDefinitionIsAuthorized = True
	&HasSubscriptions = True
	Exit
EndFor
```

### Rules (Rules)

```genexus
Parm(in:&WWPEntityName, in:&WWPNotificationAppliesTo, out:&HasSubscriptions);
```

