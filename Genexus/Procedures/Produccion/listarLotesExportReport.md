# Procedure: listarLotesExportReport

- **Module:** Produccion
- **Description:** listar Lotes Export Report
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
| LoteTipoMaterialDescription | Variable | VARCHAR |  | Lote Tipo Material Description |
| LoteSiloEnumTipoMaterialDescription | Variable | VARCHAR |  | Lote Silo Enum Tipo Material Description |
| LotePaqueteAditivosDescription | Variable | VARCHAR |  | Lote Paquete Aditivos Description |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFLoteEmbarque | Variable | VARCHAR |  | TFLote Embarque |
| TFLoteEmbarque_Sel | Variable | VARCHAR |  | TFLote Embarque_Sel |
| TFLotePO | Variable | VARCHAR |  | TFLote PO |
| TFLotePO_Sel | Variable | VARCHAR |  | TFLote PO_Sel |
| TFLoteFechaRegistro | Variable | DATE |  | TFLote Fecha Registro |
| TFLoteFechaRegistro_To | Variable | DATE |  | TFLote Fecha Registro_To |
| TFLoteTrunkNo | Variable | VARCHAR |  | TFLote Trunk No |
| TFLoteTrunkNo_Sel | Variable | VARCHAR |  | TFLote Trunk No_Sel |
| TFLoteTipoMaterial_SelsJson | Variable | LONGVARCHAR |  | TFLote Tipo Material_Sels Json |
| TFLoteTipoMaterial_SelDscs | Variable | VARCHAR |  | TFLote Tipo Material_Sel Dscs |
| TFLoteTipoMaterial_Sel | Variable | VARCHAR |  | TFLote Tipo Material_Sel |
| TFLoteTipoMaterial_Sels | Variable | VARCHAR |  | TFLote Tipo Material_Sels |
| TFLoteSiloNombre | Variable | VARCHAR |  | TFLote Silo Nombre |
| TFLoteSiloNombre_Sel | Variable | VARCHAR |  | TFLote Silo Nombre_Sel |
| TFLoteSiloKgMaximo | Variable | NUMERIC |  | TFLote Silo Kg Maximo |
| TFLoteSiloKgMaximo_To | Variable | NUMERIC |  | TFLote Silo Kg Maximo_To |
| TFLoteSiloEnumTipoMaterial_SelsJson | Variable | LONGVARCHAR |  | TFLote Silo Enum Tipo Material_Sels Json |
| TFLoteSiloEnumTipoMaterial_SelDscs | Variable | VARCHAR |  | TFLote Silo Enum Tipo Material_Sel Dscs |
| TFLoteSiloEnumTipoMaterial_Sel | Variable | NUMERIC |  | TFLote Silo Enum Tipo Material_Sel |
| TFLoteSiloEnumTipoMaterial_Sels | Variable | NUMERIC |  | TFLote Silo Enum Tipo Material_Sels |
| TFLoteKg | Variable | NUMERIC |  | TFLote Kg |
| TFLoteKg_To | Variable | NUMERIC |  | TFLote Kg_To |
| TFLoteConsumido_Sel | Variable | NUMERIC |  | TFLote Consumido_Sel |
| TFLotePaqueteAditivos_SelsJson | Variable | LONGVARCHAR |  | TFLote Paquete Aditivos_Sels Json |
| TFLotePaqueteAditivos_SelDscs | Variable | VARCHAR |  | TFLote Paquete Aditivos_Sel Dscs |
| TFLotePaqueteAditivos_Sel | Variable | VARCHAR |  | TFLote Paquete Aditivos_Sel |
| TFLotePaqueteAditivos_Sels | Variable | VARCHAR |  | TFLote Paquete Aditivos_Sels |
| TFLoteFechaRegistro_To_Description | Variable | VARCHAR |  | TFLote Fecha Registro_To_Description |
| FilterTFLoteTipoMaterial_SelValueDescription | Variable | VARCHAR |  | Filter TFLote Tipo Material_Sel Value Description |
| TFLoteSiloKgMaximo_To_Description | Variable | VARCHAR |  | TFLote Silo Kg Maximo_To_Description |
| FilterTFLoteSiloEnumTipoMaterial_SelValueDescription | Variable | VARCHAR |  | Filter TFLote Silo Enum Tipo Material_Sel Value Description |
| TFLoteKg_To_Description | Variable | VARCHAR |  | TFLote Kg_To_Description |
| FilterTFLoteConsumido_SelValueDescription | Variable | VARCHAR |  | Filter TFLote Consumido_Sel Value Description |
| FilterTFLotePaqueteAditivos_SelValueDescription | Variable | VARCHAR |  | Filter TFLote Paquete Aditivos_Sel Value Description |
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
&IsAuthorized = WWPBaseObjects.SecGAMIsAuthByFunctionalityKey.Udp(!'listarlotes_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Lote List"

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
	If not &TFLoteEmbarque_Sel.IsEmpty()
		print printBlockTFLoteEmbarque_Sel
	Else
		If not &TFLoteEmbarque.IsEmpty()
			print printBlockTFLoteEmbarque
		EndIf
	EndIf
	If not &TFLotePO_Sel.IsEmpty()
		print printBlockTFLotePO_Sel
	Else
		If not &TFLotePO.IsEmpty()
			print printBlockTFLotePO
		EndIf
	EndIf
	If not (&TFLoteFechaRegistro.IsEmpty() AND &TFLoteFechaRegistro_To.IsEmpty())
		print printBlockTFLoteFechaRegistro
		&TFLoteFechaRegistro_To_Description = format('%1 (%2)', "Fecha Registro", "WWP_TSTo")
		print printBlockTFLoteFechaRegistro_To
	EndIf
	If not &TFLoteTrunkNo_Sel.IsEmpty()
		print printBlockTFLoteTrunkNo_Sel
	Else
		If not &TFLoteTrunkNo.IsEmpty()
			print printBlockTFLoteTrunkNo
		EndIf
	EndIf
	&TFLoteTipoMaterial_Sels.FromJson(&TFLoteTipoMaterial_SelsJson)
	If not &TFLoteTipoMaterial_Sels.Count = 0
		&i = 1
		For &TFLoteTipoMaterial_Sel in &TFLoteTipoMaterial_Sels
			If &i = 1
				&TFLoteTipoMaterial_SelDscs = ''
			Else
				&TFLoteTipoMaterial_SelDscs += ', '
			EndIf
			&FilterTFLoteTipoMaterial_SelValueDescription = &TFLoteTipoMaterial_Sel.EnumerationDescription()

			&TFLoteTipoMaterial_SelDscs += &FilterTFLoteTipoMaterial_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFLoteTipoMaterial_Sel
	EndIf
	If not &TFLoteSiloNombre_Sel.IsEmpty()
		print printBlockTFLoteSiloNombre_Sel
	Else
		If not &TFLoteSiloNombre.IsEmpty()
			print printBlockTFLoteSiloNombre
		EndIf
	EndIf
	If not (&TFLoteSiloKgMaximo.IsEmpty() AND &TFLoteSiloKgMaximo_To.IsEmpty())
		print printBlockTFLoteSiloKgMaximo
		&TFLoteSiloKgMaximo_To_Description = format('%1 (%2)', "Kg Maximo", "WWP_TSTo")
		print printBlockTFLoteSiloKgMaximo_To
	EndIf
	&TFLoteSiloEnumTipoMaterial_Sels.FromJson(&TFLoteSiloEnumTipoMaterial_SelsJson)
	If not &TFLoteSiloEnumTipoMaterial_Sels.Count = 0
		&i = 1
		For &TFLoteSiloEnumTipoMaterial_Sel in &TFLoteSiloEnumTipoMaterial_Sels
			If &i = 1
				&TFLoteSiloEnumTipoMaterial_SelDscs = ''
			Else
				&TFLoteSiloEnumTipoMaterial_SelDscs += ', '
			EndIf
			&FilterTFLoteSiloEnumTipoMaterial_SelValueDescription = &TFLoteSiloEnumTipoMaterial_Sel.EnumerationDescription()

			&TFLoteSiloEnumTipoMaterial_SelDscs += &FilterTFLoteSiloEnumTipoMaterial_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFLoteSiloEnumTipoMaterial_Sel
	EndIf
	If not (&TFLoteKg.IsEmpty() AND &TFLoteKg_To.IsEmpty())
		print printBlockTFLoteKg
		&TFLoteKg_To_Description = format('%1 (%2)', "Kg", "WWP_TSTo")
		print printBlockTFLoteKg_To
	EndIf
	If not &TFLoteConsumido_Sel.IsEmpty()
		Do Case
			Case &TFLoteConsumido_Sel = 1
				&FilterTFLoteConsumido_SelValueDescription = "WWP_TSChecked" 
			Case &TFLoteConsumido_Sel = 2
				&FilterTFLoteConsumido_SelValueDescription = "WWP_TSUnChecked" 
		EndCase

		print printBlockTFLoteConsumido_Sel
	EndIf
	&TFLotePaqueteAditivos_Sels.FromJson(&TFLotePaqueteAditivos_SelsJson)
	If not &TFLotePaqueteAditivos_Sels.Count = 0
		&i = 1
		For &TFLotePaqueteAditivos_Sel in &TFLotePaqueteAditivos_Sels
			If &i = 1
				&TFLotePaqueteAditivos_SelDscs = ''
			Else
				&TFLotePaqueteAditivos_SelDscs += ', '
			EndIf
			&FilterTFLotePaqueteAditivos_SelValueDescription = &TFLotePaqueteAditivos_Sel.EnumerationDescription()

			&TFLotePaqueteAditivos_SelDscs += &FilterTFLotePaqueteAditivos_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFLotePaqueteAditivos_Sel
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

	For each DB.Lote
		order LoteFechaRegistro  when &OrderedBy = 1 AND &OrderedDsc = False
		order (LoteFechaRegistro)  when &OrderedBy = 1 AND &OrderedDsc = True
		order LoteEmbarque  when &OrderedBy = 2 AND &OrderedDsc = False
		order (LoteEmbarque)  when &OrderedBy = 2 AND &OrderedDsc = True
		order LotePO  when &OrderedBy = 3 AND &OrderedDsc = False
		order (LotePO)  when &OrderedBy = 3 AND &OrderedDsc = True
		order LoteTrunkNo  when &OrderedBy = 4 AND &OrderedDsc = False
		order (LoteTrunkNo)  when &OrderedBy = 4 AND &OrderedDsc = True
		order LoteTipoMaterial  when &OrderedBy = 5 AND &OrderedDsc = False
		order (LoteTipoMaterial)  when &OrderedBy = 5 AND &OrderedDsc = True
		order LoteSiloNombre  when &OrderedBy = 6 AND &OrderedDsc = False
		order (LoteSiloNombre)  when &OrderedBy = 6 AND &OrderedDsc = True
		order LoteSiloKgMaximo  when &OrderedBy = 7 AND &OrderedDsc = False
		order (LoteSiloKgMaximo)  when &OrderedBy = 7 AND &OrderedDsc = True
		order LoteSiloEnumTipoMaterial  when &OrderedBy = 8 AND &OrderedDsc = False
		order (LoteSiloEnumTipoMaterial)  when &OrderedBy = 8 AND &OrderedDsc = True
		order LoteKg  when &OrderedBy = 9 AND &OrderedDsc = False
		order (LoteKg)  when &OrderedBy = 9 AND &OrderedDsc = True
		order LoteConsumido  when &OrderedBy = 10 AND &OrderedDsc = False
		order (LoteConsumido)  when &OrderedBy = 10 AND &OrderedDsc = True
		order LotePaqueteAditivos  when &OrderedBy = 11 AND &OrderedDsc = False
		order (LotePaqueteAditivos)  when &OrderedBy = 11 AND &OrderedDsc = True
		
		using listarLotesDS(&FilterFullText, &TFLoteEmbarque, &TFLoteEmbarque_Sel, &TFLotePO, &TFLotePO_Sel, &TFLoteFechaRegistro
					, &TFLoteFechaRegistro_To, &TFLoteTrunkNo, &TFLoteTrunkNo_Sel, &TFLoteTipoMaterial_Sels, &TFLoteSiloNombre, &TFLoteSiloNombre_Sel
					, &TFLoteSiloKgMaximo, &TFLoteSiloKgMaximo_To, &TFLoteSiloEnumTipoMaterial_Sels, &TFLoteKg, &TFLoteKg_To, &TFLoteConsumido_Sel
					, &TFLotePaqueteAditivos_Sels)
		&LoteTipoMaterialDescription = LoteTipoMaterial.EnumerationDescription()
		&LoteSiloEnumTipoMaterialDescription = LoteSiloEnumTipoMaterial.EnumerationDescription()
		&LotePaqueteAditivosDescription = LotePaqueteAditivos.EnumerationDescription()

		Do 'BeforePrintLine'
		print printBlockLines_data
		Do 'AfterPrintLine'
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Produccion.listarLotesGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Produccion.listarLotesGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Produccion.listarLotesGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFLOTEEMBARQUE"
				&TFLoteEmbarque.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFLOTEEMBARQUE_SEL"
				&TFLoteEmbarque_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFLOTEPO"
				&TFLotePO.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFLOTEPO_SEL"
				&TFLotePO_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFLOTEFECHAREGISTRO"
				&TFLoteFechaRegistro.FromString(&GridStateFilterValue.Value)
				&TFLoteFechaRegistro_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFLOTETRUNKNO"
				&TFLoteTrunkNo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFLOTETRUNKNO_SEL"
				&TFLoteTrunkNo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFLOTETIPOMATERIAL_SEL"
				&TFLoteTipoMaterial_SelsJson = &GridStateFilterValue.Value
				&TFLoteTipoMaterial_Sels.FromJson(&TFLoteTipoMaterial_SelsJson)
			Case &GridStateFilterValue.Name = !"TFLOTESILONOMBRE"
				&TFLoteSiloNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFLOTESILONOMBRE_SEL"
				&TFLoteSiloNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFLOTESILOKGMAXIMO"
				&TFLoteSiloKgMaximo.FromString(&GridStateFilterValue.Value)
				&TFLoteSiloKgMaximo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFLOTESILOENUMTIPOMATERIAL_SEL"
				&TFLoteSiloEnumTipoMaterial_SelsJson = &GridStateFilterValue.Value
				&TFLoteSiloEnumTipoMaterial_Sels.FromJson(&TFLoteSiloEnumTipoMaterial_SelsJson)
			Case &GridStateFilterValue.Name = !"TFLOTEKG"
				&TFLoteKg.FromString(&GridStateFilterValue.Value)
				&TFLoteKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFLOTECONSUMIDO_SEL"
				&TFLoteConsumido_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFLOTEPAQUETEADITIVOS_SEL"
				&TFLotePaqueteAditivos_SelsJson = &GridStateFilterValue.Value
				&TFLotePaqueteAditivos_Sels.FromJson(&TFLotePaqueteAditivos_SelsJson)
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

Output_file("listarLotesExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

