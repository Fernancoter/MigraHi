# Glosario de dominio -- HiCone3

HiCone3 es un ERP GeneXus para manufactura de plásticos. Las entidades se agrupan por módulo funcional: `DB` reúne los maestros del dominio (Bobina, Carrete, Extrusora, Prensa, Troquel, Embarque y sus dependientes); `Calidad`, `Reportes` y `Downtime` contienen observaciones y clasificaciones de eventos de producción; `WWPBaseObjects` son transacciones de infraestructura del framework DVelop WorkWithPlus y no del negocio.

Las definiciones salen de tres fuentes: descripciones auténticas capturadas en el KB, inferencias estructurales derivadas puramente de atributos y relaciones FK, o entradas marcadas `TODO` cuando no hay evidencia suficiente. Toda relación listada es traceable a un atributo con prefijo FK o a una arista `callsTo`/`calledBy` del grafo.

**Known limitation**: el heurístico de FK detecta tres patrones -- `<Trn>Sufijo`, `<self><Trn>Sufijo` y `<prefijo-libre><Trn><suf>` donde `suf ∈ {Id, Nombre, Name, Code, Codigo}`. NO detecta siglas o abreviaciones (p. ej. `PrensadoOper` como referencia a `Operador`): estos casos quedan como falsos negativos genuinos y se manejan caso a caso en fases posteriores.

## Índice

