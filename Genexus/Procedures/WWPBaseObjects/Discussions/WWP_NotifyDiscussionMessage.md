# Procedure: WWP_NotifyDiscussionMessage

- **Module:** WWPBaseObjects.Discussions
- **Description:** WWP_Notify Discussion Message
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| NotificationTitle | Parameter | VARCHAR | in | Notification Title |
| WWPNotificationMetadataSDT | Variable | GX_SDT |  | WWPNotification Metadata SDT |
| WWPNotificationShortDescription | Variable | VARCHAR |  | WWPNotification Short Description |
| DiscussionMessageCreated | Variable | Boolean |  | Discussion Message Created |
| MentionWWPUserExtendedIdCollection | Variable | CHARACTER |  | WWPUser Extended Id |
| Message | Variable | VARCHAR |  | Message |
| SessionValue | Parameter | VARCHAR | in | Session Value |
| WWPDiscussionMessageEntityRecordId | Parameter | VARCHAR | in | WWPDiscussion Message Entity Record Id |
| WWPDiscussionMessageThreadId | Variable | NUMERIC |  | WWPDiscussion Message Thread Id |
| WWPEntityId | Variable | NUMERIC |  | WWPEntity Id |
| WWPNotificationLink | Parameter | VARCHAR | in | WWPNotification Link |
| WWPSubscriptionEntityRecordDescription | Parameter | VARCHAR | in | WWPSubscription Entity Record Description |
| WWPUserExtendedId | Variable | CHARACTER |  | WWPUser Extended Id |
| MentionWWPUserExtendedIdCollectionJson | Parameter | LONGVARCHAR | in | Mention WWPUser Extended Id Collection Json |
| ExcludedWWPUserExtendedIdCollection | Variable | CHARACTER |  | User Id |
| WWPUserExtendedFullName | Parameter | VARCHAR | in | User Full Name |
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

&WWPNotificationMetadataSDT = New()
&WWPNotificationMetadataSDT.SessionKey = !"DiscussionThreadIdToOpen"
&WWPNotificationMetadataSDT.SessionValue = &SessionValue

If Not &MentionWWPUserExtendedIdCollectionJson.IsEmpty()
	&WWPNotificationShortDescription = Format("WWP_Notifications_MentionShortMessage", &WWPUserExtendedFullName, &WWPEntityName, &WWPSubscriptionEntityRecordDescription)
	Common.WWP_SendMentionNotification(!"Mention", &WWPEntityName, &WWPDiscussionMessageEntityRecordId, !"fas fa-at NotificationFontIconInfoLight", "WWP_Notifications_NewMention", &WWPNotificationShortDescription, &WWPNotificationShortDescription, &WWPNotificationLink, &WWPNotificationMetadataSDT.ToJson(), &MentionWWPUserExtendedIdCollectionJson) 
	WWP_SubscribeMentionedUsersToDiscussion(!"Discussion", &WWPEntityName, &WWPDiscussionMessageEntityRecordId, &WWPSubscriptionEntityRecordDescription, &MentionWWPUserExtendedIdCollectionJson)
EndIf

&WWPNotificationShortDescription = Format("WWP_Notifications_NewMessageShortMessage", &WWPUserExtendedFullName, &WWPEntityName, &WWPSubscriptionEntityRecordDescription)
WWP_SendNotification(!"Discussion", &WWPEntityName, &WWPDiscussionMessageEntityRecordId, !"far fa-comment-dots NotificationFontIconInfo",  &NotificationTitle, &WWPNotificationShortDescription, &WWPNotificationShortDescription, &WWPNotificationLink, &WWPNotificationMetadataSDT.ToJson(),&MentionWWPUserExtendedIdCollectionJson, true)  
WWP_SubscribeLoggedUserToDiscussion(!"Discussion", &WWPEntityName, &WWPDiscussionMessageEntityRecordId, &WWPSubscriptionEntityRecordDescription)
```

### Rules (Rules)

```genexus
parm(in:&WWPUserExtendedFullName, in:&WWPEntityName, in:&WWPDiscussionMessageEntityRecordId, in:&MentionWWPUserExtendedIdCollectionJson, in:&SessionValue, in:&NotificationTitle, in:&WWPSubscriptionEntityRecordDescription, in:&WWPNotificationLink);
```

