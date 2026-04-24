# WebPanel: ReportITW

- **Module:** SAE
- **Description:** Report ITW
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Axes | Variable | GX_SDT |  | Axes |
| Axis | Variable | GX_SDT |  | Axis |
| DragAndDropData | Variable | GX_SDT |  | Drag And Drop Data |
| FilterChangedData | Variable | GX_SDT |  | Filter Changed Data |
| HTTP_HOST | Variable | VARCHAR |  | HTTP_HOST |
| ItemClickData | Variable | GX_SDT |  | Item Click Data |
| ItemCollapseData | Variable | GX_SDT |  | Item Collapse Data |
| ItemDoubleClickData | Variable | GX_SDT |  | Item Double Click Data |
| ItemExpandData | Variable | GX_SDT |  | Item Expand Data |
| Parameter | Variable | GX_SDT |  | Parameter |
| Parameters | Variable | GX_SDT |  | Parameters |
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Enter (Event)

```genexus
// Empty block or parsing failed
```

### Start (Event)

```genexus
//csharp [!HTTP_HOST!] =  System.Web.HttpContext.Current.Request.ServerVariables["HTTP_HOST"];
	
	//msg("http://" + &HTTP_HOST.Trim() + "/index.html")
	//EmbPage1.Source = "http://" + &HTTP_HOST.Trim() + "/index.html"
```

