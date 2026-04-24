# Procedure: ExportReportTemplate_Style2

- **Module:** WWPBaseObjects
- **Description:** Export Report Template_Style2
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AddressLine1 | Variable | VARCHAR |  | Address Line1 |
| AddressLine2 | Variable | VARCHAR |  | Address Line2 |
| Attribute | Variable | VARCHAR |  | Attribute |
| DateInfo | Variable | VARCHAR |  | Date Info |
| Filter | Variable | VARCHAR |  | Filter |
| Mail | Variable | VARCHAR |  | Mail |
| PageInfo | Variable | VARCHAR |  | Page Info |
| Phone | Variable | VARCHAR |  | Phone |
| Title | Variable | VARCHAR |  | Title |
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
	&Phone = !"+1 550 8923"
	&Mail = !"info@mail.com"
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

