# Procedure: PrensadoBobinaWWGetFilterData

- **Module:** DB
- **Description:** Prensado Bobina WWGet Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| TFPrensadoBobinaId | Variable | NUMERIC |  | TFPrensado Bobina Id |
| TFPrensadoBobinaId_To | Variable | NUMERIC |  | TFPrensado Bobina Id_To |
| TFPrensadoId | Variable | NUMERIC |  | TFPrensado Id |
| TFPrensadoId_To | Variable | NUMERIC |  | TFPrensado Id_To |
| TFBobinaId | Variable | NUMERIC |  | TFBobina Id |
| TFBobinaId_To | Variable | NUMERIC |  | TFBobina Id_To |
| TFBobinaNoSerie | Variable | VARCHAR |  | TFBobina No Serie |
| TFBobinaNoSerie_Sel | Variable | VARCHAR |  | TFBobina No Serie_Sel |
| TFBobinaEstado_SelsJson | Variable | LONGVARCHAR |  | TFBobina Estado_Sels Json |
| TFBobinaEstado_Sels | Variable | VARCHAR |  | TFBobina Estado_Sels |
| TFBobinaNo | Variable | NUMERIC |  | TFBobina No |
| TFBobinaNo_To | Variable | NUMERIC |  | TFBobina No_To |
| TFBobinaOrigen_SelsJson | Variable | LONGVARCHAR |  | TFBobina Origen_Sels Json |
| TFBobinaOrigen_Sels | Variable | VARCHAR |  | TFBobina Origen_Sels |
| TFBobinaKg | Variable | NUMERIC |  | TFBobina Kg |
| TFBobinaKg_To | Variable | NUMERIC |  | TFBobina Kg_To |
| TFBobinaHoraSalida | Variable | DATETIME |  | TFBobina Hora Salida |
| TFBobinaHoraSalida_To | Variable | DATETIME |  | TFBobina Hora Salida_To |
| TFBobinaCarreras | Variable | NUMERIC |  | TFBobina Carreras |
| TFBobinaCarreras_To | Variable | NUMERIC |  | TFBobina Carreras_To |
| TFBobinaMinutosEnReposo | Variable | NUMERIC |  | TFBobina Minutos En Reposo |
| TFBobinaMinutosEnReposo_To | Variable | NUMERIC |  | TFBobina Minutos En Reposo_To |
| TFBobinaReposoEnHoras | Variable | NUMERIC |  | TFBobina Reposo En Horas |
| TFBobinaReposoEnHoras_To | Variable | NUMERIC |  | TFBobina Reposo En Horas_To |
| TFPrensadoBobinaCantCarrera | Variable | NUMERIC |  | TFPrensado Bobina Cant Carrera |
| TFPrensadoBobinaCantCarrera_To | Variable | NUMERIC |  | TFPrensado Bobina Cant Carrera_To |
| TFPrensadoOperadorId | Variable | NUMERIC |  | TFPrensado Operador Id |
| TFPrensadoOperadorId_To | Variable | NUMERIC |  | TFPrensado Operador Id_To |
| TFPrensadoOperadorNombre | Variable | VARCHAR |  | TFPrensado Operador Nombre |
| TFPrensadoOperadorNombre_Sel | Variable | VARCHAR |  | TFPrensado Operador Nombre_Sel |
| TFPrensadoPrensaId | Variable | NUMERIC |  | TFPrensado Prensa Id |
| TFPrensadoPrensaId_To | Variable | NUMERIC |  | TFPrensado Prensa Id_To |
| TFPrensadoPrensaNombre | Variable | VARCHAR |  | TFPrensado Prensa Nombre |
| TFPrensadoPrensaNombre_Sel | Variable | VARCHAR |  | TFPrensado Prensa Nombre_Sel |
| TFPrensadoTurnoId | Variable | NUMERIC |  | TFPrensado Turno Id |
| TFPrensadoTurnoId_To | Variable | NUMERIC |  | TFPrensado Turno Id_To |
| TFPrensadoTurnoNombre | Variable | VARCHAR |  | TFPrensado Turno Nombre |
| TFPrensadoTurnoNombre_Sel | Variable | VARCHAR |  | TFPrensado Turno Nombre_Sel |
| TFPrensadoProductoId | Variable | NUMERIC |  | TFPrensado Producto Id |
| TFPrensadoProductoId_To | Variable | NUMERIC |  | TFPrensado Producto Id_To |
| TFPrensadoProductoNombre | Variable | VARCHAR |  | TFPrensado Producto Nombre |
| TFPrensadoProductoNombre_Sel | Variable | VARCHAR |  | TFPrensado Producto Nombre_Sel |
| TFPrensadoProductoTipoMaterial_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Producto Tipo Material_Sels Json |
| TFPrensadoProductoTipoMaterial_Sels | Variable | VARCHAR |  | TFPrensado Producto Tipo Material_Sels |
| TFPrensadoFecha | Variable | DATETIME |  | TFPrensado Fecha |
| TFPrensadoFecha_To | Variable | DATETIME |  | TFPrensado Fecha_To |
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
	Case &DDOName.ToUpper() = !'DDO_PRENSADOOPERADORNOMBRE'
		Do 'LoadPrensadoOperadorNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADOPRENSANOMBRE'
		Do 'LoadPrensadoPrensaNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADOTURNONOMBRE'
		Do 'LoadPrensadoTurnoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADOPRODUCTONOMBRE'
		Do 'LoadPrensadoProductoNombreOptions'
