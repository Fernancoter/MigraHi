# Procedure: vwPrensadoResultadoGetFilterData

- **Module:** Reportes
- **Description:** vw Prensado Resultado Get Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| TFPrensadoResultadoPiezasBuenas | Variable | NUMERIC |  | TFPrensado Resultado Piezas Buenas |
| TFPrensadoResultadoPiezasBuenas_To | Variable | NUMERIC |  | TFPrensado Resultado Piezas Buenas_To |
| TFPrensadoResultadoPiezasMolino | Variable | NUMERIC |  | TFPrensado Resultado Piezas Molino |
| TFPrensadoResultadoPiezasMolino_To | Variable | NUMERIC |  | TFPrensado Resultado Piezas Molino_To |
| TFPrensadoResultadoMermaKg | Variable | NUMERIC |  | TFPrensado Resultado Merma Kg |
| TFPrensadoResultadoMermaKg_To | Variable | NUMERIC |  | TFPrensado Resultado Merma Kg_To |
| TFPrensadoResultadoNoPalets | Variable | NUMERIC |  | TFPrensado Resultado No Palets |
| TFPrensadoResultadoNoPalets_To | Variable | NUMERIC |  | TFPrensado Resultado No Palets_To |
| TFPrensadoResultadoCarretesSobrantes | Variable | NUMERIC |  | TFPrensado Resultado Carretes Sobrantes |
| TFPrensadoResultadoCarretesSobrantes_To | Variable | NUMERIC |  | TFPrensado Resultado Carretes Sobrantes_To |
| TFPrensadoResultadoObservaciones | Variable | VARCHAR |  | TFPrensado Resultado Observaciones |
| TFPrensadoResultadoObservaciones_Sel | Variable | VARCHAR |  | TFPrensado Resultado Observaciones_Sel |
| TFPrensadoResultadoRPMLinea | Variable | VARCHAR |  | TFPrensado Resultado RPMLinea |
| TFPrensadoResultadoRPMLinea_Sel | Variable | VARCHAR |  | TFPrensado Resultado RPMLinea_Sel |
| TFPrensadoResultadoGPMPrensa | Variable | NUMERIC |  | TFPrensado Resultado GPMPrensa |
| TFPrensadoResultadoGPMPrensa_To | Variable | NUMERIC |  | TFPrensado Resultado GPMPrensa_To |
| TFPrensadoResultadoGPMTotal | Variable | NUMERIC |  | TFPrensado Resultado GPMTotal |
| TFPrensadoResultadoGPMTotal_To | Variable | NUMERIC |  | TFPrensado Resultado GPMTotal_To |
| TFPrensadoResultadoHerramientas | Variable | VARCHAR |  | TFPrensado Resultado Herramientas |
| TFPrensadoResultadoHerramientas_Sel | Variable | VARCHAR |  | TFPrensado Resultado Herramientas_Sel |
| TFPrensadoLevasUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Levas Unidad Medida_Sels Json |
| TFPrensadoLevasUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sels |
| TFPrensadoLevasKgEntrada | Variable | NUMERIC |  | TFPrensado Levas Kg Entrada |
| TFPrensadoLevasKgEntrada_To | Variable | NUMERIC |  | TFPrensado Levas Kg Entrada_To |
| TFPrensadoLevasKgSalida | Variable | NUMERIC |  | TFPrensado Levas Kg Salida |
| TFPrensadoLevasKgSalida_To | Variable | NUMERIC |  | TFPrensado Levas Kg Salida_To |
| TFPrensadoLevasGradosEntrada | Variable | NUMERIC |  | TFPrensado Levas Grados Entrada |
| TFPrensadoLevasGradosEntrada_To | Variable | NUMERIC |  | TFPrensado Levas Grados Entrada_To |
| TFPrensadoLevasGradosSalida | Variable | NUMERIC |  | TFPrensado Levas Grados Salida |
| TFPrensadoLevasGradosSalida_To | Variable | NUMERIC |  | TFPrensado Levas Grados Salida_To |
| TFPrensadoRodillosUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels Json |
| TFPrensadoRodillosUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels |
| TFPrensadoRodillosKgEntrada | Variable | NUMERIC |  | TFPrensado Rodillos Kg Entrada |
| TFPrensadoRodillosKgEntrada_To | Variable | NUMERIC |  | TFPrensado Rodillos Kg Entrada_To |
| TFPrensadoRodillosKgSalida | Variable | NUMERIC |  | TFPrensado Rodillos Kg Salida |
| TFPrensadoRodillosKgSalida_To | Variable | NUMERIC |  | TFPrensado Rodillos Kg Salida_To |
| TFPrensadoRodillosGradosEntrada | Variable | NUMERIC |  | TFPrensado Rodillos Grados Entrada |
| TFPrensadoRodillosGradosEntrada_To | Variable | NUMERIC |  | TFPrensado Rodillos Grados Entrada_To |
| TFPrensadoRodillosGradosSalida | Variable | NUMERIC |  | TFPrensado Rodillos Grados Salida |
| TFPrensadoRodillosGradosSalida_To | Variable | NUMERIC |  | TFPrensado Rodillos Grados Salida_To |
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
| TFPrensadoFecha | Variable | DATETIME |  | TFPrensado Fecha |
| TFPrensadoFecha_To | Variable | DATETIME |  | TFPrensado Fecha_To |
| TFPrensadoPrensaNombre | Variable | VARCHAR |  | TFPrensado Prensa Nombre |
| TFPrensadoPrensaNombre_Sel | Variable | VARCHAR |  | TFPrensado Prensa Nombre_Sel |
| TFPrensadoTurnoNombre | Variable | VARCHAR |  | TFPrensado Turno Nombre |
| TFPrensadoTurnoNombre_Sel | Variable | VARCHAR |  | TFPrensado Turno Nombre_Sel |
| TFPrensadoOperadorNombre | Variable | VARCHAR |  | TFPrensado Operador Nombre |
| TFPrensadoOperadorNombre_Sel | Variable | VARCHAR |  | TFPrensado Operador Nombre_Sel |
| TFCarreraId | Variable | NUMERIC |  | TFCarrera Id |
| TFCarreraId_To | Variable | NUMERIC |  | TFCarrera Id_To |
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
	Case &DDOName.ToUpper() = !'DDO_PRENSADORESULTADOOBSERVACIONES'
		Do 'LoadPrensadoResultadoObservacionesOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADORESULTADORPMLINEA'
		Do 'LoadPrensadoResultadoRPMLineaOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADORESULTADOHERRAMIENTAS'
		Do 'LoadPrensadoResultadoHerramientasOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADOTURNONOMBRE'
		Do 'LoadPrensadoTurnoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADOPRENSANOMBRE'
		Do 'LoadPrensadoPrensaNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADOOPERADORNOMBRE'
		Do 'LoadPrensadoOperadorNombreOptions'
