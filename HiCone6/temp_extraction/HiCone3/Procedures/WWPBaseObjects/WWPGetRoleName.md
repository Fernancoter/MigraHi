# Procedure: WWPGetRoleName

- **Module:** WWPBaseObjects
- **Description:** WWPGet Role Name
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPSubscriptionRoleId | Parameter | CHARACTER | in | WWPSubscription Role Id |
| RoleName | Parameter | VARCHAR | out | Role Name |
| GAMErrorCollection | Variable | GX_EXTERNAL_OBJECT |  | GAMError Collection |
| GAMRole | Variable | GX_EXTERNAL_OBJECT |  | GAMRole |
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
&GAMRole = GAMRole.GetByGUID(&WWPSubscriptionRoleId, &GAMErrorCollection)
&RoleName = &GAMRole.Name
```

### Rules (Rules)

```genexus
parm(in:&WWPSubscriptionRoleId, out:&RoleName);
```

