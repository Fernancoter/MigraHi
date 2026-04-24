# Módulo: Downtime

## Propósito

Módulo con 10 objetos parseados. Entidades centrales por referencias entrantes: `DownTimeCode`. Sin entry points en `_menu.json` -- accedido indirectamente desde: WWPBaseObjects.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 1 |
| Procedures | 4 |
| SDTs | 1 |
| Transactions | 1 |
| WebPanels | 3 |
| **Total** | **10** |

## Entidades clave

- [DownTimeCode](../_domain_glossary.md#downtimecode) -- 7 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (56): DownTimeCodeWWExport -> LoadColumnsSelectorState; DownTimeCodeWWExport -> WWP_ColumnsSelector_Add; DownTimeCodeWWExport -> WWP_ColumnSelector_UpdateColumns; DownTimeCodeWWExport -> WWP_ExportWriteFilter; DownTimeCodeWWExport -> WWP_Export_SecureText _(+51 más)_
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (2): DownTimeCodeView -> WWP_HasSubscriptionsToDisplay; DownTimeCodeWW -> WWP_HasSubscriptionsToDisplay
- [WWPBaseObjects.Discussions](WWPBaseObjects.Discussions.md) (1): DownTimeCodeView -> WWP_HasDiscussionMessages

### Este módulo ES LLAMADO por

- [WWPBaseObjects](WWPBaseObjects.md) (1): ListWWPPrograms -> DownTimeCodeWW

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **WWPBaseObjects**.

