# Procedure: WWP_GetUserPhone

- **Module:** WWPBaseObjects
- **Description:** Get User Phone
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| GAMErrorCollection | Variable | GX_EXTERNAL_OBJECT |  | GAMError Collection |
| WWPUserExtendedId | Parameter | CHARACTER | in | User Extended Id |
| GAMUser | Variable | GX_EXTERNAL_OBJECT |  | GAMUser |
| WWPUserExtendedPhone | Parameter | CHARACTER | out | WWPUser Extended Phone |
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
&WWPUserExtendedPhone = &GAMUser.Phone
```

### Rules (Rules)

```genexus
parm(in:&WWPUserExtendedId, out:&WWPUserExtendedPhone);
```

