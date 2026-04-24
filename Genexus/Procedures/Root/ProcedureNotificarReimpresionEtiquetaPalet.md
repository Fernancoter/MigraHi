# Procedure: ProcedureNotificarReimpresionEtiquetaPalet

- **Module:** Root
- **Description:** Procedure Notificar Reimpresion Etiqueta Palet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PaletId | Parameter | NUMERIC | inout | Palet Id |
| PaletEtiquetaImpresa | Variable | GX_BUSCOMP |  | Palet Etiqueta Impresa |
| count | Variable | NUMERIC |  | count |
| Palet | Variable | GX_BUSCOMP |  | Palet |
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

&PaletEtiquetaImpresa = new()
&PaletEtiquetaImpresa.PaletEtiquetaImpresaFechaHora = now()
&PaletEtiquetaImpresa.PaletId = &PaletId
&PaletEtiquetaImpresa.Save()
commit

&count = 0
for each PaletEtiquetaImpresa
	Where PaletId = &PaletId
	
	&count = &count +1
	
endfor

if(&count>1)
	&Palet.Load(&PaletId)
	
	NotificarImpresion.Call(&Palet.PaletNoSerie)
	
endif
```

### Rules (Rules)

```genexus
parm(&PaletId);
```

