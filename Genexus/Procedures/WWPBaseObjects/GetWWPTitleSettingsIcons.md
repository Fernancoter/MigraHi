# Procedure: GetWWPTitleSettingsIcons

- **Module:** WWPBaseObjects
- **Description:** Get WWPTitle Settings Icons
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| TitleSettingsIcons | Parameter | GX_SDT | out | Title Settings Icons |
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

&TitleSettingsIcons.Default_fi = !'fas fa-caret-down CSTitleIcon'
&TitleSettingsIcons.Filtered_fi = !'fas fa-filter CSTitleIcon'
&TitleSettingsIcons.SortedASC_fi = !'fas fa-long-arrow-alt-up CSTitleIcon'
&TitleSettingsIcons.SortedDSC_fi = !'fas fa-long-arrow-alt-down CSTitleIcon'
&TitleSettingsIcons.FilteredSortedASC_fi = !'fas fa-long-arrow-alt-up CSTitleIconDanger'
&TitleSettingsIcons.FilteredSortedDSC_fi = !'fas fa-long-arrow-alt-down CSTitleIconDanger'
&TitleSettingsIcons.OptionSortASC_fi = !'fas fa-sort-amount-up CSDropDownFI'
&TitleSettingsIcons.OptionSortDSC_fi = !'fas fa-sort-amount-down CSDropDownFI'
&TitleSettingsIcons.OptionApplyFilter_fi = !'fas fa-search'
&TitleSettingsIcons.OptionFilteringData_fi = !'fa fa-spinner fa-pulse fa-fw CSDropDownFI'
&TitleSettingsIcons.OptionCleanFilters_fi = !'fas fa-times CSDropDownFI'
&TitleSettingsIcons.SelectedOption_fi = !'fas fa-filter CSDropDownFilter'
&TitleSettingsIcons.MultiselOption_fi = !'far fa-square CSDropDownFilter'
&TitleSettingsIcons.MultiselSelOption_fi = !'far fa-check-square CSDropDownFilter'
&TitleSettingsIcons.TreeviewCollapse_fi = !'fas fa-angle-down'
&TitleSettingsIcons.TreeviewExpand_fi = !'fas fa-angle-right'
&TitleSettingsIcons.FixLeft_fi = !'fa fa-rotate-270 fa-table CSDropDownFI'
&TitleSettingsIcons.FixRight_fi = !'fa fa-rotate-90 fa-table CSDropDownFI'
```

### Rules (Rules)

```genexus

parm(out:&TitleSettingsIcons);
```

