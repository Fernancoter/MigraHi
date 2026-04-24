# Procedure: GetFilterByName

- **Module:** WWPBaseObjects
- **Description:** Get Filter By Name
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| FilterName | Parameter | VARCHAR | in | Filter Name |
| FilterXML | Parameter | LONGVARCHAR | out | Filter XML |
| GridStateCollection | Variable | GX_SDT |  | Grid State Collection |
| GridStateCollectionItem | Variable | GX_SDT |  | Grid State Collection Item |
| UserCustomKey | Parameter | VARCHAR | in | User Custom Key |
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
&GridStateCollection.FromXml(LoadManageFiltersState(&UserCustomKey))

For &GridStateCollectionItem in &GridStateCollection
	If &GridStateCollectionItem.Title = &FilterName
		&FilterXML = &GridStateCollectionItem.GridStateXML
		Exit
	EndIf
EndFor
```

### Rules (Rules)

```genexus
parm(in:&UserCustomKey, in:&FilterName, out:&FilterXML);
```

