# DataProvider: TipoCarreteDPPorPrensa

- **Module:** Produccion
- **Description:** Tipo Carrete DPPor Prensa
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensaId | Parameter | NUMERIC | inout | Prensa Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTProducto
{
	SDTProductoItem
	where ComercialProductoActivo = true
	Where PrensaId = &PrensaId
	{
		ProductoId = ComercialProductoId
		ProductoNombre = ComercialProductoNombre
		ProductoClave = ComercialProductoNombre
	}
}
```

### Rules (Rules)

```genexus
parm(&PrensaId);
```

