# Procedure: MostrarMensajes

- **Module:** Web
- **Description:** Mostrar Mensajes
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CollectionMessages | Parameter | GX_SDT | inout | Collection Messages |
| Messages | Variable | GX_SDT |  | Messages |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |

## Business Logic

### Source (Source)

```genexus
msg('Mensajes a continuación')
For &Messages in &CollectionMessages
	msg(&Messages.Description)
Endfor
```

### Rules (Rules)

```genexus
Parm(&CollectionMessages);
```

