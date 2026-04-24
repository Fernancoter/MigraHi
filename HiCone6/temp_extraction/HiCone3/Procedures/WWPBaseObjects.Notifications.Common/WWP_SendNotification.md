# Procedure: WWP_SendNotification

- **Module:** WWPBaseObjects.Notifications.Common
- **Description:** WWP_Send Notification
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPUserExtendedId | Variable | CHARACTER |  | WWPUser Extended Id |
| MakeCommit | Parameter | Boolean | in | Make Commit |
| ExcludedWWPUserExtendedIdCollection | Variable | CHARACTER |  | WWPUser Extended Id |
| ExcludedWWPUserExtendedIdCollectionJson | Parameter | LONGVARCHAR | in | Excluded WWPUser Extended Id Collection Json |
| IncludeNotificationToUser | Variable | Boolean |  | Include Notification To User |
| pWWPNotificationDefinitionIcon | Parameter | VARCHAR | in | Notification Definition Default Icon |
| pWWPNotificationDefinitionLink | Parameter | VARCHAR | in | Notification Definition Default Link |
| pWWPNotificationDefinitionLongDescription | Parameter | VARCHAR | in | Notification Definition Default Long Description |
| pWWPNotificationDefinitionShortDescription | Parameter | VARCHAR | in | Notification Definition Default Short Description |
| pWWPNotificationDefinitionTitle | Parameter | VARCHAR | in | Notification Definition Default Title |
| WWPEntityName | Parameter | VARCHAR | in | Entity Name |
| WWPNotificationDefinitionIcon | Variable | VARCHAR |  | WWPNotification Definition Icon |
| WWPNotificationDefinitionId | Variable | NUMERIC |  | WWPNotification Definition Id |
| WWPNotificationDefinitionLink | Variable | VARCHAR |  | WWPNotification Definition Link |
| WWPNotificationDefinitionLongDescription | Variable | VARCHAR |  | WWPNotification Definition Long Description |
| WWPNotificationDefinitionName | Parameter | VARCHAR | in | Notification Definition Internal Name |
| WWPNotificationDefinitionShortDescription | Variable | VARCHAR |  | WWPNotification Definition Short Description |
| WWPNotificationDefinitionTitle | Variable | VARCHAR |  | WWPNotification Definition Title |
| WWPNotificationMetadata | Parameter | LONGVARCHAR | in | WWPNotification Metadata |
| WWPSubscriptionEntityRecordId | Parameter | VARCHAR | in | WWPSubscription Entity Record Id |
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
If &ExcludedWWPUserExtendedIdCollectionJson.IsEmpty()
	&ExcludedWWPUserExtendedIdCollection = new()
Else
	&ExcludedWWPUserExtendedIdCollection.FromJson(&ExcludedWWPUserExtendedIdCollectionJson)
EndIf
&ExcludedWWPUserExtendedIdCollection.Add(WWP_GetLoggedUserId())
For Each WWP_NotificationDefinition
	Where WWPNotificationDefinitionName = &WWPNotificationDefinitionName
	Where WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(&WWPEntityName)
	
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

	For Each WWP_Subscription
		Where WWPSubscriptionEntityRecordId = &WWPSubscriptionEntityRecordId When Not &WWPSubscriptionEntityRecordId.IsEmpty()
		If Not (WWPUserExtendedId In &ExcludedWWPUserExtendedIdCollection)
			If Not WWPUserExtendedId.IsEmpty() And WWPSubscriptionSubscribed
				&WWPUserExtendedId = WWPUserExtendedId
				WWP_CreateNotificationToUser(&WWPUserExtendedId, &WWPNotificationDefinitionId, &WWPNotificationDefinitionTitle, &WWPNotificationDefinitionShortDescription, &WWPNotificationDefinitionLongDescription, &WWPNotificationDefinitionLink, &WWPNotificationMetadata, &WWPNotificationDefinitionIcon, &WWPNotificationDefinitionName.StartsWith("Discussion"))
			Else
				For &WWPUserExtendedId In WWPBaseObjects.WWP_GetUsersFromRole(WWPSubscriptionRoleId)
					Do 'IncludeNotificationToUser'
					If &IncludeNotificationToUser
						WWP_CreateNotificationToUser(&WWPUserExtendedId, &WWPNotificationDefinitionId, &WWPNotificationDefinitionTitle, &WWPNotificationDefinitionShortDescription, &WWPNotificationDefinitionLongDescription, &WWPNotificationDefinitionLink, &WWPNotificationMetadata, &WWPNotificationDefinitionIcon, &WWPNotificationDefinitionName.StartsWith("Discussion"))
					EndIf
				EndFor
			Endif
		EndIf
	EndFor
EndFor

If &MakeCommit
  Commit
  WWP_SendPendingNotifications.Submit("")
EndIf

Sub 'IncludeNotificationToUser'
	&IncludeNotificationToUser = Count(WWPNotificationDefinitionName, WWPNotificationDefinitionId = &WWPNotificationDefinitionId And WWPUserExtendedId = &WWPUserExtendedId) = 0
EndSub
```

### Rules (Rules)

```genexus
parm(in:&WWPNotificationDefinitionName, in:&WWPEntityName, in:&WWPSubscriptionEntityRecordId, in:&pWWPNotificationDefinitionIcon, in:&pWWPNotificationDefinitionTitle, in:&pWWPNotificationDefinitionShortDescription, in:&pWWPNotificationDefinitionLongDescription, in:&pWWPNotificationDefinitionLink, in:&WWPNotificationMetadata, in:&ExcludedWWPUserExtendedIdCollectionJson, in:&MakeCommit);
```

