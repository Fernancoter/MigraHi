# Procedure: EmbarqueOperacionWCGetFilterData

- **Module:** Embarques
- **Description:** Embarque Operacion WCGet Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| TFEmbarqueId | Variable | NUMERIC |  | TFEmbarque Id |
| TFEmbarqueId_To | Variable | NUMERIC |  | TFEmbarque Id_To |
| TFEmbarqueCodigo | Variable | VARCHAR |  | TFEmbarque Codigo |
| TFEmbarqueCodigo_Sel | Variable | VARCHAR |  | TFEmbarque Codigo_Sel |
| TFEmbarqueOrderDoc | Variable | VARCHAR |  | TFEmbarque Order Doc |
| TFEmbarqueOrderDoc_Sel | Variable | VARCHAR |  | TFEmbarque Order Doc_Sel |
| TFEmbarqueCliente | Variable | VARCHAR |  | TFEmbarque Cliente |
| TFEmbarqueCliente_Sel | Variable | VARCHAR |  | TFEmbarque Cliente_Sel |
| TFEmbarqueRemissionDoc | Variable | VARCHAR |  | TFEmbarque Remission Doc |
| TFEmbarqueRemissionDoc_Sel | Variable | VARCHAR |  | TFEmbarque Remission Doc_Sel |
| TFEmbarqueFolioCarga | Variable | VARCHAR |  | TFEmbarque Folio Carga |
| TFEmbarqueFolioCarga_Sel | Variable | VARCHAR |  | TFEmbarque Folio Carga_Sel |
| TFEmbarqueFecha | Variable | DATE |  | TFEmbarque Fecha |
| TFEmbarqueFecha_To | Variable | DATE |  | TFEmbarque Fecha_To |
| TFEmbarqueHoraEstimadaInicio | Variable | DATETIME |  | TFEmbarque Hora Estimada Inicio |
| TFEmbarqueHoraEstimadaInicio_To | Variable | DATETIME |  | TFEmbarque Hora Estimada Inicio_To |
| TFEmbarqueHoraInicio | Variable | DATETIME |  | TFEmbarque Hora Inicio |
| TFEmbarqueHoraInicio_To | Variable | DATETIME |  | TFEmbarque Hora Inicio_To |
| TFEmbarqueHoraFin | Variable | DATETIME |  | TFEmbarque Hora Fin |
| TFEmbarqueHoraFin_To | Variable | DATETIME |  | TFEmbarque Hora Fin_To |
| TFEmbarqueTransporte | Variable | VARCHAR |  | TFEmbarque Transporte |
| TFEmbarqueTransporte_Sel | Variable | VARCHAR |  | TFEmbarque Transporte_Sel |
| TFEmbarquePlacas | Variable | VARCHAR |  | TFEmbarque Placas |
| TFEmbarquePlacas_Sel | Variable | VARCHAR |  | TFEmbarque Placas_Sel |
| TFEmbarqueConductor | Variable | VARCHAR |  | TFEmbarque Conductor |
| TFEmbarqueConductor_Sel | Variable | VARCHAR |  | TFEmbarque Conductor_Sel |
| TFEmbarqueNoProductos | Variable | NUMERIC |  | TFEmbarque No Productos |
| TFEmbarqueNoProductos_To | Variable | NUMERIC |  | TFEmbarque No Productos_To |
| TFEmbarqueEstatus_SelsJson | Variable | LONGVARCHAR |  | TFEmbarque Estatus_Sels Json |
| TFEmbarqueEstatus_Sels | Variable | VARCHAR |  | TFEmbarque Estatus_Sels |
| TFEmbarqueDestino | Variable | VARCHAR |  | TFEmbarque Destino |
| TFEmbarqueDestino_Sel | Variable | VARCHAR |  | TFEmbarque Destino_Sel |
| TFEmbarqueRecibe | Variable | VARCHAR |  | TFEmbarque Recibe |
| TFEmbarqueRecibe_Sel | Variable | VARCHAR |  | TFEmbarque Recibe_Sel |
| TFEmbarqueElaboro | Variable | VARCHAR |  | TFEmbarque Elaboro |
| TFEmbarqueElaboro_Sel | Variable | VARCHAR |  | TFEmbarque Elaboro_Sel |
| TFEmbarqueObservaciones | Variable | VARCHAR |  | TFEmbarque Observaciones |
| TFEmbarqueObservaciones_Sel | Variable | VARCHAR |  | TFEmbarque Observaciones_Sel |
| TFEmbarqueCargaObservaciones | Variable | VARCHAR |  | TFEmbarque Carga Observaciones |
| TFEmbarqueCargaObservaciones_Sel | Variable | VARCHAR |  | TFEmbarque Carga Observaciones_Sel |
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
| TFEmbarqueClienteGrupo | Variable | VARCHAR |  | TFEmbarque Cliente Grupo |
| TFEmbarqueClienteGrupo_Sel | Variable | VARCHAR |  | TFEmbarque Cliente Grupo_Sel |
| TFEmbarqueClienteEnvia | Variable | VARCHAR |  | TFEmbarque Cliente Envia |
| TFEmbarqueClienteEnvia_Sel | Variable | VARCHAR |  | TFEmbarque Cliente Envia_Sel |
| FiltroDate | Variable | DATE |  | Filtro Date |
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
	Case &DDOName.ToUpper() = !'DDO_EMBARQUECODIGO'
		Do 'LoadEmbarqueCodigoOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUECLIENTEGRUPO'
		Do 'LoadEmbarqueClienteGrupoOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUECLIENTEENVIA'
		Do 'LoadEmbarqueClienteEnviaOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUEFOLIOCARGA'
		Do 'LoadEmbarqueFolioCargaOptions'
