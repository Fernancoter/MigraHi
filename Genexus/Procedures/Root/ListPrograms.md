# Procedure: ListPrograms

- **Module:** Root
- **Description:** List Programs
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| ProgramNames | Parameter | GX_SDT | out | Program Names |
| ProgramName | Variable | GX_SDT |  | Program Name |
| name | Variable | VARCHAR |  | name |
| description | Variable | VARCHAR |  | description |
| link | Variable | VARCHAR |  | link |

## Business Logic

### Source (Source)

```genexus
// Empty block or parsing failed
```

### Rules (Rules)

```genexus
parm(out:&ProgramNames);
```