EndCase

&OptionsJson = &Options.ToJson()
&OptionsDescJson = &OptionsDesc.ToJson()
&OptionIndexesJson = &OptionIndexes.ToJson()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Reportes.vwPrensadoResultadoGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Reportes.vwPrensadoResultadoGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Reportes.vwPrensadoResultadoGridState"))
	Endif	

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOPIEZASBUENAS"
				&TFPrensadoResultadoPiezasBuenas.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoPiezasBuenas_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOPIEZASMOLINO"
				&TFPrensadoResultadoPiezasMolino.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoPiezasMolino_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOMERMAKG"
				&TFPrensadoResultadoMermaKg.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoMermaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADONOPALETS"
				&TFPrensadoResultadoNoPalets.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoNoPalets_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOCARRETESSOBRANTES"
				&TFPrensadoResultadoCarretesSobrantes.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoCarretesSobrantes_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOOBSERVACIONES"
				&TFPrensadoResultadoObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOOBSERVACIONES_SEL"
				&TFPrensadoResultadoObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADORPMLINEA"
				&TFPrensadoResultadoRPMLinea.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADORPMLINEA_SEL"
				&TFPrensadoResultadoRPMLinea_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOGPMPRENSA"
				&TFPrensadoResultadoGPMPrensa.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoGPMPrensa_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOGPMTOTAL"
				&TFPrensadoResultadoGPMTotal.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoGPMTotal_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOHERRAMIENTAS"
				&TFPrensadoResultadoHerramientas.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOHERRAMIENTAS_SEL"
				&TFPrensadoResultadoHerramientas_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASUNIDADMEDIDA_SEL"
				&TFPrensadoLevasUnidadMedida_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoLevasUnidadMedida_Sels.FromJson(&TFPrensadoLevasUnidadMedida_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASKGENTRADA"
				&TFPrensadoLevasKgEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoLevasKgEntrada_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASKGSALIDA"
				&TFPrensadoLevasKgSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoLevasKgSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASGRADOSENTRADA"
				&TFPrensadoLevasGradosEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoLevasGradosEntrada_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASGRADOSSALIDA"
				&TFPrensadoLevasGradosSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoLevasGradosSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSUNIDADMEDIDA_SEL"
				&TFPrensadoRodillosUnidadMedida_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoRodillosUnidadMedida_Sels.FromJson(&TFPrensadoRodillosUnidadMedida_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSKGENTRADA"
				&TFPrensadoRodillosKgEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosKgEntrada_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSKGSALIDA"
				&TFPrensadoRodillosKgSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosKgSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSGRADOSENTRADA"
				&TFPrensadoRodillosGradosEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosGradosEntrada_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSGRADOSSALIDA"
				&TFPrensadoRodillosGradosSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosGradosSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOFECHA"
				&TFPrensadoFecha.FromString(&GridStateFilterValue.Value)
				&TFPrensadoFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE"
				&TFPrensadoTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE_SEL"
				&TFPrensadoTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE"
				&TFPrensadoPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE_SEL"
				&TFPrensadoPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE"
				&TFPrensadoOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE_SEL"
				&TFPrensadoOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadPrensadoResultadoObservacionesOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoResultadoObservaciones = &SearchTxt
	&TFPrensadoResultadoObservaciones_Sel.SetEmpty()
	For Each DB.PrensadoResultado
		Order PrensadoResultadoObservaciones
		using vwPrensadoResultadoDS(&FilterFullText, &TFPrensadoResultadoPiezasBuenas, &TFPrensadoResultadoPiezasBuenas_To, &TFPrensadoResultadoPiezasMolino, &TFPrensadoResultadoPiezasMolino_To, &TFPrensadoResultadoMermaKg
					, &TFPrensadoResultadoMermaKg_To, &TFPrensadoResultadoNoPalets, &TFPrensadoResultadoNoPalets_To, &TFPrensadoResultadoCarretesSobrantes, &TFPrensadoResultadoCarretesSobrantes_To, &TFPrensadoResultadoObservaciones
					, &TFPrensadoResultadoObservaciones_Sel, &TFPrensadoResultadoRPMLinea, &TFPrensadoResultadoRPMLinea_Sel, &TFPrensadoResultadoGPMPrensa, &TFPrensadoResultadoGPMPrensa_To, &TFPrensadoResultadoGPMTotal
					, &TFPrensadoResultadoGPMTotal_To, &TFPrensadoResultadoHerramientas, &TFPrensadoResultadoHerramientas_Sel, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada
					, &TFPrensadoRodillosGradosEntrada_To, &TFPrensadoRodillosGradosSalida, &TFPrensadoRodillosGradosSalida_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel)

		&count = 0
		For Each DB.PrensadoResultado
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

Sub 'LoadPrensadoResultadoRPMLineaOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoResultadoRPMLinea = &SearchTxt
	&TFPrensadoResultadoRPMLinea_Sel.SetEmpty()
	For Each DB.PrensadoResultado
		Order PrensadoResultadoRPMLinea
		using vwPrensadoResultadoDS(&FilterFullText, &TFPrensadoResultadoPiezasBuenas, &TFPrensadoResultadoPiezasBuenas_To, &TFPrensadoResultadoPiezasMolino, &TFPrensadoResultadoPiezasMolino_To, &TFPrensadoResultadoMermaKg
					, &TFPrensadoResultadoMermaKg_To, &TFPrensadoResultadoNoPalets, &TFPrensadoResultadoNoPalets_To, &TFPrensadoResultadoCarretesSobrantes, &TFPrensadoResultadoCarretesSobrantes_To, &TFPrensadoResultadoObservaciones
					, &TFPrensadoResultadoObservaciones_Sel, &TFPrensadoResultadoRPMLinea, &TFPrensadoResultadoRPMLinea_Sel, &TFPrensadoResultadoGPMPrensa, &TFPrensadoResultadoGPMPrensa_To, &TFPrensadoResultadoGPMTotal
					, &TFPrensadoResultadoGPMTotal_To, &TFPrensadoResultadoHerramientas, &TFPrensadoResultadoHerramientas_Sel, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada
					, &TFPrensadoRodillosGradosEntrada_To, &TFPrensadoRodillosGradosSalida, &TFPrensadoRodillosGradosSalida_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel)

		&count = 0
		For Each DB.PrensadoResultado
			Order PrensadoResultadoRPMLinea
			&count += 1
		EndFor
		If not PrensadoResultadoRPMLinea.IsEmpty()
			&Option = PrensadoResultadoRPMLinea
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadPrensadoResultadoHerramientasOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoResultadoHerramientas = &SearchTxt
	&TFPrensadoResultadoHerramientas_Sel.SetEmpty()
	For Each DB.PrensadoResultado
		Order PrensadoResultadoHerramientas
		using vwPrensadoResultadoDS(&FilterFullText, &TFPrensadoResultadoPiezasBuenas, &TFPrensadoResultadoPiezasBuenas_To, &TFPrensadoResultadoPiezasMolino, &TFPrensadoResultadoPiezasMolino_To, &TFPrensadoResultadoMermaKg
					, &TFPrensadoResultadoMermaKg_To, &TFPrensadoResultadoNoPalets, &TFPrensadoResultadoNoPalets_To, &TFPrensadoResultadoCarretesSobrantes, &TFPrensadoResultadoCarretesSobrantes_To, &TFPrensadoResultadoObservaciones
					, &TFPrensadoResultadoObservaciones_Sel, &TFPrensadoResultadoRPMLinea, &TFPrensadoResultadoRPMLinea_Sel, &TFPrensadoResultadoGPMPrensa, &TFPrensadoResultadoGPMPrensa_To, &TFPrensadoResultadoGPMTotal
					, &TFPrensadoResultadoGPMTotal_To, &TFPrensadoResultadoHerramientas, &TFPrensadoResultadoHerramientas_Sel, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada
					, &TFPrensadoRodillosGradosEntrada_To, &TFPrensadoRodillosGradosSalida, &TFPrensadoRodillosGradosSalida_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel)

		&count = 0
		For Each DB.PrensadoResultado
			Order PrensadoResultadoHerramientas
			&count += 1
		EndFor
		If not PrensadoResultadoHerramientas.IsEmpty()
			&Option = PrensadoResultadoHerramientas
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadPrensadoTurnoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoTurnoNombre = &SearchTxt
	&TFPrensadoTurnoNombre_Sel.SetEmpty()
	For Each DB.PrensadoResultado
		Order WWPBaseObjects.PrensadoTurnoNombre
		using vwPrensadoResultadoDS(&FilterFullText, &TFPrensadoResultadoPiezasBuenas, &TFPrensadoResultadoPiezasBuenas_To, &TFPrensadoResultadoPiezasMolino, &TFPrensadoResultadoPiezasMolino_To, &TFPrensadoResultadoMermaKg
					, &TFPrensadoResultadoMermaKg_To, &TFPrensadoResultadoNoPalets, &TFPrensadoResultadoNoPalets_To, &TFPrensadoResultadoCarretesSobrantes, &TFPrensadoResultadoCarretesSobrantes_To, &TFPrensadoResultadoObservaciones
					, &TFPrensadoResultadoObservaciones_Sel, &TFPrensadoResultadoRPMLinea, &TFPrensadoResultadoRPMLinea_Sel, &TFPrensadoResultadoGPMPrensa, &TFPrensadoResultadoGPMPrensa_To, &TFPrensadoResultadoGPMTotal
					, &TFPrensadoResultadoGPMTotal_To, &TFPrensadoResultadoHerramientas, &TFPrensadoResultadoHerramientas_Sel, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada
					, &TFPrensadoRodillosGradosEntrada_To, &TFPrensadoRodillosGradosSalida, &TFPrensadoRodillosGradosSalida_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel)

		&count = 0
		For Each DB.PrensadoResultado
			Order PrensadoTurnoNombre
			&count += 1
		EndFor
		If not PrensadoTurnoNombre.IsEmpty()
			&Option = PrensadoTurnoNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadPrensadoPrensaNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoPrensaNombre = &SearchTxt
	&TFPrensadoPrensaNombre_Sel.SetEmpty()
	For Each DB.PrensadoResultado
		Order PrensadoPrensaNombre
		using vwPrensadoResultadoDS(&FilterFullText, &TFPrensadoResultadoPiezasBuenas, &TFPrensadoResultadoPiezasBuenas_To, &TFPrensadoResultadoPiezasMolino, &TFPrensadoResultadoPiezasMolino_To, &TFPrensadoResultadoMermaKg
					, &TFPrensadoResultadoMermaKg_To, &TFPrensadoResultadoNoPalets, &TFPrensadoResultadoNoPalets_To, &TFPrensadoResultadoCarretesSobrantes, &TFPrensadoResultadoCarretesSobrantes_To, &TFPrensadoResultadoObservaciones
					, &TFPrensadoResultadoObservaciones_Sel, &TFPrensadoResultadoRPMLinea, &TFPrensadoResultadoRPMLinea_Sel, &TFPrensadoResultadoGPMPrensa, &TFPrensadoResultadoGPMPrensa_To, &TFPrensadoResultadoGPMTotal
					, &TFPrensadoResultadoGPMTotal_To, &TFPrensadoResultadoHerramientas, &TFPrensadoResultadoHerramientas_Sel, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada
					, &TFPrensadoRodillosGradosEntrada_To, &TFPrensadoRodillosGradosSalida, &TFPrensadoRodillosGradosSalida_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel)

		&count = 0
		For Each DB.PrensadoResultado
			Order PrensadoPrensaNombre
			&count += 1
		EndFor
		If not PrensadoPrensaNombre.IsEmpty()
			&Option = PrensadoPrensaNombre
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
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
	For Each DB.PrensadoResultado
		Order PrensadoOperadorNombre
		using vwPrensadoResultadoDS(&FilterFullText, &TFPrensadoResultadoPiezasBuenas, &TFPrensadoResultadoPiezasBuenas_To, &TFPrensadoResultadoPiezasMolino, &TFPrensadoResultadoPiezasMolino_To, &TFPrensadoResultadoMermaKg
					, &TFPrensadoResultadoMermaKg_To, &TFPrensadoResultadoNoPalets, &TFPrensadoResultadoNoPalets_To, &TFPrensadoResultadoCarretesSobrantes, &TFPrensadoResultadoCarretesSobrantes_To, &TFPrensadoResultadoObservaciones
					, &TFPrensadoResultadoObservaciones_Sel, &TFPrensadoResultadoRPMLinea, &TFPrensadoResultadoRPMLinea_Sel, &TFPrensadoResultadoGPMPrensa, &TFPrensadoResultadoGPMPrensa_To, &TFPrensadoResultadoGPMTotal
					, &TFPrensadoResultadoGPMTotal_To, &TFPrensadoResultadoHerramientas, &TFPrensadoResultadoHerramientas_Sel, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada
					, &TFPrensadoRodillosGradosEntrada_To, &TFPrensadoRodillosGradosSalida, &TFPrensadoRodillosGradosSalida_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel)

		&count = 0
		For Each DB.PrensadoResultado
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
```

### Rules (Rules)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

parm(in:&DDOName, in:&SearchTxt, in:&SearchTxtTo, out:&OptionsJson, out:&OptionsDescJson, out:&OptionIndexesJson);

/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

