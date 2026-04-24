# Procedure: WWP_SubscribeMentionedUsersToDiscussion

- **Module:** WWPBaseObjects.Discussions
- **Description:** Subscribe the mentioned users to a discussion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPNotificationDefinitionName | Parameter | VARCHAR | in | WWPNotification Definition Internal Name |
| WWPSubscriptionEntityRecordId | Parameter | VARCHAR | in | WWPSubscription Entity Record Id |
| WWPSubscription | Variable | GX_BUSCOMP |  | WWPSubscription |
| WWPSubscriptionEntityRecordDescription | Parameter | VARCHAR | in | WWPSubscription Entity Record Description |
| MentionWWPUserExtendedIdCollection | Variable | CHARACTER |  | WWPUser Extended Id |
| WWPUserExtendedId | Variable | CHARACTER |  | WWPUser Extended Id |
| WWPEntityName | Parameter | VARCHAR | in | Entity Name |
| MentionWWPUserExtendedIdCollectionJson | Parameter | LONGVARCHAR | in | Mention WWPUser Extended Id Collection Json |
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
&MentionWWPUserExtendedIdCollection.FromJson(&MentionWWPUserExtendedIdCollectionJson)
For Each WWP_NotificationDefinition
	Where WWPNotificationDefinitionName = &WWPNotificationDefinitionName
	Where WWPEntityId = WWP_GetEntityByName(&WWPEntityName)
	For &WWPUserExtendedId In &MentionWWPUserExtendedIdCollection
		For Each WWPBaseObjects.Subscriptions.WWP_Subscription
			Where WWPUserExtendedId = &WWPUserExtendedId
			Where WWPSubscriptionEntityRecordId = &WWPSubscriptionEntityRecordId
			
			WWPSubscriptionSubscribed = True
		When None
			&WWPSubscription = New()
			&WWPSubscription.WWPNotificationDefinitionId = WWPNotificationDefinitionId
			&WWPSubscription.WWPUserExtendedId = &WWPUserExtendedId
			&WWPSubscription.WWPSubscriptionEntityRecordId = &WWPSubscriptionEntityRecordId
			&WWPSubscription.WWPSubscriptionEntityRecordDescription = &WWPSubscriptionEntityRecordDescription
			&WWPSubscription.WWPSubscriptionSubscribed = True
			&WWPSubscription.Save()
			If Not &WWPSubscription.Success()
				WWP_Logger.Error("Subscribe Mentioned User", &WWPSubscription.GetMessages().ToJson())
			EndIf
		EndFor
	EndFor
When None
	WWP_Logger.Error(&pgmname, format(!'WWP_NotificationDefinition not found: %1', &WWPNotificationDefinitionName))
EndFor
Commit
```

### Rules (Rules)

```genexus
parm(in:&WWPNotificationDefinitionName, in:&WWPEntityName, in:&WWPSubscriptionEntityRecordId, in:&WWPSubscriptionEntityRecordDescription, in:&MentionWWPUserExtendedIdCollectionJson);
```

