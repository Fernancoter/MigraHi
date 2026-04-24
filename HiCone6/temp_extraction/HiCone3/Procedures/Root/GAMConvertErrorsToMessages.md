# Procedure: GAMConvertErrorsToMessages

- **Module:** 
- **Description:** GAMConvert Errors To Messages
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| GAMError | Variable | GX_EXTERNAL_OBJECT |  | GAMError |
| GAMErrorCollection | Parameter | GX_EXTERNAL_OBJECT | in | GAMError Collection |
| Message | Variable | GX_SDT |  | Message |
| Messages | Parameter | GX_SDT | out | Messages |
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
For &GAMError in &GAMErrorCollection
	&Message = new()
	&Message.Type = MessageTypes.Error
	&Message.Description = &GAMError.Message
	&Message.Id = Format(!"GAM%2", &GAMError.Code)
	&Messages.Add(&Message)
EndFor
```

### Rules (Rules)

```genexus
Parm(in:&GAMErrorCollection, out:&Messages);
```

