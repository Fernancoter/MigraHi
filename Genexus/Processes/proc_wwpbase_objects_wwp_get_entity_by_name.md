# Proceso: WWP_GetEntityByName

- **Entry point:** [WWP_GetEntityByName](../Procedures/WWPBaseObjects/WWP_GetEntityByName.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.Discussions.WWP_HasDiscussionMessages`, `WWPBaseObjects.Discussions.WWP_SubscribeLoggedUserToDiscussion`, `WWPBaseObjects.Discussions.WWP_SubscribeMentionedUsersToDiscussion`
- **Módulo principal:** `WWPBaseObjects`
- **Objetos en el proceso:** 2
- **Módulos tocados:** `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_wwp_get_entity_by_name.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_GetEntityByName](../Procedures/WWPBaseObjects/WWP_GetEntityByName.md) (`Procedure`, `WWPBaseObjects`)
- depth 1: [WWP_Entity](../Transactions/WWPBaseObjects/WWP_Entity.md) (`Transaction`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `WWP_Entity`
- **Tablas escritas:** `WWP_Entity`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_Entity](../_domain_glossary.md#wwp-entity)
