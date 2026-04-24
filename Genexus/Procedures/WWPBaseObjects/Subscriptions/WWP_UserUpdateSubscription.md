# Procedure: WWP_UserUpdateSubscription

- **Module:** WWPBaseObjects.Subscriptions
- **Description:** User Update Subscription
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPSubscriptionId | Parameter | NUMERIC | inout | WWPSubscription Id |
| WWPNotificationDefinitionId | Parameter | NUMERIC | in | WWPNotification Definition Id |
| WWPSubscriptionEntityRecordId | Parameter | VARCHAR | in | WWPSubscription Entity Record Id |
| WWPSubscriptionEntityRecordDescription | Parameter | VARCHAR | in | WWPSubscription Entity Record Description |
| Subscribe | Parameter | Boolean | in | Subscribe |
| WWPSubscription | Variable | GX_BUSCOMP |  | WWPSubscription |
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
	&WWPSubscription.Load(&WWPSubscriptionId)
	If &WWPSubscription.Success()
		&WWPSubscription.Delete()
		&WWPSubscriptionId = 0
	Else
		&WWPSubscription = new()
		&WWPSubscription.WWPBaseObjects.WWPNotificationDefinitionId = &WWPNotificationDefinitionId
		&WWPSubscription.WWPSubscriptionEntityRecordId = &WWPSubscriptionEntityRecordId
		&WWPSubscription.WWPSubscriptionEntityRecordDescription = &WWPSubscriptionEntityRecordDescription
		&WWPSubscription.WWPSubscriptionSubscribed = True
		&WWPSubscription.WWPUserExtendedId = WWP_GetLoggedUserId()
		&WWPSubscription.Save()
		&WWPSubscriptionId = &WWPSubscription.WWPSubscriptionId
	EndIf
	
Else
	If &WWPSubscriptionID = 0
		Do 'CreateSubscriptionNotSubscribed'
	Else
		&WWPSubscription.Load(&WWPSubscriptionId)
		If &WWPSubscription.WWPUserExtendedId = WWP_GetLoggedUserId()
			&WWPSubscription.Delete()
		Else
			Do 'CreateSubscriptionNotSubscribed'
		EndIf	
	EndIf
EndIf
If &WWPSubscription.Success()
	Commit
Endif

Sub 'CreateSubscriptionNotSubscribed'
	&WWPSubscription = new()
	&WWPSubscription.WWPNotificationDefinitionId = &WWPNotificationDefinitionId
	&WWPSubscription.WWPSubscriptionEntityRecordId = &WWPSubscriptionEntityRecordId
	&WWPSubscription.WWPSubscriptionEntityRecordDescription = &WWPSubscriptionEntityRecordDescription
	&WWPSubscription.WWPSubscriptionSubscribed = False
	&WWPSubscription.WWPUserExtendedId = WWP_GetLoggedUserId()
	&WWPSubscription.Save()
	&WWPSubscriptionId = &WWPSubscription.WWPSubscriptionId
EndSub
```

### Rules (Rules)

```genexus
parm(in:&Subscribe,inout:&WWPSubscriptionId, in:&WWPNotificationDefinitionId, in:&WWPSubscriptionEntityRecordId, in:&WWPSubscriptionEntityRecordDescription);
```

