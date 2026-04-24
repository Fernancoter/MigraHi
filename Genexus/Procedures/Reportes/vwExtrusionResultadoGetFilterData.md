# Procedure: vwExtrusionResultadoGetFilterData

- **Module:** Reportes
- **Description:** vw Extrusion Resultado Get Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| TFExtrusionResultadoBobinasMolino | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Molino |
| TFExtrusionResultadoBobinasMolino_To | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Molino_To |
| TFExtrusionResultadoBobinasReposo | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Reposo |
| TFExtrusionResultadoBobinasReposo_To | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Reposo_To |
| TFExtrusionResultadoVelLaminadora | Variable | NUMERIC |  | TFExtrusion Resultado Vel Laminadora |
| TFExtrusionResultadoVelLaminadora_To | Variable | NUMERIC |  | TFExtrusion Resultado Vel Laminadora_To |
| TFExtrusionResultadoVelHusillo | Variable | NUMERIC |  | TFExtrusion Resultado Vel Husillo |
| TFExtrusionResultadoVelHusillo_To | Variable | NUMERIC |  | TFExtrusion Resultado Vel Husillo_To |
| TFExtrusionResultadoTotalKg | Variable | NUMERIC |  | TFExtrusion Resultado Total Kg |
| TFExtrusionResultadoTotalKg_To | Variable | NUMERIC |  | TFExtrusion Resultado Total Kg_To |
| TFExtrusionResultadoTotalMermaKg | Variable | NUMERIC |  | TFExtrusion Resultado Total Merma Kg |
| TFExtrusionResultadoTotalMermaKg_To | Variable | NUMERIC |  | TFExtrusion Resultado Total Merma Kg_To |
| TFExtrusionResultadoCOMBA_Sel | Variable | NUMERIC |  | TFExtrusion Resultado COMBA_Sel |
| TFExtrusionResultadoObservaciones | Variable | VARCHAR |  | TFExtrusion Resultado Observaciones |
| TFExtrusionResultadoObservaciones_Sel | Variable | VARCHAR |  | TFExtrusion Resultado Observaciones_Sel |
| TFExtrusionSiloNombre | Variable | VARCHAR |  | TFExtrusion Silo Nombre |
| TFExtrusionSiloNombre_Sel | Variable | VARCHAR |  | TFExtrusion Silo Nombre_Sel |
| TFExtrusionLoteSilo | Variable | VARCHAR |  | TFExtrusion Lote Silo |
| TFExtrusionLoteSilo_Sel | Variable | VARCHAR |  | TFExtrusion Lote Silo_Sel |
| TFExtrusionRevHusilloMolido | Variable | NUMERIC |  | TFExtrusion Rev Husillo Molido |
| TFExtrusionRevHusilloMolido_To | Variable | NUMERIC |  | TFExtrusion Rev Husillo Molido_To |
| TFExtrusionRevHusilloVirgen | Variable | NUMERIC |  | TFExtrusion Rev Husillo Virgen |
| TFExtrusionRevHusilloVirgen_To | Variable | NUMERIC |  | TFExtrusion Rev Husillo Virgen_To |
| TFExtrusionVirgenKg | Variable | NUMERIC |  | TFExtrusion Virgen Kg |
| TFExtrusionVirgenKg_To | Variable | NUMERIC |  | TFExtrusion Virgen Kg_To |
| TFExtrusionMolidoKg | Variable | NUMERIC |  | TFExtrusion Molido Kg |
| TFExtrusionMolidoKg_To | Variable | NUMERIC |  | TFExtrusion Molido Kg_To |
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
| TFExtrusionFecha | Variable | DATETIME |  | TFExtrusion Fecha |
| TFExtrusionFecha_To | Variable | DATETIME |  | TFExtrusion Fecha_To |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFExtrusionTurnoNombre | Variable | VARCHAR |  | TFExtrusion Turno Nombre |
| TFExtrusionTurnoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Turno Nombre_Sel |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionMotivoAnticipado_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Motivo Anticipado_Sels Json |
| TFExtrusionMotivoAnticipado_Sels | Variable | VARCHAR |  | TFExtrusion Motivo Anticipado_Sels |
| TFExtrusionProductoNombre | Variable | VARCHAR |  | TFExtrusion Producto Nombre |
| TFExtrusionProductoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Producto Nombre_Sel |
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
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONEXTRUSORANOMBRE'
		Do 'LoadExtrusionExtrusoraNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONPRODUCTONOMBRE'
		Do 'LoadExtrusionProductoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONTURNONOMBRE'
		Do 'LoadExtrusionTurnoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONOPERADORNOMBRE'
		Do 'LoadExtrusionOperadorNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONRESULTADOOBSERVACIONES'
		Do 'LoadExtrusionResultadoObservacionesOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONSILONOMBRE'
		Do 'LoadExtrusionSiloNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EXTRUSIONLOTESILO'
		Do 'LoadExtrusionLoteSiloOptions'
