# Procedure: ExportReportTemplate_Style3

- **Module:** WWPBaseObjects
- **Description:** Export Report Template_Style3
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AddressLine1 | Variable | VARCHAR |  | Address Line1 |
| AddressLine2 | Variable | VARCHAR |  | Address Line2 |
| DateInfo | Variable | VARCHAR |  | Date Info |
| Filter | Variable | VARCHAR |  | Filter |
| LineNumber | Variable | VARCHAR |  | Line Number |
| LineTotal | Variable | VARCHAR |  | Line Total |
| PageInfo | Variable | VARCHAR |  | Page Info |
| ProductName | Variable | VARCHAR |  | Product Name |
| Quantity | Variable | NUMERIC |  | Quantity |
| Title | Variable | VARCHAR |  | Title |
| UnitCost | Variable | VARCHAR |  | Unit Cost |
| Website | Variable | VARCHAR |  | Website |
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

Header
	&Website = !"http://www.web.com"
	&AddressLine1 = !"French Boulevard 2859"
	&AddressLine2 = !"Downtown"
	Print printTitle
End 
Footer
	&PageInfo = "Page: " + &Page.ToString().Trim()
	&DateInfo = "Date: " + &Today.ToFormattedString()
	Print printFooter
End
```

