# Procedure: WWP_SubscribeLoggedUserToDiscussion

- **Module:** WWPBaseObjects.Discussions
- **Description:** Subscribe the logged user to a discussion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPNotificationDefinitionName | Parameter | VARCHAR | in | WWPNotification Definition Internal Name |
| WWPSubscriptionEntityRecordId | Parameter | VARCHAR | in | WWPSubscription Entity Record Id |
| WWPSubscription | Variable | GX_BUSCOMP |  | WWPSubscription |
| WWPSubscriptionEntityRecordDescription | Parameter | VARCHAR | in | WWPSubscription Entity Record Description |
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
For Each WWP_NotificationDefinition
	Where WWPNotificationDefinitionName = &WWPNotificationDefinitionName
	Where WWPEntityId = WWP_GetEntityByName(&WWPEntityName)
	
	For Each WWP_Subscription
		Where WWPUserExtendedId = WWP_GetLoggedUserId()
		Where WWPSubscriptionEntityRecordId = &WWPSubscriptionEntityRecordId
		
		WWPSubscriptionSubscribed = True
	When None
		&WWPSubscription = New()
		&WWPSubscription.WWPNotificationDefinitionId = WWPNotificationDefinitionId
		&WWPSubscription.WWPUserExtendedId = WWP_GetLoggedUserId()
		&WWPSubscription.WWPSubscriptionEntityRecordId = &WWPSubscriptionEntityRecordId
		&WWPSubscription.WWPSubscriptionEntityRecordDescription = &WWPSubscriptionEntityRecordDescription
		&WWPSubscription.WWPSubscriptionSubscribed = True
		&WWPSubscription.Save()
		If &WWPSubscription.Success()
			Commit
		EndIf
	EndFor
When None
	WWP_Logger.Error(&pgmname, format(!'WWP_NotificationDefinition not found: %1', &WWPNotificationDefinitionName))
EndFor
```

### Rules (Rules)

```genexus
parm(in:&WWPNotificationDefinitionName, in:&WWPEntityName, in:&WWPSubscriptionEntityRecordId, in:&WWPSubscriptionEntityRecordDescription);
```

