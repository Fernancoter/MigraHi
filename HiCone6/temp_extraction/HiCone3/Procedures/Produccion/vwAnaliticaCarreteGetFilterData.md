# Procedure: vwAnaliticaCarreteGetFilterData

- **Module:** Produccion
- **Description:** vw Analitica Carrete Get Filter Data
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
| TFInicioPBPrensaId | Variable | NUMERIC |  | TFInicio PBPrensa Id |
| TFInicioPBPrensaId_To | Variable | NUMERIC |  | TFInicio PBPrensa Id_To |
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
| TFCarreraNo | Variable | NUMERIC |  | TFCarrera No |
| TFCarreraNo_To | Variable | NUMERIC |  | TFCarrera No_To |
| TFInicioPBPrensaNombre | Variable | VARCHAR |  | TFInicio PBPrensa Nombre |
| TFInicioPBPrensaNombre_Sel | Variable | VARCHAR |  | TFInicio PBPrensa Nombre_Sel |
| TFInicioPBTurnoNombre | Variable | VARCHAR |  | TFInicio PBTurno Nombre |
| TFInicioPBTurnoNombre_Sel | Variable | VARCHAR |  | TFInicio PBTurno Nombre_Sel |
| TFInicioPBOperadorNombre | Variable | VARCHAR |  | TFInicio PBOperador Nombre |
| TFInicioPBOperadorNombre_Sel | Variable | VARCHAR |  | TFInicio PBOperador Nombre_Sel |
| TFPrensadoResultadoObservaciones | Variable | VARCHAR |  | TFPrensado Resultado Observaciones |
| TFPrensadoResultadoObservaciones_Sel | Variable | VARCHAR |  | TFPrensado Resultado Observaciones_Sel |
| TFInicioPrensadoBobinaReposo | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo |
| TFInicioPrensadoBobinaReposo_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo_To |
| TFInicioPrensadoBobinaNoSerie | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie |
| TFInicioPrensadoBobinaNoSerie_Sel | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie_Sel |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionSiloMolidoNombre | Variable | VARCHAR |  | TFExtrusion Silo Molido Nombre |
| TFExtrusionSiloMolidoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Silo Molido Nombre_Sel |
| TFExtrusionSiloNombre | Variable | VARCHAR |  | TFExtrusion Silo Nombre |
| TFExtrusionSiloNombre_Sel | Variable | VARCHAR |  | TFExtrusion Silo Nombre_Sel |
| TFInicioPrensadoBobinaReposoHoras | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo Horas |
| TFInicioPrensadoBobinaReposoHoras_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo Horas_To |
| TFCarreteCarreraTroquel | Variable | VARCHAR |  | TFCarrete Carrera Troquel |
| TFCarreteCarreraTroquel_Sel | Variable | VARCHAR |  | TFCarrete Carrera Troquel_Sel |
| TFCarreteCarreraFecha | Variable | DATETIME |  | TFCarrete Carrera Fecha |
| TFCarreteCarreraFecha_To | Variable | DATETIME |  | TFCarrete Carrera Fecha_To |
| TFInicioPBPrensadoFecha | Variable | DATETIME |  | TFInicio PBPrensado Fecha |
| TFInicioPBPrensadoFecha_To | Variable | DATETIME |  | TFInicio PBPrensado Fecha_To |
| NowDate | Variable | DATE |  | Now Date |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| TFCarreteCarreraFechaValidacion | Variable | DATETIME |  | TFCarrete Carrera Fecha Validacion |
| TFCarreteCarreraFechaValidacion_To | Variable | DATETIME |  | TFCarrete Carrera Fecha Validacion_To |
| TFExtrusionLoteSilo | Variable | VARCHAR |  | TFExtrusion Lote Silo |
| TFExtrusionLoteSilo_Sel | Variable | VARCHAR |  | TFExtrusion Lote Silo_Sel |
| TFExtrusionLotePaqueteAditivos_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sels Json |
| TFExtrusionLotePaqueteAditivos_Sels | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sels |
| TFExtrusionLotePaqueteAditivos | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos |
| TFExtrusionLotePaqueteAditivos_Sel | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sel |
| TFInicioPrensadoBobinaVirgenKg | Variable | NUMERIC |  | TFInicio Prensado Bobina Virgen Kg |
| TFInicioPrensadoBobinaVirgenKg_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Virgen Kg_To |
| TFInicioPrensadoBobinaMolinoKg | Variable | NUMERIC |  | TFInicio Prensado Bobina Molino Kg |
| TFInicioPrensadoBobinaMolinoKg_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Molino Kg_To |
| TFInicioPrensadoBobinaRevHusilloVirgen | Variable | NUMERIC |  | TFInicio Prensado Bobina Rev Husillo Virgen |
| TFInicioPrensadoBobinaRevHusilloVirgen_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Rev Husillo Virgen_To |
| TFInicioPrensadoBobinaRevHusilloMolino | Variable | NUMERIC |  | TFInicio Prensado Bobina Rev Husillo Molino |
| TFInicioPrensadoBobinaRevHusilloMolino_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Rev Husillo Molino_To |
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

