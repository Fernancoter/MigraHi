# Procedure: SDFactorConsumoKg

- **Module:** Produccion
- **Description:** SDFactor Consumo Kg
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaKg | Parameter | NUMERIC | in | Bobina Kg |
| Factor | Parameter | NUMERIC | out | Factor |
| ConfiguracionValor | Variable | LONGVARCHAR |  | Configuracion Valor |
| Configuracion | Variable | GX_BUSCOMP |  | Configuracion |
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
	
	for each
		where ConfiguracionKey = 'MaterialBobina'
		&ConfiguracionValor = ConfiguracionValor
		Exit
	when none
		
		//Valor predeterminado carreras (3 Carreras)
		&ConfiguracionValor = '3'
		
		//Registro de paramtero MaterialBobina
		&Configuracion = New()
		&Configuracion.ConfiguracionKey = 'MaterialBobina'
		&Configuracion.ConfiguracionValor = &ConfiguracionValor
		&Configuracion.Save()
		
		if(&Configuracion.Success())
			commit
		endif
	endfor

        &Factor =  &ConfiguracionValor.ToNumeric()
	
	//	Do Case
//		Case &BobinaKg > 650 and &BobinaKg <= 800
//		        &Factor = 3
//		Case &BobinaKg > 480 and &BobinaKg <= 650
//			&Factor = 3
//		Case &BobinaKg > 350 and &BobinaKg <= 480
//		        &Factor = 2
//		Case &BobinaKg >= 150 and &BobinaKg <= 350
//		        &Factor = 1
//		Otherwise
//		        &Factor = 1
//	EndCase
```

### Rules (Rules)

```genexus
parm(in:&BobinaKg, out:&Factor);
```

