# Procedure: GAMSDDisplayLastGAMErrors

- **Module:** 
- **Description:** GAMSDDisplay Last GAMErrors
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Messages | Parameter | GX_SDT | out | Messages |
| GAMErrorCollection | Variable | GX_EXTERNAL_OBJECT |  | GAMError Collection |
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
&GAMErrorCollection = GAMRepository.GetLastErrors()
GAMConvertErrorsToMessages(&GAMErrorCollection, &Messages)
```

### Rules (Rules)

```genexus
Parm(out:&Messages);
```

