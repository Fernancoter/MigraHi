# DataProvider: SDPLaunchpadDP

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPLaunchpad DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Image | Variable | BITMAP |  | Image |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
//ComponentToCall: 
//	https://wiki.genexus.com/commwiki/servlet/wiki?17411,Dynamic+Calls+in+Smart+Devices,
SDPLaunchpadOptions
{
//	Option
//	{
//		Name = !"SDPerfilOperador"
//		//Description = !"20 Diciembre, 2021"
//		//Information = !"The world's leading brands rely our multi-packaging solutions."
//		Link = !"SDPerfilOperador"
//		//&Image.FromImage(hicone_banner)		
//		//Icon = &Image
//		TileSize = SDPTileSize.TwoBlocks
//		TileType = SDPTileType.WebComponent
//	}

//	Option
//	{
//		Name = !"temperature"
//		Description = !"20 Diciembre, 2021"
//		Information = !"The world's leading brands rely our multi-packaging solutions."
//		//Link = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?1"
//		&Image.FromImage(hicone_banner)		
//		Icon = &Image
//		TileSize = SDPTileSize.TwoBlocks
//		TileType = SDPTileType.Image
//	}

	Option
	{
		Name = !"products"
		Description = !""
		Information = !"Extrusiones"
		Link = !"HICONE_SDListaExtrusiones"
		//&Image.FromImage(SDPResSampleOption1)		
		&Image.FromImage(extrusion_inter)
		Icon = &Image
		TileSize = SDPTileSize.OneBlock
		TileType = SDPTileType.Information
	}
	Option
	{
		Name = !"people"
		Description = !""
		Information = !"Prensados"
		Link = !"HICONE_SDListaPrensados"
//		&Image.FromImage(SDPResSampleOption2)	
                &Image.FromImage(layers_blue)
		Icon = &Image
		TileSize = SDPTileSize.OneBlock
		TileType = SDPTileType.Information
	}

        Option
	{
		Name = !"appointments"
		Description = !""
		Information = !"Reportes"
		Link = !"HICONE_SDReportes"
		&Image.FromImage(clipboard)
		Icon = &Image
		TileSize = SDPTileSize.OneBlock
		TileType = SDPTileType.Information
	}
	Option
	{
		Name = !"appointments"
		Description = !""
		Information = !"Manual de Ayuda"
		Link = !"sd:BrowserSD.BrowserURL?https://nedi.mx/knowledge/article/941"
		//&Image.FromImage(SDPResSampleOption3)
		&Image.FromImage(book)
		Icon = &Image
		TileSize = SDPTileSize.OneBlock
		TileType = SDPTileType.Information
	}
        
	Option
	{
		Name = !"appointments"
		Description = !""
		Information = !"Wizard"
		Link = !"HICONE_SDInitWizard"
		&Image.FromImage(wizard)
		Icon = &Image
		TileSize = SDPTileSize.OneBlock
		TileType = SDPTileType.Information
	}

	Option
	{
		Name = !"appointments"
		Description = !""
		Information = !"Etiquetado Pallets"
		Link = !"HICONE_SDEtiquetadoPallet"
		&Image.FromImage(tag)
		Icon = &Image
		TileSize = SDPTileSize.OneBlock
		TileType = SDPTileType.Information
	}
}
```

