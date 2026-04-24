# Procedure: WWP_CheckUserIsNotUnsubscribed

- **Module:** WWPBaseObjects.Subscriptions
- **Description:** Check User Is Not Unsubscribed
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IncludeNotification | Parameter | Boolean | inout | Include Notification |
| WWPNotificationDefinitionId | Parameter | NUMERIC | in | WWPNotification Definition Id |
| WWPSubscriptionId | Parameter | NUMERIC | inout | WWPSubscription Id |
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
For Each WWP_Subscription
	Where WWPNotificationDefinitionId = &WWPNotificationDefinitionId
	Where WWPUserExtendedId = WWPBaseObjects.WWP_GetLoggedUserId()
	Where WWPSubscriptionSubscribed = False
	&IncludeNotification = False
	&WWPSubscriptionId = WWPSubscriptionId
	Exit
EndFor
```

### Rules (Rules)

```genexus
parm(in:&WWPNotificationDefinitionId, inout:&WWPSubscriptionId, inout:&IncludeNotification);
```

