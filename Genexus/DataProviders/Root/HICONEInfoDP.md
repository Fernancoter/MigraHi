# DataProvider: HICONEInfoDP

- **Module:** Root
- **Description:** SDPMenu Info DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDPMenuOptions | Variable | GX_SDT |  | SDPMenu Options |
| GamUser | Variable | GX_EXTERNAL_OBJECT |  | Gam User |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDPMenuInfo
{
	&GamUser = GamUser.Get()
	TitleInfo = &GamUser.Name
	SecondaryInfo = &GamUser.EMail
	Image = SDPResUserAvatar.Link()
	InfoField1 = !"Platinum"
	InfoField2 = !"2000"
	InfoFieldNumeric1 = 60
}
/*
	Replace with real information
*/
```

