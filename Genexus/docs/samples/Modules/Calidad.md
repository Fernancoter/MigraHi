# Módulo: Calidad

## Propósito

Módulo con 30 objetos parseados. Entidades centrales por referencias entrantes: `Reclamo`, `CarreteDefecto`, `ReclamoDetalle`. Entry points desde el menú: `ConsultarCarrete`, `CarreteDefectoWW`, `reclamosww`.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 1 |
| Procedures | 14 |
| Transactions | 3 |
| WebPanels | 12 |
| **Total** | **30** |

## Entidades clave

- [Reclamo](../_domain_glossary.md#reclamo) -- 8 referencias entrantes
- [CarreteDefecto](../_domain_glossary.md#carretedefecto) -- 7 referencias entrantes
- [ReclamoDetalle](../_domain_glossary.md#reclamodetalle) -- 6 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (122): EditarReclamoDetalle -> SecGAMIsAuthByFunctionalityKey; CarreteDefectoPrompt -> WWP_GetAppliedFiltersDescription; CarreteDefectoPrompt -> GetWWPTitleSettingsIcons; CarreteDefectoPrompt -> LoadWWPContext; CarreteDefectoPrompt -> DVB_SDTDropDownOptionsTitleSettingsIcons _(+117 más)_
- [DB](DB.md) (14): TrazabilidadView -> ExtrusionView; TrazabilidadView -> BobinaView; TrazabilidadView -> PaletView; TrazabilidadView -> CarreraView; TrazabilidadView -> CarreteView _(+9 más)_
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (4): reclamoview -> WWP_HasSubscriptionsToDisplay; CarreteDefectoView -> WWP_HasSubscriptionsToDisplay; CarreteDefectoWW -> WWP_HasSubscriptionsToDisplay; reclamosww -> WWP_HasSubscriptionsToDisplay
- [WWPBaseObjects.Discussions](WWPBaseObjects.Discussions.md) (2): reclamoview -> WWP_HasDiscussionMessages; CarreteDefectoView -> WWP_HasDiscussionMessages
- [GeneXus.Common](GeneXus.Common.md) (1): EditarReclamoDetalle -> Messages
- [Produccion](Produccion.md) (1): ReclamoProductoDP -> SDTProducto

### Este módulo ES LLAMADO por

- [Web](Web.md) (5): MenuCalidad -> ConsultarCarrete; MenuCalidad -> CarreteDefectoWW; MenuCalidad -> reclamosww; Modules -> InicioCalidad; MenuCalidad -> InicioCalidad
- [WWPBaseObjects](WWPBaseObjects.md) (2): ListWWPPrograms -> CarreteDefectoWW; ListWWPPrograms -> reclamosww

## Entry points (desde el menú)

- [CarreteDefectoWW](../WebPanels/Calidad/CarreteDefectoWW.md) -- ruta: `Web > Calidad > Defectos`
- [ConsultarCarrete](../WebPanels/Calidad/ConsultarCarrete.md) -- ruta: `Web > Calidad > Consultar`
- [InicioCalidad](../WebPanels/Calidad/InicioCalidad.md) -- ruta: `Web > Calidad > Inicio`
- [reclamosww](../WebPanels/Calidad/reclamosww.md) -- ruta: `Web > Calidad > Reclamos`

