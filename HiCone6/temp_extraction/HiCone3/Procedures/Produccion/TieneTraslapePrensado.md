# Procedure: TieneTraslapePrensado

- **Module:** Produccion
- **Description:** Tiene Traslape Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HasOverlapTime | Parameter | Boolean | out | Has Overlap Time |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PrensadoTurnoId | Parameter | NUMERIC | in | Prensado Turno Id |
| PrensadoFecha | Parameter | DATETIME | in | Prensado Fecha |
| JustDate | Variable | DATE |  | Just Date |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| PrensadoPrensaId | Parameter | NUMERIC | in | Prensa Id |
| MinPrensadoFecha | Variable | DATETIME |  | Prensado Fecha |
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
&HasOverlapTime = True 

For Each order PrensadoTurnoId
	Where PrensadoFecha.Year() = &PrensadoFecha.Year()
	where PrensadoFecha.Month() = &PrensadoFecha.Month()
	Where PrensadoFecha.Day() = &PrensadoFecha.Day()
	Where PrensadoPrensaId = &PrensadoPrensaId
	where PrensadoTurnoId <> &PrensadoTurnoId
	
	debugger.Call(niveldebug.Informativo, &Pgmname,PrensadoTurnoId.ToString() +'|'+ &PrensadoTurnoId.ToString() + '|' + PrensadoFecha.ToFormattedString() + '-' + &PrensadoFecha.ToFormattedString())
	
	
//	Do Case 
//		Case &PrensadoTurnoId = EnumTurno.UNO
//			If PrensadoFecha <= &PrensadoFecha
//				&HasOverlapTime = True
//				Exit 
//			EndIf
//		Case &PrensadoTurnoId = EnumTurno.TRES
//			If PrensadoFecha >= &PrensadoFecha
//				&HasOverlapTime = True
//				Exit 
//			EndIf
//		Case &PrensadoTurnoId = EnumTurno.DOS
//			If prensadoTurnoId = EnumTurno.UNO
//				If PrensadoFecha >= &PrensadoFecha
//					&HasOverlapTime = True
//					Exit 
//				EndIf
//			else 
//				If PrensadoFecha <= &PrensadoFecha
//					&HasOverlapTime = True
//					Exit 
//				EndIf
//			EndIf
//		
//	EndCase

	

EndFor
```

### Rules (Rules)

```genexus
parm(In:&PrensadoFecha, In:&PrensadoPrensaId, In:&PrensadoTurnoId, Out:&HasOverlapTime);
```

