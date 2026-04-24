# Procedure: MenuByModule

- **Module:** Web
- **Description:** Menu By Module
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DVelop_Menu | Parameter | GX_SDT | out | DVelop_Menu |
| ModuleId | Parameter | NUMERIC | in | Module Id |
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
Do Case
	Case &ModuleId = 1
		&DVelop_Menu = MenuSeguridad.Udp()
	Case &ModuleId = 2
		&DVelop_Menu = MenuConfiguracion.Udp()
	Case &ModuleId = 3
		&DVelop_Menu = MenuInventario.Udp()
	Case &ModuleId = 4
		&DVelop_Menu = MenuExtrusion.Udp() 
	Case &ModuleId = 5
		&DVelop_Menu = MenuPrensado.Udp() 
	Case &ModuleId = 6
		&DVelop_Menu = MenuMateriaPrima.Udp() 
	Case &ModuleId = 7
		&DVelop_Menu = MenuModuleInformesSAE.Udp()	
	Case &ModuleId = 8
		&DVelop_Menu = MenuModuleCatalogosSAE.Udp()	
	Case &ModuleId = 9
		&DVelop_Menu = MenuEmbarques.Udp()	
	Case &ModuleId = 10
		&DVelop_Menu = MenuCalidad.Udp()
	Case &ModuleId = 11
		&DVelop_Menu = MenuReportesHC.Udp()
	Otherwise
		//Menú by default
		&DVelop_Menu = MenuProduccion.Udp()
Endcase
```

### Rules (Rules)

```genexus
parm(in:&ModuleId,out:&DVelop_Menu);
```

