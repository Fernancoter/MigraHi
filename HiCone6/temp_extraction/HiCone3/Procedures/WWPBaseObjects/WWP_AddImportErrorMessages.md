# Procedure: WWP_AddImportErrorMessages

- **Module:** WWPBaseObjects
- **Description:** WWP_Add Import Error Messages
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ErrorsToAdd | Parameter | GX_SDT | in | Errors To Add |
| LineId | Parameter | VARCHAR | in | Line Id |
| Message | Variable | GX_SDT |  | Message |
| Messages | Parameter | GX_SDT | inout | Messages |
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

If not &LineId.IsEmpty()
	WWP_AddMessage(!'WWP_LineId', MessageTypes.Info, format('File line: %1', &LineId), &Messages)
EndIf

For &Message in &ErrorsToAdd
	If &Message.Type = MessageTypes.Error
		&Messages.Add(&Message)
	EndIf
EndFor
```

### Rules (Rules)

```genexus

parm(inout:&Messages, in:&LineId, in:&ErrorsToAdd);
```

