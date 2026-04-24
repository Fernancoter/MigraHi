# Procedure: listarExtrusionExportReport

- **Module:** Produccion
- **Description:** listar Extrusion Export Report
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| OrderedBy | Variable | NUMERIC |  | Ordered By |
| OrderedDsc | Variable | Boolean |  | Ordered Dsc |
| FilterFullText | Variable | VARCHAR |  | Filter Full Text |
| ExtrusionProductoTipoMaterialDescription | Variable | VARCHAR |  | Extrusion Producto Tipo Material Description |
| ExtrusionEstadoDescription | Variable | VARCHAR |  | Extrusion Estado Description |
| ExtrusionMotivoAnticipadoDescription | Variable | VARCHAR |  | Extrusion Motivo Anticipado Description |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFExtrusionId | Variable | NUMERIC |  | TFExtrusion Id |
| TFExtrusionId_To | Variable | NUMERIC |  | TFExtrusion Id_To |
| TFExtrusionExtrusoraId | Variable | NUMERIC |  | TFExtrusion Extrusora Id |
| TFExtrusionExtrusoraId_To | Variable | NUMERIC |  | TFExtrusion Extrusora Id_To |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFExtrusionTurnoId | Variable | NUMERIC |  | TFExtrusion Turno Id |
| TFExtrusionTurnoId_To | Variable | NUMERIC |  | TFExtrusion Turno Id_To |
| TFExtrusionTurnoNombre | Variable | VARCHAR |  | TFExtrusion Turno Nombre |
| TFExtrusionTurnoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Turno Nombre_Sel |
| TFExtrusionProductoId | Variable | NUMERIC |  | TFExtrusion Producto Id |
| TFExtrusionProductoId_To | Variable | NUMERIC |  | TFExtrusion Producto Id_To |
| TFExtrusionProductoNombre | Variable | VARCHAR |  | TFExtrusion Producto Nombre |
| TFExtrusionProductoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Producto Nombre_Sel |
| TFExtrusionProductoTipoMaterial_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Producto Tipo Material_Sels Json |
| TFExtrusionProductoTipoMaterial_SelDscs | Variable | VARCHAR |  | TFExtrusion Producto Tipo Material_Sel Dscs |
| TFExtrusionProductoTipoMaterial_Sel | Variable | VARCHAR |  | TFExtrusion Producto Tipo Material_Sel |
| TFExtrusionProductoTipoMaterial_Sels | Variable | VARCHAR |  | TFExtrusion Producto Tipo Material_Sels |
| TFExtrusionFecha | Variable | DATETIME |  | TFExtrusion Fecha |
| TFExtrusionFecha_To | Variable | DATETIME |  | TFExtrusion Fecha_To |
| TFExtrusionCalibre | Variable | VARCHAR |  | TFExtrusion Calibre |
| TFExtrusionCalibre_Sel | Variable | VARCHAR |  | TFExtrusion Calibre_Sel |
| TFExtrusionAncho | Variable | VARCHAR |  | TFExtrusion Ancho |
| TFExtrusionAncho_Sel | Variable | VARCHAR |  | TFExtrusion Ancho_Sel |
| TFExtrusionLongitud | Variable | VARCHAR |  | TFExtrusion Longitud |
| TFExtrusionLongitud_Sel | Variable | VARCHAR |  | TFExtrusion Longitud_Sel |
| TFExtrusionVirgenKg | Variable | NUMERIC |  | TFExtrusion Virgen Kg |
| TFExtrusionVirgenKg_To | Variable | NUMERIC |  | TFExtrusion Virgen Kg_To |
| TFExtrusionMeta | Variable | NUMERIC |  | TFExtrusion Meta |
| TFExtrusionMeta_To | Variable | NUMERIC |  | TFExtrusion Meta_To |
| TFExtrusionMolidoKg | Variable | NUMERIC |  | TFExtrusion Molido Kg |
| TFExtrusionMolidoKg_To | Variable | NUMERIC |  | TFExtrusion Molido Kg_To |
| TFExtrusionRevHusilloVirgen | Variable | NUMERIC |  | TFExtrusion Rev Husillo Virgen |
| TFExtrusionRevHusilloVirgen_To | Variable | NUMERIC |  | TFExtrusion Rev Husillo Virgen_To |
| TFExtrusionRevHusilloMolido | Variable | NUMERIC |  | TFExtrusion Rev Husillo Molido |
| TFExtrusionRevHusilloMolido_To | Variable | NUMERIC |  | TFExtrusion Rev Husillo Molido_To |
| TFExtrusionEstado_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Estado_Sels Json |
| TFExtrusionEstado_SelDscs | Variable | VARCHAR |  | TFExtrusion Estado_Sel Dscs |
| TFExtrusionEstado_Sel | Variable | VARCHAR |  | TFExtrusion Estado_Sel |
| TFExtrusionEstado_Sels | Variable | VARCHAR |  | TFExtrusion Estado_Sels |
| TFExtrusionOperadorId | Variable | NUMERIC |  | TFExtrusion Operador Id |
| TFExtrusionOperadorId_To | Variable | NUMERIC |  | TFExtrusion Operador Id_To |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionHoraIniciaProceso | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso |
| TFExtrusionHoraIniciaProceso_To | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso_To |
| TFExtrusionHoraFinProceso | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso |
| TFExtrusionHoraFinProceso_To | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso_To |
| TFExtrusionLoteSilo | Variable | VARCHAR |  | TFExtrusion Lote Silo |
| TFExtrusionLoteSilo_Sel | Variable | VARCHAR |  | TFExtrusion Lote Silo_Sel |
| TFExtrusionMotivoAnticipado_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Motivo Anticipado_Sels Json |
| TFExtrusionMotivoAnticipado_SelDscs | Variable | VARCHAR |  | TFExtrusion Motivo Anticipado_Sel Dscs |
| TFExtrusionMotivoAnticipado_Sel | Variable | VARCHAR |  | TFExtrusion Motivo Anticipado_Sel |
| TFExtrusionMotivoAnticipado_Sels | Variable | VARCHAR |  | TFExtrusion Motivo Anticipado_Sels |
| TFExtrusionResultadoBobinasReposoTotales | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Reposo Totales |
| TFExtrusionResultadoBobinasReposoTotales_To | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Reposo Totales_To |
| TFExtrusionSiloId | Variable | NUMERIC |  | TFExtrusion Silo Id |
| TFExtrusionSiloId_To | Variable | NUMERIC |  | TFExtrusion Silo Id_To |
| TFExtrusionSiloNombre | Variable | VARCHAR |  | TFExtrusion Silo Nombre |
| TFExtrusionSiloNombre_Sel | Variable | VARCHAR |  | TFExtrusion Silo Nombre_Sel |
| TFExtrusionId_To_Description | Variable | VARCHAR |  | TFExtrusion Id_To_Description |
| TFExtrusionExtrusoraId_To_Description | Variable | VARCHAR |  | TFExtrusion Extrusora Id_To_Description |
| TFExtrusionTurnoId_To_Description | Variable | VARCHAR |  | TFExtrusion Turno Id_To_Description |
| TFExtrusionProductoId_To_Description | Variable | VARCHAR |  | TFExtrusion Producto Id_To_Description |
| FilterTFExtrusionProductoTipoMaterial_SelValueDescription | Variable | VARCHAR |  | Filter TFExtrusion Producto Tipo Material_Sel Value Description |
| TFExtrusionFecha_To_Description | Variable | VARCHAR |  | TFExtrusion Fecha_To_Description |
| TFExtrusionVirgenKg_To_Description | Variable | VARCHAR |  | TFExtrusion Virgen Kg_To_Description |
| TFExtrusionMeta_To_Description | Variable | VARCHAR |  | TFExtrusion Meta_To_Description |
| TFExtrusionMolidoKg_To_Description | Variable | VARCHAR |  | TFExtrusion Molido Kg_To_Description |
| TFExtrusionRevHusilloVirgen_To_Description | Variable | VARCHAR |  | TFExtrusion Rev Husillo Virgen_To_Description |
| TFExtrusionRevHusilloMolido_To_Description | Variable | VARCHAR |  | TFExtrusion Rev Husillo Molido_To_Description |
| FilterTFExtrusionEstado_SelValueDescription | Variable | VARCHAR |  | Filter TFExtrusion Estado_Sel Value Description |
| TFExtrusionOperadorId_To_Description | Variable | VARCHAR |  | TFExtrusion Operador Id_To_Description |
| TFExtrusionHoraIniciaProceso_To_Description | Variable | VARCHAR |  | TFExtrusion Hora Inicia Proceso_To_Description |
| TFExtrusionHoraFinProceso_To_Description | Variable | VARCHAR |  | TFExtrusion Hora Fin Proceso_To_Description |
| FilterTFExtrusionMotivoAnticipado_SelValueDescription | Variable | VARCHAR |  | Filter TFExtrusion Motivo Anticipado_Sel Value Description |
| TFExtrusionResultadoBobinasReposoTotales_To_Description | Variable | VARCHAR |  | TFExtrusion Resultado Bobinas Reposo Totales_To_Description |
| TFExtrusionSiloId_To_Description | Variable | VARCHAR |  | TFExtrusion Silo Id_To_Description |
| i | Variable | NUMERIC |  | i |
| AddressLine1 | Variable | VARCHAR |  | Address Line1 |
| AddressLine2 | Variable | VARCHAR |  | Address Line2 |
| AddressLine3 | Variable | VARCHAR |  | Address Line3 |
| AppName | Variable | VARCHAR |  | App Name |
| Attribute | Variable | VARCHAR |  | Attribute |
| DateInfo | Variable | VARCHAR |  | Date Info |
| Filter | Variable | VARCHAR |  | Filter |
| Mail | Variable | VARCHAR |  | Mail |
| PageInfo | Variable | VARCHAR |  | Page Info |
| Phone | Variable | VARCHAR |  | Phone |
| Title | Variable | VARCHAR |  | Title |
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

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

