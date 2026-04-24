# Transaction: WWP_DiscussionMessage

- **Module:** WWPBaseObjects.Discussions
- **Description:** Discussion Message
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |
| GxRemove | Variable | NUMERIC |  | Gx Remove |
| Mode | Variable | CHARACTER |  | Mode |
| WWPDiscussionMessageId | Attribute | Resolved via KB |  |  |
| WWPDiscussionMessageDate | Attribute | Resolved via KB |  |  |
| WWPDiscussionMessageThreadId | Attribute | Resolved via KB |  |  |
| WWPDiscussionMessageMessage | Attribute | Resolved via KB |  |  |
| WWPUserExtendedId | Attribute | Resolved via KB |  |  |
| WWPUserExtendedPhoto | Attribute | Resolved via KB |  |  |
| WWPUserExtendedFullName | Attribute | Resolved via KB |  |  |
| WWPEntityId | Attribute | Resolved via KB |  |  |
| WWPEntityName | Attribute | Resolved via KB |  |  |
| WWPDiscussionMessageEntityRecordId | Attribute | Resolved via KB |  |  |

## Business Logic

### Rules (Rules)

```genexus
WWPDiscussionMessageDate = now();
WWPUserExtendedId = WWP_GetLoggedUserId();
WWPDiscussionMessageThreadId.SetNull() If WWPDiscussionMessageThreadId.IsEmpty() On BeforeInsert;
```

