# Procedure: WWP_StorageProvider_GetFilePath

- **Module:** WWPBaseObjects
- **Description:** Storage Provider - Get File Path
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| FilePath | Parameter | VARCHAR | inout | File Path |
| StorageProvider | Variable | GX_USRDEFTYP |  | Storage Provider |
| File | Variable | GX_USRDEFTYP |  | File |
| Messages | Variable | GX_SDT |  | Messages |
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

If &FilePath.Trim() <> '' AND &StorageProvider.GetPrivate(&FilePath, &File, 5, &Messages)
	&FilePath = &File.GetURI()
EndIf
```

### Rules (Rules)

```genexus

parm(inout:&FilePath);
```

