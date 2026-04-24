# Procedure: GuardarExtrusion

- **Module:** Produccion
- **Description:** Guardar Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTExtrusionItem | Parameter | GX_SDT | in | SDTExtrusion Item |
| Correcto | Parameter | Boolean | out | Correcto |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
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

&Extrusion.Load(&SDTExtrusionItem.ExtrusionId)
&Extrusion.FromJson(&SDTExtrusionItem.ToJson())
&Extrusion.Save()
&Correcto = &Extrusion.Success()

if(&Correcto)
	commit
else
	msg('Extrusion guardado: ' + &Extrusion.GetMessages().ToJson())
endif
```

### Rules (Rules)

```genexus
parm(in:&SDTExtrusionItem,out:&Correcto);
```

