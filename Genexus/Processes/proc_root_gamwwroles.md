# Proceso: Roles

- **Entry point:** [GAMWWRoles](../WebPanels/Root/GAMWWRoles.md) -- tipo menú
- **Ruta en el menú:** `Web > Seguridad > Roles`
- **Módulo principal:** `Root`
- **Objetos en el proceso:** 20
- **Módulos tocados:** `DB`, `Produccion`, `Root`, `WWPBaseObjects`, `WWPBaseObjects.Subscriptions`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_root_gamwwroles.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [GAMWWRoles](../WebPanels/Root/GAMWWRoles.md) (`WebPanel`, `Root`)
- depth 1: [GAMRoleEntry](../WebPanels/Root/GAMRoleEntry.md) (`WebPanel`, `Root`)
- depth 1: [GAMWWRolePermissions](../WebPanels/Root/GAMWWRolePermissions.md) (`WebPanel`, `Root`)
- depth 1: [GAMWWRoleRoles](../WebPanels/Root/GAMWWRoleRoles.md) (`WebPanel`, `Root`)
- depth 1: [GridStateCollection](../SDTs/WWPBaseObjects/GridStateCollection.md) (`SDT`, `WWPBaseObjects`)
- depth 1: [WWP_SubscriptionsSettingsByRole](../WebPanels/WWPBaseObjects/Subscriptions/WWP_SubscriptionsSettingsByRole.md) (`WebPanel`, `WWPBaseObjects.Subscriptions`)
- depth 2: [ExportarPermisosPorRol](../Procedures/Root/ExportarPermisosPorRol.md) (`Procedure`, `Root`)
- depth 2: [GAMRolePermissionSelect](../WebPanels/Root/GAMRolePermissionSelect.md) (`WebPanel`, `Root`)
- depth 2: [GAMRoleSelect](../WebPanels/Root/GAMRoleSelect.md) (`WebPanel`, `Root`)
- depth 2: [wpImportarPermisosPorRol](../WebPanels/Root/wpImportarPermisosPorRol.md) (`WebPanel`, `Root`)
- depth 2: [WWP_Entity](../Transactions/WWPBaseObjects/WWP_Entity.md) (`Transaction`, `WWPBaseObjects`)
- depth 2: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)
- depth 2: [WWPGetRoleName](../Procedures/WWPBaseObjects/WWPGetRoleName.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [Document](../Transactions/DB/Document.md) (`Transaction`, `DB`)
- depth 3: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 3: [FileUploadData](../SDTs/Root/FileUploadData.md) (`SDT`, `Root`)
- depth 3: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `Document`, `WWP_Entity`, `WWP_UserExtended`, `WWPBaseObjects.WWP_Entity`
- **Tablas escritas:** `Configuracion`, `Document`, `WWP_Entity`, `WWP_UserExtended`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [Document](../_domain_glossary.md#document)
- [WWP_Entity](../_domain_glossary.md#wwp-entity)
- [WWP_UserExtended](../_domain_glossary.md#wwp-userextended)
