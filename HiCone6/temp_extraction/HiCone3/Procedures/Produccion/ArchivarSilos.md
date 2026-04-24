# Procedure: ArchivarSilos

- **Module:** Produccion
- **Description:** Archivar Silos
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SiloId | Parameter | NUMERIC | in | Silo Id |
| Silo | Variable | GX_BUSCOMP |  | Silo |
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
&Silo.Load(&SiloId)
&Silo.SiloActivo = false
&Silo.Save()

If &Silo.Success()
	Commit
	Msg('Silo archivado')
	listarSilos.Call()
Else
	Msg('No se pudo archivar el silo')
EndIf
```

### Rules (Rules)

```genexus
parm(in:&SiloId);
```

