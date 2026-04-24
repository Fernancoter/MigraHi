# Procedure: WWP_GetStatusCodeMessage

- **Module:** WWPBaseObjects.Mail
- **Description:** Get Status Code Message
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ErrorCode | Variable | NUMERIC |  | Error Code |
| Message | Parameter | LONGVARCHAR | out | Message |
| StatusCode | Parameter | NUMERIC | in | Status Code |
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
Do Case
	Case &StatusCode = 0
		&Message = !"OK"
	Case &StatusCode = 1
		&Message = !"Already logged in"
	Case &StatusCode = 2
		&Message = !"Not logged in"
	Case &StatusCode = 3
		&Message = !"Could not complete login"
	Case &StatusCode = 6
		&Message = !"Invalid sender name"
	Case &StatusCode = 7
		&Message = !"Invalid sender address"
	Case &StatusCode = 8
		&Message = !"Invalid user name"
	Case &StatusCode = 9
		&Message = !"Invalid password"
	Case &StatusCode = 10
		&Message = !"Could not send message"
	Case &StatusCode = 11
		&Message = !"No messages to receive"
	Case &StatusCode = 12
		&Message = !"Could not delete message"		
	Case &StatusCode = 13
		&Message = !"No main recipient specified"
	Case &StatusCode = 14
		&Message = !"Invalid recipient"
	Case &StatusCode = 15
		&Message = !"Invalid attachment"
	Case &StatusCode = 16
		&Message = !"Could not save attachment"
	Case &StatusCode = 17
		&Message = !"Invalid Authentication value"
	Case &StatusCode = 18
		&Message = !"Not enough memory"
	Case &StatusCode = 19
		&Message = !"Connection lost"
	Case &StatusCode = 20
		&Message = !"Timeout exceeded"
	Case &StatusCode = 21
		&Message = !"Memory allocation error"
	Case &StatusCode = 23
		&Message = !"The server does not recognize any of the supported authentication methods"
	Case &StatusCode = 24
		&Message = !"Authentication error"
	Case &StatusCode = 25
		&Message = !"User or password refused"
	Case &StatusCode = 26
		&Message = !"No current message"
	Case &StatusCode = 27
		&Message = !"Invalid NewMessages value"
	Otherwise
		&Message = !"Unknown error"	
EndCase
```

### Rules (Rules)

```genexus
parm(in:&StatusCode, out:&Message);
```

