# Procedure: InformesTelerik

- **Module:** Informes
- **Description:** Informes Telerik
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTTelerik | Parameter | GX_SDT | in | SDTTelerik |
| SDTInformeFilter | Parameter | GX_SDT | in | SDTInforme Filter |
| Caption | Parameter | LONGVARCHAR | out | Caption |
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

do 'FillHeaderCaption'

do case
	Case &SDTTelerik.ReportName = !'CertificadoCalidad'
		do 'CertificadoCalidad'
	Case &SDTTelerik.ReportName = !'ValeSalida'
		do 'ValeSalida'
		
	Otherwise
		do 'Report'
Endcase

Sub 'Report'
			
	&Caption += '                reportSource: {report: "' + &SDTTelerik.ReportName.ToString().Trim() + '.trdp", '                
	&Caption += '                    parameters: {'
	&Caption += ' 					  }'
    &Caption += '                },'
    &Caption += '                viewMode: telerikReportViewer.ViewModes.INTERACTIVE,'
    &Caption += '                scaleMode: telerikReportViewer.ScaleModes.SPECIFIC,'
	&Caption += '                pageMode: telerikReportViewer.PageModes.SINGLE_PAGE,'
	&Caption += '				scale: 1.0,'
    &Caption += '                enableAccessibility: false,'
    &Caption += '                sendEmail: { enabled: true }'
    &Caption += '            });'
    &Caption += '    });'
    &Caption += '</script>'
	
EndSub



Sub 'ValeSalida'
			
	&Caption += '                reportSource: {report: "ValeSalida.trdp", '                
	&Caption += '                    parameters: {'
	&Caption += ' 						EmbarqueId: "' + &SDTInformeFilter.Id.ToString().Trim() + '",'
	&Caption += ' 						Fila: "' + &SDTInformeFilter.Fila.ToString().Trim() + '"'
	&Caption += ' 					  }'
    &Caption += '                },'
    &Caption += '                viewMode: telerikReportViewer.ViewModes.INTERACTIVE,'
    &Caption += '                scaleMode: telerikReportViewer.ScaleModes.SPECIFIC,'
	&Caption += '                pageMode: telerikReportViewer.PageModes.SINGLE_PAGE,'
	&Caption += '				scale: 1.0,'
    &Caption += '                enableAccessibility: false,'
    &Caption += '                sendEmail: { enabled: true }'
    &Caption += '            });'
    &Caption += '    });'
    &Caption += '</script>'
	
EndSub

Sub 'CertificadoCalidad'
			
	&Caption += '                reportSource: {report: "CertificadoCalidad.trdp", '                
	&Caption += '                    parameters: {'
	&Caption += ' 						EmbarqueId: "' + &SDTInformeFilter.Id.ToString().Trim() + '",'
	&Caption += ' 						Fila: "' + &SDTInformeFilter.Fila.ToString().Trim() + '"'
	&Caption += ' 					  }'
    &Caption += '                },'
    &Caption += '                viewMode: telerikReportViewer.ViewModes.INTERACTIVE,'
    &Caption += '                scaleMode: telerikReportViewer.ScaleModes.SPECIFIC,'
	&Caption += '                pageMode: telerikReportViewer.PageModes.SINGLE_PAGE,'
	&Caption += '				scale: 1.0,'
    &Caption += '                enableAccessibility: false,'
    &Caption += '                sendEmail: { enabled: true }'
    &Caption += '            });'
    &Caption += '    });'
    &Caption += '</script>'
	
EndSub

sub 'FillHeaderCaption'
	
	&Caption  = ''
    &Caption += '<style>'
    &Caption += '    body {'
    &Caption += '        font-family: Verdana, Arial, sans-serif;'
    &Caption += '    }'
    &Caption += '    #reportViewer1 {'
    &Caption += '        position: absolute;'
    &Caption += '        left: 5px;'
    &Caption += '        right: 5px;'
    &Caption += '        top: 0px;'
    &Caption += '        bottom: 5px;'
    &Caption += '        overflow: hidden;'
    &Caption += '        clear: both;'
    &Caption += '    }'
    &Caption += '</style>'	
	&Caption += '<div id="reportViewer1">'
    &Caption += '    loading...'
    &Caption += '</div>'
    &Caption += '<script type="text/javascript">'
    &Caption += '    $(document).ready(function () {'
    &Caption += '           $("#reportViewer1")'
    &Caption += '            .telerik_ReportViewer({ '
    &Caption += '                serviceUrl: "../reporteserp/api/reports", '    
	
endsub
```

### Rules (Rules)

```genexus
parm(in:&SDTTelerik,In: &SDTInformeFilter, out:&Caption);
```

