# Procedure: IniciarBobinas

- **Module:** Produccion
- **Description:** Iniciar Bobinas
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
	
	&Extrusion.Load(&ExtrusionId)
	&SiloVirgenId = &Extrusion.ExtrusionSiloId
	&LoteVirgen = &Extrusion.ExtrusionLoteSilo
	&SiloMolidoId = &Extrusion.ExtrusionSiloMolidoId
	&ProductoId = &Extrusion.ExtrusionProductoId
	&ExtrusoraId = &Extrusion.ExtrusionExtrusoraId
	
	&BobinaNo = Produccion.GenerarBobinaNo.Udp(&ExtrusoraId, &ProductoId)
	&BobinaNo += 1
	
	//Estacion A
	&SDTBobinaItem = new()
	&SDTBobinaItem.ExtrusionId = &ExtrusionId
	&SDTBobinaItem.BobinaNo = &BobinaNo
	&SDTBobinaItem.BobinaEstado = EstadoBobina.EnProceso
	&SDTBobinaItem.BobinaHoraInicio = Now()
	&SDTBobinaItem.BobinaHoraSalida = Now()
	&SDTBobinaItem.BobinaOrigen = OrigenBobina.A
	&SDTBobinaItem.BobinaSiloVirgenId = &SiloVirgenId
	&SDTBobinaItem.BobinaLoteVirgen = &LoteVirgen
	&SDTBobinaItem.BobinaSiloMolidoId = &SiloMolidoId
	
	GuardarBobina.Call(&SDTBobinaItem)
	
	//Estacion B
	&SDTBobinaItem = new()
	&SDTBobinaItem.ExtrusionId = &ExtrusionId
	&SDTBobinaItem.BobinaNo = &BobinaNo
	&SDTBobinaItem.BobinaEstado = EstadoBobina.EnProceso
	&SDTBobinaItem.BobinaHoraInicio = Now()
	&SDTBobinaItem.BobinaHoraSalida = Now()
	&SDTBobinaItem.BobinaOrigen = OrigenBobina.B
	&SDTBobinaItem.BobinaSiloVirgenId = &SiloVirgenId
	&SDTBobinaItem.BobinaLoteVirgen = &LoteVirgen
	&SDTBobinaItem.BobinaSiloMolidoId = &SiloMolidoId
	
	GuardarBobina.Call(&SDTBobinaItem)
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId);
```