EndCase

&OptionsJson = &Options.ToJson()
&OptionsDescJson = &OptionsDesc.ToJson()
&OptionIndexesJson = &OptionIndexes.ToJson()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Reportes.vwExtrusionResultadoGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Reportes.vwExtrusionResultadoGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Reportes.vwExtrusionResultadoGridState"))
	Endif	

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONFECHA"
				&TFExtrusionFecha.FromString(&GridStateFilterValue.Value)
				&TFExtrusionFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE"
				&TFExtrusionExtrusoraNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE_SEL"
				&TFExtrusionExtrusoraNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE"
				&TFExtrusionProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE_SEL"
				&TFExtrusionProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE"
				&TFExtrusionTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE_SEL"
				&TFExtrusionTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE"
				&TFExtrusionOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE_SEL"
				&TFExtrusionOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOBOBINASMOLINO"
				&TFExtrusionResultadoBobinasMolino.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoBobinasMolino_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOBOBINASREPOSO"
				&TFExtrusionResultadoBobinasReposo.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoBobinasReposo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOVELLAMINADORA"
				&TFExtrusionResultadoVelLaminadora.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoVelLaminadora_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOVELHUSILLO"
				&TFExtrusionResultadoVelHusillo.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoVelHusillo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOTOTALKG"
				&TFExtrusionResultadoTotalKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoTotalKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOTOTALMERMAKG"
				&TFExtrusionResultadoTotalMermaKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoTotalMermaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOCOMBA_SEL"
				&TFExtrusionResultadoCOMBA_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOOBSERVACIONES"
				&TFExtrusionResultadoObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOOBSERVACIONES_SEL"
				&TFExtrusionResultadoObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE"
				&TFExtrusionSiloNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE_SEL"
				&TFExtrusionSiloNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO"
				&TFExtrusionLoteSilo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO_SEL"
				&TFExtrusionLoteSilo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONREVHUSILLOMOLIDO"
				&TFExtrusionRevHusilloMolido.FromString(&GridStateFilterValue.Value)
				&TFExtrusionRevHusilloMolido_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONREVHUSILLOVIRGEN"
				&TFExtrusionRevHusilloVirgen.FromString(&GridStateFilterValue.Value)
				&TFExtrusionRevHusilloVirgen_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONVIRGENKG"
				&TFExtrusionVirgenKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionVirgenKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONMOLIDOKG"
				&TFExtrusionMolidoKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionMolidoKg_To.FromString(&GridStateFilterValue.ValueTo)
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadExtrusionExtrusoraNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionExtrusoraNombre = &SearchTxt
	&TFExtrusionExtrusoraNombre_Sel.SetEmpty()
	For Each DB.ExtrusionResultado
		Order ExtrusionExtrusoraNombre
		using vwExtrusionResultadoDS(&FilterFullText, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionResultadoBobinasMolino
					, &TFExtrusionResultadoBobinasMolino_To, &TFExtrusionResultadoBobinasReposo, &TFExtrusionResultadoBobinasReposo_To, &TFExtrusionResultadoVelLaminadora, &TFExtrusionResultadoVelLaminadora_To, &TFExtrusionResultadoVelHusillo
					, &TFExtrusionResultadoVelHusillo_To, &TFExtrusionResultadoTotalKg, &TFExtrusionResultadoTotalKg_To, &TFExtrusionResultadoTotalMermaKg, &TFExtrusionResultadoTotalMermaKg_To, &TFExtrusionResultadoCOMBA_Sel
					, &TFExtrusionResultadoObservaciones, &TFExtrusionResultadoObservaciones_Sel, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel
					, &TFExtrusionRevHusilloMolido, &TFExtrusionRevHusilloMolido_To, &TFExtrusionRevHusilloVirgen, &TFExtrusionRevHusilloVirgen_To, &TFExtrusionVirgenKg, &TFExtrusionVirgenKg_To
					, &TFExtrusionMolidoKg, &TFExtrusionMolidoKg_To)

		&count = 0
		For Each DB.ExtrusionResultado
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

