# DataProvider: DPCBProductoBase

- **Module:** Produccion
- **Description:** DP Dynamic Combo Box Producto
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoBaseProductoId | Parameter | NUMERIC | inout | Producto Base Producto Id |
| ProductoCategoriaNombre | Parameter | VARCHAR | inout | Nombre |
| IsWithFilter | Parameter | Boolean | inout | Is With Filter |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
DVB_SDTComboData
Where ProductoCategoriaNombre = &ProductoCategoriaNombre when Not &ProductoCategoriaNombre.IsEmpty()
Where ProductoBaseProductoId = &ProductoBaseProductoId when Not &ProductoBaseProductoId.IsEmpty() And &IsWithFilter
{
	Item 
	{
		ID = ProductoId.ToString()
		Title = ProductoClave
	}
}
```

### Rules (Rules)

```genexus
parm(&ProductoBaseProductoId, &ProductoCategoriaNombre, &IsWithFilter);
```

