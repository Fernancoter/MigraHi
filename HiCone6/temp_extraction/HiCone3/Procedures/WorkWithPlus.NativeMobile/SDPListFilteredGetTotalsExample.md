# Procedure: SDPListFilteredGetTotalsExample

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPList Filtered Get Totals Example
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SelectedFilter | Variable | NUMERIC |  | Selected Filter |
| Total1 | Parameter | NUMERIC | out | Total1 |
| Total2 | Parameter | NUMERIC | out | Total2 |
| Total3 | Parameter | NUMERIC | out | Total3 |
| Total4 | Parameter | NUMERIC | out | Total4 |
| Total5 | Parameter | NUMERIC | out | Total5 |
| FilterMonthFrom | Variable | DATE |  | Filter Month From |
| FilterWeekFrom | Variable | DATE |  | Filter Week From |
| FilterYesterdayFrom | Variable | DATE |  | Filter Yesterday From |
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
&FilterYesterdayFrom = &Today.AddDays(-1)
&FilterWeekFrom = &Today.AddDays(-7)
&FilterMonthFrom = &Today.AddDays(-30)
	
&SelectedFilter = SDPWebServerSessionGet.Udp(!'&SelectedFilter').ToNumeric() 
/*
For each
	Where ProductPublished >= &Today When &SelectedFilter = 1
	Where ProductPublished < &Today AND PropertyPublished >= &FilterYesterdayFrom When &SelectedFilter = 2 
	Where ProductPublished >= &FilterWeekFrom When &SelectedFilter = 3 
	Where ProductPublished >= &FilterMonthFrom When &SelectedFilter = 4	
	
	If ProductType = Type.Type1
		&Total1 += 1
	EndIf
	If ProductType = Type.Type2
		&Total2 += 1
	EndIf		
	&Total3 += 1		
	If ProductType = Type.Type3
		&Total4 += 1
	EndIf
	If ProductType = Type.Type4
		&Total5 += 1
	EndIf	
endFor
*/
```

### Rules (Rules)

```genexus
Parm(out:&Total1, out:&Total2, out:&Total3, out:&Total4, out:&Total5);
```

