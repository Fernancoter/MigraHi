# Procedure: ExtrusionWWGetFilterData

- **Module:** DB
- **Description:** Extrusion WWGet Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
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
| TFExtrusionEstado_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Estado_Sels Json |
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
| SearchTxt | Parameter | VARCHAR | in | Search Txt |
| SearchTxtTo | Parameter | VARCHAR | in | Search Txt To |
| DDOName | Parameter | VARCHAR | in | DDOName |
| InsertIndex | Variable | NUMERIC |  | Insert Index |
| Option | Variable | VARCHAR |  | Option |
| Options | Variable | VARCHAR |  | Options |
| OptionsJson | Parameter | LONGVARCHAR | out | Options Json |
| OptionDesc | Variable | VARCHAR |  | Option Desc |
| OptionsDesc | Variable | VARCHAR |  | Options Desc |
| OptionsDescJson | Parameter | LONGVARCHAR | out | Options Desc Json |
| OptionIndexes | Variable | VARCHAR |  | Option Indexes |
| OptionIndexesJson | Parameter | LONGVARCHAR | out | Option Indexes Json |
| count | Variable | NUMERIC |  | count |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| GridStateDynamicFilter | Variable | GX_SDT |  | Grid State Dynamic Filter |
| FilterFullText | Variable | VARCHAR |  | Filter Full Text |
| TFExtrusionBobinas | Variable | NUMERIC |  | TFExtrusion Bobinas |
| TFExtrusionBobinas_To | Variable | NUMERIC |  | TFExtrusion Bobinas_To |
| TFExtrusionTiempoInterrupcion | Variable | NUMERIC |  | TFExtrusion Tiempo Interrupcion |
| TFExtrusionTiempoInterrupcion_To | Variable | NUMERIC |  | TFExtrusion Tiempo Interrupcion_To |
| NowDate | Variable | DATE |  | Now Date |
| TFExtrusionLotePaqueteAditivos_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sels Json |
| TFExtrusionLotePaqueteAditivos_Sels | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sels |
| TFExtrusionLotePaqueteAditivos | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos |
| TFExtrusionLotePaqueteAditivos_Sel | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sel |
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

&Options = new()
&OptionsDesc = new()
&OptionIndexes = new()
LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'
Do Case
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONLOTEPAQUETEADITIVOS'
		Do 'LoadExtrusionLotePaqueteAditivosOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONEXTRUSORANOMBRE'
		Do 'LoadExtrusionExtrusoraNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONTURNONOMBRE'
		Do 'LoadExtrusionTurnoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONPRODUCTONOMBRE'
		Do 'LoadExtrusionProductoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONOPERADORNOMBRE'
		Do 'LoadExtrusionOperadorNombreOptions'
EndCase

