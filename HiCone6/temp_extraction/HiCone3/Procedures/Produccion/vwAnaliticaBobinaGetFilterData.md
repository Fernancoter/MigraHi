# Procedure: vwAnaliticaBobinaGetFilterData

- **Module:** Produccion
- **Description:** vw Analitica Bobina Get Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| TFBobinaId | Variable | NUMERIC |  | TFBobina Id |
| TFBobinaId_To | Variable | NUMERIC |  | TFBobina Id_To |
| TFExtrusionId | Variable | NUMERIC |  | TFExtrusion Id |
| TFExtrusionId_To | Variable | NUMERIC |  | TFExtrusion Id_To |
| TFExtrusionTurnoNombre | Variable | VARCHAR |  | TFExtrusion Turno Nombre |
| TFExtrusionTurnoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Turno Nombre_Sel |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFBobinaNoSerie | Variable | VARCHAR |  | TFBobina No Serie |
| TFBobinaNoSerie_Sel | Variable | VARCHAR |  | TFBobina No Serie_Sel |
| TFBobinaOrigen_SelsJson | Variable | LONGVARCHAR |  | TFBobina Origen_Sels Json |
| TFBobinaOrigen_Sels | Variable | VARCHAR |  | TFBobina Origen_Sels |
| TFBobinaHoraInicio | Variable | DATETIME |  | TFBobina Hora Inicio |
| TFBobinaHoraInicio_To | Variable | DATETIME |  | TFBobina Hora Inicio_To |
| TFBobinaHoraSalida | Variable | DATETIME |  | TFBobina Hora Salida |
| TFBobinaHoraSalida_To | Variable | DATETIME |  | TFBobina Hora Salida_To |
| TFBobinaNo | Variable | NUMERIC |  | TFBobina No |
| TFBobinaNo_To | Variable | NUMERIC |  | TFBobina No_To |
| TFBobinaKg | Variable | NUMERIC |  | TFBobina Kg |
| TFBobinaKg_To | Variable | NUMERIC |  | TFBobina Kg_To |
| TFBobinaMermaKg | Variable | NUMERIC |  | TFBobina Merma Kg |
| TFBobinaMermaKg_To | Variable | NUMERIC |  | TFBobina Merma Kg_To |
| TFBobinaEspesor | Variable | NUMERIC |  | TFBobina Espesor |
| TFBobinaEspesor_To | Variable | NUMERIC |  | TFBobina Espesor_To |
| TFBobinaObservaciones | Variable | VARCHAR |  | TFBobina Observaciones |
| TFBobinaObservaciones_Sel | Variable | VARCHAR |  | TFBobina Observaciones_Sel |
| TFBobinaRechazadaObservaciones | Variable | VARCHAR |  | TFBobina Rechazada Observaciones |
| TFBobinaRechazadaObservaciones_Sel | Variable | VARCHAR |  | TFBobina Rechazada Observaciones_Sel |
| TFBobinaEstado_SelsJson | Variable | LONGVARCHAR |  | TFBobina Estado_Sels Json |
| TFBobinaEstado_Sels | Variable | VARCHAR |  | TFBobina Estado_Sels |
| TFBobinaCarreras | Variable | NUMERIC |  | TFBobina Carreras |
| TFBobinaCarreras_To | Variable | NUMERIC |  | TFBobina Carreras_To |
| TFBobinaIniciaReposo | Variable | DATETIME |  | TFBobina Inicia Reposo |
| TFBobinaIniciaReposo_To | Variable | DATETIME |  | TFBobina Inicia Reposo_To |
| TFBobinaMinutosEnReposo | Variable | NUMERIC |  | TFBobina Minutos En Reposo |
| TFBobinaMinutosEnReposo_To | Variable | NUMERIC |  | TFBobina Minutos En Reposo_To |
| TFBobinaMotivoMolino_SelsJson | Variable | LONGVARCHAR |  | TFBobina Motivo Molino_Sels Json |
| TFBobinaMotivoMolino_Sels | Variable | VARCHAR |  | TFBobina Motivo Molino_Sels |
| TFBobinaSiloMolidoId | Variable | NUMERIC |  | TFBobina Silo Molido Id |
| TFBobinaSiloMolidoId_To | Variable | NUMERIC |  | TFBobina Silo Molido Id_To |
| TFBobinaSiloMolidoNombre | Variable | VARCHAR |  | TFBobina Silo Molido Nombre |
| TFBobinaSiloMolidoNombre_Sel | Variable | VARCHAR |  | TFBobina Silo Molido Nombre_Sel |
| TFBobinaSiloVirgenId | Variable | NUMERIC |  | TFBobina Silo Virgen Id |
| TFBobinaSiloVirgenId_To | Variable | NUMERIC |  | TFBobina Silo Virgen Id_To |
| TFBobinaSiloVirgenNombre | Variable | VARCHAR |  | TFBobina Silo Virgen Nombre |
| TFBobinaSiloVirgenNombre_Sel | Variable | VARCHAR |  | TFBobina Silo Virgen Nombre_Sel |
| TFBobinaLoteVirgen | Variable | CHARACTER |  | TFBobina Lote Virgen |
| TFBobinaLoteVirgen_Sel | Variable | CHARACTER |  | TFBobina Lote Virgen_Sel |
| TFBobinaProductoId | Variable | NUMERIC |  | TFBobina Producto Id |
| TFBobinaProductoId_To | Variable | NUMERIC |  | TFBobina Producto Id_To |
| TFBobinaProductoNombre | Variable | VARCHAR |  | TFBobina Producto Nombre |
| TFBobinaProductoNombre_Sel | Variable | VARCHAR |  | TFBobina Producto Nombre_Sel |
| TFBobinaProductoTipoMaterial_SelsJson | Variable | LONGVARCHAR |  | TFBobina Producto Tipo Material_Sels Json |
| TFBobinaProductoTipoMaterial_Sels | Variable | VARCHAR |  | TFBobina Producto Tipo Material_Sels |
| TFBobinaPrensadoPrensaNombre | Variable | VARCHAR |  | TFBobina Prensado Prensa Nombre |
| TFBobinaPrensadoPrensaNombre_Sel | Variable | VARCHAR |  | TFBobina Prensado Prensa Nombre_Sel |
| TFBobinaReposoEnHoras | Variable | NUMERIC |  | TFBobina Reposo En Horas |
| TFBobinaReposoEnHoras_To | Variable | NUMERIC |  | TFBobina Reposo En Horas_To |
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
| GridConditionalFormattingFilter | Variable | NUMERIC |  | Grid Conditional Formatting Filter |
| NowDate | Variable | DATE |  | Now Date |
| TFBobinaDispersion | Variable | NUMERIC |  | TFBobina Dispersion |
| TFBobinaDispersion_To | Variable | NUMERIC |  | TFBobina Dispersion_To |
| TFBobinaDesviacionEstandar | Variable | NUMERIC |  | TFBobina Desviacion Estandar |
| TFBobinaDesviacionEstandar_To | Variable | NUMERIC |  | TFBobina Desviacion Estandar_To |
| TFExtrusionLotePaqueteAditivos | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos |
| TFExtrusionLotePaqueteAditivos_Sel | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sel |
| TFBobinaInterrupcionId | Variable | NUMERIC |  | TFBobina Interrupcion Id |
| TFBobinaInterrupcionId_To | Variable | NUMERIC |  | TFBobina Interrupcion Id_To |
| TFInterrupcionTiempo | Variable | NUMERIC |  | TFInterrupcion Tiempo |
| TFInterrupcionTiempo_To | Variable | NUMERIC |  | TFInterrupcion Tiempo_To |
| TFInterrupcionMotivo | Variable | VARCHAR |  | TFInterrupcion Motivo |
| TFInterrupcionMotivo_Sel | Variable | VARCHAR |  | TFInterrupcion Motivo_Sel |
| TFBobinaInterrupcionesId | Variable | NUMERIC |  | TFBobina Interrupciones Id |
| TFBobinaInterrupcionesId_To | Variable | NUMERIC |  | TFBobina Interrupciones Id_To |
| TFBobinaInterrupcionesMotivo | Variable | VARCHAR |  | TFBobina Interrupciones Motivo |
| TFBobinaInterrupcionesMotivo_Sel | Variable | VARCHAR |  | TFBobina Interrupciones Motivo_Sel |
| TFBobinaInterrupcionesTiempo | Variable | NUMERIC |  | TFBobina Interrupciones Tiempo |
| TFBobinaInterrupcionesTiempo_To | Variable | NUMERIC |  | TFBobina Interrupciones Tiempo_To |
| TFBobinaDownTimeCode | Variable | VARCHAR |  | TFBobina Down Time Code |
| TFBobinaDownTimeCode_Sel | Variable | VARCHAR |  | TFBobina Down Time Code_Sel |
| TFBobinaDownTimeDescription | Variable | VARCHAR |  | TFBobina Down Time Description |
| TFBobinaDownTimeDescription_Sel | Variable | VARCHAR |  | TFBobina Down Time Description_Sel |
| TFExtrusionExtrusoraColorEstacion_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Extrusora Color Estacion_Sels Json |
| TFExtrusionExtrusoraColorEstacion_Sels | Variable | VARCHAR |  | TFExtrusion Extrusora Color Estacion_Sels |
| TFBobinaColorEstacion_SelsJson | Variable | LONGVARCHAR |  | TFBobina Color Estacion_Sels Json |
| TFBobinaColorEstacion_Sels | Variable | VARCHAR |  | TFBobina Color Estacion_Sels |
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
	Case &DDOName.ToUpper() = !'DDO_BOBINANOSERIE'
		Do 'LoadBobinaNoSerieOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONEXTRUSORANOMBRE'
		Do 'LoadExtrusionExtrusoraNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONTURNONOMBRE'
		Do 'LoadExtrusionTurnoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONOPERADORNOMBRE'
		Do 'LoadExtrusionOperadorNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_BOBINAOBSERVACIONES'
		Do 'LoadBobinaObservacionesOptions'
	Case &DDOName.ToUpper() = !'DDO_BOBINARECHAZADAOBSERVACIONES'
		Do 'LoadBobinaRechazadaObservacionesOptions'
	Case &DDOName.ToUpper() = !'DDO_BOBINASILOMOLIDONOMBRE'
		Do 'LoadBobinaSiloMolidoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_BOBINASILOVIRGENNOMBRE'
		Do 'LoadBobinaSiloVirgenNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_BOBINALOTEVIRGEN'
		Do 'LoadBobinaLoteVirgenOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONLOTEPAQUETEADITIVOS'
		Do 'LoadExtrusionLotePaqueteAditivosOptions'
	Case &DDOName.ToUpper() = !'DDO_BOBINAPRODUCTONOMBRE'
		Do 'LoadBobinaProductoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_BOBINAPRENSADOPRENSANOMBRE'
		Do 'LoadBobinaPrensadoPrensaNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_BOBINAINTERRUPCIONESMOTIVO'
		Do 'LoadBobinaInterrupcionesMotivoOptions'
	Case &DDOName.ToUpper() = !'DDO_BOBINADOWNTIMECODE'
		Do 'LoadBobinaDownTimeCodeOptions'
	Case &DDOName.ToUpper() = !'DDO_BOBINADOWNTIMEDESCRIPTION'
		Do 'LoadBobinaDownTimeDescriptionOptions'
