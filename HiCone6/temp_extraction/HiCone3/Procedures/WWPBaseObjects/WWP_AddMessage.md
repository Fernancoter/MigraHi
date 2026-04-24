# Procedure: WWP_AddMessage

- **Module:** WWPBaseObjects
- **Description:** WWP_Add Message
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Message | Variable | GX_SDT |  | Message |
| Id | Variable | VARCHAR |  | Id |
| ErrorType | Variable | NUMERIC |  | Error Type |
| ErrorDsc | Variable | VARCHAR |  | Error Dsc |
| MsgId | Parameter | VARCHAR | in | Msg Id |
| MsgType | Parameter | NUMERIC | in | Msg Type |
| MsgDsc | Parameter | VARCHAR | in | Msg Dsc |
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

&Message = new()
&Message.Id = &MsgId
&Message.Type = &MsgType
&Message.Description = &MsgDsc

&Messages.Add(&Message)
```

### Rules (Rules)

```genexus

parm(in:&MsgId, in:&MsgType, in:&MsgDsc, inout:&Messages);
```

