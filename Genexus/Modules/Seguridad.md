# Módulo: Seguridad

## Propósito

Módulo con 4 objetos parseados. Entry points desde el menú: `inicioSeguridad`.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| Procedures | 2 |
| SDTs | 1 |
| WebPanels | 1 |
| **Total** | **4** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

- [GeneXusReporting](GeneXusReporting.md) (8): inicioSeguridad -> QueryViewerElements; inicioSeguridad -> QueryViewerParameters; inicioSeguridad -> QueryViewerItemExpandData; inicioSeguridad -> QueryViewerItemDoubleClickData; inicioSeguridad -> QueryViewerItemCollapseData _(+3 más)_
- [DB](DB.md) (2): HabilitarOperador -> Operador; DeshabilitarOperador -> Operador
- [GeneXus.Common](GeneXus.Common.md) (2): HabilitarOperador -> Messages; DeshabilitarOperador -> Messages
- [Web](Web.md) (2): HabilitarOperador -> SetNotSuccessMessagesLog; DeshabilitarOperador -> SetNotSuccessMessagesLog

### Este módulo ES LLAMADO por

- [Produccion](Produccion.md) (2): listarOperador -> HabilitarOperador; gestionarOperador -> DeshabilitarOperador
- [Web](Web.md) (2): MenuSeguridad -> inicioSeguridad; Modules -> inicioSeguridad

## Entry points (desde el menú)

- [inicioSeguridad](../WebPanels/Seguridad/inicioSeguridad.md) -- ruta: `Web > Seguridad > Inicio`

