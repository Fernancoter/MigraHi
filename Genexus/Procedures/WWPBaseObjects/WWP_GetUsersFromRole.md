# Procedure: WWP_GetUsersFromRole

- **Module:** WWPBaseObjects
- **Description:** WWP_Get Users From Role
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| RoleId | Variable | CHARACTER |  | Role Id |
| WWPUserExtendedIdCollection | Parameter | CHARACTER | out | WWPUser Extended Id |
| WWPSubscriptionRoleId | Parameter | CHARACTER | in | WWPSubscription Role Id |
| GAMUser | Variable | GX_EXTERNAL_OBJECT |  | GAMUser |
| GAMRole | Variable | GX_EXTERNAL_OBJECT |  | GAMRole |
| GAMErrorCollection | Variable | GX_EXTERNAL_OBJECT |  | GAMError Collection |
| GAMUserCollection | Variable | GX_EXTERNAL_OBJECT |  | GAMUser Collection |
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
&GAMRole = GAMRepository.GetRoleByGUID(&WWPSubscriptionRoleId, &GAMErrorCollection)
&GAMUserCollection = &GAMRole.GetUsers(&GAMErrorCollection)

&WWPUserExtendedIdCollection.Clear()
For &GAMUser In &GAMUserCollection
	&WWPUserExtendedIdCollection.Add(&GAMUser.GUID)
EndFor
```

### Rules (Rules)

```genexus
parm(in:&WWPSubscriptionRoleId, out:&WWPUserExtendedIdCollection);
```

