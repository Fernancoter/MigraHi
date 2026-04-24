# Procedure: InsertarManualenteBobinas

- **Module:** admin
- **Description:** Insertar Manualente Bobinas
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaNo | Variable | NUMERIC |  | Bobina No |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| LoteVirgen | Variable | CHARACTER |  | Lote Virgen |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| SiloMolidoId | Variable | NUMERIC |  | Silo Molido Id |
| SiloVirgenId | Variable | NUMERIC |  | Silo Virgen Id |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| Pares | Parameter | NUMERIC | in | Pares |
| i | Variable | NUMERIC |  | i |
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
WWPBaseObjects.LoadWWPContext.Call(&WWPContext)

Debugger.Call(NivelDebug.Informativo, &Pgmname, 'Inicio Insertar Extrusión: ' + &ExtrusionId.ToString())



	&i = 1

Do while &Pares >= &i
	
	&Extrusion.Load(&ExtrusionId)
	&SiloVirgenId = &Extrusion.ExtrusionSiloId
	&LoteVirgen = &Extrusion.ExtrusionLoteSilo
	&SiloMolidoId = &Extrusion.ExtrusionSiloMolidoId
	&ProductoId = &Extrusion.ExtrusionProductoId
	&ExtrusoraId = &Extrusion.ExtrusionExtrusoraId
	
	&BobinaNo = GenerarBobinaNo.Udp(&ExtrusoraId, &ProductoId)
	&BobinaNo += 1
	
	//Estacion A
	&SDTBobinaItem = new()
	&SDTBobinaItem.ExtrusionId = &ExtrusionId
	&SDTBobinaItem.BobinaNo = &BobinaNo
	&SDTBobinaItem.BobinaEstado = EstadoBobina.Disponible
	&SDTBobinaItem.BobinaHoraInicio = Now()
	&SDTBobinaItem.BobinaHoraSalida = Now()
	&SDTBobinaItem.BobinaOrigen = OrigenBobina.A
	&SDTBobinaItem.BobinaSiloVirgenId = &SiloVirgenId
	&SDTBobinaItem.BobinaLoteVirgen = &LoteVirgen
	&SDTBobinaItem.BobinaSiloMolidoId = &SiloMolidoId
	
	&SDTBobinaItem.BobinaKg = 500
	&SDTBobinaItem.BobinaEspesor = 12
	&SDTBobinaItem.BobinaObservaciones = 'Insertada manualmente por ' + &WWPContext.UserName
	
	GuardarBobina.Call(&SDTBobinaItem)
	
	//Estacion B
	&SDTBobinaItem = new()
	&SDTBobinaItem.ExtrusionId = &ExtrusionId
	&SDTBobinaItem.BobinaNo = &BobinaNo
	&SDTBobinaItem.BobinaEstado = EstadoBobina.Disponible
	&SDTBobinaItem.BobinaHoraInicio = Now()
	&SDTBobinaItem.BobinaHoraSalida = Now()
	&SDTBobinaItem.BobinaOrigen = OrigenBobina.B
	&SDTBobinaItem.BobinaSiloVirgenId = &SiloVirgenId
	&SDTBobinaItem.BobinaLoteVirgen = &LoteVirgen
	&SDTBobinaItem.BobinaSiloMolidoId = &SiloMolidoId
	
	&SDTBobinaItem.BobinaKg = 500
	&SDTBobinaItem.BobinaEspesor = 12
	&SDTBobinaItem.BobinaObservaciones = 'Insertada manualmente por ' + &WWPContext.UserName
	
	GuardarBobina.Call(&SDTBobinaItem)
	&i =  &i+1

Enddo
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in: &Pares);
```

