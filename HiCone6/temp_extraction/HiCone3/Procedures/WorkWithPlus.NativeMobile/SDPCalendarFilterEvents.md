# Procedure: SDPCalendarFilterEvents

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPCalendar Filter Events
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Month | Parameter | NUMERIC | in | Month |
| SDPlusCalendarEntryCollection | Parameter | GX_SDT | in | SDPlus Calendar Entry Collection |
| SDPlusCalendarEntryCollectionFiltered | Parameter | GX_SDT | out | SDPlus Calendar Entry Collection Filtered |
| Year | Parameter | NUMERIC | in | Year |
| CalendarEntry | Variable | GX_SDT |  | Calendar Entry |
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

For &CalendarEntry in &SDPlusCalendarEntryCollection
	If &CalendarEntry.Year = &Year AND &CalendarEntry.Month = &Month
		&SDPlusCalendarEntryCollectionFiltered.Add(&CalendarEntry)
	EndIf
EndFor

&SDPlusCalendarEntryCollectionFiltered.Sort(!"Month,Day")
```

### Rules (Rules)

```genexus
Parm(in:&SDPlusCalendarEntryCollection, in:&Year, in:&Month, out:&SDPlusCalendarEntryCollectionFiltered);
```

