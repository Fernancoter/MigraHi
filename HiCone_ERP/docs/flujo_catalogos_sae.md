# Flujo Completo del Módulo Catálogos SAE

## 1. Visión General
El módulo de **Catálogos SAE** es la sección del sistema donde se gestiona e interactúa con la información administrativa y comercial de ventas, presupuestos, proyecciones y clientes que provienen del sistema SAE y que se conectan al ERP. Está compuesto por 6 submódulos principales que se rigen por la arquitectura de frontend en Angular (estilo WWP) y un backend en .NET (C#) con Entity Framework.

## 2. Submódulos y Funcionamiento
- **Customer (Clientes)**: Visualización y administración del catálogo de clientes. El flujo incluye listado paginado, búsqueda, ordenamiento, y un formulario de detalle para agregar/editar (información básica, RFC, correo, teléfono, estado activo/inactivo).
- **Product (Productos)**: Mantenimiento del catálogo de productos. Cuenta con las mismas propiedades de listado (Work With Plus) que permite filtrar, buscar, exportar a PDF y Excel, y un formulario con datos descriptivos del producto, empaque, existencia, y costos.
- **SalesPerson (Vendedores)**: Catálogo de representantes de ventas. Incluye formulario simplificado para definir altas/bajas (bloqueando el nombre en modo edición y permitiendo solo el cambio de estado Activo/Inactivo).
- **Budget (Presupuestos)**: Permite registrar las metas o estimaciones de ventas. Posee una tabla editable donde se pueden revisar o editar los montos "Estimated" y "Real" de las ventas por Cliente y Producto para un mes y año específico.
- **Outlook**: Herramienta de planeación tipo "matriz" que permite ver o editar las proyecciones futuras (mes a mes, 1 al 12) de envíos por cliente filtrados por `Consolidated Name`, año y producto. Cuenta con auto-cálculo de la fila de totales en tiempo real, y un botón de "Update Data" que envía todas las modificaciones en bloque al backend.
- **Price (Precios)**: Matriz idéntica al flujo de Outlook orientada al precio proyectado del producto para un determinado cliente a lo largo de los 12 meses. Tiene una función especial "Copy Data" que permite replicar los valores introducidos en la primera fila hacia todas las demás filas de manera rápida.

---

## 3. Trabajo Realizado Hoy (Actualización de Migración y Estandarización)
Se llevó a cabo una homologación integral de las pantallas del módulo SAE basadas en el diseño legado de GeneXus (HiCone3/QA) adaptándolo al nuevo estándar de **HiCone6 Angular**:

### Backend (.NET / C#)
- Se extendieron los Modelos en `SAEModels.cs` (`SaeSalesPerson`, `SaeBudget`, etc.).
- Se añadieron y configuraron los DbSets correspondientes en `ApplicationDbContext.cs`.
- Se implementaron los métodos de consulta y persistencia en `SAEService.cs` e `ISAEService.cs`.
- Se configuraron los endpoints (GET/POST) en `SAEController.cs`.

### Frontend (Angular)
- **Estandarización de Interfaz**: Se rehicieron completamente desde cero los componentes `Product`, `Customer` y `SalesPerson` para implementar la cuadrícula dinámica WWP (Work With Plus).
- **Componentes Añadidos a las Tablas**:
  - Funcionalidad de Paginación.
  - Ordenamiento ascendente/descendente (⬆/⬇).
  - Selector de Columnas dinámico (Checkbox para mostrar/ocultar).
  - Buscador global.
- **Módulos de Matriz (`Price` y `Outlook`)**:
  - Integración funcional de botones *Copy Data*, *Update Data* y *Refresh Data*.
  - Cálculo automático de totales al modificar los inputs.
- **Exportación**:
  - Implementación técnica y validación con `jspdf` y `jspdf-autotable` para descarga en PDF.
  - Generación de Excel nativo (formato Blob `application/vnd.ms-excel`).
- **Diseño Responsivo e Íntegro**:
  - Centrado absoluto de los formularios (`centered-form-content`).
  - Resolución de duplicidades de encabezados.
  - Bloqueo de campos específicos dependiendo del estado de la fila (ej. `SalesPersonName` se bloquea al editar el estatus).
- **Sincronización Final**: 
  - Traslado y empaquetado de todos los archivos TypeScript, CSS, HTML, Controladores C# e Interfaces a la ruta de migración local (`C:\Users\FCO\Desktop\HiMI\MigraHi\`) para su respaldo y consistencia total de ambientes.
