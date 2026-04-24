# Procedure: SetNotSuccessMessagesLog

- **Module:** Web
- **Description:** Set Not Success Messages Log
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| itemMsg | Variable | GX_SDT |  | item Msg |
| Messages | Parameter | GX_SDT | in | Messages |
| varPgmname | Parameter | VARCHAR | in | var Pgmname |
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
for &itemMsg in &Messages
	msg(&itemMsg.Description)
	debugger.Call(niveldebug.Informativo, &varPgmname, &itemMsg.Description)
endfor
```

### Rules (Rules)

```genexus
parm(in:&Messages, in:&varPgmname);
```