EndCase

&OptionsJson = &Options.ToJson()
&OptionsDescJson = &OptionsDesc.ToJson()
&OptionIndexesJson = &OptionIndexes.ToJson()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Embarques.EmbarqueOperacionWCGridState") = !""
		&GridState.FromXml(WWPBaseObjects.LoadGridState.Udp(!"Embarques.EmbarqueOperacionWCGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Embarques.EmbarqueOperacionWCGridState"))
	Endif	

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"TFEMBARQUECODIGO"
				&TFEmbarqueCodigo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECODIGO_SEL"
				&TFEmbarqueCodigo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECLIENTEGRUPO"
				&TFEmbarqueClienteGrupo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECLIENTEGRUPO_SEL"
				&TFEmbarqueClienteGrupo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECLIENTEENVIA"
				&TFEmbarqueClienteEnvia.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECLIENTEENVIA_SEL"
				&TFEmbarqueClienteEnvia_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEFOLIOCARGA"
				&TFEmbarqueFolioCarga.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEFOLIOCARGA_SEL"
				&TFEmbarqueFolioCarga_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEFECHA"
				&TFEmbarqueFecha.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUENOPRODUCTOS"
				&TFEmbarqueNoProductos.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueNoProductos_To.FromString(&GridStateFilterValue.ValueTo)
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueCodigoOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueCodigo = &SearchTxt
	&TFEmbarqueCodigo_Sel.SetEmpty()
	For Each DB.Embarque
		Order EmbarqueCodigo
		using EmbarqueOperacionWCDS(&TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueClienteGrupo, &TFEmbarqueClienteGrupo_Sel, &TFEmbarqueClienteEnvia, &TFEmbarqueClienteEnvia_Sel
					, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueNoProductos, &TFEmbarqueNoProductos_To)
		Where EmbarqueEstatus in (EstatusEmbarque.Cancelado, EstatusEmbarque.EnProceso)
		Where EmbarqueFecha > &FiltroDate when not &FiltroDate.IsEmpty()

		&count = 0
		For Each DB.Embarque
			Order EmbarqueCodigo
			&count += 1
		EndFor
		If not EmbarqueCodigo.IsEmpty()
			&Option = EmbarqueCodigo
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueClienteGrupoOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueClienteGrupo = &SearchTxt
	&TFEmbarqueClienteGrupo_Sel.SetEmpty()
	For Each DB.Embarque
		Order EmbarqueClienteGrupo
		using EmbarqueOperacionWCDS(&TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueClienteGrupo, &TFEmbarqueClienteGrupo_Sel, &TFEmbarqueClienteEnvia, &TFEmbarqueClienteEnvia_Sel
					, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueNoProductos, &TFEmbarqueNoProductos_To)
		Where EmbarqueEstatus in (EstatusEmbarque.Cancelado, EstatusEmbarque.EnProceso)
		Where EmbarqueFecha > &FiltroDate when not &FiltroDate.IsEmpty()

		&count = 0
		For Each DB.Embarque
			Order EmbarqueClienteGrupo
			&count += 1
		EndFor
		If not EmbarqueClienteGrupo.IsEmpty()
			&Option = EmbarqueClienteGrupo
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueClienteEnviaOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueClienteEnvia = &SearchTxt
	&TFEmbarqueClienteEnvia_Sel.SetEmpty()
	For Each DB.Embarque
		Order EmbarqueClienteEnvia
		using EmbarqueOperacionWCDS(&TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueClienteGrupo, &TFEmbarqueClienteGrupo_Sel, &TFEmbarqueClienteEnvia, &TFEmbarqueClienteEnvia_Sel
					, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueNoProductos, &TFEmbarqueNoProductos_To)
		Where WWPBaseObjects.EmbarqueEstatus in (EstatusEmbarque.Cancelado, EstatusEmbarque.EnProceso)
		Where WWPBaseObjects.EmbarqueFecha > &FiltroDate when not &FiltroDate.IsEmpty()

		&count = 0
		For Each DB.Embarque
			Order EmbarqueClienteEnvia
			&count += 1
		EndFor
		If not EmbarqueClienteEnvia.IsEmpty()
			&Option = EmbarqueClienteEnvia
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueFolioCargaOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueFolioCarga = &SearchTxt
	&TFEmbarqueFolioCarga_Sel.SetEmpty()
	For Each DB.Embarque
		Order EmbarqueFolioCarga
		using EmbarqueOperacionWCDS(&TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueClienteGrupo, &TFEmbarqueClienteGrupo_Sel, &TFEmbarqueClienteEnvia, &TFEmbarqueClienteEnvia_Sel
					, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueNoProductos, &TFEmbarqueNoProductos_To)
		Where EmbarqueEstatus in (EstatusEmbarque.Cancelado, EstatusEmbarque.EnProceso)
		Where EmbarqueFecha > &FiltroDate when not &FiltroDate.IsEmpty()

		&count = 0
		For Each DB.Embarque
			Order EmbarqueFolioCarga
			&count += 1
		EndFor
		If not EmbarqueFolioCarga.IsEmpty()
			&Option = EmbarqueFolioCarga
			
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

