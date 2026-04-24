# Procedure: WWP_GetUserFullName

- **Module:** WWPBaseObjects
- **Description:** WWP_Get User Full Name
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| GAMErrorCollection | Variable | GX_EXTERNAL_OBJECT |  | GAMError Collection |
| WWPUserExtendedFullName | Parameter | VARCHAR | out | User Full Name |
| WWPUserExtendedId | Parameter | CHARACTER | in | User Id |
| GAMUser | Variable | GX_EXTERNAL_OBJECT |  | GAMUser |
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
&GAMUser = GAMRepository.GetUserByGUID(&WWPUserExtendedId, &GAMErrorCollection)
&WWPUserExtendedFullName = iif(&GAMUser.FirstName.IsEmpty(), &GAMUser.Name, &GAMUser.FirstName.Trim() + " " + &GAMUser.LastName.Trim())
```

### Rules (Rules)

```genexus
parm(in:&WWPUserExtendedId, out:&WWPUserExtendedFullName);
```

