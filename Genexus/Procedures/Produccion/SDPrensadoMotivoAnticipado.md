# Procedure: SDPrensadoMotivoAnticipado

- **Module:** Produccion
- **Description:** SDPrensado Motivo Anticipado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Observaciones | Parameter | VARCHAR | in | Observaciones |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
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
      
      &Prensado.Load(&PrensadoId)
      &Prensado.PrensadoMotivoAnticipado = &Observaciones
      &Prensado.Save()
      
      if(&Prensado.Success())
	      commit
      endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&Observaciones);
```

