# Procedure: SyncSAE

- **Module:** SAE
- **Description:** Sync SAE
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProgressIndicator | Variable | GX_EXTERNAL_OBJECT |  | Progress Indicator |
| SP | Variable | GX_EXTERNAL_OBJECT |  | SP |
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

	&SP.CreateReportFTB() //Se llama al procedure Sync
	commit
	
	Actualizando.Call()
```

