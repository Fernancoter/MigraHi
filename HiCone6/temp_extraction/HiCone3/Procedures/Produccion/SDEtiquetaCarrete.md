# Procedure: SDEtiquetaCarrete

- **Module:** Produccion
- **Description:** SDEtiqueta Carrete
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| Carrera | Variable | GX_BUSCOMP |  | Carrera |
| Carrete | Variable | GX_BUSCOMP |  | Carrete |
| Etiqueta | Parameter | CHARACTER | out | Etiqueta |
| CarreraNo | Variable | NUMERIC |  | Carrera No |
| NoLinea | Variable | NUMERIC |  | No Linea |
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
&Carrete.Load(&CarreteId)
&CarreraId = &Carrete.CarreteCarreraId
&Carrera.Load(&CarreraId)

&CarreraNo = &Carrera.CarreraNo
&NoLinea = &Carrete.CarreteNoLinea
&Etiqueta = 'C' + &CarreraNo.ToString().Trim() + 'L'+ &NoLinea.ToString().Trim()
```

### Rules (Rules)

```genexus
parm(in:&CarreteId, out:&Etiqueta);
```

