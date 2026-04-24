# Procedure: WWP_GetLoggedUserRoles

- **Module:** WWPBaseObjects
- **Description:** WWP_Get Logged User Roles
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| GAMUser | Variable | GX_EXTERNAL_OBJECT |  | GAMUser |
| GAMRoleCollection | Variable | GX_EXTERNAL_OBJECT |  | GAMRole Collection |
| GAMRole | Variable | GX_EXTERNAL_OBJECT |  | GAMRole |
| WWPSubscriptionRoleIdCollection | Parameter | CHARACTER | out | WWPSubscription Role Id |
| GAMErrorCollection | Variable | GX_EXTERNAL_OBJECT |  | GAMError Collection |
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
&GAMUser = GAMUser.Get()
&GAMRoleCollection = &GAMUser.GetRoles(&GAMErrorCollection)

&WWPSubscriptionRoleIdCollection.Clear()
For &GAMRole In &GAMRoleCollection
	&WWPSubscriptionRoleIdCollection.Add(&GAMRole.GUID)
EndFor
```

### Rules (Rules)

```genexus
parm(out:&WWPSubscriptionRoleIdCollection);
```