EndCase

&OptionsJson = &Options.ToJson()
&OptionsDescJson = &OptionsDesc.ToJson()
&OptionIndexesJson = &OptionIndexes.ToJson()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.PrensadoBobinaWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.PrensadoBobinaWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.PrensadoBobinaWWGridState"))
	Endif	

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOBOBINAID"
				&TFPrensadoBobinaId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoBobinaId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOID"
				&TFPrensadoId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAID"
				&TFBobinaId.FromString(&GridStateFilterValue.Value)
				&TFBobinaId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINANOSERIE"
				&TFBobinaNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINANOSERIE_SEL"
				&TFBobinaNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAESTADO_SEL"
				&TFBobinaEstado_SelsJson = &GridStateFilterValue.Value
				&TFBobinaEstado_Sels.FromJson(&TFBobinaEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINANO"
				&TFBobinaNo.FromString(&GridStateFilterValue.Value)
				&TFBobinaNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAORIGEN_SEL"
				&TFBobinaOrigen_SelsJson = &GridStateFilterValue.Value
				&TFBobinaOrigen_Sels.FromJson(&TFBobinaOrigen_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAKG"
				&TFBobinaKg.FromString(&GridStateFilterValue.Value)
				&TFBobinaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAHORASALIDA"
				&TFBobinaHoraSalida.FromString(&GridStateFilterValue.Value)
				&TFBobinaHoraSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINACARRERAS"
				&TFBobinaCarreras.FromString(&GridStateFilterValue.Value)
				&TFBobinaCarreras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAMINUTOSENREPOSO"
				&TFBobinaMinutosEnReposo.FromString(&GridStateFilterValue.Value)
				&TFBobinaMinutosEnReposo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAREPOSOENHORAS"
				&TFBobinaReposoEnHoras.FromString(&GridStateFilterValue.Value)
				&TFBobinaReposoEnHoras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOBOBINACANTCARRERA"
				&TFPrensadoBobinaCantCarrera.FromString(&GridStateFilterValue.Value)
				&TFPrensadoBobinaCantCarrera_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORID"
				&TFPrensadoOperadorId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoOperadorId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE"
				&TFPrensadoOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE_SEL"
				&TFPrensadoOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSAID"
				&TFPrensadoPrensaId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoPrensaId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE"
				&TFPrensadoPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE_SEL"
				&TFPrensadoPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNOID"
				&TFPrensadoTurnoId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoTurnoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE"
				&TFPrensadoTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE_SEL"
				&TFPrensadoTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTOID"
				&TFPrensadoProductoId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoProductoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE"
				&TFPrensadoProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE_SEL"
				&TFPrensadoProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTOTIPOMATERIAL_SEL"
				&TFPrensadoProductoTipoMaterial_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoProductoTipoMaterial_Sels.FromJson(&TFPrensadoProductoTipoMaterial_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPRENSADOFECHA"
				&TFPrensadoFecha.FromString(&GridStateFilterValue.Value)
				&TFPrensadoFecha_To.FromString(&GridStateFilterValue.ValueTo)
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadBobinaNoSerieOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFBobinaNoSerie = &SearchTxt
	&TFBobinaNoSerie_Sel.SetEmpty()
	For Each PrensadoBobina
		Order BobinaId
		using PrensadoBobinaWWDS(&FilterFullText, &TFPrensadoBobinaId, &TFPrensadoBobinaId_To, &TFPrensadoId, &TFPrensadoId_To, &TFBobinaId
					, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel, &TFBobinaEstado_Sels, &TFBobinaNo, &TFBobinaNo_To
					, &TFBobinaOrigen_Sels, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaHoraSalida, &TFBobinaHoraSalida_To, &TFBobinaCarreras
					, &TFBobinaCarreras_To, &TFBobinaMinutosEnReposo, &TFBobinaMinutosEnReposo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFPrensadoBobinaCantCarrera
					, &TFPrensadoBobinaCantCarrera_To, &TFPrensadoOperadorId, &TFPrensadoOperadorId_To, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel, &TFPrensadoPrensaId
					, &TFPrensadoPrensaId_To, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoId, &TFPrensadoTurnoId_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoId, &TFPrensadoProductoId_To, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoProductoTipoMaterial_Sels
					, &TFPrensadoFecha, &TFPrensadoFecha_To)

		&count = 0
		For Each PrensadoBobina
			Order BobinaId
			&count += 1
		EndFor
		If not BobinaNoSerie.IsEmpty()
			&Option = BobinaNoSerie
			
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
	For Each PrensadoBobina
		Order PrensadoOperadorNombre
		using DB.PrensadoBobinaWWDS(&FilterFullText, &TFPrensadoBobinaId, &TFPrensadoBobinaId_To, &TFPrensadoId, &TFPrensadoId_To, &TFBobinaId
					, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel, &TFBobinaEstado_Sels, &TFBobinaNo, &TFBobinaNo_To
					, &TFBobinaOrigen_Sels, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaHoraSalida, &TFBobinaHoraSalida_To, &TFBobinaCarreras
					, &TFBobinaCarreras_To, &TFBobinaMinutosEnReposo, &TFBobinaMinutosEnReposo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFPrensadoBobinaCantCarrera
					, &TFPrensadoBobinaCantCarrera_To, &TFPrensadoOperadorId, &TFPrensadoOperadorId_To, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel, &TFPrensadoPrensaId
					, &TFPrensadoPrensaId_To, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoId, &TFPrensadoTurnoId_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoId, &TFPrensadoProductoId_To, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoProductoTipoMaterial_Sels
					, &TFPrensadoFecha, &TFPrensadoFecha_To)

		&count = 0
		For Each PrensadoBobina
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

Sub 'LoadPrensadoPrensaNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoPrensaNombre = &SearchTxt
	&TFPrensadoPrensaNombre_Sel.SetEmpty()
	For Each PrensadoBobina
		Order PrensadoPrensaNombre
		using PrensadoBobinaWWDS(&FilterFullText, &TFPrensadoBobinaId, &TFPrensadoBobinaId_To, &TFPrensadoId, &TFPrensadoId_To, &TFBobinaId
					, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel, &TFBobinaEstado_Sels, &TFBobinaNo, &TFBobinaNo_To
					, &TFBobinaOrigen_Sels, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaHoraSalida, &TFBobinaHoraSalida_To, &TFBobinaCarreras
					, &TFBobinaCarreras_To, &TFBobinaMinutosEnReposo, &TFBobinaMinutosEnReposo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFPrensadoBobinaCantCarrera
					, &TFPrensadoBobinaCantCarrera_To, &TFPrensadoOperadorId, &TFPrensadoOperadorId_To, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel, &TFPrensadoPrensaId
					, &TFPrensadoPrensaId_To, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoId, &TFPrensadoTurnoId_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoId, &TFPrensadoProductoId_To, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoProductoTipoMaterial_Sels
					, &TFPrensadoFecha, &TFPrensadoFecha_To)

		&count = 0
		For Each PrensadoBobina
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

Sub 'LoadPrensadoTurnoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoTurnoNombre = &SearchTxt
	&TFPrensadoTurnoNombre_Sel.SetEmpty()
	For Each DB.PrensadoBobina
		Order PrensadoTurnoNombre
		using DB.PrensadoBobinaWWDS(&FilterFullText, &TFPrensadoBobinaId, &TFPrensadoBobinaId_To, &TFPrensadoId, &TFPrensadoId_To, &TFBobinaId
					, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel, &TFBobinaEstado_Sels, &TFBobinaNo, &TFBobinaNo_To
					, &TFBobinaOrigen_Sels, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaHoraSalida, &TFBobinaHoraSalida_To, &TFBobinaCarreras
					, &TFBobinaCarreras_To, &TFBobinaMinutosEnReposo, &TFBobinaMinutosEnReposo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFPrensadoBobinaCantCarrera
					, &TFPrensadoBobinaCantCarrera_To, &TFPrensadoOperadorId, &TFPrensadoOperadorId_To, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel, &TFPrensadoPrensaId
					, &TFPrensadoPrensaId_To, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoId, &TFPrensadoTurnoId_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoId, &TFPrensadoProductoId_To, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoProductoTipoMaterial_Sels
					, &TFPrensadoFecha, &TFPrensadoFecha_To)

		&count = 0
		For Each DB.PrensadoBobina
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

Sub 'LoadPrensadoProductoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoProductoNombre = &SearchTxt
	&TFPrensadoProductoNombre_Sel.SetEmpty()
	For Each PrensadoBobina
		Order PrensadoProductoNombre
		using PrensadoBobinaWWDS(&FilterFullText, &TFPrensadoBobinaId, &TFPrensadoBobinaId_To, &TFPrensadoId, &TFPrensadoId_To, &TFBobinaId
					, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel, &TFBobinaEstado_Sels, &TFBobinaNo, &TFBobinaNo_To
					, &TFBobinaOrigen_Sels, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaHoraSalida, &TFBobinaHoraSalida_To, &TFBobinaCarreras
					, &TFBobinaCarreras_To, &TFBobinaMinutosEnReposo, &TFBobinaMinutosEnReposo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFPrensadoBobinaCantCarrera
					, &TFPrensadoBobinaCantCarrera_To, &TFPrensadoOperadorId, &TFPrensadoOperadorId_To, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel, &TFPrensadoPrensaId
					, &TFPrensadoPrensaId_To, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoId, &TFPrensadoTurnoId_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoId, &TFPrensadoProductoId_To, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoProductoTipoMaterial_Sels
					, &TFPrensadoFecha, &TFPrensadoFecha_To)

		&count = 0
		For Each PrensadoBobina
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
```

### Rules (Rules)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

parm(in:&DDOName, in:&SearchTxt, in:&SearchTxtTo, out:&OptionsJson, out:&OptionsDescJson, out:&OptionIndexesJson);

/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

