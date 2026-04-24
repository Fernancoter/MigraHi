# DataProvider: GetSomeHomeModulesSample

- **Module:** WWPBaseObjects
- **Description:** Get Some Home Modules Sample
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HomeModulesSDT | Variable | GX_SDT |  | Home Modules SDT |
| HomeModulesSDTItem | Variable | GX_SDT |  | Home Modules SDTItem |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
HomeModulesSDT
{
	&HomeModulesSDT = GetHomeModulesSample()
	HomeModulesSDTItem [Count=6] Input &HomeModulesSDTItem in &HomeModulesSDT
	{
		OptionTitle = &HomeModulesSDTItem.OptionTitle
		OptionIconThemeClass = &HomeModulesSDTItem.OptionIconThemeClass
		OptionBackgroundImage = &HomeModulesSDTItem.OptionBackgroundImage
		OptionDescription = &HomeModulesSDTItem.OptionDescription
		OptionWCLink = &HomeModulesSDTItem.OptionWCLink
	}
}
```

