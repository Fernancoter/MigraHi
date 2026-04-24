# Procedure: WWP_HasDiscussionMessages

- **Module:** WWPBaseObjects.Discussions
- **Description:** Has Discussion Messages
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HasDiscussionMessages | Parameter | Boolean | out | Has Discussion Messages |
| WWPDiscussionMessageEntityRecordId | Parameter | VARCHAR | in | WWPDiscussion Message Entity Record Id |
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

&HasDiscussionMessages = False
For Each WWPBaseObjects.Discussions.WWP_DiscussionMessage
	Where WWPEntityId = WWP_GetEntityByName(&WWPEntityName)
	Where WWPDiscussionMessageEntityRecordId = &WWPDiscussionMessageEntityRecordId
	Where WWPDiscussionMessageThreadId.IsNull() or WWPDiscussionMessageThreadId.IsEmpty()
	&HasDiscussionMessages = True
	Exit
EndFor
```

### Rules (Rules)

```genexus
parm(in:&WWPEntityName, in:&WWPDiscussionMessageEntityRecordId, out:&HasDiscussionMessages);
```

