# Procedure: SDPListLocationsSetMap

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPList Locations Set Map
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| MapItem | Variable | GX_SDT |  | Map Item |
| MapItems | Parameter | GX_SDT | out | Map Items |
| SelectedItem | Parameter | CHARACTER | in | Selected Item |
| SelectedItemText | Parameter | CHARACTER | in | Selected Item Text |
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
&MapItem = new()
&MapItem.Location = &SelectedItem
&MapItem.Description = &SelectedItemText
&MapItems.Clear()
&MapItems.Add(&MapItem)
```

### Rules (Rules)

```genexus
parm(in:&SelectedItem, in:&SelectedItemText, out:&MapItems);
```

