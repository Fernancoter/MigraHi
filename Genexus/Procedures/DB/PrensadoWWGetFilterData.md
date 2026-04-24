# Procedure: PrensadoWWGetFilterData

- **Module:** DB
- **Description:** Prensado WWGet Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| TFPrensadoId | Variable | NUMERIC |  | TFPrensado Id |
| TFPrensadoId_To | Variable | NUMERIC |  | TFPrensado Id_To |
| TFPrensadoFecha | Variable | DATETIME |  | TFPrensado Fecha |
| TFPrensadoFecha_To | Variable | DATETIME |  | TFPrensado Fecha_To |
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
| TFPrensadoOperadorId | Variable | NUMERIC |  | TFPrensado Operador Id |
| TFPrensadoOperadorId_To | Variable | NUMERIC |  | TFPrensado Operador Id_To |
| TFPrensadoOperadorNombre | Variable | VARCHAR |  | TFPrensado Operador Nombre |
| TFPrensadoOperadorNombre_Sel | Variable | VARCHAR |  | TFPrensado Operador Nombre_Sel |
| TFPrensadoEstado_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Estado_Sels Json |
| TFPrensadoEstado_Sels | Variable | VARCHAR |  | TFPrensado Estado_Sels |
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
| TFPrensadoLevasUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Levas Unidad Medida_Sels Json |
| TFPrensadoLevasUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sels |
| TFPrensadoRodillosUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels Json |
| TFPrensadoRodillosUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels |
| TFPrensadoLevasKgEntrada | Variable | NUMERIC |  | TFPrensado Levas Kg Entrada |
| TFPrensadoLevasKgEntrada_To | Variable | NUMERIC |  | TFPrensado Levas Kg Entrada_To |
| TFPrensadoLevasKgSalida | Variable | NUMERIC |  | TFPrensado Levas Kg Salida |
| TFPrensadoLevasKgSalida_To | Variable | NUMERIC |  | TFPrensado Levas Kg Salida_To |
| TFPrensadoLevasGradosEntrada | Variable | NUMERIC |  | TFPrensado Levas Grados Entrada |
| TFPrensadoLevasGradosEntrada_Sel | Variable | NUMERIC |  | TFPrensado Levas Grados Entrada_Sel |
| TFPrensadoLevasGradosSalida | Variable | NUMERIC |  | TFPrensado Levas Grados Salida |
| TFPrensadoLevasGradosSalida_Sel | Variable | NUMERIC |  | TFPrensado Levas Grados Salida_Sel |
| TFPrensadoRodillosKgEntrada | Variable | NUMERIC |  | TFPrensado Rodillos Kg Entrada |
| TFPrensadoRodillosKgEntrada_To | Variable | NUMERIC |  | TFPrensado Rodillos Kg Entrada_To |
| TFPrensadoRodillosKgSalida | Variable | NUMERIC |  | TFPrensado Rodillos Kg Salida |
| TFPrensadoRodillosKgSalida_To | Variable | NUMERIC |  | TFPrensado Rodillos Kg Salida_To |
| TFPrensadoRodillosGradosEntrada | Variable | NUMERIC |  | TFPrensado Rodillos Grados Entrada |
| TFPrensadoRodillosGradosEntrada_Sel | Variable | NUMERIC |  | TFPrensado Rodillos Grados Entrada_Sel |
| TFPrensadoRodillosGradosSalida | Variable | NUMERIC |  | TFPrensado Rodillos Grados Salida |
| TFPrensadoRodillosGradosSalida_Sel | Variable | NUMERIC |  | TFPrensado Rodillos Grados Salida_Sel |
| TFPrensadoTroquelId | Variable | NUMERIC |  | TFPrensado Troquel Id |
| TFPrensadoTroquelId_To | Variable | NUMERIC |  | TFPrensado Troquel Id_To |
| TFPrensadoTroquelNombre | Variable | VARCHAR |  | TFPrensado Troquel Nombre |
| TFPrensadoTroquelNombre_Sel | Variable | VARCHAR |  | TFPrensado Troquel Nombre_Sel |
| TFPrensadoHoraIniciaProceso | Variable | DATETIME |  | TFPrensado Hora Inicia Proceso |
| TFPrensadoHoraIniciaProceso_To | Variable | DATETIME |  | TFPrensado Hora Inicia Proceso_To |
| TFPrensadoHoraFinProceso | Variable | DATETIME |  | TFPrensado Hora Fin Proceso |
| TFPrensadoHoraFinProceso_To | Variable | DATETIME |  | TFPrensado Hora Fin Proceso_To |
| TFPrensadoLevasGradosEntrada_To | Variable | NUMERIC |  | TFPrensado Levas Grados Entrada_To |
| TFPrensadoLevasGradosSalida_To | Variable | NUMERIC |  | TFPrensado Levas Grados Salida_To |
| TFPrensadoRodillosGradosEntrada_To | Variable | NUMERIC |  | TFPrensado Rodillos Grados Entrada_To |
| TFPrensadoRodillosGradosSalida_To | Variable | NUMERIC |  | TFPrensado Rodillos Grados Salida_To |
| TFPrensadoTotalPalets | Variable | NUMERIC |  | TFPrensado Total Palets |
| TFPrensadoTotalPalets_To | Variable | NUMERIC |  | TFPrensado Total Palets_To |
| TFPrensadoTiempoInterrupcion | Variable | NUMERIC |  | TFPrensado Tiempo Interrupcion |
| TFPrensadoTiempoInterrupcion_To | Variable | NUMERIC |  | TFPrensado Tiempo Interrupcion_To |
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
	Case &DDOName.ToUpper() = !'DDO_PRENSADOPRENSANOMBRE'
		Do 'LoadPrensadoPrensaNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADOTURNONOMBRE'
		Do 'LoadPrensadoTurnoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_PRENSADOPRODUCTONOMBRE'
		Do 'LoadPrensadoProductoNombreOptions'
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
	If &Session.Get(!"DB.PrensadoWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.PrensadoWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.PrensadoWWGridState"))
	Endif	

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTOTALPALETS"
				&TFPrensadoTotalPalets.FromString(&GridStateFilterValue.Value)
				&TFPrensadoTotalPalets_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOFECHA"
				&TFPrensadoFecha.FromString(&GridStateFilterValue.Value)
				&TFPrensadoFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE"
				&TFPrensadoPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE_SEL"
				&TFPrensadoPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE"
				&TFPrensadoTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE_SEL"
				&TFPrensadoTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE"
				&TFPrensadoProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE_SEL"
				&TFPrensadoProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE"
				&TFPrensadoOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE_SEL"
				&TFPrensadoOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOESTADO_SEL"
				&TFPrensadoEstado_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoEstado_Sels.FromJson(&TFPrensadoEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASUNIDADMEDIDA_SEL"
				&TFPrensadoLevasUnidadMedida_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoLevasUnidadMedida_Sels.FromJson(&TFPrensadoLevasUnidadMedida_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSUNIDADMEDIDA_SEL"
				&TFPrensadoRodillosUnidadMedida_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoRodillosUnidadMedida_Sels.FromJson(&TFPrensadoRodillosUnidadMedida_SelsJson)
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
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSKGENTRADA"
				&TFPrensadoRodillosKgEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosKgEntrada_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSKGSALIDA"
				&TFPrensadoRodillosKgSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosKgSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSGRADOSENTRADA"
				&TFPrensadoRodillosGradosEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosGradosEntrada_To.FromString(&GridStateFilterValue.ValueTo)
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadPrensadoPrensaNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoPrensaNombre = &SearchTxt
	&TFPrensadoPrensaNombre_Sel.SetEmpty()
	For Each Prensado
		Order PrensadoPrensaId
		using PrensadoWWDS(&FilterFullText, &TFPrensadoTotalPalets, &TFPrensadoTotalPalets_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoPrensaNombre
					, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoNombre, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPrensadoEstado_Sels, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada, &TFPrensadoRodillosGradosEntrada_To)

		&count = 0
		For Each Prensado
			Order PrensadoPrensaId
			&count += 1
		EndFor
		If not PrensadoPrensaNombre.IsEmpty()
			&Option = PrensadoPrensaNombre
			
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

Sub 'LoadPrensadoTurnoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoTurnoNombre = &SearchTxt
	&TFPrensadoTurnoNombre_Sel.SetEmpty()
	For Each Prensado
		Order PrensadoTurnoId
		using PrensadoWWDS(&FilterFullText, &TFPrensadoTotalPalets, &TFPrensadoTotalPalets_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoPrensaNombre
					, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoNombre, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPrensadoEstado_Sels, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada, &TFPrensadoRodillosGradosEntrada_To)

		&count = 0
		For Each Prensado
			Order PrensadoTurnoId
			&count += 1
		EndFor
		If not PrensadoTurnoNombre.IsEmpty()
			&Option = PrensadoTurnoNombre
			
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

Sub 'LoadPrensadoProductoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPrensadoProductoNombre = &SearchTxt
	&TFPrensadoProductoNombre_Sel.SetEmpty()
	For Each Prensado
		Order PrensadoProductoId
		using PrensadoWWDS(&FilterFullText, &TFPrensadoTotalPalets, &TFPrensadoTotalPalets_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoPrensaNombre
					, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoNombre, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPrensadoEstado_Sels, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada, &TFPrensadoRodillosGradosEntrada_To)

		&count = 0
		For Each DB.Prensado
			Order PrensadoProductoId
			&count += 1
		EndFor
		If not PrensadoProductoNombre.IsEmpty()
			&Option = PrensadoProductoNombre
			
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
	For Each Prensado
		Order PrensadoOperadorId
		using PrensadoWWDS(&FilterFullText, &TFPrensadoTotalPalets, &TFPrensadoTotalPalets_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoPrensaNombre
					, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoNombre, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPrensadoEstado_Sels, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada, &TFPrensadoRodillosGradosEntrada_To)

		&count = 0
		For Each Prensado
			Order PrensadoOperadorId
			&count += 1
		EndFor
		If not PrensadoOperadorNombre.IsEmpty()
			&Option = PrensadoOperadorNombre
			
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

