# DataProvider: ProductoCategoriaDP

- **Module:** Produccion
- **Description:** Producto Categoria DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoCategoriaNombre | Parameter | VARCHAR | inout | Nombre |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTProductoCategoria
Where ProductoCategoriaNombre = &ProductoCategoriaNombre
{
	SDTProductoCategoriaItem
	{
		ProductoCategoriaId = ProductoCategoriaId
		ProductoCategoriaNombre = ProductoCategoriaNombre
		ProductoCategoriaClaveExterna = ProductoCategoriaClaveExterna 
	}
}
```

### Rules (Rules)

```genexus
parm(&ProductoCategoriaNombre);
```

