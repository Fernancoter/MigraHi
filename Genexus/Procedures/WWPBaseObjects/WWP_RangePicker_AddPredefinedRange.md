# Procedure: WWP_RangePicker_AddPredefinedRange

- **Module:** WWPBaseObjects
- **Description:** WWP_Range Picker Add Predefined Range
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PickerOptions | Variable | GX_SDT |  | Picker Options |
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

Stub Past(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterPast'
	&PickerOption.StartDate = ymdtod(1970, 1, 1)
	&PickerOption.EndDate = &Today.AddDays(-1)
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub Yesterday(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterYesterday'
	&PickerOption.StartDate = &Today.AddDays(-1)
	&PickerOption.EndDate = &Today.AddDays(-1)
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub Today(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterToday'
	&PickerOption.StartDate = &Today
	&PickerOption.EndDate = &Today
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub Tomorrow(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterTomorrow'
	&PickerOption.StartDate = &Today.AddDays(1)
	&PickerOption.EndDate = &Today.AddDays(1)
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub InTheFuture(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterInTheFuture'
	&PickerOption.StartDate = &Today.AddDays(1)
	&PickerOption.EndDate = ymdtod(2039, 12, 31)
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub LastWeek(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterLastWeek'
	&PickerOption.StartDate = &Today - dow(&Today) - 6
	&PickerOption.EndDate = &Today - dow(&Today)
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub LastMonth(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterLastMonth'
	&PickerOption.StartDate = AddMth(&Today, -1) - Day(&Today) + 1
	&PickerOption.EndDate = EoM(AddMth(&Today, -1))
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub LastYear(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterLastYear'
	&PickerOption.StartDate = YMDtoD(year(&Today) - 1, 1, 1)
	&PickerOption.EndDate = YMDtoD(year(&Today) - 1, 12, 31)
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub ThisWeek(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterThisWeek'
	&PickerOption.StartDate = &Today - dow(&Today) + 1
	&PickerOption.EndDate = &Today  - dow(&Today) + 7
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub ThisMonth(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterThisMonth'
	&PickerOption.StartDate = &Today - Day(&Today) + 1
	&PickerOption.EndDate = EoM(&Today)
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub ThisYear(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterThisYear'
	&PickerOption.StartDate = YMDtoD(year(&Today), 1, 1)
	&PickerOption.EndDate = YMDtoD(year(&Today), 12, 31)
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub NextWeek(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterNextWeek'
	&PickerOption.StartDate = &Today + 7 - dow(&Today) + 1
	&PickerOption.EndDate = &Today + 14 - dow(&Today)
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub NextMonth(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterNextMonth'
	&PickerOption.StartDate = AddMth(&Today, 1) - Day(&Today) + 1
	&PickerOption.EndDate = EoM(AddMth(&Today, 1))
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub

Stub NextYear(inout:&PickerOptions)
	&PickerOption = new()
	&PickerOption.DisplayName = 'WWP_FilterNextYear'
	&PickerOption.StartDate = YMDtoD(year(&Today) + 1, 1, 1)
	&PickerOption.EndDate = YMDtoD(year(&Today) + 1, 12, 31)
	&PickerOptions.Ranges.Add(&PickerOption)
EndStub
```

