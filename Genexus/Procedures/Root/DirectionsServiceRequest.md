# Procedure: DirectionsServiceRequest

- **Module:** Root
- **Description:** Directions Service Request
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DirectionsRequestParameters | Parameter | GX_SDT | in | Directions Request Parameters |
| DirectionsServiceProvider | Parameter | VARCHAR | in | Directions Service Provider |
| errorMessage | Variable | GX_SDT |  | error Message |
| errorMessages | Parameter | GX_SDT | out | error Messages |
| Routes | Parameter | GX_SDT | out | Routes |
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
	Case &DirectionsServiceProvider = DirectionsServiceProviders.Google
		GoogleDirectionsServiceRequest.Call(&DirectionsRequestParameters, &Routes, &errorMessages)
	
	Otherwise
	&errorMessage.Description = "Unknown Error"
	&errorMessage.Type = GeneXus.MessageTypes.Error
	&errorMessages.Add(&errorMessage)
Endcase
```

### Rules (Rules)

```genexus
Parm(in: &DirectionsServiceProvider,
	 in: &DirectionsRequestParameters,
	 out: &Routes, out: &errorMessages);
```

