# Procedure: DeshabilitarOperador

- **Module:** Seguridad
- **Description:** Deshabilitar Operador
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| isOk | Parameter | Boolean | out | is Ok |
| User | Variable | GX_EXTERNAL_OBJECT |  | User |
| Operador | Parameter | GX_BUSCOMP | in | Operador |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| Error | Variable | GX_EXTERNAL_OBJECT |  | Error |
| Messages | Variable | GX_SDT |  | Messages |
| Message | Variable | GX_SDT |  | Message |
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
&isOk = False

&User.Load(&Operador.OperadorUserGUID)
			
If &User.IsEnabledInRepository
	&isOK = &User.RepositoryDisable(&Errors) 
EndIf

If &isOK
    
	&Operador.OperadorActivo = False
	&Operador.Save()
	&isOk = &Operador.Success()
	
	If Not &isOk
		setnotSuccessMessagesLog.Call(&Operador.GetMessages(), &Pgmname)
	EndIf
	
Else
	
	For &Error in &Errors
        Msg(Format(!"%1 (GAM%2)", &Error.Message, &Error.Code))
    EndFor
	
EndIf
```

### Rules (Rules)

```genexus
parm(In:&Operador, Out:&IsOk);
```