- **[DB](#db)** -- 53 entidades
    - [BarCode](#barcode)
    - [Bobina](#bobina)
    - [Budget](#budget)
    - [Carrera](#carrera)
    - [Carrete](#carrete)
    - [Company](#company)
    - [Configuracion](#configuracion)
    - [Consolidated](#consolidated)
    - [Customer](#customer)
    - [Document](#document)
    - [Documento](#documento)
    - [Embarque](#embarque)
    - [EmbarqueDetalle](#embarquedetalle)
    - [EmbarquePallet](#embarquepallet)
    - [EtiquetadoOperador](#etiquetadooperador)
    - [Existencia](#existencia)
    - [ExistenciaProducto](#existenciaproducto)
    - [ExistenciaSilo](#existenciasilo)
    - [Extrusion](#extrusion)
    - [ExtrusionInterrupcion](#extrusioninterrupcion)
    - [ExtrusionResultado](#extrusionresultado)
    - [Extrusora](#extrusora)
    - [ExtrusoraBobina](#extrusorabobina)
    - [ExtrusoraMezcladora](#extrusoramezcladora)
    - [ExtrusoraProducto](#extrusoraproducto)
    - [FTB](#ftb)
    - [Interrupcion](#interrupcion)
    - [Inventario](#inventario)
    - [Lote](#lote)
    - [LoteReporte](#lotereporte)
    - [Operador](#operador)
    - [OrdenEtiquetado](#ordenetiquetado)
    - [Order](#order)
    - [Palet](#palet)
    - [PaletCarrete](#paletcarrete)
    - [Prensa](#prensa)
    - [PrensaCarrera](#prensacarrera)
    - [Prensado](#prensado)
    - [PrensadoBobina](#prensadobobina)
    - [PrensadoInterrupcion](#prensadointerrupcion)
    - [PrensadoResultado](#prensadoresultado)
    - [PrensaProducto](#prensaproducto)
    - [PrensaTroquel](#prensatroquel)
    - [Product](#product)
    - [Producto](#producto)
    - [ProductoCategoria](#productocategoria)
    - [ProductoTerminado](#productoterminado)
    - [Remission](#remission)
    - [SalesPerson](#salesperson)
    - [Silo](#silo)
    - [StatementOfIncome](#statementofincome)
    - [Troquel](#troquel)
    - [Turno](#turno)
- **[Calidad](#calidad)** -- 3 entidades
    - [CarreteDefecto](#carretedefecto)
    - [Reclamo](#reclamo)
    - [ReclamoDetalle](#reclamodetalle)
- **[Downtime](#downtime)** -- 1 entidades
    - [DownTimeCode](#downtimecode)
- **[Reportes](#reportes)** -- 3 entidades
    - [CausaInterrupcion](#causainterrupcion)
    - [ExtrusoraObservacion](#extrusoraobservacion)
    - [PrensaObservacion](#prensaobservacion)
- **[Root](#root)** -- 1 entidades
    - [PaletEtiquetaImpresa](#paletetiquetaimpresa)
- **[WWPBaseObjects (infraestructura)](#wwpbaseobjects)** -- 4 entidades
    - [Audit](#audit)
    - [UserCustomizations](#usercustomizations)
    - [WWP_Entity](#wwp-entity)
    - [WWP_UserExtended](#wwp-userextended)
- **[WWPBaseObjects.Discussions (infraestructura)](#wwpbaseobjects-discussions)** -- 2 entidades
    - [WWP_DiscussionMessage](#wwp-discussionmessage)
    - [WWP_DiscussionMessageMention](#wwp-discussionmessagemention)
- **[WWPBaseObjects.Mail (infraestructura)](#wwpbaseobjects-mail)** -- 2 entidades
    - [WWP_Mail](#wwp-mail)
    - [WWP_MailTemplate](#wwp-mailtemplate)
- **[WWPBaseObjects.Notifications.Common (infraestructura)](#wwpbaseobjects-notifications-common)** -- 2 entidades
    - [WWP_Notification](#wwp-notification)
    - [WWP_NotificationDefinition](#wwp-notificationdefinition)
- **[WWPBaseObjects.Notifications.Web (infraestructura)](#wwpbaseobjects-notifications-web)** -- 2 entidades
    - [WWP_WebClient](#wwp-webclient)
    - [WWP_WebNotification](#wwp-webnotification)
- **[WWPBaseObjects.SMS (infraestructura)](#wwpbaseobjects-sms)** -- 1 entidades
    - [WWP_SMS](#wwp-sms)
- **[WWPBaseObjects.Subscriptions (infraestructura)](#wwpbaseobjects-subscriptions)** -- 1 entidades
    - [WWP_Subscription](#wwp-subscription)

## DB

### BarCode

Entidad del módulo `DB` con 3 atributos incluyendo `BarCodeValue`, `BarCodeImage`, `BarCodeDateTime`.

- **Módulo:** `DB`
- **Transaction:** `DB.BarCode`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

### Bobina

Entidad del módulo `DB` con 38 atributos incluyendo `BobinaNoSerie`, `BobinaOrigen`, `BobinaHoraInicio`, `BobinaHoraSalida`, `BobinaNo`, `BobinaKg`.

- **Módulo:** `DB`
- **Transaction:** `DB.Bobina`
- **Entidades relacionadas:** [DownTimeCode](#downtimecode), [Extrusion](#extrusion), [Extrusora](#extrusora), [Lote](#lote), [Operador](#operador), [Prensa](#prensa), [Prensado](#prensado), [Producto](#producto), [Silo](#silo), [Turno](#turno)
- **Source:** inferido-del-código

### Budget

Entidad del módulo `DB` con 27 atributos incluyendo `BudgetYear`, `BudgetMonth`, `BudgetReal`, `BudgetEstimated`, `BudgetOutlook`, `BudgetPrice`.

- **Módulo:** `DB`
- **Transaction:** `DB.Budget`
- **Entidades relacionadas:** [Consolidated](#consolidated), [Customer](#customer), [Product](#product)
- **Source:** inferido-del-código

### Carrera

Entidad del módulo `DB` con 32 atributos incluyendo `CarreraNo`, `CarreraEstado`, `CarreraPaletTerminado`, `CarreraFechaRegistro`, `CarreraFechaValidacion`, `CarreraTroquel`.

- **Módulo:** `DB`
- **Transaction:** `DB.Carrera`
- **Entidades relacionadas:** [Bobina](#bobina), [DownTimeCode](#downtimecode), [Extrusion](#extrusion), [Interrupcion](#interrupcion), [Palet](#palet), [PrensadoBobina](#prensadobobina), [Troquel](#troquel)
- **Source:** inferido-del-código

### Carrete

Entidad del módulo `DB` con 15 atributos incluyendo `CarreteNoLinea`, `CarreteNoSerie`, `CarreteEstado`, `CarreteEnMolino`, `CarreteMolino`, `CarreteMermaMolino`.

- **Módulo:** `DB`
- **Transaction:** `DB.Carrete`
- **Entidades relacionadas:** [Carrera](#carrera), [Palet](#palet)
- **Source:** inferido-del-código

### Company

TODO: definir -- sin descripción sustantiva en el KB y sin evidencia suficiente en código.
Archivos a revisar: [`Transactions/DB/Company.md`](Transactions/DB/Company.md).

- **Módulo:** `DB`
- **Transaction:** `DB.Company`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** TODO

### Configuracion

TODO: definir -- sin descripción sustantiva en el KB y sin evidencia suficiente en código.
Archivos a revisar: [`Transactions/DB/Configuracion.md`](Transactions/DB/Configuracion.md).

- **Módulo:** `DB`
- **Transaction:** `DB.Configuracion`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** TODO

### Consolidated

TODO: definir -- sin descripción sustantiva en el KB y sin evidencia suficiente en código.
Archivos a revisar: [`Transactions/DB/Consolidated.md`](Transactions/DB/Consolidated.md).

- **Módulo:** `DB`
- **Transaction:** `DB.Consolidated`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** TODO

### Customer

Clientes

- **Módulo:** `DB`
- **Transaction:** `DB.Customer`
- **Entidades relacionadas:** [Budget](#budget), [Consolidated](#consolidated)
- **Source:** description-del-KB

### Document

Entidad del módulo `DB` con 4 atributos incluyendo `DocumentData`, `DocumentFileName`, `DocumentFileExtension`.

- **Módulo:** `DB`
- **Transaction:** `DB.Document`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

### Documento

Entidad del módulo `DB` con 5 atributos incluyendo `DocumentoNombre`, `DocumentoData`, `DocumentoArchivo`, `DocumentoExt`.

- **Módulo:** `DB`
- **Transaction:** `DB.Documento`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

### Embarque

Entidad del módulo `DB` con 26 atributos incluyendo `EmbarqueCodigo`, `EmbarqueOrderDoc`, `EmbarqueCliente`, `EmbarqueClienteGrupo`, `EmbarqueClienteEnvia`, `EmbarqueRemissionDoc`.

- **Módulo:** `DB`
- **Transaction:** `DB.Embarque`
- **Entidades relacionadas:** [Order](#order), [Remission](#remission)
- **Source:** inferido-del-código

### EmbarqueDetalle

Entidad del módulo `DB` con 20 atributos incluyendo `EmbarqueDetalleProducto`, `EmbarqueDetalleCantidadPallets`, `EmbarqueDetalleConfirmadoPorAdministracion`, `EmbarqueDetalleEmbarcado`.

- **Módulo:** `DB`
- **Transaction:** `DB.EmbarqueDetalle`
- **Entidades relacionadas:** [Embarque](#embarque), [Producto](#producto)
- **Source:** inferido-del-código

### EmbarquePallet

Entidad del módulo `DB` con 6 atributos incluyendo `EmbarquePalletNoPallet`, `EmbarquePalletValido`, `EmbarquePalletMotivoError`, `EmbarquePalletHora`.

- **Módulo:** `DB`
- **Transaction:** `DB.EmbarquePallet`
- **Entidades relacionadas:** [Embarque](#embarque), [EmbarqueDetalle](#embarquedetalle)
- **Source:** inferido-del-código

### EtiquetadoOperador

Entidad del módulo `DB` con 10 atributos incluyendo `EtiquetadoOperadorFechaHora`, `EtiquetadoOperadorVoBoCarrete`, `EtiquetadoOperadorLineaEtiquetadora`, `EtiquetadoOperadorObservacionCarrete`, `EtiquetadoOperadorMotivoMolino`.

- **Módulo:** `DB`
- **Transaction:** `DB.EtiquetadoOperador`
- **Entidades relacionadas:** [Carrete](#carrete), [Operador](#operador), [OrdenEtiquetado](#ordenetiquetado)
- **Source:** inferido-del-código

### Existencia

Entidad del módulo `DB` con 5 atributos incluyendo `ExistenciaNo`, `ExistenciaFechaHora`, `ExistenciaTurnoId`, `ExistenciaTurnoNombre`.

- **Módulo:** `DB`
- **Transaction:** `DB.Existencia`
- **Entidades relacionadas:** [Turno](#turno)
- **Source:** inferido-del-código

### ExistenciaProducto

Entidad del módulo `DB` con 10 atributos incluyendo `ExistenciaProductoCantidad`, `ExistenciaProductoCantidadSistema`, `ExistenciaProductoMillarReal`, `ExistenciaProductoMillarSistema`, `ExistenciaProductoCantidadTurno`, `ExistenciaProductoCantidadTurnoSistema`.

- **Módulo:** `DB`
- **Transaction:** `DB.ExistenciaProducto`
- **Entidades relacionadas:** [Existencia](#existencia), [Producto](#producto)
- **Source:** inferido-del-código

### ExistenciaSilo

Entidad del módulo `DB` con 8 atributos incluyendo `ExistenciaSiloCantidad`, `ExistenciaSiloVirgenLote`.

- **Módulo:** `DB`
- **Transaction:** `DB.ExistenciaSilo`
- **Entidades relacionadas:** [Existencia](#existencia), [Silo](#silo)
- **Source:** inferido-del-código

### Extrusion

Entidad del módulo `DB` con 34 atributos incluyendo `ExtrusionExtrusoraId`, `ExtrusionExtrusoraNombre`, `ExtrusionTurnoId`, `ExtrusionTurnoNombre`, `ExtrusionProductoId`, `ExtrusionProductoNombre`.

- **Módulo:** `DB`
- **Transaction:** `DB.Extrusion`
- **Entidades relacionadas:** [ExtrusionInterrupcion](#extrusioninterrupcion), [ExtrusionResultado](#extrusionresultado), [Extrusora](#extrusora), [Interrupcion](#interrupcion), [Lote](#lote), [Operador](#operador), [Producto](#producto), [Silo](#silo), [Turno](#turno)
- **Source:** inferido-del-código

### ExtrusionInterrupcion

Entidad del módulo `DB` con 3 atributos.

- **Módulo:** `DB`
- **Transaction:** `DB.ExtrusionInterrupcion`
- **Entidades relacionadas:** [Extrusion](#extrusion), [Interrupcion](#interrupcion)
- **Source:** inferido-del-código

### ExtrusionResultado

Entidad del módulo `DB` con 25 atributos incluyendo `ExtrusionResultadoVelLaminadora`, `ExtrusionResultadoVelHusillo`, `ExtrusionResultadoBobinasMolino`, `ExtrusionResultadoBobinasReposo`, `ExtrusionResultadoTotalKg`, `ExtrusionResultadoTotalMermaKg`.

- **Módulo:** `DB`
- **Transaction:** `DB.ExtrusionResultado`
- **Entidades relacionadas:** [Extrusion](#extrusion), [Extrusora](#extrusora), [Operador](#operador), [Producto](#producto), [Silo](#silo), [Turno](#turno)
- **Source:** inferido-del-código

### Extrusora

Entidad del módulo `DB` con 6 atributos incluyendo `ExtrusoraNombre`, `ExtrusoraImagen`, `ExtrusoraTurnoId`, `ExtrusoraOperadorId`.

- **Módulo:** `DB`
- **Transaction:** `DB.Extrusora`
- **Entidades relacionadas:** [Operador](#operador), [Turno](#turno)
- **Source:** inferido-del-código

### ExtrusoraBobina

Entidad del módulo `DB` con 6 atributos.

- **Módulo:** `DB`
- **Transaction:** `DB.ExtrusoraBobina`
- **Entidades relacionadas:** [Bobina](#bobina), [Extrusora](#extrusora), [Producto](#producto)
- **Source:** inferido-del-código

### ExtrusoraMezcladora

Entidad del módulo `DB` con 9 atributos incluyendo `ExtrusoraMezcladoraHusilloVirgenMin`, `ExtrusoraMezcladoraHusilloVirgenMax`, `ExtrusoraMezcladoraHusilloMolidoMin`, `ExtrusoraMezcladoraHusilloMolidoMax`, `ExtrusoraMezcladoraKgVirgen`, `ExtrusoraMezcladoraKgMolido`.

- **Módulo:** `DB`
- **Transaction:** `DB.ExtrusoraMezcladora`
- **Entidades relacionadas:** [Extrusora](#extrusora)
- **Source:** inferido-del-código

### ExtrusoraProducto

Entidad del módulo `DB` con 11 atributos incluyendo `ExtrusoraProductoCalibre`, `ExtrusoraProductoAncho`, `ExtrusoraProductoLongitud`, `ExtrusoraProductoTiempoReposo`, `ExtrusoraProductoTiempoProceso`.

- **Módulo:** `DB`
- **Transaction:** `DB.ExtrusoraProducto`
- **Entidades relacionadas:** [Extrusora](#extrusora), [Producto](#producto)
- **Source:** inferido-del-código

### FTB

Entidad del módulo `DB` con 30 atributos incluyendo `FTBCustomer`, `FTBCustomerNameShipping`, `FTBShipping`, `FTBYear`, `FTBMonth`, `FTBOrderDoc`.

- **Módulo:** `DB`
- **Transaction:** `DB.FTB`
- **Entidades relacionadas:** [Budget](#budget), [Consolidated](#consolidated), [Customer](#customer), [Order](#order), [Product](#product), [SalesPerson](#salesperson)
- **Source:** inferido-del-código

### Interrupcion

Entidad del módulo `DB` con 9 atributos incluyendo `InterrupcionHoraInicio`, `InterrupcionHoraFin`, `InterrupcionTiempo`, `InterrupcionConcluida`, `InterrupcionMotivo`.

- **Módulo:** `DB`
- **Transaction:** `DB.Interrupcion`
- **Entidades relacionadas:** [DownTimeCode](#downtimecode)
- **Source:** inferido-del-código

### Inventario

Entidad del módulo `DB` con 6 atributos incluyendo `InventarioProductoId`, `InventarioProductoNombre`, `InventarioFechaHora`, `InventarioInicioConsecutivo`, `InventarioCantidad`.

- **Módulo:** `DB`
- **Transaction:** `DB.Inventario`
- **Entidades relacionadas:** [Producto](#producto)
- **Source:** inferido-del-código

### Lote

Entidad del módulo `DB` con 13 atributos incluyendo `LoteEmbarque`, `LotePO`, `LoteFechaRegistro`, `LoteTrunkNo`, `LoteTipoMaterial`, `LoteSiloId`.

- **Módulo:** `DB`
- **Transaction:** `DB.Lote`
- **Entidades relacionadas:** [Embarque](#embarque), [Silo](#silo)
- **Source:** inferido-del-código

### LoteReporte

Entidad del módulo `DB` con 4 atributos incluyendo `LoteReporteNumero`, `LoteReporteDato`.

- **Módulo:** `DB`
- **Transaction:** `DB.LoteReporte`
- **Entidades relacionadas:** [Embarque](#embarque), [Lote](#lote)
- **Source:** inferido-del-código

### Operador

Entidad del módulo `DB` con 5 atributos incluyendo `OperadorNombre`, `OperadorFotografia`, `OperadorUserGUID`, `OperadorActivo`.

- **Módulo:** `DB`
- **Transaction:** `DB.Operador`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

### OrdenEtiquetado

Entidad del módulo `DB` con 16 atributos incluyendo `OrdenEtiquetadoFechaInicio`, `OrdenEtiquetadoFechaTermina`, `OrdenEtiquetadoObservaciones`, `OrdenEtiquetadoVelLineaUno`, `OrdenEtiquetadoVelLineaDos`, `OrdenEtiquetadoPiezasBuenas`.

- **Módulo:** `DB`
- **Transaction:** `DB.OrdenEtiquetado`
- **Entidades relacionadas:** [Operador](#operador), [Turno](#turno)
- **Source:** inferido-del-código

### Order

Entidad del módulo `DB` con 19 atributos incluyendo `OrderDoc`, `OrderNumPar`, `OrderKey`, `OrderDate`, `OrderDeliveryDate`, `OrderQuantity`.

- **Módulo:** `DB`
- **Transaction:** `DB.Order`
- **Entidades relacionadas:** [Consolidated](#consolidated), [Customer](#customer), [FTB](#ftb), [Product](#product)
- **Source:** inferido-del-código

### Palet

Entidad del módulo `DB` con 18 atributos incluyendo `PaletNoSerie`, `PaletNo`, `PaletOperadorId`, `PaletProductoId`, `PaletPrensaNombre`, `PaletProductoNombre`.

- **Módulo:** `DB`
- **Transaction:** `DB.Palet`
- **Entidades relacionadas:** [Operador](#operador), [Prensa](#prensa), [Prensado](#prensado), [Producto](#producto)
- **Source:** inferido-del-código

### PaletCarrete

Entidad del módulo `DB` con 4 atributos.

- **Módulo:** `DB`
- **Transaction:** `DB.PaletCarrete`
- **Entidades relacionadas:** [Carrete](#carrete), [Palet](#palet)
- **Source:** inferido-del-código

### Prensa

Entidad del módulo `DB` con 8 atributos incluyendo `PrensaNombre`, `PrensaImagen`, `PrensaMarca`, `PrensaModelo`, `PrensaTurnoId`, `PrensaOperadorId`.

- **Módulo:** `DB`
- **Transaction:** `DB.Prensa`
- **Entidades relacionadas:** [Operador](#operador), [Turno](#turno)
- **Source:** inferido-del-código

### PrensaCarrera

Entidad del módulo `DB` con 4 atributos.

- **Módulo:** `DB`
- **Transaction:** `DB.PrensaCarrera`
- **Entidades relacionadas:** [Carrera](#carrera), [Prensa](#prensa)
- **Source:** inferido-del-código

### Prensado

Entidad del módulo `DB` con 35 atributos incluyendo `PrensadoFecha`, `PrensadoPrensaId`, `PrensadoPrensaNombre`, `PrensadoTurnoId`, `PrensadoTurnoNombre`, `PrensadoProductoId`.

- **Módulo:** `DB`
- **Transaction:** `DB.Prensado`
- **Entidades relacionadas:** [Bobina](#bobina), [Interrupcion](#interrupcion), [Operador](#operador), [Prensa](#prensa), [PrensadoBobina](#prensadobobina), [PrensadoInterrupcion](#prensadointerrupcion), [PrensadoResultado](#prensadoresultado), [Producto](#producto), [Troquel](#troquel), [Turno](#turno)
- **Source:** inferido-del-código

### PrensadoBobina

Entidad del módulo `DB` con 23 atributos incluyendo `PrensadoBobinaCantCarrera`.

- **Módulo:** `DB`
- **Transaction:** `DB.PrensadoBobina`
- **Entidades relacionadas:** [Bobina](#bobina), [Operador](#operador), [Prensa](#prensa), [Prensado](#prensado), [Producto](#producto), [Turno](#turno)
- **Source:** inferido-del-código

### PrensadoInterrupcion

Entidad del módulo `DB` con 3 atributos.

- **Módulo:** `DB`
- **Transaction:** `DB.PrensadoInterrupcion`
- **Entidades relacionadas:** [Interrupcion](#interrupcion), [Prensado](#prensado)
- **Source:** inferido-del-código

### PrensadoResultado

Entidad del módulo `DB` con 29 atributos incluyendo `PrensadoResultadoPiezasBuenas`, `PrensadoResultadoPiezasMolino`, `PrensadoResultadoMermaKg`, `PrensadoResultadoNoPalets`, `PrensadoResultadoCarretesSobrantes`, `PrensadoResultadoObservaciones`.

- **Módulo:** `DB`
- **Transaction:** `DB.PrensadoResultado`
- **Entidades relacionadas:** [Operador](#operador), [Prensa](#prensa), [Prensado](#prensado), [Turno](#turno)
- **Source:** inferido-del-código

### PrensaProducto

Entidad del módulo `DB` con 8 atributos.

- **Módulo:** `DB`
- **Transaction:** `DB.PrensaProducto`
- **Entidades relacionadas:** [Prensa](#prensa), [Producto](#producto)
- **Source:** inferido-del-código

### PrensaTroquel

Entidad del módulo `DB` con 5 atributos.

- **Módulo:** `DB`
- **Transaction:** `DB.PrensaTroquel`
- **Entidades relacionadas:** [Prensa](#prensa), [Troquel](#troquel)
- **Source:** inferido-del-código

### Product

Entidad del módulo `DB` con 12 atributos incluyendo `ProductNumber`, `ProductDesc`, `ProductUnit`, `ProductCost`, `ProductType`, `ProductExist`.

- **Módulo:** `DB`
- **Transaction:** `DB.Product`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

### Producto

Entidad del módulo `DB` con 17 atributos incluyendo `ProductoClave`, `ProductoNombre`, `ProductoDescripcion`, `ProductoCategoriaId`, `ProductoCategoriaNombre`, `ProductoPrecioUnitario`.

- **Módulo:** `DB`
- **Transaction:** `DB.Producto`
- **Entidades relacionadas:** [Inventario](#inventario), [Product](#product), [ProductoCategoria](#productocategoria)
- **Source:** inferido-del-código

### ProductoCategoria

Entidad del módulo `DB` con 3 atributos incluyendo `ProductoCategoriaNombre`, `ProductoCategoriaClaveExterna`.

- **Módulo:** `DB`
- **Transaction:** `DB.ProductoCategoria`
- **Entidades relacionadas:** [Producto](#producto)
- **Source:** inferido-del-código

### ProductoTerminado

Entidad del módulo `DB` con 14 atributos incluyendo `ProductoTerminadoPalets`, `ProductoTerminadoCarreteMillar`, `ProductoTerminadoPaletMillar`, `ProductoTerminadoPeso`, `ProductoTerminadoPesoCarrete`, `ProductoTerminadoPesoPalet`.

- **Módulo:** `DB`
- **Transaction:** `DB.ProductoTerminado`
- **Entidades relacionadas:** [Carrete](#carrete), [Palet](#palet), [Producto](#producto)
- **Source:** inferido-del-código

### Remission

Entidad del módulo `DB` con 20 atributos incluyendo `RemissionDoc`, `RemissionDate`, `RemissionQuantity`, `RemissionPXS`, `RemissionPrice`, `RemissionTotal`.

- **Módulo:** `DB`
- **Transaction:** `DB.Remission`
- **Entidades relacionadas:** [Consolidated](#consolidated), [Customer](#customer), [Embarque](#embarque), [FTB](#ftb), [Order](#order), [Product](#product)
- **Source:** inferido-del-código

### SalesPerson

TODO: definir -- sin descripción sustantiva en el KB y sin evidencia suficiente en código.
Archivos a revisar: [`Transactions/DB/SalesPerson.md`](Transactions/DB/SalesPerson.md).

- **Módulo:** `DB`
- **Transaction:** `DB.SalesPerson`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** TODO

### Silo

Entidad del módulo `DB` con 8 atributos incluyendo `SiloNombre`, `SiloCapacidad`, `SiloKgMinimo`, `SiloKgMaximo`, `SiloEstadoMaterial`, `SiloTipoMaterial`.

- **Módulo:** `DB`
- **Transaction:** `DB.Silo`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

### StatementOfIncome

Entidad del módulo `DB` con 3 atributos incluyendo `StatementOfIncomeCuenta`, `StatementOfIncomeSum`, `StatementOfIncomeSubstract`.

- **Módulo:** `DB`
- **Transaction:** `DB.StatementOfIncome`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

### Troquel

Entidad del módulo `DB` con 10 atributos incluyendo `TroquelNombre`, `TroquelEnPrensa`, `TroquelEstado`, `TroquelActivo`.

- **Módulo:** `DB`
- **Transaction:** `DB.Troquel`
- **Entidades relacionadas:** [Producto](#producto), [ProductoCategoria](#productocategoria)
- **Source:** inferido-del-código

### Turno

Entidad del módulo `DB` con 5 atributos incluyendo `TurnoNombre`, `TurnoHoraInicio`, `TurnoHoraFin`, `TurnoEnum`.

- **Módulo:** `DB`
- **Transaction:** `DB.Turno`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

## Calidad

### CarreteDefecto

Entidad del módulo `Calidad` con 2 atributos incluyendo `CarreteDefectoNombre`.

- **Módulo:** `Calidad`
- **Transaction:** `Calidad.CarreteDefecto`
- **Entidades relacionadas:** [Carrete](#carrete)
- **Source:** inferido-del-código

### Reclamo

Entidad del módulo `Calidad` con 13 atributos incluyendo `ReclamoFecha`, `ReclamoEstatus`, `ReclamoDescripcion`, `ReclamoCodigo`, `ReclamoCarretesReportados`, `ReclamoMillaresReportados`.

- **Módulo:** `Calidad`
- **Transaction:** `Calidad.Reclamo`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

### ReclamoDetalle

Entidad del módulo `Calidad` con 10 atributos incluyendo `ReclamoDetalleCodigo`, `ReclamoDetalleEstado`, `ReclamoDetalleObservacionRCA`, `ReclamoDetalleProductoId`, `ReclamoDetalleProductoNombre`, `ReclamoDetalleMillar`.

- **Módulo:** `Calidad`
- **Transaction:** `Calidad.ReclamoDetalle`
- **Entidades relacionadas:** [CarreteDefecto](#carretedefecto), [Producto](#producto), [Reclamo](#reclamo)
- **Source:** inferido-del-código

## Downtime

### DownTimeCode

Entidad del módulo `Downtime` con 4 atributos incluyendo `DownTimeCodeName`, `DownTimeCodeDescription`, `DownTimeCodeType`.

- **Módulo:** `Downtime`
- **Transaction:** `Downtime.DownTimeCode`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

## Reportes

### CausaInterrupcion

Entidad del módulo `Reportes` con 4 atributos incluyendo `CausaInterrupcionNombre`, `CausaInterrupcionPrensa`, `CausaInterrupcionExtrusora`.

- **Módulo:** `Reportes`
- **Transaction:** `Reportes.CausaInterrupcion`
- **Entidades relacionadas:** [Extrusora](#extrusora), [Interrupcion](#interrupcion), [Prensa](#prensa)
- **Source:** inferido-del-código

### ExtrusoraObservacion

Entidad del módulo `Reportes` con 11 atributos incluyendo `ExtrusoraObservacionFecha`, `ExtrusoraObservacionTiempoInterrupcion`, `ExtrusoraObservacionTiempoSupervisor`, `ExtrusoraObservacionDescripcion`.

- **Módulo:** `Reportes`
- **Transaction:** `Reportes.ExtrusoraObservacion`
- **Entidades relacionadas:** [CausaInterrupcion](#causainterrupcion), [Extrusora](#extrusora), [Interrupcion](#interrupcion), [Turno](#turno)
- **Source:** inferido-del-código

### PrensaObservacion

Entidad del módulo `Reportes` con 11 atributos incluyendo `PrensaObservacionFecha`, `PrensaObservacionTiempoInterrupcion`, `PrensaObservacionTiempoSupervisor`, `PrensaObservacionDescripcion`.

- **Módulo:** `Reportes`
- **Transaction:** `Reportes.PrensaObservacion`
- **Entidades relacionadas:** [CausaInterrupcion](#causainterrupcion), [Interrupcion](#interrupcion), [Prensa](#prensa), [Turno](#turno)
- **Source:** inferido-del-código

## Root

### PaletEtiquetaImpresa

Entidad del módulo `Root` con 3 atributos incluyendo `PaletEtiquetaImpresaFechaHora`.

- **Módulo:** `Root`
- **Transaction:** `Root.PaletEtiquetaImpresa`
- **Entidades relacionadas:** [Palet](#palet)
- **Source:** inferido-del-código

## WWPBaseObjects (infraestructura)

### Audit

Entidad del módulo `WWPBaseObjects` con 11 atributos incluyendo `AuditDate`, `AuditTableName`, `AuditTableKey`, `AuditDescription`, `AuditShortDescription`, `AuditAction`.

- **Módulo:** `WWPBaseObjects`
- **Transaction:** `WWPBaseObjects.Audit`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

### UserCustomizations

User Custom

- **Módulo:** `WWPBaseObjects`
- **Transaction:** `WWPBaseObjects.UserCustomizations`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** description-del-KB

### WWP_Entity

TODO: definir -- sin descripción sustantiva en el KB y sin evidencia suficiente en código.
Archivos a revisar: [`Transactions/WWPBaseObjects/WWP_Entity.md`](Transactions/WWPBaseObjects/WWP_Entity.md).

- **Módulo:** `WWPBaseObjects`
- **Transaction:** `WWPBaseObjects.WWP_Entity`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** TODO

### WWP_UserExtended

Extended User from GAMUser

- **Módulo:** `WWPBaseObjects`
- **Transaction:** `WWPBaseObjects.WWP_UserExtended`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** description-del-KB

## WWPBaseObjects.Discussions (infraestructura)

### WWP_DiscussionMessage

Discussion Message

- **Módulo:** `WWPBaseObjects.Discussions`
- **Transaction:** `WWPBaseObjects.Discussions.WWP_DiscussionMessage`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** description-del-KB

### WWP_DiscussionMessageMention

Discussion Message Mention

- **Módulo:** `WWPBaseObjects.Discussions`
- **Transaction:** `WWPBaseObjects.Discussions.WWP_DiscussionMessageMention`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** description-del-KB

## WWPBaseObjects.Mail (infraestructura)

### WWP_Mail

Mail

- **Módulo:** `WWPBaseObjects.Mail`
- **Transaction:** `WWPBaseObjects.Mail.WWP_Mail`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** description-del-KB

### WWP_MailTemplate

Mail Template

- **Módulo:** `WWPBaseObjects.Mail`
- **Transaction:** `WWPBaseObjects.Mail.WWP_MailTemplate`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** description-del-KB

## WWPBaseObjects.Notifications.Common (infraestructura)

### WWP_Notification

Notification

- **Módulo:** `WWPBaseObjects.Notifications.Common`
- **Transaction:** `WWPBaseObjects.Notifications.Common.WWP_Notification`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** description-del-KB

### WWP_NotificationDefinition

Notification Definition

- **Módulo:** `WWPBaseObjects.Notifications.Common`
- **Transaction:** `WWPBaseObjects.Notifications.Common.WWP_NotificationDefinition`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** description-del-KB

## WWPBaseObjects.Notifications.Web (infraestructura)

### WWP_WebClient

Entidad del módulo `WWPBaseObjects.Notifications.Web` con 6 atributos.

- **Módulo:** `WWPBaseObjects.Notifications.Web`
- **Transaction:** `WWPBaseObjects.Notifications.Web.WWP_WebClient`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

### WWP_WebNotification

Entidad del módulo `WWPBaseObjects.Notifications.Web` con 16 atributos.

- **Módulo:** `WWPBaseObjects.Notifications.Web`
- **Transaction:** `WWPBaseObjects.Notifications.Web.WWP_WebNotification`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

## WWPBaseObjects.SMS (infraestructura)

### WWP_SMS

Entidad del módulo `WWPBaseObjects.SMS` con 11 atributos.

- **Módulo:** `WWPBaseObjects.SMS`
- **Transaction:** `WWPBaseObjects.SMS.WWP_SMS`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

## WWPBaseObjects.Subscriptions (infraestructura)

### WWP_Subscription

Entidad del módulo `WWPBaseObjects.Subscriptions` con 10 atributos.

- **Módulo:** `WWPBaseObjects.Subscriptions`
- **Transaction:** `WWPBaseObjects.Subscriptions.WWP_Subscription`
- **Entidades relacionadas:** (ninguna detectada por FK-naming ni por dependencias)
- **Source:** inferido-del-código

## Cobertura y distribución

- Total de entidades: **75**
- Con descripción sustantiva en el KB: 9
- Inferidas del código (atributos + FK): 61
- Marcadas TODO: 5

Generado automáticamente por [`Scripts/generate-domain-glossary.ps1`](../../Users/GERARDO/Desktop/Genexus%20code/GXKBScanner/Scripts/generate-domain-glossary.ps1) a partir del output del scanner. Regenerar con `pwsh -File generate-domain-glossary.ps1`.
