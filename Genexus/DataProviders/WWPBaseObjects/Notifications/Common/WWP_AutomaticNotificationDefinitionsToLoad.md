# DataProvider: WWP_AutomaticNotificationDefinitionsToLoad

- **Module:** WWPBaseObjects.Notifications.Common
- **Description:** WWP_Automatic Notification Definitions To Load
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
NotificationDefinitions
{
	SubGroup_1.Insert()
}
SubGroup SubGroup_1()
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Company")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Company")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Budget")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Budget")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Consolidated")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Consolidated")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Customer")
		WWPNotificationDefinitionAppliesTo = Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Customer")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"FTB")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"FTB")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Order")
		WWPNotificationDefinitionAppliesTo = Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Order")
		WWPNotificationDefinitionAppliesTo = Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Product")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Product")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Remission")
		WWPNotificationDefinitionAppliesTo = Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Remission")
		WWPNotificationDefinitionAppliesTo = Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"SalesPerson")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"SalesPerson")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"StatementOfIncome")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"StatementOfIncome")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Extrusion")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Extrusion")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Bobina")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Bobina")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Prensado")
		WWPNotificationDefinitionAppliesTo = Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Prensado")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"Palet")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Palet")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Carrera")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Carrera")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Lote")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Lote")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Troquel")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Troquel")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Carrete")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Carrete")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"ExtrusoraMezcladora")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"ExtrusoraMezcladora")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"ProductoTerminado")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"ProductoTerminado")
		WWPNotificationDefinitionAppliesTo = Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"InsertRecord"
		WWPEntityId = WWP_GetEntityByName(!"Embarque")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.AnyRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !"fas fa-plus NotificationFontIconSuccess"
		WWPNotificationDefinitionDescription = "Get notified when a record of Embarque is inserted"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"UpdateRecord"
		WWPEntityId = WWP_GetEntityByName(!"Embarque")
		WWPNotificationDefinitionAppliesTo = Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !"fas fa-pencil-alt NotificationFontIconWarning"
		WWPNotificationDefinitionDescription = "Get notified when this Embarque is updated"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Embarque")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Embarque")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"DeleteRecord"
		WWPEntityId = WWP_GetEntityByName(!"Embarque")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !"far fa-trash-alt NotificationFontIconDanger"
		WWPNotificationDefinitionDescription = "Get notified when this Embarque is deleted"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"EmbarqueCancelado"
		WWPEntityId = WWP_GetEntityByName(!"Embarque")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.AnyRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !"fas fa-info"
		WWPNotificationDefinitionDescription = "Embarque Cancelado"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"CambioFechaEstimada"
		WWPEntityId = WWP_GetEntityByName(!"Embarque")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.AnyRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !"fas fa-info"
		WWPNotificationDefinitionDescription = "Fecha Estimada Embarque"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"EmbarquePallet")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"EmbarquePallet")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"EmbarqueDetalle")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"EmbarqueDetalle")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"PrensaTroquel")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"PrensaTroquel")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"RegistroInventario"
		WWPEntityId = WWP_GetEntityByName(!"Existencia")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.AnyRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !"fas fa-info"
		WWPNotificationDefinitionDescription = "Registro Inventario"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Existencia")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Existencia")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"ReclamoDetalle")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"ReclamoDetalle")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"Reclamo")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Reclamo")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"CarreteDefecto")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"CarreteDefecto")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"TestNotify"
		WWPEntityId = WWP_GetEntityByName(!"PrensadoBobina")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.AnyRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !"fas fa-info"
		WWPNotificationDefinitionDescription = "Bobina en reposo ocupada en prensado"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"PrensadoBobina")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"PrensadoBobina")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"CausaInterrupcion")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"CausaInterrupcion")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"ExtrusoraObservacion")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"ExtrusoraObservacion")
		WWPNotificationDefinitionAppliesTo = Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"PrensaObservacion")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"PrensaObservacion")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"Interrupcion")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"Interrupcion")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"PrensadoInterrupcion")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"PrensadoInterrupcion")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"ExtrusionInterrupcion")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"ExtrusionInterrupcion")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"EtiquetadoOperador")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWPBaseObjects.WWP_GetEntityByName(!"EtiquetadoOperador")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Audit")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Audit")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"Inventario")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"Inventario")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Discussion"
		WWPEntityId = WWP_GetEntityByName(!"WWP_MailTemplate")
		WWPNotificationDefinitionAppliesTo = WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = True
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when discussion messages are created"
		WWPNotificationDefinitionSecFuncionality = !""
	}
	WWP_NotificationDefinition
	{
		WWPNotificationDefinitionName = !"Mention"
		WWPEntityId = WWP_GetEntityByName(!"WWP_MailTemplate")
		WWPNotificationDefinitionAppliesTo = WWP_NotificationAppliesTo.SpecificRecord
		WWPNotificationDefinitionAllowUserSubscription = False
		WWPNotificationDefinitionIcon = !""
		WWPNotificationDefinitionTitle = ''
		WWPNotificationDefinitionDescription = "Get notified when you are mentioned in a discussion"
		WWPNotificationDefinitionSecFuncionality = !""
	}
EndSubGroup
```