&NowDate.FromString(&WebSession.Get(!"FechaInicialConsulta"))

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

&Options = new()
&OptionsDesc = new()
&OptionIndexes = new()
LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'
Do Case
	Case &DDOName.ToUpper() = !'DDO_CARRETENOSERIE'
		Do 'LoadCarreteNoSerieOptions'
	Case &DDOName.ToUpper() = !'DDO_CARRETEOBSERVACION'
		Do 'LoadCarreteObservacionOptions'
	Case &DDOName.ToUpper() = !'DDO_CARRETEPALETSERIE'
		Do 'LoadCarretePaletSerieOptions'
	Case &DDOName.ToUpper() = !'DDO_CARRETECARRERATROQUEL'
		Do 'LoadCarreteCarreraTroquelOptions'
	Case &DDOName.ToUpper() = !'DDO_INICIOPBPRENSANOMBRE'
		Do 'LoadInicioPBPrensaNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_INICIOPBTURNONOMBRE'
		Do 'LoadInicioPBTurnoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_INICIOPBOPERADORNOMBRE'
		Do 'LoadInicioPBOperadorNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADORESULTADOOBSERVACIONES'
		Do 'LoadPrensadoResultadoObservacionesOptions'
	Case &DDOName.ToUpper() = !'DDO_INICIOPRENSADOBOBINANOSERIE'
		Do 'LoadInicioPrensadoBobinaNoSerieOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONOPERADORNOMBRE'
		Do 'LoadExtrusionOperadorNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONSILOMOLIDONOMBRE'
		Do 'LoadExtrusionSiloMolidoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONSILONOMBRE'
		Do 'LoadExtrusionSiloNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONLOTESILO'
		Do 'LoadExtrusionLoteSiloOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONLOTEPAQUETEADITIVOS'
		Do 'LoadExtrusionLotePaqueteAditivosOptions'
EndCase

