# Procedure: WWP_GetEntityByName

- **Module:** WWPBaseObjects
- **Description:** WWP_Get Entity By Name
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPEntityName | Parameter | VARCHAR | in | Entity Name |
| WWPEntityId | Parameter | NUMERIC | out | Entity Id |
| WWP_Entity | Variable | GX_BUSCOMP |  | WWP_Entity |
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
For Each WWP_Entity
	Where WWPEntityName = &WWPEntityName
	&WWPEntityId = WWPEntityId
	Exit
When None
	&WWP_Entity = New()
	&WWP_Entity.WWPEntityName = &WWPEntityName
	&WWP_Entity.Save()
	If &WWP_Entity.Success()
		&WWPEntityId = &WWP_Entity.WWPEntityId
	EndIf
EndFor
```

### Rules (Rules)

```genexus
Parm(in:&WWPEntityName, out:&WWPEntityId);
```

