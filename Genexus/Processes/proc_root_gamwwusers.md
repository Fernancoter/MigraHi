# Proceso: Usuarios

- **Entry point:** [GAMWWUsers](../WebPanels/Root/GAMWWUsers.md) -- tipo menú
- **Ruta en el menú:** `Web > Seguridad > Usuarios`
- **Módulo principal:** `Root`
- **Objetos en el proceso:** 25
- **Módulos tocados:** `DB`, `Produccion`, `Root`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_root_gamwwusers.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [GAMWWUsers](../WebPanels/Root/GAMWWUsers.md) (`WebPanel`, `Root`)
- depth 1: [GAMSetPassword](../WebPanels/Root/GAMSetPassword.md) (`WebPanel`, `Root`)
- depth 1: [GAMUserEntry](../WebPanels/Root/GAMUserEntry.md) (`WebPanel`, `Root`)
- depth 1: [GAMWWUserPermissions](../WebPanels/Root/GAMWWUserPermissions.md) (`WebPanel`, `Root`)
- depth 1: [GAMWWUserRoles](../WebPanels/Root/GAMWWUserRoles.md) (`WebPanel`, `Root`)
- depth 1: [GridStateCollection](../SDTs/WWPBaseObjects/GridStateCollection.md) (`SDT`, `WWPBaseObjects`)
- depth 2: [GAMCheckUserActivationMethod](../Procedures/Root/GAMCheckUserActivationMethod.md) (`Procedure`, `Root`)
- depth 2: [GAMUserPermissionSelect](../WebPanels/Root/GAMUserPermissionSelect.md) (`WebPanel`, `Root`)
- depth 2: [GAMUserRoleSelect](../WebPanels/Root/GAMUserRoleSelect.md) (`WebPanel`, `Root`)
- depth 2: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)
- depth 2: [DVMessageGetBasicNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetBasicNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_CreateUserExtended](../Procedures/WWPBaseObjects/WWP_CreateUserExtended.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_UpdateUserExtendedPhoto](../Procedures/WWPBaseObjects/WWP_UpdateUserExtendedPhoto.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)
- depth 3: [Operador](../Transactions/DB/Operador.md) (`Transaction`, `DB`)
- depth 3: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 3: [GAMConvertErrorsToMessages](../Procedures/Root/GAMConvertErrorsToMessages.md) (`Procedure`, `Root`)
- depth 3: [DVMessageGetAdvancedNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetAdvancedNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 4: [ViewOperador](../WebPanels/DB/ViewOperador.md) (`WebPanel`, `DB`)
- depth 4: [WWOperador](../WebPanels/DB/WWOperador.md) (`WebPanel`, `DB`)
- depth 4: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `DB.Operador`, `Operador`, `WWP_UserExtended`
- **Tablas escritas:** `Configuracion`, `DB.Operador`, `Operador`, `WWP_UserExtended`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [Operador](../_domain_glossary.md#operador)
- [WWP_UserExtended](../_domain_glossary.md#wwp-userextended)
