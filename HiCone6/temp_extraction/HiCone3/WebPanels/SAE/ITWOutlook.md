# WebPanel: ITWOutlook

- **Module:** SAE
- **Description:** ITWOutlook
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| Titulo | Variable | VARCHAR |  | Titulo |
| URL | Variable | VARCHAR |  | URL |
| SesionGUID | Variable | GUID |  | Sesion GUID |
| IISReportesVarchar | Variable | VARCHAR |  | IISReportes Varchar |
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Start (Event)

```genexus
&IISReportesVarchar = ObtenerConfiguracion.Udp(!'IISReportes')
form.Caption = "ITW Outlook Report"
html.Caption = '<div class="embed-responsive embed-responsive-16by9">'
html.Caption +='  <iframe class="embed-responsive-item" src="../'+&IISReportesVarchar.Trim()+'/ITWReport2.html"></iframe>'
html.Caption +='</div>'
```

