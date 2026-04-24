# Procedure: SDPCalendarGetSampleData

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPCalendar Get Sample Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CurrentDate | Variable | GX_SDT |  | Current Date |
| SDPlusCalendarInfo | Parameter | GX_SDT | out | SDPlus Calendar Info |
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
	&SDPlusCalendarInfo = new()
	
	&CurrentDate = new()
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 20
	//&CurrentDate.Status = 1
	&CurrentDate.Color = !"#ff3534"
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Sofia's birthday party"
	&SDPlusCalendarInfo.Events.Add(&CurrentDate)
	
	&CurrentDate = new()	
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 2
	&CurrentDate.Status = 2
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Work meeting"
	&SDPlusCalendarInfo.Events.Add(&CurrentDate)
	
	&CurrentDate = new()	
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 3
	&CurrentDate.Status = 3
	&CurrentDate.Color = !"#afafaf"
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Veterinary"
	&SDPlusCalendarInfo.Events.Add(&CurrentDate)
	
	&CurrentDate = new()	
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 4
	//&CurrentDate.Status = 4
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Football match with friends"
	&SDPlusCalendarInfo.Events.Add(&CurrentDate)
	
	&CurrentDate = new()	
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 5
	//&CurrentDate.Status = 5
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Work party"
	&SDPlusCalendarInfo.Events.Add(&CurrentDate)
	
	&CurrentDate = new()	
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 26
	&CurrentDate.Status = 6
	&CurrentDate.Color = !"#afafaf"
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Calendar Event Number 6"
	&SDPlusCalendarInfo.Events.Add(&CurrentDate)
	
	&CurrentDate = new()	
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 11	
	&CurrentDate.Color = !"#0000cc"
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Calendar Event Number 7"
	&SDPlusCalendarInfo.Events.Add(&CurrentDate)
	
	&CurrentDate = new()	
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 12
	&CurrentDate.Color = !"#000dc0"
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Calendar Event Number 8"
	&SDPlusCalendarInfo.Events.Add(&CurrentDate)
	
	&CurrentDate = new()	
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 6
	//&CurrentDate.Status = 0
	//&CurrentDate.Text = "BD"
	//&CurrentDate.Color = !"#00dd00"
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Calendar Event Number 9"
	&SDPlusCalendarInfo.Events.Add(&CurrentDate)
	
	&CurrentDate = new()	
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 7
	//&CurrentDate.Status = 2
	//&CurrentDate.Text = "BD"
	//&CurrentDate.Color = !"#00dd00"
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Calendar Event Number 10"
	&SDPlusCalendarInfo.Events.Add(&CurrentDate)
	
	&CurrentDate = new()
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 24
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Calendar Event Number 11"
	&SDPlusCalendarInfo.Disabled.Add(&CurrentDate)
	
	&CurrentDate = new()
	&CurrentDate.Year = 2019
	&CurrentDate.Month = 12
	&CurrentDate.Day = 25
	&CurrentDate.Time = now()
	&CurrentDate.Content = !"Calendar Event Number 12"
	&SDPlusCalendarInfo.Disabled.Add(&CurrentDate)
```

### Rules (Rules)

```genexus
Parm(out:&SDPlusCalendarInfo);
```