&OptionsJson = &Options.ToJson()
&OptionsDescJson = &OptionsDesc.ToJson()
&OptionIndexesJson = &OptionIndexes.ToJson()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.ExtrusionWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.ExtrusionWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.ExtrusionWWGridState"))
	Endif	

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONBOBINAS"
				&TFExtrusionBobinas.FromString(&GridStateFilterValue.Value)
				&TFExtrusionBobinas_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS"
				&TFExtrusionLotePaqueteAditivos.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS_SEL"
				&TFExtrusionLotePaqueteAditivos_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONID"
				&TFExtrusionId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE"
				&TFExtrusionExtrusoraNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE_SEL"
				&TFExtrusionExtrusoraNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE"
				&TFExtrusionTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE_SEL"
				&TFExtrusionTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE"
				&TFExtrusionProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE_SEL"
				&TFExtrusionProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTIEMPOINTERRUPCION"
				&TFExtrusionTiempoInterrupcion.FromString(&GridStateFilterValue.Value)
				&TFExtrusionTiempoInterrupcion_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONFECHA"
				&TFExtrusionFecha.FromString(&GridStateFilterValue.Value)
				&TFExtrusionFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONMETA"
				&TFExtrusionMeta.FromString(&GridStateFilterValue.Value)
				&TFExtrusionMeta_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONESTADO_SEL"
				&TFExtrusionEstado_SelsJson = &GridStateFilterValue.Value
				&TFExtrusionEstado_Sels.FromJson(&TFExtrusionEstado_SelsJson)
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
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadExtrusionLotePaqueteAditivosOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionLotePaqueteAditivos = &SearchTxt
	&TFExtrusionLotePaqueteAditivos_Sel.SetEmpty()
	For Each Extrusion
		Order ExtrusionLotePaqueteAditivos
		using ExtrusionWWDS(&FilterFullText, &TFExtrusionBobinas, &TFExtrusionBobinas_To, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel, &TFExtrusionId
					, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTiempoInterrupcion, &TFExtrusionTiempoInterrupcion_To, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionMeta
					, &TFExtrusionMeta_To, &TFExtrusionEstado_Sels, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To
					, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)
		Where ExtrusionFecha>= &NowDate

		&count = 0
		For Each Extrusion
			Order ExtrusionLotePaqueteAditivos
			&count += 1
		EndFor
		If not ExtrusionLotePaqueteAditivos.IsEmpty()
			&Option = ExtrusionLotePaqueteAditivos
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadExtrusionExtrusoraNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionExtrusoraNombre = &SearchTxt
	&TFExtrusionExtrusoraNombre_Sel.SetEmpty()
	For Each Extrusion
		Order ExtrusionExtrusoraId
		using ExtrusionWWDS(&FilterFullText, &TFExtrusionBobinas, &TFExtrusionBobinas_To, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel, &TFExtrusionId
					, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTiempoInterrupcion, &TFExtrusionTiempoInterrupcion_To, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionMeta
					, &TFExtrusionMeta_To, &TFExtrusionEstado_Sels, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To
					, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)
		Where ExtrusionFecha>= &NowDate

		&count = 0
		For Each Extrusion
			Order ExtrusionExtrusoraId
			&count += 1
		EndFor
		If not ExtrusionExtrusoraNombre.IsEmpty()
			&Option = ExtrusionExtrusoraNombre
			
			&InsertIndex = 1
			Do while &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) < &Option
				&InsertIndex = &InsertIndex + 1
			EndDo
			&Options.Add(&Option, &InsertIndex)
			&OptionIndexes.Add(trim(&count.ToFormattedString()), &InsertIndex)
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadExtrusionTurnoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionTurnoNombre = &SearchTxt
	&TFExtrusionTurnoNombre_Sel.SetEmpty()
	For Each Extrusion
		Order ExtrusionTurnoId
		using ExtrusionWWDS(&FilterFullText, &TFExtrusionBobinas, &TFExtrusionBobinas_To, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel, &TFExtrusionId
					, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTiempoInterrupcion, &TFExtrusionTiempoInterrupcion_To, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionMeta
					, &TFExtrusionMeta_To, &TFExtrusionEstado_Sels, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To
					, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)
		Where ExtrusionFecha>= &NowDate

		&count = 0
		For Each Extrusion
			Order ExtrusionTurnoId
			&count += 1
		EndFor
		If not ExtrusionTurnoNombre.IsEmpty()
			&Option = ExtrusionTurnoNombre
			
			&InsertIndex = 1
			Do while &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) < &Option
				&InsertIndex = &InsertIndex + 1
			EndDo
			&Options.Add(&Option, &InsertIndex)
			&OptionIndexes.Add(trim(&count.ToFormattedString()), &InsertIndex)
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadExtrusionProductoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionProductoNombre = &SearchTxt
	&TFExtrusionProductoNombre_Sel.SetEmpty()
	For Each Extrusion
		Order ExtrusionProductoId
		using ExtrusionWWDS(&FilterFullText, &TFExtrusionBobinas, &TFExtrusionBobinas_To, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel, &TFExtrusionId
					, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTiempoInterrupcion, &TFExtrusionTiempoInterrupcion_To, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionMeta
					, &TFExtrusionMeta_To, &TFExtrusionEstado_Sels, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To
					, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)
		Where ExtrusionFecha>= &NowDate

		&count = 0
		For Each Extrusion
			Order ExtrusionProductoId
			&count += 1
		EndFor
		If not ExtrusionProductoNombre.IsEmpty()
			&Option = ExtrusionProductoNombre
			
			&InsertIndex = 1
			Do while &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) < &Option
				&InsertIndex = &InsertIndex + 1
			EndDo
			&Options.Add(&Option, &InsertIndex)
			&OptionIndexes.Add(trim(&count.ToFormattedString()), &InsertIndex)
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadExtrusionOperadorNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionOperadorNombre = &SearchTxt
	&TFExtrusionOperadorNombre_Sel.SetEmpty()
	For Each Extrusion
		Order ExtrusionOperadorId
		using ExtrusionWWDS(&FilterFullText, &TFExtrusionBobinas, &TFExtrusionBobinas_To, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel, &TFExtrusionId
					, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTiempoInterrupcion, &TFExtrusionTiempoInterrupcion_To, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionMeta
					, &TFExtrusionMeta_To, &TFExtrusionEstado_Sels, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To
					, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)
		Where ExtrusionFecha>= &NowDate

		&count = 0
		For Each Extrusion
			Order ExtrusionOperadorId
			&count += 1
		EndFor
		If not ExtrusionOperadorNombre.IsEmpty()
			&Option = ExtrusionOperadorNombre
			
			&InsertIndex = 1
			Do while &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) < &Option
				&InsertIndex = &InsertIndex + 1
			EndDo
			&Options.Add(&Option, &InsertIndex)
			&OptionIndexes.Add(trim(&count.ToFormattedString()), &InsertIndex)
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub
```

### Rules (Rules)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

parm(in:&DDOName, in:&SearchTxt, in:&SearchTxtTo, out:&OptionsJson, out:&OptionsDescJson, out:&OptionIndexesJson);

/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

