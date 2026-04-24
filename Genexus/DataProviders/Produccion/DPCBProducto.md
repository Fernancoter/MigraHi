# DataProvider: DPCBProducto

- **Module:** Produccion
- **Description:** DP Dynamic Combo Box Producto
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoCategoriaId | Parameter | NUMERIC | inout | Producto Categoria Id |
| ProductoCategoriaNombre | Parameter | VARCHAR | inout | Nombre |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus

DVB_SDTComboData
Where ProductoCategoriaId = &ProductoCategoriaId when Not &ProductoCategoriaId.IsEmpty()
Where ProductoCategoriaNombre = &ProductoCategoriaNombre when Not &ProductoCategoriaNombre.IsEmpty()
{
	Item
	{
		ID = Notifications.ProductoId.ToString()
		Title = ProductoClave
	}
}
```

### Rules (Rules)

```genexus
parm(&ProductoCategoriaId, &ProductoCategoriaNombre);
```

