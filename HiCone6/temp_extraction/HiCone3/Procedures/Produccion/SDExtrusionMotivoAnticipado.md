# Procedure: SDExtrusionMotivoAnticipado

- **Module:** Produccion
- **Description:** SDExtrusion Motivo Anticipado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| Observaciones | Parameter | VARCHAR | in | Observaciones |
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
      
      &Extrusion.Load(&ExtrusionId)
      &Extrusion.ExtrusionMotivoAnticipado = &Observaciones
      &Extrusion.Save()
      
      if(&Extrusion.Success())
	      commit
      endif
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&Observaciones);
```