EndCase

&OptionsJson = &Options.ToJson()
&OptionsDescJson = &OptionsDesc.ToJson()
&OptionIndexesJson = &OptionIndexes.ToJson()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Produccion.vwAnaliticaBobinaGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Produccion.vwAnaliticaBobinaGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Produccion.vwAnaliticaBobinaGridState"))
	Endif	

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAID"
				&TFBobinaId.FromString(&GridStateFilterValue.Value)
				&TFBobinaId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINANOSERIE"
				&TFBobinaNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINANOSERIE_SEL"
				&TFBobinaNoSerie_Sel.FromString(&GridStateFilterValue.Value)
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
			Case &GridStateFilterValue.Name = !"TFBOBINACOLORESTACION_SEL"
				&TFBobinaColorEstacion_SelsJson = &GridStateFilterValue.Value
				&TFBobinaColorEstacion_Sels.FromJson(&TFBobinaColorEstacion_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAORIGEN_SEL"
				&TFBobinaOrigen_SelsJson = &GridStateFilterValue.Value
				&TFBobinaOrigen_Sels.FromJson(&TFBobinaOrigen_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAESTADO_SEL"
				&TFBobinaEstado_SelsJson = &GridStateFilterValue.Value
				&TFBobinaEstado_Sels.FromJson(&TFBobinaEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAHORAINICIO"
				&TFBobinaHoraInicio.FromString(&GridStateFilterValue.Value)
				&TFBobinaHoraInicio_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAHORASALIDA"
				&TFBobinaHoraSalida.FromString(&GridStateFilterValue.Value)
				&TFBobinaHoraSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINADESVIACIONESTANDAR"
				&TFBobinaDesviacionEstandar.FromString(&GridStateFilterValue.Value)
				&TFBobinaDesviacionEstandar_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAKG"
				&TFBobinaKg.FromString(&GridStateFilterValue.Value)
				&TFBobinaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAMERMAKG"
				&TFBobinaMermaKg.FromString(&GridStateFilterValue.Value)
				&TFBobinaMermaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINANO"
				&TFBobinaNo.FromString(&GridStateFilterValue.Value)
				&TFBobinaNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAREPOSOENHORAS"
				&TFBobinaReposoEnHoras.FromString(&GridStateFilterValue.Value)
				&TFBobinaReposoEnHoras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE"
				&TFExtrusionOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE_SEL"
				&TFExtrusionOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAOBSERVACIONES"
				&TFBobinaObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAOBSERVACIONES_SEL"
				&TFBobinaObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINARECHAZADAOBSERVACIONES"
				&TFBobinaRechazadaObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINARECHAZADAOBSERVACIONES_SEL"
				&TFBobinaRechazadaObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINASILOMOLIDONOMBRE"
				&TFBobinaSiloMolidoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINASILOMOLIDONOMBRE_SEL"
				&TFBobinaSiloMolidoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINASILOVIRGENNOMBRE"
				&TFBobinaSiloVirgenNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINASILOVIRGENNOMBRE_SEL"
				&TFBobinaSiloVirgenNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINALOTEVIRGEN"
				&TFBobinaLoteVirgen.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINALOTEVIRGEN_SEL"
				&TFBobinaLoteVirgen_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS"
				&TFExtrusionLotePaqueteAditivos.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS_SEL"
				&TFExtrusionLotePaqueteAditivos_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRODUCTOID"
				&TFBobinaProductoId.FromString(&GridStateFilterValue.Value)
				&TFBobinaProductoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRODUCTONOMBRE"
				&TFBobinaProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRODUCTONOMBRE_SEL"
				&TFBobinaProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRODUCTOTIPOMATERIAL_SEL"
				&TFBobinaProductoTipoMaterial_SelsJson = &GridStateFilterValue.Value
				&TFBobinaProductoTipoMaterial_Sels.FromJson(&TFBobinaProductoTipoMaterial_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRENSADOPRENSANOMBRE"
				&TFBobinaPrensadoPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRENSADOPRENSANOMBRE_SEL"
				&TFBobinaPrensadoPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAINTERRUPCIONESMOTIVO"
				&TFBobinaInterrupcionesMotivo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAINTERRUPCIONESMOTIVO_SEL"
				&TFBobinaInterrupcionesMotivo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAINTERRUPCIONESTIEMPO"
				&TFBobinaInterrupcionesTiempo.FromString(&GridStateFilterValue.Value)
				&TFBobinaInterrupcionesTiempo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINADOWNTIMECODE"
				&TFBobinaDownTimeCode.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINADOWNTIMECODE_SEL"
				&TFBobinaDownTimeCode_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINADOWNTIMEDESCRIPTION"
				&TFBobinaDownTimeDescription.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINADOWNTIMEDESCRIPTION_SEL"
				&TFBobinaDownTimeDescription_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"GRIDCFFILTER"
				&GridConditionalFormattingFilter.FromString(&GridStateFilterValue.Value)
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadBobinaNoSerieOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaNoSerie = &SearchTxt
	&TFBobinaNoSerie_Sel.SetEmpty()
	For Each DB.Bobina
		Order BobinaNoSerie
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order BobinaNoSerie
			&count += 1
		EndFor
		If not BobinaNoSerie.IsEmpty()
			&Option = BobinaNoSerie
			
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
	For Each DB.Bobina
		Order ExtrusionExtrusoraNombre
		using Produccion.vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
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

Sub 'LoadExtrusionTurnoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionTurnoNombre = &SearchTxt
	&TFExtrusionTurnoNombre_Sel.SetEmpty()
	For Each DB.Bobina
		Order ExtrusionTurnoNombre
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order ExtrusionTurnoNombre
			&count += 1
		EndFor
		If not ExtrusionTurnoNombre.IsEmpty()
			&Option = ExtrusionTurnoNombre
			
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
	For Each DB.Bobina
		Order ExtrusionOperadorNombre
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
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

Sub 'LoadBobinaObservacionesOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaObservaciones = &SearchTxt
	&TFBobinaObservaciones_Sel.SetEmpty()
	For Each DB.Bobina
		Order BobinaObservaciones
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order BobinaObservaciones
			&count += 1
		EndFor
		If not BobinaObservaciones.IsEmpty()
			&Option = BobinaObservaciones
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadBobinaRechazadaObservacionesOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaRechazadaObservaciones = &SearchTxt
	&TFBobinaRechazadaObservaciones_Sel.SetEmpty()
	For Each DB.Bobina
		Order BobinaRechazadaObservaciones
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order BobinaRechazadaObservaciones
			&count += 1
		EndFor
		If not BobinaRechazadaObservaciones.IsEmpty()
			&Option = BobinaRechazadaObservaciones
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadBobinaSiloMolidoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaSiloMolidoNombre = &SearchTxt
	&TFBobinaSiloMolidoNombre_Sel.SetEmpty()
	For Each DB.Bobina
		Order BobinaSiloMolidoId
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order BobinaSiloMolidoId
			&count += 1
		EndFor
		If not BobinaSiloMolidoNombre.IsEmpty()
			&Option = BobinaSiloMolidoNombre
			
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

Sub 'LoadBobinaSiloVirgenNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaSiloVirgenNombre = &SearchTxt
	&TFBobinaSiloVirgenNombre_Sel.SetEmpty()
	For Each DB.Bobina
		Order BobinaSiloVirgenId
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order BobinaSiloVirgenId
			&count += 1
		EndFor
		If not BobinaSiloVirgenNombre.IsEmpty()
			&Option = BobinaSiloVirgenNombre
			
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

Sub 'LoadBobinaLoteVirgenOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaLoteVirgen = &SearchTxt
	&TFBobinaLoteVirgen_Sel.SetEmpty()
	For Each DB.Bobina
		Order BobinaLoteVirgen
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order BobinaLoteVirgen
			&count += 1
		EndFor
		If not BobinaLoteVirgen.IsEmpty()
			&Option = BobinaLoteVirgen
			
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
	For Each DB.Bobina
		Order ExtrusionLotePaqueteAditivos
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
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

Sub 'LoadBobinaProductoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaProductoNombre = &SearchTxt
	&TFBobinaProductoNombre_Sel.SetEmpty()
	For Each DB.Bobina
		Order BobinaProductoId
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order BobinaProductoId
			&count += 1
		EndFor
		If not BobinaProductoNombre.IsEmpty()
			&Option = BobinaProductoNombre
			
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

Sub 'LoadBobinaPrensadoPrensaNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaPrensadoPrensaNombre = &SearchTxt
	&TFBobinaPrensadoPrensaNombre_Sel.SetEmpty()
	For Each DB.Bobina
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		If not BobinaPrensadoPrensaNombre.IsEmpty()
			&Option = BobinaPrensadoPrensaNombre
			
			&InsertIndex = 1
			Do while &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) < &Option
				&InsertIndex = &InsertIndex + 1
			EndDo
			If &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) = &Option
				&count.FromString(&OptionIndexes.Item(&InsertIndex))
				&count += 1
				&OptionIndexes.Remove(&InsertIndex)
				&OptionIndexes.Add(trim(&count.ToFormattedString()), &InsertIndex)
			Else
				&Options.Add(&Option, &InsertIndex)
				&OptionIndexes.Add(!'1', &InsertIndex)
			EndIf
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadBobinaInterrupcionesMotivoOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaInterrupcionesMotivo = &SearchTxt
	&TFBobinaInterrupcionesMotivo_Sel.SetEmpty()
	For Each DB.Bobina
		Order BobinaInterrupcionesId
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order BobinaInterrupcionesId
			&count += 1
		EndFor
		If not BobinaInterrupcionesMotivo.IsEmpty()
			&Option = BobinaInterrupcionesMotivo
			
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

Sub 'LoadBobinaDownTimeCodeOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaDownTimeCode = &SearchTxt
	&TFBobinaDownTimeCode_Sel.SetEmpty()
	For Each DB.Bobina
		Order BobinaDownTimeCode
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order BobinaDownTimeCode
			&count += 1
		EndFor
		If not BobinaDownTimeCode.IsEmpty()
			&Option = BobinaDownTimeCode
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadBobinaDownTimeDescriptionOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaDownTimeDescription = &SearchTxt
	&TFBobinaDownTimeDescription_Sel.SetEmpty()
	For Each DB.Bobina
		Order BobinaDownTimeDescription
		using vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where DB.BobinaHoraInicio>= &NowDate

		&count = 0
		For Each DB.Bobina
			Order BobinaDownTimeDescription
			&count += 1
		EndFor
		If not BobinaDownTimeDescription.IsEmpty()
			&Option = BobinaDownTimeDescription
			
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

