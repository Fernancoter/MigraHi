# Procedure: WWP_Logger

- **Module:** WWPBaseObjects
- **Description:** Logger
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| FormattedMessage | Variable | LONGVARCHAR |  | Formatted Message |
| Message | Variable | LONGVARCHAR |  | Message |
| Topic | Variable | LONGVARCHAR |  | Topic |
| WWPUserExtendedId | Variable | CHARACTER |  | User Id |
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
Stub Debug(in:&Topic, in:&Message)
	Do 'FormatMessage'
	Log.Debug(&FormattedMessage, &Topic.Trim())
EndStub

Stub Info(in:&Topic, in:&Message)
	Do 'FormatMessage'
	Log.Info(&FormattedMessage, &Topic.Trim())
EndStub

Stub Warning(in:&Topic, in:&Message)
	Do 'FormatMessage'
	GeneXus.Common.Log.Warning(&FormattedMessage, &Topic.Trim())
EndStub

Stub Error(in:&Topic, in:&Message)
	Do 'FormatMessage'
	Log.Error(&FormattedMessage, &Topic.Trim())
EndStub

Sub 'FormatMessage'
	
	&FormattedMessage = !""
	
	&WWPUserExtendedId = WWP_GetLoggedUserId()
	
	If not &WWPUserExtendedId.IsEmpty()
		&FormattedMessage += Format(!"[UserGUID: %1] ", &WWPUserExtendedId.Trim())
	Else
		&FormattedMessage += Format(!"[UserGUID: %1] ", !"N/A")
	EndIf

	If not &WWPUserExtendedId.IsEmpty()
		&FormattedMessage += Format(!"[UserName: %1] ", &WWPUserExtendedId.Trim())
	Else
		&FormattedMessage += Format(!"[UserName: %1] ", !"N/A")
	EndIf
	
	&FormattedMessage += &Message.Trim()
	
EndSub
```

