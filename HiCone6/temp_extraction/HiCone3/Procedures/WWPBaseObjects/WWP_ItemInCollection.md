# Procedure: WWP_ItemInCollection

- **Module:** WWPBaseObjects
- **Description:** WWP_Item In Collection
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Item | Parameter | VARCHAR | in | Item |
| Collection | Parameter | VARCHAR | in | Collection |
| IsContained | Parameter | Boolean | out | Is Contained |
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

If &Collection.IndexOf(&Item) > 0
	&IsContained = True
EndIf
```

### Rules (Rules)

```genexus

parm(in:&Item, in:&Collection, out:&IsContained);
```

