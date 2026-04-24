# Transaction: WWP_Subscription

- **Module:** WWPBaseObjects.Subscriptions
- **Description:** WWP_Subscription
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
| WWPSubscriptionId | Attribute | Resolved via KB |  |  |
| WWPNotificationDefinitionId | Attribute | Resolved via KB |  |  |
| WWPNotificationDefinitionDescription | Attribute | Resolved via KB |  |  |
| WWPEntityName | Attribute | Resolved via KB |  |  |
| WWPUserExtendedId | Attribute | Resolved via KB |  |  |
| WWPUserExtendedFullName | Attribute | Resolved via KB |  |  |
| WWPSubscriptionEntityRecordId | Attribute | Resolved via KB |  |  |
| WWPSubscriptionEntityRecordDescription | Attribute | Resolved via KB |  |  |
| WWPSubscriptionRoleId | Attribute | Resolved via KB |  |  |
| WWPSubscriptionSubscribed | Attribute | Resolved via KB |  |  |

## Business Logic

### Rules (Rules)

```genexus
WWPUserExtendedId.SetNull() If WWPUserExtendedId.IsEmpty() On AfterValidate;
```

