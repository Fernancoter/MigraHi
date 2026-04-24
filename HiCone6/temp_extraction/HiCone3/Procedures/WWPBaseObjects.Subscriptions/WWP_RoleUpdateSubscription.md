# Procedure: WWP_RoleUpdateSubscription

- **Module:** WWPBaseObjects.Subscriptions
- **Description:** Role Update Subscription
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Subscribe | Parameter | Boolean | in | Subscribe |
| WWPNotificationDefinitionId | Parameter | NUMERIC | in | WWPNotification Definition Id |
| WWPSubscription | Variable | GX_BUSCOMP |  | WWPSubscription |
| WWPSubscriptionId | Parameter | NUMERIC | inout | WWPSubscription Id |
| WWPSubscriptionRoleId | Parameter | CHARACTER | in | WWPSubscription Role Id |
| WWPUserExtendedIdCollection | Variable | CHARACTER |  | WWPUser Extended Id |
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
If &Subscribe
	&WWPSubscription = new()
	&WWPSubscription.WWPNotificationDefinitionId = &WWPNotificationDefinitionId
	&WWPSubscription.WWPSubscriptionSubscribed = True
	&WWPSubscription.WWPSubscriptionRoleId = &WWPSubscriptionRoleId
	&WWPSubscription.Save()
	&WWPSubscriptionId = &WWPSubscription.WWPSubscriptionId
	
	&WWPUserExtendedIdCollection = WWPBaseObjects.WWP_GetUsersFromRole(&WWPSubscriptionRoleId)
	For Each WWP_Subscription
		Where WWPNotificationDefinitionId = &WWPNotificationDefinitionId
		Where WWPUserExtendedId In &WWPUserExtendedIdCollection
		Delete
	EndFor
	
Else
	&WWPSubscription.Load(&WWPSubscriptionId)
	&WWPSubscription.Delete()
EndIf

If &WWPSubscription.Success()
	Commit
Endif
```

### Rules (Rules)

```genexus
parm(in:&Subscribe,inout:&WWPSubscriptionId, in:&WWPNotificationDefinitionId, in:&WWPSubscriptionRoleId);
```