// Exports the contents of a grid (using the selected order and filters) to a PDF file.
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'listarextrusion_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Extrusion List"

//Report Template Source
	Header
		&AppName = "DVelop Software Solutions"
		&Phone = !"+1 550 8923"
		&Mail = !"info@mail.com"
		&Website = !"http://www.web.com"
		&AddressLine1 = !"French Boulevard 2859"
		&AddressLine2 = !"Downtown"
		&AddressLine3 = !"Paris, France"
		Print printTitle
	End 
	Footer
		&PageInfo = "Page: " + &Page.ToString().Trim()
		&DateInfo = "Date: " + &Today.ToFormattedString()
		Print printFooter
	End

	Do 'PrintFilters'

	Do 'PrintColumnTitles'

	Do 'PrintData'

	Do 'PrintFooter'

EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'PrintFilters'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	If not &FilterFullText.IsEmpty()
		print printBlockFilterFilterFullText
	EndIf
	If not (&TFExtrusionId.IsEmpty() AND &TFExtrusionId_To.IsEmpty())
		print printBlockTFExtrusionId
		&TFExtrusionId_To_Description = format('%1 (%2)', "Id", "WWP_TSTo")
		print printBlockTFExtrusionId_To
	EndIf
	If not (&TFExtrusionExtrusoraId.IsEmpty() AND &TFExtrusionExtrusoraId_To.IsEmpty())
		print printBlockTFExtrusionExtrusoraId
		&TFExtrusionExtrusoraId_To_Description = format('%1 (%2)', "Extrusora Id", "WWP_TSTo")
		print printBlockTFExtrusionExtrusoraId_To
	EndIf
	If not &TFExtrusionExtrusoraNombre_Sel.IsEmpty()
		print printBlockTFExtrusionExtrusoraNombre_Sel
	Else
		If not &TFExtrusionExtrusoraNombre.IsEmpty()
			print printBlockTFExtrusionExtrusoraNombre
		EndIf
	EndIf
	If not (&TFExtrusionTurnoId.IsEmpty() AND &TFExtrusionTurnoId_To.IsEmpty())
		print printBlockTFExtrusionTurnoId
		&TFExtrusionTurnoId_To_Description = format('%1 (%2)', "Turno Id", "WWP_TSTo")
		print printBlockTFExtrusionTurnoId_To
	EndIf
	If not &TFExtrusionTurnoNombre_Sel.IsEmpty()
		print printBlockTFExtrusionTurnoNombre_Sel
	Else
		If not &TFExtrusionTurnoNombre.IsEmpty()
			print printBlockTFExtrusionTurnoNombre
		EndIf
	EndIf
	If not (&TFExtrusionProductoId.IsEmpty() AND &TFExtrusionProductoId_To.IsEmpty())
		print printBlockTFExtrusionProductoId
		&TFExtrusionProductoId_To_Description = format('%1 (%2)', "Producto Id", "WWP_TSTo")
		print printBlockTFExtrusionProductoId_To
	EndIf
	If not &TFExtrusionProductoNombre_Sel.IsEmpty()
		print printBlockTFExtrusionProductoNombre_Sel
	Else
		If not &TFExtrusionProductoNombre.IsEmpty()
			print printBlockTFExtrusionProductoNombre
		EndIf
	EndIf
	&TFExtrusionProductoTipoMaterial_Sels.FromJson(&TFExtrusionProductoTipoMaterial_SelsJson)
	If not &TFExtrusionProductoTipoMaterial_Sels.Count = 0
		&i = 1
		For &TFExtrusionProductoTipoMaterial_Sel in &TFExtrusionProductoTipoMaterial_Sels
			If &i = 1
				&TFExtrusionProductoTipoMaterial_SelDscs = ''
			Else
				&TFExtrusionProductoTipoMaterial_SelDscs += ', '
			EndIf
			&FilterTFExtrusionProductoTipoMaterial_SelValueDescription = &TFExtrusionProductoTipoMaterial_Sel.EnumerationDescription()

			&TFExtrusionProductoTipoMaterial_SelDscs += &FilterTFExtrusionProductoTipoMaterial_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFExtrusionProductoTipoMaterial_Sel
	EndIf
	If not (&TFExtrusionFecha.IsEmpty() AND &TFExtrusionFecha_To.IsEmpty())
		print printBlockTFExtrusionFecha
		&TFExtrusionFecha_To_Description = format('%1 (%2)', "Fecha", "WWP_TSTo")
		print printBlockTFExtrusionFecha_To
	EndIf
	If not &TFExtrusionCalibre_Sel.IsEmpty()
		print printBlockTFExtrusionCalibre_Sel
	Else
		If not &TFExtrusionCalibre.IsEmpty()
			print printBlockTFExtrusionCalibre
		EndIf
	EndIf
	If not &TFExtrusionAncho_Sel.IsEmpty()
		print printBlockTFExtrusionAncho_Sel
	Else
		If not &TFExtrusionAncho.IsEmpty()
			print printBlockTFExtrusionAncho
		EndIf
	EndIf
	If not &TFExtrusionLongitud_Sel.IsEmpty()
		print printBlockTFExtrusionLongitud_Sel
	Else
		If not &TFExtrusionLongitud.IsEmpty()
			print printBlockTFExtrusionLongitud
		EndIf
	EndIf
	If not (&TFExtrusionVirgenKg.IsEmpty() AND &TFExtrusionVirgenKg_To.IsEmpty())
		print printBlockTFExtrusionVirgenKg
		&TFExtrusionVirgenKg_To_Description = format('%1 (%2)', "Virgen Kg", "WWP_TSTo")
		print printBlockTFExtrusionVirgenKg_To
	EndIf
	If not (&TFExtrusionMeta.IsEmpty() AND &TFExtrusionMeta_To.IsEmpty())
		print printBlockTFExtrusionMeta
		&TFExtrusionMeta_To_Description = format('%1 (%2)', "Meta", "WWP_TSTo")
		print printBlockTFExtrusionMeta_To
	EndIf
	If not (&TFExtrusionMolidoKg.IsEmpty() AND &TFExtrusionMolidoKg_To.IsEmpty())
		print printBlockTFExtrusionMolidoKg
		&TFExtrusionMolidoKg_To_Description = format('%1 (%2)', "Molido Kg", "WWP_TSTo")
		print printBlockTFExtrusionMolidoKg_To
	EndIf
	If not (&TFExtrusionRevHusilloVirgen.IsEmpty() AND &TFExtrusionRevHusilloVirgen_To.IsEmpty())
		print printBlockTFExtrusionRevHusilloVirgen
		&TFExtrusionRevHusilloVirgen_To_Description = format('%1 (%2)', "Husillo Virgen", "WWP_TSTo")
		print printBlockTFExtrusionRevHusilloVirgen_To
	EndIf
	If not (&TFExtrusionRevHusilloMolido.IsEmpty() AND &TFExtrusionRevHusilloMolido_To.IsEmpty())
		print printBlockTFExtrusionRevHusilloMolido
		&TFExtrusionRevHusilloMolido_To_Description = format('%1 (%2)', "Husillo Molido", "WWP_TSTo")
		print printBlockTFExtrusionRevHusilloMolido_To
	EndIf
	&TFExtrusionEstado_Sels.FromJson(&TFExtrusionEstado_SelsJson)
	If not &TFExtrusionEstado_Sels.Count = 0
		&i = 1
		For &TFExtrusionEstado_Sel in &TFExtrusionEstado_Sels
			If &i = 1
				&TFExtrusionEstado_SelDscs = ''
			Else
				&TFExtrusionEstado_SelDscs += ', '
			EndIf
			&FilterTFExtrusionEstado_SelValueDescription = &TFExtrusionEstado_Sel.EnumerationDescription()

			&TFExtrusionEstado_SelDscs += &FilterTFExtrusionEstado_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFExtrusionEstado_Sel
	EndIf
	If not (&TFExtrusionOperadorId.IsEmpty() AND &TFExtrusionOperadorId_To.IsEmpty())
		print printBlockTFExtrusionOperadorId
		&TFExtrusionOperadorId_To_Description = format('%1 (%2)', "Operador Id", "WWP_TSTo")
		print printBlockTFExtrusionOperadorId_To
	EndIf
	If not &TFExtrusionOperadorNombre_Sel.IsEmpty()
		print printBlockTFExtrusionOperadorNombre_Sel
	Else
		If not &TFExtrusionOperadorNombre.IsEmpty()
			print printBlockTFExtrusionOperadorNombre
		EndIf
	EndIf
	If not (&TFExtrusionHoraIniciaProceso.IsEmpty() AND &TFExtrusionHoraIniciaProceso_To.IsEmpty())
		print printBlockTFExtrusionHoraIniciaProceso
		&TFExtrusionHoraIniciaProceso_To_Description = format('%1 (%2)', "Inicia Proceso", "WWP_TSTo")
		print printBlockTFExtrusionHoraIniciaProceso_To
	EndIf
	If not (&TFExtrusionHoraFinProceso.IsEmpty() AND &TFExtrusionHoraFinProceso_To.IsEmpty())
		print printBlockTFExtrusionHoraFinProceso
		&TFExtrusionHoraFinProceso_To_Description = format('%1 (%2)', "Fin Proceso", "WWP_TSTo")
		print printBlockTFExtrusionHoraFinProceso_To
	EndIf
	If not &TFExtrusionLoteSilo_Sel.IsEmpty()
		print printBlockTFExtrusionLoteSilo_Sel
	Else
		If not &TFExtrusionLoteSilo.IsEmpty()
			print printBlockTFExtrusionLoteSilo
		EndIf
	EndIf
	&TFExtrusionMotivoAnticipado_Sels.FromJson(&TFExtrusionMotivoAnticipado_SelsJson)
	If not &TFExtrusionMotivoAnticipado_Sels.Count = 0
		&i = 1
		For &TFExtrusionMotivoAnticipado_Sel in &TFExtrusionMotivoAnticipado_Sels
			If &i = 1
				&TFExtrusionMotivoAnticipado_SelDscs = ''
			Else
				&TFExtrusionMotivoAnticipado_SelDscs += ', '
			EndIf
			

			&TFExtrusionMotivoAnticipado_SelDscs += &FilterTFExtrusionMotivoAnticipado_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFExtrusionMotivoAnticipado_Sel
	EndIf
	If not (&TFExtrusionResultadoBobinasReposoTotales.IsEmpty() AND &TFExtrusionResultadoBobinasReposoTotales_To.IsEmpty())
		print printBlockTFExtrusionResultadoBobinasReposoTotales
		&TFExtrusionResultadoBobinasReposoTotales_To_Description = format('%1 (%2)', "Fabricadas", "WWP_TSTo")
		print printBlockTFExtrusionResultadoBobinasReposoTotales_To
	EndIf
	If not (&TFExtrusionSiloId.IsEmpty() AND &TFExtrusionSiloId_To.IsEmpty())
		print printBlockTFExtrusionSiloId
		&TFExtrusionSiloId_To_Description = format('%1 (%2)', "Silo Id", "WWP_TSTo")
		print printBlockTFExtrusionSiloId_To
	EndIf
	If not &TFExtrusionSiloNombre_Sel.IsEmpty()
		print printBlockTFExtrusionSiloNombre_Sel
	Else
		If not &TFExtrusionSiloNombre.IsEmpty()
			print printBlockTFExtrusionSiloNombre
		EndIf
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	print printBlockBeforeGrid
	print printBlockLines_titles

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintData'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	For each DB.Extrusion
		order ExtrusionExtrusoraNombre  when &OrderedBy = 1 AND &OrderedDsc = False
		order (ExtrusionExtrusoraNombre)  when &OrderedBy = 1 AND &OrderedDsc = True
		order ExtrusionId  when &OrderedBy = 2 AND &OrderedDsc = False
		order (ExtrusionId)  when &OrderedBy = 2 AND &OrderedDsc = True
		order ExtrusionExtrusoraId  when &OrderedBy = 3 AND &OrderedDsc = False
		order (ExtrusionExtrusoraId)  when &OrderedBy = 3 AND &OrderedDsc = True
		order ExtrusionTurnoId  when &OrderedBy = 4 AND &OrderedDsc = False
		order (ExtrusionTurnoId)  when &OrderedBy = 4 AND &OrderedDsc = True
		order ExtrusionTurnoNombre  when &OrderedBy = 5 AND &OrderedDsc = False
		order (ExtrusionTurnoNombre)  when &OrderedBy = 5 AND &OrderedDsc = True
		order ExtrusionProductoId  when &OrderedBy = 6 AND &OrderedDsc = False
		order (ExtrusionProductoId)  when &OrderedBy = 6 AND &OrderedDsc = True
		order ExtrusionProductoNombre  when &OrderedBy = 7 AND &OrderedDsc = False
		order (ExtrusionProductoNombre)  when &OrderedBy = 7 AND &OrderedDsc = True
		order ExtrusionProductoTipoMaterial  when &OrderedBy = 8 AND &OrderedDsc = False
		order (ExtrusionProductoTipoMaterial)  when &OrderedBy = 8 AND &OrderedDsc = True
		order ExtrusionFecha  when &OrderedBy = 9 AND &OrderedDsc = False
		order (ExtrusionFecha)  when &OrderedBy = 9 AND &OrderedDsc = True
		order ExtrusionCalibre  when &OrderedBy = 10 AND &OrderedDsc = False
		order (ExtrusionCalibre)  when &OrderedBy = 10 AND &OrderedDsc = True
		order ExtrusionAncho  when &OrderedBy = 11 AND &OrderedDsc = False
		order (ExtrusionAncho)  when &OrderedBy = 11 AND &OrderedDsc = True
		order ExtrusionLongitud  when &OrderedBy = 12 AND &OrderedDsc = False
		order (ExtrusionLongitud)  when &OrderedBy = 12 AND &OrderedDsc = True
		order ExtrusionVirgenKg  when &OrderedBy = 13 AND &OrderedDsc = False
		order (ExtrusionVirgenKg)  when &OrderedBy = 13 AND &OrderedDsc = True
		order ExtrusionMeta  when &OrderedBy = 14 AND &OrderedDsc = False
		order (ExtrusionMeta)  when &OrderedBy = 14 AND &OrderedDsc = True
		order ExtrusionMolidoKg  when &OrderedBy = 15 AND &OrderedDsc = False
		order (ExtrusionMolidoKg)  when &OrderedBy = 15 AND &OrderedDsc = True
		order ExtrusionRevHusilloVirgen  when &OrderedBy = 16 AND &OrderedDsc = False
		order (ExtrusionRevHusilloVirgen)  when &OrderedBy = 16 AND &OrderedDsc = True
		order ExtrusionRevHusilloMolido  when &OrderedBy = 17 AND &OrderedDsc = False
		order (ExtrusionRevHusilloMolido)  when &OrderedBy = 17 AND &OrderedDsc = True
		order ExtrusionEstado  when &OrderedBy = 18 AND &OrderedDsc = False
		order (ExtrusionEstado)  when &OrderedBy = 18 AND &OrderedDsc = True
		order ExtrusionOperadorId  when &OrderedBy = 19 AND &OrderedDsc = False
		order (ExtrusionOperadorId)  when &OrderedBy = 19 AND &OrderedDsc = True
		order ExtrusionOperadorNombre  when &OrderedBy = 20 AND &OrderedDsc = False
		order (ExtrusionOperadorNombre)  when &OrderedBy = 20 AND &OrderedDsc = True
		order ExtrusionHoraIniciaProceso  when &OrderedBy = 21 AND &OrderedDsc = False
		order (ExtrusionHoraIniciaProceso)  when &OrderedBy = 21 AND &OrderedDsc = True
		order ExtrusionHoraFinProceso  when &OrderedBy = 22 AND &OrderedDsc = False
		order (ExtrusionHoraFinProceso)  when &OrderedBy = 22 AND &OrderedDsc = True
		order ExtrusionLoteSilo  when &OrderedBy = 23 AND &OrderedDsc = False
		order (ExtrusionLoteSilo)  when &OrderedBy = 23 AND &OrderedDsc = True
		order ExtrusionMotivoAnticipado  when &OrderedBy = 24 AND &OrderedDsc = False
		order (ExtrusionMotivoAnticipado)  when &OrderedBy = 24 AND &OrderedDsc = True
		order ExtrusionSiloId  when &OrderedBy = 25 AND &OrderedDsc = False
		order (ExtrusionSiloId)  when &OrderedBy = 25 AND &OrderedDsc = True
		order ExtrusionSiloNombre  when &OrderedBy = 26 AND &OrderedDsc = False
		order (ExtrusionSiloNombre)  when &OrderedBy = 26 AND &OrderedDsc = True
		
		using Produccion.listarExtrusionDS(&FilterFullText, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraId, &TFExtrusionExtrusoraId_To, &TFExtrusionExtrusoraNombre
					, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoId, &TFExtrusionTurnoId_To, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionProductoId
					, &TFExtrusionProductoId_To, &TFExtrusionProductoNombre, &TFExtrusionProductoNombre_Sel, &TFExtrusionProductoTipoMaterial_Sels, &TFExtrusionFecha, &TFExtrusionFecha_To
					, &TFExtrusionCalibre, &TFExtrusionCalibre_Sel, &TFExtrusionAncho, &TFExtrusionAncho_Sel, &TFExtrusionLongitud, &TFExtrusionLongitud_Sel
					, &TFExtrusionVirgenKg, &TFExtrusionVirgenKg_To, &TFExtrusionMeta, &TFExtrusionMeta_To, &TFExtrusionMolidoKg, &TFExtrusionMolidoKg_To
					, &TFExtrusionRevHusilloVirgen, &TFExtrusionRevHusilloVirgen_To, &TFExtrusionRevHusilloMolido, &TFExtrusionRevHusilloMolido_To, &TFExtrusionEstado_Sels, &TFExtrusionOperadorId
					, &TFExtrusionOperadorId_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso
					, &TFExtrusionHoraFinProceso_To, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionMotivoAnticipado_Sels, &TFExtrusionResultadoBobinasReposoTotales, &TFExtrusionResultadoBobinasReposoTotales_To
					, &TFExtrusionSiloId, &TFExtrusionSiloId_To, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel)
		&ExtrusionProductoTipoMaterialDescription = ExtrusionProductoTipoMaterial.EnumerationDescription()
		&ExtrusionEstadoDescription = ExtrusionEstado.EnumerationDescription()
		

		Do 'BeforePrintLine'
		print printBlockLines_data
		Do 'AfterPrintLine'
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Produccion.listarExtrusionGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Produccion.listarExtrusionGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Produccion.listarExtrusionGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONID"
				&TFExtrusionId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORAID"
				&TFExtrusionExtrusoraId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionExtrusoraId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE"
				&TFExtrusionExtrusoraNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE_SEL"
				&TFExtrusionExtrusoraNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNOID"
				&TFExtrusionTurnoId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionTurnoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE"
				&TFExtrusionTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE_SEL"
				&TFExtrusionTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTOID"
				&TFExtrusionProductoId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionProductoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE"
				&TFExtrusionProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE_SEL"
				&TFExtrusionProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTOTIPOMATERIAL_SEL"
				&TFExtrusionProductoTipoMaterial_SelsJson = &GridStateFilterValue.Value
				&TFExtrusionProductoTipoMaterial_Sels.FromJson(&TFExtrusionProductoTipoMaterial_SelsJson)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONFECHA"
				&TFExtrusionFecha.FromString(&GridStateFilterValue.Value)
				&TFExtrusionFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONCALIBRE"
				&TFExtrusionCalibre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONCALIBRE_SEL"
				&TFExtrusionCalibre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONANCHO"
				&TFExtrusionAncho.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONANCHO_SEL"
				&TFExtrusionAncho_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLONGITUD"
				&TFExtrusionLongitud.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLONGITUD_SEL"
				&TFExtrusionLongitud_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONVIRGENKG"
				&TFExtrusionVirgenKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionVirgenKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONMETA"
				&TFExtrusionMeta.FromString(&GridStateFilterValue.Value)
				&TFExtrusionMeta_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONMOLIDOKG"
				&TFExtrusionMolidoKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionMolidoKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONREVHUSILLOVIRGEN"
				&TFExtrusionRevHusilloVirgen.FromString(&GridStateFilterValue.Value)
				&TFExtrusionRevHusilloVirgen_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONREVHUSILLOMOLIDO"
				&TFExtrusionRevHusilloMolido.FromString(&GridStateFilterValue.Value)
				&TFExtrusionRevHusilloMolido_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONESTADO_SEL"
				&TFExtrusionEstado_SelsJson = &GridStateFilterValue.Value
				&TFExtrusionEstado_Sels.FromJson(&TFExtrusionEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORID"
				&TFExtrusionOperadorId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionOperadorId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE"
				&TFExtrusionOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE_SEL"
				&TFExtrusionOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONHORAINICIAPROCESO"
				&TFExtrusionHoraIniciaProceso.FromString(&GridStateFilterValue.Value)
				&TFExtrusionHoraIniciaProceso_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONHORAFINPROCESO"
				&TFExtrusionHoraFinProceso.FromString(&GridStateFilterValue.Value)
				&TFExtrusionHoraFinProceso_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO"
				&TFExtrusionLoteSilo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO_SEL"
				&TFExtrusionLoteSilo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONMOTIVOANTICIPADO_SEL"
				&TFExtrusionMotivoAnticipado_SelsJson = &GridStateFilterValue.Value
				&TFExtrusionMotivoAnticipado_Sels.FromJson(&TFExtrusionMotivoAnticipado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOBOBINASREPOSOTOTALES"
				&TFExtrusionResultadoBobinasReposoTotales.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoBobinasReposoTotales_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILOID"
				&TFExtrusionSiloId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionSiloId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE"
				&TFExtrusionSiloNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE_SEL"
				&TFExtrusionSiloNombre_Sel.FromString(&GridStateFilterValue.Value)
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'BeforePrintLine'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'AfterPrintLine'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintFooter'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

Output_file("listarExtrusionExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