Sub 'LoadExtrusionProductoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionProductoNombre = &SearchTxt
	&TFExtrusionProductoNombre_Sel.SetEmpty()
	For Each DB.ExtrusionResultado
		Order ExtrusionProductoNombre
		using Reportes.vwExtrusionResultadoDS(&FilterFullText, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionResultadoBobinasMolino
					, &TFExtrusionResultadoBobinasMolino_To, &TFExtrusionResultadoBobinasReposo, &TFExtrusionResultadoBobinasReposo_To, &TFExtrusionResultadoVelLaminadora, &TFExtrusionResultadoVelLaminadora_To, &TFExtrusionResultadoVelHusillo
					, &TFExtrusionResultadoVelHusillo_To, &TFExtrusionResultadoTotalKg, &TFExtrusionResultadoTotalKg_To, &TFExtrusionResultadoTotalMermaKg, &TFExtrusionResultadoTotalMermaKg_To, &TFExtrusionResultadoCOMBA_Sel
					, &TFExtrusionResultadoObservaciones, &TFExtrusionResultadoObservaciones_Sel, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel
					, &TFExtrusionRevHusilloMolido, &TFExtrusionRevHusilloMolido_To, &TFExtrusionRevHusilloVirgen, &TFExtrusionRevHusilloVirgen_To, &TFExtrusionVirgenKg, &TFExtrusionVirgenKg_To
					, &TFExtrusionMolidoKg, &TFExtrusionMolidoKg_To)

		&count = 0
		For Each DB.ExtrusionResultado
			Order ExtrusionProductoNombre
			&count += 1
		EndFor
		If not ExtrusionProductoNombre.IsEmpty()
			&Option = ExtrusionProductoNombre
			
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
	For Each DB.ExtrusionResultado
		Order ExtrusionTurnoNombre
		using vwExtrusionResultadoDS(&FilterFullText, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionResultadoBobinasMolino
					, &TFExtrusionResultadoBobinasMolino_To, &TFExtrusionResultadoBobinasReposo, &TFExtrusionResultadoBobinasReposo_To, &TFExtrusionResultadoVelLaminadora, &TFExtrusionResultadoVelLaminadora_To, &TFExtrusionResultadoVelHusillo
					, &TFExtrusionResultadoVelHusillo_To, &TFExtrusionResultadoTotalKg, &TFExtrusionResultadoTotalKg_To, &TFExtrusionResultadoTotalMermaKg, &TFExtrusionResultadoTotalMermaKg_To, &TFExtrusionResultadoCOMBA_Sel
					, &TFExtrusionResultadoObservaciones, &TFExtrusionResultadoObservaciones_Sel, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel
					, &TFExtrusionRevHusilloMolido, &TFExtrusionRevHusilloMolido_To, &TFExtrusionRevHusilloVirgen, &TFExtrusionRevHusilloVirgen_To, &TFExtrusionVirgenKg, &TFExtrusionVirgenKg_To
					, &TFExtrusionMolidoKg, &TFExtrusionMolidoKg_To)

		&count = 0
		For Each DB.ExtrusionResultado
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
	For Each DB.ExtrusionResultado
		Order ExtrusionOperadorNombre
		using Reportes.vwExtrusionResultadoDS(&FilterFullText, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionResultadoBobinasMolino
					, &TFExtrusionResultadoBobinasMolino_To, &TFExtrusionResultadoBobinasReposo, &TFExtrusionResultadoBobinasReposo_To, &TFExtrusionResultadoVelLaminadora, &TFExtrusionResultadoVelLaminadora_To, &TFExtrusionResultadoVelHusillo
					, &TFExtrusionResultadoVelHusillo_To, &TFExtrusionResultadoTotalKg, &TFExtrusionResultadoTotalKg_To, &TFExtrusionResultadoTotalMermaKg, &TFExtrusionResultadoTotalMermaKg_To, &TFExtrusionResultadoCOMBA_Sel
					, &TFExtrusionResultadoObservaciones, &TFExtrusionResultadoObservaciones_Sel, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel
					, &TFExtrusionRevHusilloMolido, &TFExtrusionRevHusilloMolido_To, &TFExtrusionRevHusilloVirgen, &TFExtrusionRevHusilloVirgen_To, &TFExtrusionVirgenKg, &TFExtrusionVirgenKg_To
					, &TFExtrusionMolidoKg, &TFExtrusionMolidoKg_To)

		&count = 0
		For Each DB.ExtrusionResultado
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

