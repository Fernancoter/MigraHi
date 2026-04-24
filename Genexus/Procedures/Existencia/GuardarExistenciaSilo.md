# Procedure: GuardarExistenciaSilo

- **Module:** Existencia
- **Description:** Guardar Existencia Silo
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ESItem | Variable | GX_SDT |  | ESItem |
| ExistenciaSilo | Variable | GX_BUSCOMP |  | Existencia Silo |
| SDTExistenciaSilo | Parameter | GX_SDT | in | SDTExistencia Silo |
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


    for &ESItem in &SDTExistenciaSilo
	    
	    &ExistenciaSilo.Load(&ESItem.ExistenciaSiloId)
	    &ExistenciaSilo.SiloId = &ESItem.SiloId
	    &ExistenciaSilo.ExistenciaSiloCantidad = &ESItem.ExistenciaSiloCantidad
	    &ExistenciaSilo.Mail.ExistenciaSiloVirgenLote = &ESItem.ExistenciaSiloVirgenLote
	    &ExistenciaSilo.ExistenciaId = &ESItem.ExistenciaId
	    &ExistenciaSilo.Save()
	    
	    if(&ExistenciaSilo.Success())
		    commit
	    endif
    endfor
```

### Rules (Rules)

```genexus
parm(in:&SDTExistenciaSilo);
```