&OptionsJson = &Options.ToJson()
&OptionsDescJson = &OptionsDesc.ToJson()
&OptionIndexesJson = &OptionIndexes.ToJson()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Produccion.vwAnaliticaCarreteGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Produccion.vwAnaliticaCarreteGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Produccion.vwAnaliticaCarreteGridState"))
	Endif	

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETENOSERIE"
				&TFCarreteNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETENOSERIE_SEL"
				&TFCarreteNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEID"
				&TFCarreteId.FromString(&GridStateFilterValue.Value)
				&TFCarreteId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETENOLINEA"
				&TFCarreteNoLinea.FromString(&GridStateFilterValue.Value)
				&TFCarreteNoLinea_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETEESTADO_SEL"
				&TFCarreteEstado_SelsJson = &GridStateFilterValue.Value
				&TFCarreteEstado_Sels.FromJson(&TFCarreteEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFCARRETEENMOLINO_SEL"
				&TFCarreteEnMolino_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEMOLINO_SEL"
				&TFCarreteMolino_SelsJson = &GridStateFilterValue.Value
				&TFCarreteMolino_Sels.FromJson(&TFCarreteMolino_SelsJson)
			Case &GridStateFilterValue.Name = !"TFCARRETEOBSERVACION"
				&TFCarreteObservacion.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEOBSERVACION_SEL"
				&TFCarreteObservacion_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETETERMINAPALET_SEL"
				&TFCarreteTerminaPalet_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETECARRERAID"
				&TFCarreteCarreraId.FromString(&GridStateFilterValue.Value)
				&TFCarreteCarreraId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETEMERMAMOLINO_SEL"
				&TFCarreteMermaMolino_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEMERMAKG"
				&TFCarreteMermaKg.FromString(&GridStateFilterValue.Value)
				&TFCarreteMermaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETEPALETSERIE"
				&TFCarretePaletSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEPALETSERIE_SEL"
				&TFCarretePaletSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERANO"
				&TFCarreraNo.FromString(&GridStateFilterValue.Value)
				&TFCarreraNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSADOFECHA"
				&TFInicioPBPrensadoFecha.FromString(&GridStateFilterValue.Value)
				&TFInicioPBPrensadoFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETECARRERATROQUEL"
				&TFCarreteCarreraTroquel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETECARRERATROQUEL_SEL"
				&TFCarreteCarreraTroquel_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETECARRERAFECHA"
				&TFCarreteCarreraFecha.FromString(&GridStateFilterValue.Value)
				&TFCarreteCarreraFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETECARRERAFECHAVALIDACION"
				&TFCarreteCarreraFechaValidacion.FromString(&GridStateFilterValue.Value)
				&TFCarreteCarreraFechaValidacion_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSANOMBRE"
				&TFInicioPBPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSANOMBRE_SEL"
				&TFInicioPBPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBTURNONOMBRE"
				&TFInicioPBTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBTURNONOMBRE_SEL"
				&TFInicioPBTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBOPERADORNOMBRE"
				&TFInicioPBOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBOPERADORNOMBRE_SEL"
				&TFInicioPBOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOOBSERVACIONES"
				&TFPrensadoResultadoObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOOBSERVACIONES_SEL"
				&TFPrensadoResultadoObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANOSERIE"
				&TFInicioPrensadoBobinaNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANOSERIE_SEL"
				&TFInicioPrensadoBobinaNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAVIRGENKG"
				&TFInicioPrensadoBobinaVirgenKg.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaVirgenKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAMOLINOKG"
				&TFInicioPrensadoBobinaMolinoKg.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaMolinoKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAREVHUSILLOVIRGEN"
				&TFInicioPrensadoBobinaRevHusilloVirgen.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaRevHusilloVirgen_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAREVHUSILLOMOLINO"
				&TFInicioPrensadoBobinaRevHusilloMolino.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaRevHusilloMolino_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAREPOSOHORAS"
				&TFInicioPrensadoBobinaReposoHoras.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaReposoHoras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE"
				&TFExtrusionOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE_SEL"
				&TFExtrusionOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILOMOLIDONOMBRE"
				&TFExtrusionSiloMolidoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILOMOLIDONOMBRE_SEL"
				&TFExtrusionSiloMolidoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE"
				&TFExtrusionSiloNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE_SEL"
				&TFExtrusionSiloNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO"
				&TFExtrusionLoteSilo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO_SEL"
				&TFExtrusionLoteSilo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS"
				&TFExtrusionLotePaqueteAditivos.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS_SEL"
				&TFExtrusionLotePaqueteAditivos_Sel.FromString(&GridStateFilterValue.Value)
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadCarreteNoSerieOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFCarreteNoSerie = &SearchTxt
	&TFCarreteNoSerie_Sel.SetEmpty()
	For Each DB.Carrete
		Order CarreteNoSerie
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
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

Sub 'LoadCarreteObservacionOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFCarreteObservacion = &SearchTxt
	&TFCarreteObservacion_Sel.SetEmpty()
	For Each DB.Carrete
		Order CarreteObservacion
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order CarreteObservacion
			&count += 1
		EndFor
		If not CarreteObservacion.IsEmpty()
			&Option = CarreteObservacion
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadCarretePaletSerieOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFCarretePaletSerie = &SearchTxt
	&TFCarretePaletSerie_Sel.SetEmpty()
	For Each DB.Carrete
		Order CarretePaletSerie
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order CarretePaletSerie
			&count += 1
		EndFor
		If not CarretePaletSerie.IsEmpty()
			&Option = CarretePaletSerie
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadCarreteCarreraTroquelOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFCarreteCarreraTroquel = &SearchTxt
	&TFCarreteCarreraTroquel_Sel.SetEmpty()
	For Each DB.Carrete
		Order CarreteCarreraTroquel
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order CarreteCarreraTroquel
			&count += 1
		EndFor
		If not CarreteCarreraTroquel.IsEmpty()
			&Option = CarreteCarreraTroquel
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadInicioPBPrensaNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFInicioPBPrensaNombre = &SearchTxt
	&TFInicioPBPrensaNombre_Sel.SetEmpty()
	For Each DB.Carrete
		Order InicioPBPrensaNombre
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order InicioPBPrensaNombre
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

Sub 'LoadInicioPBTurnoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFInicioPBTurnoNombre = &SearchTxt
	&TFInicioPBTurnoNombre_Sel.SetEmpty()
	For Each DB.Carrete
		Order InicioPBTurnoNombre
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order InicioPBTurnoNombre
			&count += 1
		EndFor
		If not InicioPBTurnoNombre.IsEmpty()
			&Option = InicioPBTurnoNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadInicioPBOperadorNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFInicioPBOperadorNombre = &SearchTxt
	&TFInicioPBOperadorNombre_Sel.SetEmpty()
	For Each DB.Carrete
		Order InicioPBOperadorNombre
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order InicioPBOperadorNombre
			&count += 1
		EndFor
		If not InicioPBOperadorNombre.IsEmpty()
			&Option = InicioPBOperadorNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadPrensadoResultadoObservacionesOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoResultadoObservaciones = &SearchTxt
	&TFPrensadoResultadoObservaciones_Sel.SetEmpty()
	For Each DB.Carrete
		Order PrensadoResultadoObservaciones
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order PrensadoResultadoObservaciones
			&count += 1
		EndFor
		If not PrensadoResultadoObservaciones.IsEmpty()
			&Option = PrensadoResultadoObservaciones
			
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
	For Each DB.Carrete
		Order InicioPrensadoBobinaNoSerie
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
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

Sub 'LoadExtrusionOperadorNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionOperadorNombre = &SearchTxt
	&TFExtrusionOperadorNombre_Sel.SetEmpty()
	For Each DB.Carrete
		Order ExtrusionOperadorNombre
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order DB.ExtrusionOperadorNombre
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

Sub 'LoadExtrusionSiloMolidoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionSiloMolidoNombre = &SearchTxt
	&TFExtrusionSiloMolidoNombre_Sel.SetEmpty()
	For Each DB.Carrete
		Order ExtrusionSiloMolidoNombre
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order ExtrusionSiloMolidoNombre
			&count += 1
		EndFor
		If not ExtrusionSiloMolidoNombre.IsEmpty()
			&Option = ExtrusionSiloMolidoNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadExtrusionSiloNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionSiloNombre = &SearchTxt
	&TFExtrusionSiloNombre_Sel.SetEmpty()
	For Each DB.Carrete
		Order ExtrusionSiloNombre
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order ExtrusionSiloNombre
			&count += 1
		EndFor
		If not ExtrusionSiloNombre.IsEmpty()
			&Option = ExtrusionSiloNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadExtrusionLoteSiloOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionLoteSilo = &SearchTxt
	&TFExtrusionLoteSilo_Sel.SetEmpty()
	For Each DB.Carrete
		Order ExtrusionLoteSilo
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
			Order ExtrusionLoteSilo
			&count += 1
		EndFor
		If not ExtrusionLoteSilo.IsEmpty()
			&Option = ExtrusionLoteSilo
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadExtrusionLotePaqueteAditivosOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionLotePaqueteAditivos = &SearchTxt
	&TFExtrusionLotePaqueteAditivos_Sel.SetEmpty()
	For Each DB.Carrete
		Order ExtrusionLotePaqueteAditivos
		using vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		&count = 0
		For Each DB.Carrete
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
```

### Rules (Rules)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

parm(in:&DDOName, in:&SearchTxt, in:&SearchTxtTo, out:&OptionsJson, out:&OptionsDescJson, out:&OptionIndexesJson);

/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

