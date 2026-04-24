# Procedure: SDExtrusoraMezcladora

- **Module:** Produccion
- **Description:** SDExtrusoraMezcladora
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| HusilloMolido | Parameter | NUMERIC | in | Husillo Molido |
| HusilloVirgen | Parameter | NUMERIC | in | Husillo Virgen |
| MolidoMax | Variable | NUMERIC |  | Molido Max |
| MolidoMin | Variable | NUMERIC |  | Molido Min |
| SDTExtMezcladora | Parameter | GX_SDT | out | SDTExt Mezcladora |
| VirgenMax | Variable | NUMERIC |  | Virgen Max |
| VirgenMin | Variable | NUMERIC |  | Virgen Min |
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


	for each DB.ExtrusoraMezcladora
		where ExtrusoraMezcladoraId > 0
		where ExtrusoraId = &ExtrusoraId
		
		&VirgenMin = ExtrusoraMezcladoraHusilloVirgenMin
		&VirgenMax = ExtrusoraMezcladoraHusilloVirgenMax
		&MolidoMin = ExtrusoraMezcladoraHusilloMolidoMin
		&MolidoMax = ExtrusoraMezcladoraHusilloMolidoMax
		
		if (&HusilloVirgen >= &VirgenMin and &HusilloVirgen <= &VirgenMax) and (&HusilloMolido >= &MolidoMin and &HusilloMolido <= &MolidoMax)
			&SDTExtMezcladora = New()
			&SDTExtMezcladora.ExtrusoraMezcladoraKgMolido = ExtrusoraMezcladoraKgMolido
			&SDTExtMezcladora.ExtrusoraMezcladoraKgVirgen = ExtrusoraMezcladoraKgVirgen
			Exit
		endif
	endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusoraId, in:&HusilloVirgen, in:&HusilloMolido, out:&SDTExtMezcladora);
```

