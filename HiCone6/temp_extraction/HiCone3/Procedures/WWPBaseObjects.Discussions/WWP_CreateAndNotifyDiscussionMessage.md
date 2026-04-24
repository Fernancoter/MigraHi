# Procedure: WWP_CreateAndNotifyDiscussionMessage

- **Module:** WWPBaseObjects.Discussions
- **Description:** Create and notify a DiscussionMessage
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExcludedWWPUserExtendedIdCollection | Variable | CHARACTER |  | User Id |
| WWPDiscussionMessage | Variable | GX_BUSCOMP |  | WWPDiscussion Message |
| WWPDiscussionMessageMention | Variable | GX_BUSCOMP |  | WWPDiscussion Message Mention |
| DiscussionMessageCreated | Parameter | Boolean | out | Discussion Message Created |
| MentionWWPUserExtendedIdCollection | Variable | CHARACTER |  | WWPUser Extended Id |
| MentionWWPUserExtendedIdCollectionJson | Parameter | LONGVARCHAR | in | Mention WWPUser Extended Id Collection Json |
| Message | Parameter | VARCHAR | in | Message |
| SessionValue | Parameter | VARCHAR | in | Session Value |
| WWPDiscussionMessageEntityRecordId | Parameter | VARCHAR | in | WWPDiscussion Message Entity Record Id |
| WWPDiscussionMessageThreadId | Parameter | NUMERIC | in | WWPDiscussion Message Thread Id |
| WWPEntityId | Parameter | NUMERIC | in | WWPEntity Id |
| NotificationTitle | Parameter | VARCHAR | in | Notification Title |
| WWPNotificationLink | Parameter | VARCHAR | in | WWPNotification Link |
| WWPSubscriptionEntityRecordDescription | Parameter | VARCHAR | in | WWPSubscription Entity Record Description |
| WWPUserExtendedId | Variable | CHARACTER |  | WWPUser Extended Id |
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
&WWPDiscussionMessage = new()
&WWPDiscussionMessage.WWPEntityId = &WWPEntityId
&WWPDiscussionMessage.WWPDiscussionMessageEntityRecordId = &WWPDiscussionMessageEntityRecordId
&WWPDiscussionMessage.WWPDiscussionMessageThreadId = &WWPDiscussionMessageThreadId
&WWPDiscussionMessage.WWPDiscussionMessageMessage = &Message
&WWPDiscussionMessage.Save()
If &WWPDiscussionMessage.Success()
	If Not &MentionWWPUserExtendedIdCollectionJson.IsEmpty()
		&MentionWWPUserExtendedIdCollection.FromJson(&MentionWWPUserExtendedIdCollectionJson)
		&ExcludedWWPUserExtendedIdCollection = new()
		For &WWPUserExtendedId in &MentionWWPUserExtendedIdCollection
			&WWPDiscussionMessageMention = New()
			&WWPDiscussionMessageMention.WWPDiscussionMessageId = &WWPDiscussionMessage.WWPDiscussionMessageId
			&WWPDiscussionMessageMention.WWPDiscussionMentionUserId = &WWPUserExtendedId
			&WWPDiscussionMessageMention.Save()
			
			&ExcludedWWPUserExtendedIdCollection.Add(&WWPUserExtendedId.Trim())
		EndFor
	EndIf

	Commit
	WWP_NotifyDiscussionMessage(&WWPDiscussionMessage.WWPUserExtendedFullName, &WWPDiscussionMessage.WWPEntityName, &WWPDiscussionMessageEntityRecordId, &ExcludedWWPUserExtendedIdCollection.ToJson(), &SessionValue, &NotificationTitle, &WWPSubscriptionEntityRecordDescription, &WWPNotificationLink)
	&DiscussionMessageCreated = True
Endif
```

### Rules (Rules)

```genexus
parm(in:&WWPEntityId, in:&WWPDiscussionMessageThreadId, in:&WWPDiscussionMessageEntityRecordId, in:&Message, in:&MentionWWPUserExtendedIdCollectionJson, in:&SessionValue, in:&NotificationTitle, in:&WWPSubscriptionEntityRecordDescription, in:&WWPNotificationLink, out:&DiscussionMessageCreated);
```

