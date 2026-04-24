# Procedure: WWP_RangePicker_GetOptions

- **Module:** WWPBaseObjects
- **Description:** WWP_Get Range Picker Options
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PickerOptions | Parameter | GX_SDT | out | Picker Options |
| PickerOption | Variable | GX_SDT |  | Picker Option |
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

&PickerOptions = new()

WWPBaseObjects.WWP_RangePicker_AddPredefinedRange.Past(&PickerOptions)
WWPBaseObjects.WWP_RangePicker_AddPredefinedRange.Yesterday(&PickerOptions)
WWPBaseObjects.WWP_RangePicker_AddPredefinedRange.Today(&PickerOptions)
WWPBaseObjects.WWP_RangePicker_AddPredefinedRange.Tomorrow(&PickerOptions)
WWP_RangePicker_AddPredefinedRange.InTheFuture(&PickerOptions)
WWPBaseObjects.WWP_RangePicker_AddPredefinedRange.LastWeek(&PickerOptions)
WWP_RangePicker_AddPredefinedRange.LastMonth(&PickerOptions)
WWP_RangePicker_AddPredefinedRange.LastYear(&PickerOptions)
WWPBaseObjects.WWP_RangePicker_AddPredefinedRange.ThisWeek(&PickerOptions)
WWPBaseObjects.WWP_RangePicker_AddPredefinedRange.ThisMonth(&PickerOptions)
WWP_RangePicker_AddPredefinedRange.ThisYear(&PickerOptions)
WWP_RangePicker_AddPredefinedRange.NextWeek(&PickerOptions)
WWP_RangePicker_AddPredefinedRange.NextMonth(&PickerOptions)
WWP_RangePicker_AddPredefinedRange.NextYear(&PickerOptions)
```

### Rules (Rules)

```genexus

parm(out:&PickerOptions);
```