Sub 'LoadExtrusionResultadoObservacionesOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFExtrusionResultadoObservaciones = &SearchTxt
	&TFExtrusionResultadoObservaciones_Sel.SetEmpty()
	For Each DB.ExtrusionResultado
		Order ExtrusionResultadoObservaciones
		using vwExtrusionResultadoDS(&FilterFullText, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionResultadoBobinasMolino
					, &TFExtrusionResultadoBobinasMolino_To, &TFExtrusionResultadoBobinasReposo, &TFExtrusionResultadoBobinasReposo_To, &TFExtrusionResultadoVelLaminadora, &TFExtrusionResultadoVelLaminadora_To, &TFExtrusionResultadoVelHusillo
					, &TFExtrusionResultadoVelHusillo_To, &TFExtrusionResultadoTotalKg, &TFExtrusionResultadoTotalKg_To, &TFExtrusionResultadoTotalMermaKg, &TFExtrusionResultadoTotalMermaKg_To, &TFExtrusionResultadoCOMBA_Sel
					, &TFExtrusionResultadoObservaciones, &TFExtrusionResultadoObservaciones_Sel, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel
					, &TFExtrusionRevHusilloMolido, &TFExtrusionRevHusilloMolido_To, &TFExtrusionRevHusilloVirgen, &TFExtrusionRevHusilloVirgen_To, &TFExtrusionVirgenKg, &TFExtrusionVirgenKg_To
					, &TFExtrusionMolidoKg, &TFExtrusionMolidoKg_To)

		&count = 0
		For Each DB.ExtrusionResultado
			Order ExtrusionResultadoObservaciones
			&count += 1
		EndFor
		If not ExtrusionResultadoObservaciones.IsEmpty()
			&Option = ExtrusionResultadoObservaciones
			
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
	For Each DB.ExtrusionResultado
		Order ExtrusionSiloNombre
		using vwExtrusionResultadoDS(&FilterFullText, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionResultadoBobinasMolino
					, &TFExtrusionResultadoBobinasMolino_To, &TFExtrusionResultadoBobinasReposo, &TFExtrusionResultadoBobinasReposo_To, &TFExtrusionResultadoVelLaminadora, &TFExtrusionResultadoVelLaminadora_To, &TFExtrusionResultadoVelHusillo
					, &TFExtrusionResultadoVelHusillo_To, &TFExtrusionResultadoTotalKg, &TFExtrusionResultadoTotalKg_To, &TFExtrusionResultadoTotalMermaKg, &TFExtrusionResultadoTotalMermaKg_To, &TFExtrusionResultadoCOMBA_Sel
					, &TFExtrusionResultadoObservaciones, &TFExtrusionResultadoObservaciones_Sel, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel
					, &TFExtrusionRevHusilloMolido, &TFExtrusionRevHusilloMolido_To, &TFExtrusionRevHusilloVirgen, &TFExtrusionRevHusilloVirgen_To, &TFExtrusionVirgenKg, &TFExtrusionVirgenKg_To
					, &TFExtrusionMolidoKg, &TFExtrusionMolidoKg_To)

		&count = 0
		For Each DB.ExtrusionResultado
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
	For Each DB.ExtrusionResultado
		Order ExtrusionLoteSilo
		using vwExtrusionResultadoDS(&FilterFullText, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionResultadoBobinasMolino
					, &TFExtrusionResultadoBobinasMolino_To, &TFExtrusionResultadoBobinasReposo, &TFExtrusionResultadoBobinasReposo_To, &TFExtrusionResultadoVelLaminadora, &TFExtrusionResultadoVelLaminadora_To, &TFExtrusionResultadoVelHusillo
					, &TFExtrusionResultadoVelHusillo_To, &TFExtrusionResultadoTotalKg, &TFExtrusionResultadoTotalKg_To, &TFExtrusionResultadoTotalMermaKg, &TFExtrusionResultadoTotalMermaKg_To, &TFExtrusionResultadoCOMBA_Sel
					, &TFExtrusionResultadoObservaciones, &TFExtrusionResultadoObservaciones_Sel, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel
					, &TFExtrusionRevHusilloMolido, &TFExtrusionRevHusilloMolido_To, &TFExtrusionRevHusilloVirgen, &TFExtrusionRevHusilloVirgen_To, &TFExtrusionVirgenKg, &TFExtrusionVirgenKg_To
					, &TFExtrusionMolidoKg, &TFExtrusionMolidoKg_To)

		&count = 0
		For Each DB.ExtrusionResultado
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
```

### Rules (Rules)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

parm(in:&DDOName, in:&SearchTxt, in:&SearchTxtTo, out:&OptionsJson, out:&OptionsDescJson, out:&OptionIndexesJson);

/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

