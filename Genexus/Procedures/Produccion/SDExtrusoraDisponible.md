# Procedure: SDExtrusoraDisponible

- **Module:** Produccion
- **Description:** SDExtrusora Disponible
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Disponible | Parameter | Boolean | out | Disponible |
| ExtrusionEstado | Variable | VARCHAR |  | Extrusion Estado |
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| isOK | Variable | Boolean |  | is OK |
| DiaExtrusionId | Variable | NUMERIC |  | Extrusion Id |
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
 
 &Disponible = true
 
 for each
	 where ExtrusionId > 0
	 where ExtrusionId <> &ExtrusionId
	 where ExtrusionExtrusoraId = &ExtrusoraId
	 &DiaExtrusionId = ExtrusionId
	 &ExtrusionEstado = ExtrusionEstado
	 
	 Do Case
		 Case &ExtrusionEstado = EstadoExtrusion.EnProceso
		      &Disponible = false
		      Exit
		 
		 Case &ExtrusionEstado = EstadoExtrusion.Intermedia
		      &Disponible = false
		      Exit	 
		 
		 Case &ExtrusionEstado = EstadoExtrusion.Programada
		      
		      do 'BobinaEnProceso'
		      
		      if(&isOK)
			   &Disponible = false
		           Exit
		      endif
	 EndCase
 Endfor

 Sub 'BobinaEnProceso'
	 
	 &isOK = false
	 
	 for each
		 where BobinaId > 0
		 where ExtrusionId = &DiaExtrusionId
		 
		 if(BobinaEstado = EstadoBobina.EnProceso)
			 &isOK = true
			 Exit
		 endif 
	 endfor
 EndSub
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&ExtrusoraId, out:&Disponible);
```

