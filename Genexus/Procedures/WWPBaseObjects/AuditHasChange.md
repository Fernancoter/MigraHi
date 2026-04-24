# Procedure: AuditHasChange

- **Module:** WWPBaseObjects
- **Description:** Audit Has Change
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AttributeItem | Variable | GX_SDT |  | Attribute Item |
| isOK | Parameter | Boolean | out | is OK |
| ObjectAttribute | Parameter | GX_SDT | in | Object Attribute |
| ActualMode | Parameter | CHARACTER | in | Actual Mode |
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

	if(&ActualMode = TrnMode.Update)
		
		&isOK = false
		for &AttributeItem in &ObjectAttribute.Attribute
			if(&AttributeItem.Name = !'PaletNoCarretes')
				Exit
			endif
		
			if(&AttributeItem.NewValue <> &AttributeItem.OldValue)
				&isOK = true
				Exit
			endif
		endfor
	else
		&isOK = true
	endif
```

### Rules (Rules)

```genexus
parm(in:&ObjectAttribute, in:&ActualMode, out:&isOK);
```

