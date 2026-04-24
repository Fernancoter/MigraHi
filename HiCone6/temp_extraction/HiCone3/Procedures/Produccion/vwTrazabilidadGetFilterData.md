# Procedure: vwTrazabilidadGetFilterData

- **Module:** Produccion
- **Description:** vw Trazabilidad Get Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| TFCarreteId | Variable | NUMERIC |  | TFCarrete Id |
| TFCarreteId_To | Variable | NUMERIC |  | TFCarrete Id_To |
| TFCarreteNoLinea | Variable | NUMERIC |  | TFCarrete No Linea |
| TFCarreteNoLinea_To | Variable | NUMERIC |  | TFCarrete No Linea_To |
| TFCarreteNoSerie | Variable | VARCHAR |  | TFCarrete No Serie |
| TFCarreteNoSerie_Sel | Variable | VARCHAR |  | TFCarrete No Serie_Sel |
| TFCarreteEstado_SelsJson | Variable | LONGVARCHAR |  | TFCarrete Estado_Sels Json |
| TFCarreteEstado_Sels | Variable | VARCHAR |  | TFCarrete Estado_Sels |
| TFCarreteEnMolino_Sel | Variable | NUMERIC |  | TFCarrete En Molino_Sel |
| TFCarreteMolino_SelsJson | Variable | LONGVARCHAR |  | TFCarrete Molino_Sels Json |
| TFCarreteMolino_Sels | Variable | VARCHAR |  | TFCarrete Molino_Sels |
| TFCarreteMermaMolino_Sel | Variable | NUMERIC |  | TFCarrete Merma Molino_Sel |
| TFCarreteMermaKg | Variable | NUMERIC |  | TFCarrete Merma Kg |
| TFCarreteMermaKg_To | Variable | NUMERIC |  | TFCarrete Merma Kg_To |
| TFCarreteObservacion | Variable | VARCHAR |  | TFCarrete Observacion |
| TFCarreteObservacion_Sel | Variable | VARCHAR |  | TFCarrete Observacion_Sel |
| TFCarreteTerminaPalet_Sel | Variable | NUMERIC |  | TFCarrete Termina Palet_Sel |
| TFCarretePaletSerie | Variable | VARCHAR |  | TFCarrete Palet Serie |
| TFCarretePaletSerie_Sel | Variable | VARCHAR |  | TFCarrete Palet Serie_Sel |
| TFCarreteCarreraId | Variable | NUMERIC |  | TFCarrete Carrera Id |
| TFCarreteCarreraId_To | Variable | NUMERIC |  | TFCarrete Carrera Id_To |
| TFInicioPBPrensaNombre | Variable | VARCHAR |  | TFInicio PBPrensa Nombre |
| TFInicioPBPrensaNombre_Sel | Variable | VARCHAR |  | TFInicio PBPrensa Nombre_Sel |
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
| TFPrensadoProductoNombre | Variable | VARCHAR |  | TFPrensado Producto Nombre |
| TFPrensadoProductoNombre_Sel | Variable | VARCHAR |  | TFPrensado Producto Nombre_Sel |
| TFCarreraNo | Variable | NUMERIC |  | TFCarrera No |
| TFCarreraNo_To | Variable | NUMERIC |  | TFCarrera No_To |
| TFPrensadoOperadorNombre | Variable | VARCHAR |  | TFPrensado Operador Nombre |
| TFPrensadoOperadorNombre_Sel | Variable | VARCHAR |  | TFPrensado Operador Nombre_Sel |
| TFInicioPrensadoBobinaNoSerie | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie |
| TFInicioPrensadoBobinaNoSerie_Sel | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie_Sel |
| TFInicioPrensadoBobinaNo | Variable | NUMERIC |  | TFInicio Prensado Bobina No |
| TFInicioPrensadoBobinaNo_To | Variable | NUMERIC |  | TFInicio Prensado Bobina No_To |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionHoraIniciaProceso | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso |
| TFExtrusionHoraIniciaProceso_To | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso_To |
| TFExtrusionHoraFinProceso | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso |
| TFExtrusionHoraFinProceso_To | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso_To |
| TFPaletNoSerie | Variable | VARCHAR |  | TFPalet No Serie |
| TFPaletNoSerie_Sel | Variable | VARCHAR |  | TFPalet No Serie_Sel |
| TFPaletCarreteId | Variable | NUMERIC |  | TFPalet Carrete Id |
| TFPaletCarreteId_To | Variable | NUMERIC |  | TFPalet Carrete Id_To |
| TFPaletId | Variable | NUMERIC |  | TFPalet Id |
| TFPaletId_To | Variable | NUMERIC |  | TFPalet Id_To |
| TFPaletNo | Variable | NUMERIC |  | TFPalet No |
| TFPaletNo_To | Variable | NUMERIC |  | TFPalet No_To |
| TFPaletHoraInicioEnsamble | Variable | DATETIME |  | TFPalet Hora Inicio Ensamble |
| TFPaletHoraInicioEnsamble_To | Variable | DATETIME |  | TFPalet Hora Inicio Ensamble_To |
| TFPaletHoraFinEnsamble | Variable | DATETIME |  | TFPalet Hora Fin Ensamble |
| TFPaletHoraFinEnsamble_To | Variable | DATETIME |  | TFPalet Hora Fin Ensamble_To |
| TFPaletEstatus_SelsJson | Variable | LONGVARCHAR |  | TFPalet Estatus_Sels Json |
| TFPaletEstatus_Sels | Variable | VARCHAR |  | TFPalet Estatus_Sels |
| TFCarreraFechaRegistro | Variable | DATETIME |  | TFCarrera Fecha Registro |
| TFCarreraFechaRegistro_To | Variable | DATETIME |  | TFCarrera Fecha Registro_To |
| TFCarreraFechaValidacion | Variable | DATETIME |  | TFCarrera Fecha Validacion |
| TFCarreraFechaValidacion_To | Variable | DATETIME |  | TFCarrera Fecha Validacion_To |
| TFInicioPrensadoBobinaReposo | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo |
| TFInicioPrensadoBobinaReposo_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo_To |
| TFInicioPrensadoBobinaReposoHoras | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo Horas |
| TFInicioPrensadoBobinaReposoHoras_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo Horas_To |
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
	Case &DDOName.ToUpper() = !'DDO_INICIOPBPRENSANOMBRE'
		Do 'LoadInicioPBPrensaNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADOPRODUCTONOMBRE'
		Do 'LoadPrensadoProductoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_PALETNOSERIE'
		Do 'LoadPaletNoSerieOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADOOPERADORNOMBRE'
		Do 'LoadPrensadoOperadorNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_CARRETENOSERIE'
		Do 'LoadCarreteNoSerieOptions'
	Case &DDOName.ToUpper() = !'DDO_INICIOPRENSADOBOBINANOSERIE'
		Do 'LoadInicioPrensadoBobinaNoSerieOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONEXTRUSORANOMBRE'
		Do 'LoadExtrusionExtrusoraNombreOptions'
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
	If &Session.Get(!"Produccion.vwTrazabilidadGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Produccion.vwTrazabilidadGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Produccion.vwTrazabilidadGridState"))
	Endif	

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSANOMBRE"
				&TFInicioPBPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSANOMBRE_SEL"
				&TFInicioPBPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE"
				&TFPrensadoProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE_SEL"
				&TFPrensadoProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERANO"
				&TFCarreraNo.FromString(&GridStateFilterValue.Value)
				&TFCarreraNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETENOLINEA"
				&TFCarreteNoLinea.FromString(&GridStateFilterValue.Value)
				&TFCarreteNoLinea_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRERAFECHAREGISTRO"
				&TFCarreraFechaRegistro.FromString(&GridStateFilterValue.Value)
				&TFCarreraFechaRegistro_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRERAFECHAVALIDACION"
				&TFCarreraFechaValidacion.FromString(&GridStateFilterValue.Value)
				&TFCarreraFechaValidacion_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETEID"
				&TFCarreteId.FromString(&GridStateFilterValue.Value)
				&TFCarreteId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETNOSERIE"
				&TFPaletNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETNOSERIE_SEL"
				&TFPaletNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETNO"
				&TFPaletNo.FromString(&GridStateFilterValue.Value)
				&TFPaletNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETHORAINICIOENSAMBLE"
				&TFPaletHoraInicioEnsamble.FromString(&GridStateFilterValue.Value)
				&TFPaletHoraInicioEnsamble_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETHORAFINENSAMBLE"
				&TFPaletHoraFinEnsamble.FromString(&GridStateFilterValue.Value)
				&TFPaletHoraFinEnsamble_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE"
				&TFPrensadoOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE_SEL"
				&TFPrensadoOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETESTATUS_SEL"
				&TFPaletEstatus_SelsJson = &GridStateFilterValue.Value
				&TFPaletEstatus_Sels.FromJson(&TFPaletEstatus_SelsJson)
			Case &GridStateFilterValue.Name = !"TFCARRETENOSERIE"
				&TFCarreteNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETENOSERIE_SEL"
				&TFCarreteNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANOSERIE"
				&TFInicioPrensadoBobinaNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANOSERIE_SEL"
				&TFInicioPrensadoBobinaNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANO"
				&TFInicioPrensadoBobinaNo.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAREPOSOHORAS"
				&TFInicioPrensadoBobinaReposoHoras.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaReposoHoras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE"
				&TFExtrusionExtrusoraNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE_SEL"
				&TFExtrusionExtrusoraNombre_Sel.FromString(&GridStateFilterValue.Value)
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

Sub 'LoadInicioPBPrensaNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFInicioPBPrensaNombre = &SearchTxt
	&TFInicioPBPrensaNombre_Sel.SetEmpty()
	For Each DB.PaletCarrete
		Order InicioPBPrensaNombre
		using vwTrazabilidadDS(&FilterFullText, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFCarreraNo
					, &TFCarreraNo_To, &TFCarreteNoLinea, &TFCarreteNoLinea_To, &TFCarreraFechaRegistro, &TFCarreraFechaRegistro_To, &TFCarreraFechaValidacion
					, &TFCarreraFechaValidacion_To, &TFCarreteId, &TFCarreteId_To, &TFPaletNoSerie, &TFPaletNoSerie_Sel, &TFPaletNo
					, &TFPaletNo_To, &TFPaletHoraInicioEnsamble, &TFPaletHoraInicioEnsamble_To, &TFPaletHoraFinEnsamble, &TFPaletHoraFinEnsamble_To, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPaletEstatus_Sels, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel
					, &TFInicioPrensadoBobinaNo, &TFInicioPrensadoBobinaNo_To, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel
					, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)

		&count = 0
		For Each DB.PaletCarrete
			Order WWPBaseObjects.SMS.InicioPBPrensaNombre
			&count += 1
		EndFor
		If not InicioPBPrensaNombre.IsEmpty()
			&Option = InicioPBPrensaNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadPrensadoProductoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoProductoNombre = &SearchTxt
	&TFPrensadoProductoNombre_Sel.SetEmpty()
	For Each DB.PaletCarrete
		Order PrensadoProductoNombre
		using vwTrazabilidadDS(&FilterFullText, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFCarreraNo
					, &TFCarreraNo_To, &TFCarreteNoLinea, &TFCarreteNoLinea_To, &TFCarreraFechaRegistro, &TFCarreraFechaRegistro_To, &TFCarreraFechaValidacion
					, &TFCarreraFechaValidacion_To, &TFCarreteId, &TFCarreteId_To, &TFPaletNoSerie, &TFPaletNoSerie_Sel, &TFPaletNo
					, &TFPaletNo_To, &TFPaletHoraInicioEnsamble, &TFPaletHoraInicioEnsamble_To, &TFPaletHoraFinEnsamble, &TFPaletHoraFinEnsamble_To, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPaletEstatus_Sels, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel
					, &TFInicioPrensadoBobinaNo, &TFInicioPrensadoBobinaNo_To, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel
					, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)

		&count = 0
		For Each DB.PaletCarrete
			Order PrensadoProductoNombre
			&count += 1
		EndFor
		If not PrensadoProductoNombre.IsEmpty()
			&Option = PrensadoProductoNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadPaletNoSerieOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPaletNoSerie = &SearchTxt
	&TFPaletNoSerie_Sel.SetEmpty()
	For Each DB.PaletCarrete
		Order PaletId
		using vwTrazabilidadDS(&FilterFullText, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFCarreraNo
					, &TFCarreraNo_To, &TFCarreteNoLinea, &TFCarreteNoLinea_To, &TFCarreraFechaRegistro, &TFCarreraFechaRegistro_To, &TFCarreraFechaValidacion
					, &TFCarreraFechaValidacion_To, &TFCarreteId, &TFCarreteId_To, &TFPaletNoSerie, &TFPaletNoSerie_Sel, &TFPaletNo
					, &TFPaletNo_To, &TFPaletHoraInicioEnsamble, &TFPaletHoraInicioEnsamble_To, &TFPaletHoraFinEnsamble, &TFPaletHoraFinEnsamble_To, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPaletEstatus_Sels, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel
					, &TFInicioPrensadoBobinaNo, &TFInicioPrensadoBobinaNo_To, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel
					, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)

		&count = 0
		For Each DB.PaletCarrete
			Order DB.PaletId
			&count += 1
		EndFor
		If not PaletNoSerie.IsEmpty()
			&Option = PaletNoSerie
			
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

Sub 'LoadPrensadoOperadorNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoOperadorNombre = &SearchTxt
	&TFPrensadoOperadorNombre_Sel.SetEmpty()
	For Each DB.PaletCarrete
		Order PrensadoOperadorNombre
		using Produccion.vwTrazabilidadDS(&FilterFullText, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFCarreraNo
					, &TFCarreraNo_To, &TFCarreteNoLinea, &TFCarreteNoLinea_To, &TFCarreraFechaRegistro, &TFCarreraFechaRegistro_To, &TFCarreraFechaValidacion
					, &TFCarreraFechaValidacion_To, &TFCarreteId, &TFCarreteId_To, &TFPaletNoSerie, &TFPaletNoSerie_Sel, &TFPaletNo
					, &TFPaletNo_To, &TFPaletHoraInicioEnsamble, &TFPaletHoraInicioEnsamble_To, &TFPaletHoraFinEnsamble, &TFPaletHoraFinEnsamble_To, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPaletEstatus_Sels, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel
					, &TFInicioPrensadoBobinaNo, &TFInicioPrensadoBobinaNo_To, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel
					, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)

		&count = 0
		For Each DB.PaletCarrete
			Order PrensadoOperadorNombre
			&count += 1
		EndFor
		If not PrensadoOperadorNombre.IsEmpty()
			&Option = PrensadoOperadorNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadCarreteNoSerieOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFCarreteNoSerie = &SearchTxt
	&TFCarreteNoSerie_Sel.SetEmpty()
	For Each DB.PaletCarrete
		Order CarreteNoSerie
		using vwTrazabilidadDS(&FilterFullText, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFCarreraNo
					, &TFCarreraNo_To, &TFCarreteNoLinea, &TFCarreteNoLinea_To, &TFCarreraFechaRegistro, &TFCarreraFechaRegistro_To, &TFCarreraFechaValidacion
					, &TFCarreraFechaValidacion_To, &TFCarreteId, &TFCarreteId_To, &TFPaletNoSerie, &TFPaletNoSerie_Sel, &TFPaletNo
					, &TFPaletNo_To, &TFPaletHoraInicioEnsamble, &TFPaletHoraInicioEnsamble_To, &TFPaletHoraFinEnsamble, &TFPaletHoraFinEnsamble_To, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPaletEstatus_Sels, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel
					, &TFInicioPrensadoBobinaNo, &TFInicioPrensadoBobinaNo_To, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel
					, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)

		&count = 0
		For Each DB.PaletCarrete
			Order CarreteNoSerie
			&count += 1
		EndFor
		If not CarreteNoSerie.IsEmpty()
			&Option = CarreteNoSerie
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadInicioPrensadoBobinaNoSerieOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFInicioPrensadoBobinaNoSerie = &SearchTxt
	&TFInicioPrensadoBobinaNoSerie_Sel.SetEmpty()
	For Each DB.PaletCarrete
		Order InicioPrensadoBobinaNoSerie
		using vwTrazabilidadDS(&FilterFullText, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFCarreraNo
					, &TFCarreraNo_To, &TFCarreteNoLinea, &TFCarreteNoLinea_To, &TFCarreraFechaRegistro, &TFCarreraFechaRegistro_To, &TFCarreraFechaValidacion
					, &TFCarreraFechaValidacion_To, &TFCarreteId, &TFCarreteId_To, &TFPaletNoSerie, &TFPaletNoSerie_Sel, &TFPaletNo
					, &TFPaletNo_To, &TFPaletHoraInicioEnsamble, &TFPaletHoraInicioEnsamble_To, &TFPaletHoraFinEnsamble, &TFPaletHoraFinEnsamble_To, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPaletEstatus_Sels, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel
					, &TFInicioPrensadoBobinaNo, &TFInicioPrensadoBobinaNo_To, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel
					, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)

		&count = 0
		For Each DB.PaletCarrete
			Order InicioPrensadoBobinaNoSerie
			&count += 1
		EndFor
		If not InicioPrensadoBobinaNoSerie.IsEmpty()
			&Option = InicioPrensadoBobinaNoSerie
			
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
	For Each DB.PaletCarrete
		Order ExtrusionExtrusoraNombre
		using vwTrazabilidadDS(&FilterFullText, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFCarreraNo
					, &TFCarreraNo_To, &TFCarreteNoLinea, &TFCarreteNoLinea_To, &TFCarreraFechaRegistro, &TFCarreraFechaRegistro_To, &TFCarreraFechaValidacion
					, &TFCarreraFechaValidacion_To, &TFCarreteId, &TFCarreteId_To, &TFPaletNoSerie, &TFPaletNoSerie_Sel, &TFPaletNo
					, &TFPaletNo_To, &TFPaletHoraInicioEnsamble, &TFPaletHoraInicioEnsamble_To, &TFPaletHoraFinEnsamble, &TFPaletHoraFinEnsamble_To, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPaletEstatus_Sels, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel
					, &TFInicioPrensadoBobinaNo, &TFInicioPrensadoBobinaNo_To, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel
					, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)

		&count = 0
		For Each DB.PaletCarrete
			Order ExtrusionExtrusoraNombre
			&count += 1
		EndFor
		If not ExtrusionExtrusoraNombre.IsEmpty()
			&Option = ExtrusionExtrusoraNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
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
	For Each DB.PaletCarrete
		Order ExtrusionOperadorNombre
		using Produccion.vwTrazabilidadDS(&FilterFullText, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFCarreraNo
					, &TFCarreraNo_To, &TFCarreteNoLinea, &TFCarreteNoLinea_To, &TFCarreraFechaRegistro, &TFCarreraFechaRegistro_To, &TFCarreraFechaValidacion
					, &TFCarreraFechaValidacion_To, &TFCarreteId, &TFCarreteId_To, &TFPaletNoSerie, &TFPaletNoSerie_Sel, &TFPaletNo
					, &TFPaletNo_To, &TFPaletHoraInicioEnsamble, &TFPaletHoraInicioEnsamble_To, &TFPaletHoraFinEnsamble, &TFPaletHoraFinEnsamble_To, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPaletEstatus_Sels, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel
					, &TFInicioPrensadoBobinaNo, &TFInicioPrensadoBobinaNo_To, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel
					, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)

		&count = 0
		For Each DB.PaletCarrete
			Order ExtrusionOperadorNombre
			&count += 1
		EndFor
		If not ExtrusionOperadorNombre.IsEmpty()
			&Option = ExtrusionOperadorNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
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

