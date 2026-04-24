# Procedure: ComenzarCargaDeEmbarque

- **Module:** Embarques
- **Description:** Comenzar Carga De Embarque
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EmbarqueId | Parameter | NUMERIC | inout | Embarque Id |
| Embarque | Variable | GX_BUSCOMP |  | Embarque |
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
&Embarque.Load(&EmbarqueId)
&Embarque.EmbarqueEstatus = EstatusEmbarque.EnProceso
&Embarque.EmbarqueHoraFin = now()
&Embarque.Save()
if(&Embarque.Success())
	commit
	CargarEmbarque.Call(&EmbarqueId)
else
	
	//Mostrar Mensajes
endif
```

### Rules (Rules)

```genexus
parm(&EmbarqueId);
```

