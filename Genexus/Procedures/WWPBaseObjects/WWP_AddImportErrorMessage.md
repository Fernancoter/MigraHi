# Procedure: WWP_AddImportErrorMessage

- **Module:** WWPBaseObjects
- **Description:** WWP_Add Import Error Message
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ErrorToAddDsc | Parameter | VARCHAR | in | Error To Add Dsc |
| ErrorToAddId | Parameter | VARCHAR | in | Error To Add Id |
| LineId | Parameter | VARCHAR | in | Line Id |
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

WWP_AddMessage(&ErrorToAddId, MessageTypes.Error, &ErrorToAddDsc, &Messages)
```

### Rules (Rules)

```genexus

parm(inout:&Messages, in:&LineId, in:&ErrorToAddId, in:&ErrorToAddDsc);
```

