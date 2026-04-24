# Procedure: WWP_SendMentionNotification

- **Module:** WWPBaseObjects.Notifications.Common
- **Description:** WWPSend Mention Notification
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| pWWPNotificationDefinitionIcon | Parameter | VARCHAR | in | Notification Definition Default Icon |
| pWWPNotificationDefinitionLink | Parameter | VARCHAR | in | Notification Definition Default Link |
| pWWPNotificationDefinitionLongDescription | Parameter | VARCHAR | in | Notification Definition Default Long Description |
| pWWPNotificationDefinitionShortDescription | Parameter | VARCHAR | in | Notification Definition Default Short Description |
| pWWPNotificationDefinitionTitle | Parameter | VARCHAR | in | Notification Definition Default Title |
| WWPUserExtendedId | Variable | CHARACTER |  | WWPUser Extended Id |
| ExcludedWWPUserExtendedIdCollection | Variable | CHARACTER |  | WWPUser Extended Id |
| IncludeNotificationToUser | Variable | Boolean |  | Include Notification To User |
| IsFirstSMS | Variable | Boolean |  | Is First SMS |
| MailBody | Variable | LONGVARCHAR |  | Mail Body |
| MentionsWWPUserExtendedIdCollection | Variable | CHARACTER |  | WWPUser Extended Id |
| SMSRecipientNumbers | Variable | LONGVARCHAR |  | SMSRecipient Numbers |
| WWPEntityName | Parameter | VARCHAR | in | Entity Name |
| WWPNotificationDefinitionIcon | Variable | VARCHAR |  | WWPNotification Definition Icon |
| WWPNotificationDefinitionId | Variable | NUMERIC |  | WWPNotification Definition Id |
| WWPNotificationDefinitionLink | Variable | VARCHAR |  | WWPNotification Definition Link |
| WWPNotificationDefinitionLongDescription | Variable | VARCHAR |  | WWPNotification Definition Long Description |
| WWPNotificationDefinitionName | Parameter | VARCHAR | in | Notification Definition Internal Name |
| WWPNotificationDefinitionShortDescription | Variable | VARCHAR |  | WWPNotification Definition Short Description |
| WWPNotificationDefinitionTitle | Variable | VARCHAR |  | WWPNotification Definition Title |
| WWPNotificationID | Variable | NUMERIC |  | WWPNotification Id |
| WWPNotificationMetadata | Parameter | LONGVARCHAR | in | WWPNotification Metadata |
| WWPSubscriptionEntityRecordId | Parameter | VARCHAR | in | WWPSubscription Entity Record Id |
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

For Each WWP_NotificationDefinition
	Where WWPNotificationDefinitionName = &WWPNotificationDefinitionName
	Where WWPEntityId = WWP_GetEntityByName(&WWPEntityName)
	
	&WWPNotificationDefinitionId = WWPNotificationDefinitionId
	
	If &pWWPNotificationDefinitionIcon.IsEmpty()
		&WWPNotificationDefinitionIcon = WWPNotificationDefinitionIcon
	Else
		&WWPNotificationDefinitionIcon = &pWWPNotificationDefinitionIcon
	EndIf
	If &pWWPNotificationDefinitionTitle.IsEmpty()
		&WWPNotificationDefinitionTitle = WWPNotificationDefinitionTitle
	Else
		&WWPNotificationDefinitionTitle = &pWWPNotificationDefinitionTitle
	EndIf
	If &pWWPNotificationDefinitionShortDescription.IsEmpty()
		&WWPNotificationDefinitionShortDescription = WWPNotificationDefinitionShortDescription
	Else
		&WWPNotificationDefinitionShortDescription = &pWWPNotificationDefinitionShortDescription
	EndIf
	If &pWWPNotificationDefinitionLongDescription.IsEmpty()
		&WWPNotificationDefinitionLongDescription = WWPNotificationDefinitionLongDescription
	Else
		&WWPNotificationDefinitionLongDescription = &pWWPNotificationDefinitionLongDescription
	EndIf
	If &pWWPNotificationDefinitionLink.IsEmpty()
		&WWPNotificationDefinitionLink = WWPNotificationDefinitionLink
	Else
		&WWPNotificationDefinitionLink = &pWWPNotificationDefinitionLink
	EndIf
	&MentionsWWPUserExtendedIdCollection.FromJson(&MentionWWPUserExtendedIdCollectionJson)
	For &WWPUserExtendedId In &MentionsWWPUserExtendedIdCollection
		WWP_CreateNotificationToUser(&WWPUserExtendedId, &WWPNotificationDefinitionId, &WWPNotificationDefinitionTitle, &WWPNotificationDefinitionShortDescription, &WWPNotificationDefinitionLongDescription, &WWPNotificationDefinitionLink, &WWPNotificationMetadata, &WWPNotificationDefinitionIcon, True)
	EndFor
	
EndFor
```

### Rules (Rules)

```genexus
parm(in:&WWPNotificationDefinitionName, in:&WWPEntityName, in:&WWPSubscriptionEntityRecordId, in:&pWWPNotificationDefinitionIcon, in:&pWWPNotificationDefinitionTitle, in:&pWWPNotificationDefinitionShortDescription, in:&pWWPNotificationDefinitionLongDescription, in:&pWWPNotificationDefinitionLink, in:&WWPNotificationMetadata, in:&MentionWWPUserExtendedIdCollectionJson);
```

