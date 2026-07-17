# Guía de Corrección de Errores QA — Pasos e Instrucciones Precisas

**Complemento de:** `docs/Plan_Correccion_QA.md`
**Proyecto:** HiCone ERP (`MigraHi/HiCone_ERP`) — Backend .NET (`HiCone.API`, puerto 5007) + Frontend Angular (`hicone-web`, puerto 4200)
**Convención de rutas:** todas las rutas de archivo son relativas a `MigraHi/HiCone_ERP/`

Cada corrección incluye: síntoma, causa, pasos exactos y cómo verificar. Sigue el orden de las fases; dentro de cada fase las correcciones son independientes entre sí salvo que se indique.

---

## FASE 1 — Desbloquear Extrusión

### 1.1 CP-018 — Error 400 al crear Extrusora-Producto

**Síntoma:** `Error al agregar configuración: Http failure response for http://localhost:5007/api/v1/produccion/extrusora-productos: 400 Bad Request`
**Causa:** El frontend hace `POST /api/v1/produccion/extrusora-productos`, pero ese endpoint **solo existe como GET**. El CRUD real está en `ReferenciasController` bajo `api/v1/produccion/referencias/extrusora-producto` (singular) y espera otro DTO.

**Pasos:**

1. Abrir `src/Frontend/hicone-web/src/app/core/services/produccion.ts` (líneas 294–313).
2. Cambiar las 5 rutas de extrusora-productos para apuntar al controlador de referencias:

```ts
// ANTES: `${this.apiUrl}/extrusora-productos`
// DESPUÉS:
getExtrusoraProductos(): Observable<ExtrusoraProducto[]> {
  return this.http.get<ExtrusoraProducto[]>(`${this.apiUrl}/referencias/extrusora-producto`);
}

createExtrusoraProducto(ep: Partial<ExtrusoraProducto>): Observable<ExtrusoraProducto> {
  return this.http.post<ExtrusoraProducto>(`${this.apiUrl}/referencias/extrusora-producto`, ep);
}

updateExtrusoraProducto(id: string, ep: Partial<ExtrusoraProducto>): Observable<ExtrusoraProducto> {
  return this.http.put<ExtrusoraProducto>(`${this.apiUrl}/referencias/extrusora-producto/${id}`, ep);
}

deleteExtrusoraProducto(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/referencias/extrusora-producto/${id}`);
}
```

3. **Alinear el payload.** El backend (`ReferenciasController.cs:214`) espera:
   `{ extrusoraId: Guid, productoNombre: string, productoCalibre: decimal, productoAncho: string, productoLongitud: int, reposoMin: int, procesoMin: int }`.
   En `src/Frontend/.../produccion/extrusora-producto-list/extrusora-producto-list.ts` (método de guardado, línea ~741), el form usa `productoId`; construir el payload con el **nombre** del producto antes de enviar:

```ts
const payload = {
  extrusoraId: this.form.extrusoraId,
  productoNombre: this.productos.find(p => p.id === this.form.productoId)?.nombre ?? this.form.productoNombre,
  productoCalibre: Number(this.form.productoCalibre) || 0,
  productoAncho: String(this.form.productoAncho ?? ''),
  productoLongitud: Number(this.form.productoLongitud) || 0,
  reposoMin: Number(this.form.reposoMin) || 0,
  procesoMin: Number(this.form.procesoMin) || 90
};
```

4. Verificar que el GET de referencias devuelve el shape que la tabla ya pinta (`extrusoraNombre`, `productoNombre`, etc. — sí coincide, ver `ReferenciasController.cs:90-112`).

**Verificación:** Extrusión > Extrusora Producto > Agregar con los datos del caso CP-018 (Extrusora principal 1, Bobina 4 estándar, calibre 0.207, ancho 2300, reposo 120, proceso 60, longitud 2000) → debe crear el registro y refrescar la tabla sin error 400.

---

### 1.2 CP-017 — No se puede seleccionar Número de Extrusora ni Turno en el modal

**Síntoma:** Los combos "Número de Extrusora" y "Turno" no tienen opciones; el botón confirmar queda bloqueado por campos requeridos.
**Causa:** El combo de número se llena del catálogo `CatalogoClaves` (`GET /api/v1/catalogos/claves`), que **no tiene seed** (verificado: el seeder no inserta ningún `CatalogoClave`). El de turnos depende de que la BD tenga los turnos sembrados.

**Pasos:**

1. Abrir `src/Infrastructure/HiCone.Persistence/Seeds/ApplicationDbContextSeeder.cs` y, junto al bloque que siembra Turnos (línea ~1487), agregar el seed de claves:

```csharp
if (!await _context.CatalogoClaves.AnyAsync())
{
    _context.CatalogoClaves.AddRange(
        new CatalogoClave { Valor = "1", TenantId = defaultTenantId },
        new CatalogoClave { Valor = "2", TenantId = defaultTenantId },
        new CatalogoClave { Valor = "3", TenantId = defaultTenantId },
        new CatalogoClave { Valor = "4", TenantId = defaultTenantId },
        new CatalogoClave { Valor = "5", TenantId = defaultTenantId }
    );
    await _context.SaveChangesAsync(default);
}
```
> Ajustar los nombres de propiedades al modelo real de `CatalogoClave` (revisar `src/Core/HiCone.Domain/Entities/`). Si la entidad exige más campos (`Nombre`, `Tipo`), llenarlos.

2. En `src/Frontend/.../produccion/extrusoras-list/extrusoras-list.ts` (template, línea ~176) mostrar aviso cuando el catálogo esté vacío en vez de un combo sin opciones:

```html
<select class="input-premium" [(ngModel)]="form.numeroExtrusora" *ngIf="claves.length > 0">
  <option value="" disabled selected>-- Seleccionar --</option>
  <option *ngFor="let c of claves" [value]="c.valor">{{ c.valor }}</option>
</select>
<div class="error-message" *ngIf="claves.length === 0">
  No hay números de extrusora configurados. Configure el catálogo de claves primero.
</div>
```

3. Aplicar el mismo patrón al combo de Turno de la tabla de asignación (línea ~215) usando `turnosList.length`.
4. Reiniciar el API para que corra el seeder (o ejecutar el seed manualmente contra la BD `HiCone_ERP_V3`).

**Verificación:** Extrusión > Extrusoras > Agregar → el combo de número muestra opciones, se puede elegir turno en "Nueva fila" y el guardado crea la extrusora (repite el caso CP-017: número 3, nombre Prueba3, turno nocturno).

---

### 1.3 CP-015 — Error 500 "al cargar plantilla" en Turnos por Semana

**Síntoma:** Alert "Ocurrió un error en el servidor al generar la plantilla."
**Causa:** `GET /api/v1/produccion/extrusion/turnos-semana` (`ProduccionController.cs:439`) crea extrusiones-stub y, si no hay operarios, asigna `OperarioId = defaultTenantId` (un GUID que **no es un operario**) → violación de FK al guardar → 500. Fallas latentes adicionales: `DateTime.Parse` dependiente de cultura y `Substring` sobre nombres cortos.

**Pasos:**

1. Abrir `src/Presentation/HiCone.API/Controllers/ProduccionController.cs`, método `GetTurnosSemana` (líneas 439–530).
2. Sustituir el parseo de fechas (líneas 445–446):

```csharp
if (!DateTime.TryParse(fechaInicio, System.Globalization.CultureInfo.InvariantCulture,
        System.Globalization.DateTimeStyles.None, out var start) ||
    !DateTime.TryParse(fechaFin, System.Globalization.CultureInfo.InvariantCulture,
        System.Globalization.DateTimeStyles.None, out var end))
{
    return BadRequest(new { message = "Formato de fecha inválido. Use yyyy-MM-dd." });
}
start = start.Date; end = end.Date;
```

3. Validar prerequisitos **antes** del doble foreach (después de cargar `extrusoras`, `turnos`, `operarios`):

```csharp
if (!extrusoras.Any()) return BadRequest(new { message = "No hay extrusoras configuradas." });
if (!turnos.Any())     return BadRequest(new { message = "No hay turnos configurados." });
if (!operarios.Any())  return BadRequest(new { message = "No hay operarios configurados. Registre al menos un operario antes de programar turnos." });
```

4. Eliminar el fallback inválido (líneas ~473–484). Dejar solo:

```csharp
if (defaultOpId == Guid.Empty)
{
    defaultOpId = operarios.First().Id; // ya validamos que existe al menos uno
}
```

5. Proteger la generación del código (línea ~495): el `Substring` ya usa `Math.Min`, pero `Replace(" ", "")` puede dejar cadena vacía; usar:

```csharp
var extShort = ext.Nombre.Replace(" ", "");
extShort = extShort.Length == 0 ? "EXT" : extShort.Substring(0, Math.Min(5, extShort.Length));
Codigo = $"EXT-{date:yyyyMMdd}-{trn.Nombre.Replace(" ", "")}-{extShort}",
```

6. En el frontend `src/Frontend/.../produccion/turnos-semana/turnos-semana.ts:839`, mostrar el mensaje real del servidor:

```ts
alert(err.error?.message || 'Ocurrió un error en el servidor al generar la plantilla.');
```

**Verificación:** Extrusión > Turnos por semana → elegir inicio de semana → la plantilla carga con las extrusoras y turnos sembrados; con la BD sin operarios debe mostrar el mensaje claro (no error genérico).

---

### 1.4 CP-020 — No hay botón para agregar Bobinas

**Síntoma:** La lista de bobinas no permite crear registros.
**Causa:** `src/Frontend/.../produccion/bobinas-list/bobinas-list.ts` no implementa ninguna función de alta. El backend sí tiene endpoint: `POST /api/v1/produccion/extrusion/guardar-bobina` (`ProduccionController.cs:158`).

**Pasos:**

1. Revisar el DTO que espera `guardar-bobina` (ver el método en `ProduccionController.cs:158-182` y el servicio Angular `produccion.ts` — ya existe `guardarBobina(...)` si el flujo de operador lo usa; si no, crearlo).
2. En `bobinas-list.ts`:
   - Agregar botón "➕ Agregar" en la toolbar del template (copiar el patrón del botón agregar de `extrusoras-list.ts`).
   - Agregar estado de modal (`showModal`, `form`) con campos mínimos: extrusión activa (combo cargado con `getExtrusiones()`), número de bobina (usar `GET extrusion/siguiente-bobina-no`), peso, calibre, ancho.
   - En guardar, llamar `prodService.guardarBobina(payload)` y recargar la lista.
3. **Decisión de producto (confirmar con QA/negocio):** si las bobinas solo deben nacer desde el flujo "Operación", en lugar del alta directa agregar en la vista un botón "Ir a Operación" y un texto explicativo. En ese caso documentarlo en el caso de prueba.

**Verificación:** Extrusión > Bobinas → botón visible → alta de bobina asociada a una extrusión en proceso aparece en la lista.

---

### 1.5 CP-019 — Operación > Extrusiones pide campos que no se pueden ingresar

**Causa probable:** Mismo patrón que CP-017/CP-018 (combos alimentados por catálogos vacíos y rutas desalineadas).

**Pasos:**

1. Ejecutar DESPUÉS de 1.1–1.3.
2. Reproducir el caso: Extrusión > Operación > Extrusiones > crear proceso con los datos de CP-019.
3. Si sigue fallando, abrir DevTools (F12) > Network, capturar la petición que falla y revisar en `src/Frontend/.../produccion/extrusiones-list/extrusiones-list.ts` qué campos del formulario quedan `required` sin control de captura; aplicar el patrón de aviso de catálogo vacío del paso 1.2.

---

## FASE 2 — Integridad de datos en Inventario

### 2.1 CP-021 / CP-022 — Silos sin validaciones (máximo > capacidad, código duplicado)

**Causa:** `CreateSiloAsync` (`src/Core/HiCone.Application/Services/Inventario/InventarioService.cs:64-90`) inserta sin ninguna validación de negocio.

**Pasos:**

1. Al inicio de `CreateSiloAsync`, antes de construir la entidad, agregar:

```csharp
if (siloDto.KgMaximo > siloDto.CapacidadMaxima)
    throw new InvalidOperationException("El Kg máximo no puede ser mayor que la capacidad del silo.");
if (siloDto.KgMinimo >= siloDto.KgMaximo)
    throw new InvalidOperationException("El Kg mínimo debe ser menor que el Kg máximo.");
if (!string.IsNullOrWhiteSpace(siloDto.Codigo) &&
    await _context.Silos.AnyAsync(s => s.Codigo == siloDto.Codigo && !s.IsDeleted))
    throw new InvalidOperationException($"Ya existe un silo con el código {siloDto.Codigo}.");
```

2. Replicar las mismas tres validaciones en `UpdateSiloAsync` (excluyendo el propio Id en el chequeo de duplicado: `s.Id != siloDto.Id`).
3. En `InventarioController.CreateSilo` (`Controllers/InventarioController.cs:26`), envolver en try/catch y devolver `BadRequest(new { message = ex.Message })` para que el mensaje llegue al usuario (verificar si ya hay manejo global de excepciones; si existe middleware que mapea `InvalidOperationException` → 400, no duplicar).
4. En el formulario Angular de silos (`src/Frontend/.../inventario/silos/`), agregar validación espejo: deshabilitar guardar y marcar el campo cuando `maximo > capacidad` o `minimo >= maximo`.
5. (Recomendado) Índice único en BD: crear migración `dotnet ef migrations add UniqueSiloCodigo` con `builder.HasIndex(s => s.Codigo).IsUnique().HasFilter("[IsDeleted] = 0")`.

**Verificación:** repetir CP-021 (capacidad 67000, máximo 70000 → debe rechazar) y CP-022 (código 56600 duplicado → debe rechazar). CP-023 (alta válida) debe seguir pasando.

---

### 2.2 CP-029 — Reporte de cierre de mes vacío

**Causa:** `CrearNuevoCierre` (`Controllers/ExistenciasHistoricoController.cs:41-85`) guarda el snapshot de productos con `CantidadSistema = 0, CantidadReal = 0`, y **no existe** endpoint GET para consultar el detalle de un cierre ya creado.

**Pasos:**

1. En el snapshot de productos (líneas 68–80), poblar la cantidad real del sistema. Localizar de dónde sale la existencia por producto (tabla de existencias de producto o suma de bobinas/lotes; revisar `GetExistenciasAsync` en `InventarioService.cs` para reusar la misma fuente) y usar:

```csharp
var existenciasPorProducto = await ObtenerExistenciasPorProductoAsync(); // misma fuente que GetExistenciasAsync
foreach (var prod in productos)
{
    var cantidad = existenciasPorProducto.TryGetValue(prod.Id, out var c) ? c : 0;
    _context.ExistenciaProductos.Add(new ExistenciaProducto
    {
        Existencia = nuevaExistencia,
        ProductoId = prod.Id,
        CantidadSistema = cantidad,
        CantidadReal = cantidad
    });
}
```

2. Agregar endpoint de detalle en el mismo controlador:

```csharp
[HttpGet("{id}")]
public async Task<ActionResult<object>> GetDetalle(Guid id)
{
    var e = await _context.Existencias
        .Include(x => x.Silos).ThenInclude(s => s.Silo)
        .Include(x => x.Productos).ThenInclude(p => p.Producto)
        .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
    if (e == null) return NotFound();
    return Ok(new
    {
        e.Id, fecha = e.FechaHora, e.Usuario, e.Estado, e.Observaciones,
        silos = e.Silos.Select(s => new { s.SiloId, nombre = s.Silo.Nombre, s.Cantidad }),
        productos = e.Productos.Select(p => new { p.ProductoId, nombre = p.Producto.Nombre, p.CantidadSistema, p.CantidadReal })
    });
}
```
> Ajustar los nombres de navegación (`Silos`, `Productos`) a los reales de la entidad `Existencia`.

3. En `src/Frontend/.../inventario/cierre-mes/cierre-mes.component.ts`, conectar la acción de "abrir/ver" del cierre a `GET /api/v1/ExistenciasHistorico/{id}` y pintar los detalles; los exports CSV/PDF deben usar esos datos, no la lista de encabezados.
4. En `CrearNuevoCierre`, sustituir `request.Usuario ?? "Admin"` por el usuario autenticado (`User.Identity?.Name` o claims) — se completa del todo con 3.4 (CurrentUserService).

**Verificación:** Inventario > Cierre de mes > generar cierre → abrirlo → debe listar silos y productos con cantidades reales; exportar PDF/CSV con datos.

---

### 2.3 CP-030 — Inicio de Inventario sin información

**Causa:** `src/Frontend/.../inventario/inicio/inicio.ts` es una clase vacía y `inicio.html` un empty-state estático ("No hay datos estadísticos disponibles...").

**Pasos:**

1. Definir con negocio los indicadores mínimos (propuesta: total de silos activos, % de llenado global, silos bajo mínimo, lotes activos, fecha del último cierre).
2. Todos salen de endpoints existentes: `GET inventario/silos`, `GET inventario/lotes`, `GET ExistenciasHistorico`. Implementar en `inicio.ts`:

```ts
export class Inicio implements OnInit {
  private invService = inject(InventarioService); // servicio existente en core/services
  silos = signal<Silo[]>([]);
  lotes = signal<Lote[]>([]);

  totalSilos = computed(() => this.silos().length);
  silosBajoMinimo = computed(() => this.silos().filter(s => s.existenciaActual < s.kgMinimo).length);
  porcentajeLlenado = computed(() => {
    const cap = this.silos().reduce((a, s) => a + s.capacidadMaxima, 0);
    const exi = this.silos().reduce((a, s) => a + s.existenciaActual, 0);
    return cap ? Math.round((exi / cap) * 100) : 0;
  });

  ngOnInit() {
    this.invService.getSilos().subscribe(d => this.silos.set(d));
    this.invService.getLotes().subscribe(d => this.lotes.set(d));
  }
}
```

3. Reemplazar el empty-state de `inicio.html` por tarjetas KPI (reusar los estilos `kpi-card` de `seguridad/inicio`), manteniendo el empty-state solo cuando de verdad no haya silos.

**Verificación:** Inventario > Inicio muestra los KPI con los silos existentes.

---

## FASE 3 — Seguridad e infraestructura

### 3.1 CP-008 — El usuario registrado desde login no se crea "a nivel seguridad"

**Causa:** `AuthController.Register` (`Controllers/AuthController.cs:121-128`) busca el rol `"Operario"`, pero los roles sembrados son `Unknown, Administrator, Operador, Supervisor, Mantenimiento` (`ApplicationDbContextSeeder.cs:1431`). El rol no existe → el usuario se crea **sin roles ni permisos**.

**Pasos:**

1. En `AuthController.cs:123` cambiar:

```csharp
// ANTES
var operarioRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Operario");
// DESPUÉS
var operarioRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Operador");
```

2. Hacer el fallo explícito en vez de silencioso:

```csharp
if (operarioRole == null)
    return StatusCode(500, new { Error = "No existe el rol por defecto 'Operador'. Contacte al administrador." });
dto.RoleIds = new List<Guid> { operarioRole.Id };
```

3. Nota: `CreateUserAsync` sincroniza el registro de `Operador` solo cuando el rol asignado se llama "Operador" (`Core/.../Identity/IdentityService.cs:356`), así que con este cambio también se creará su registro de operador.

**Verificación:** desde la pantalla de login > "Crear una ahora" → registrar usuario → entrar a Seguridad > Usuarios: el usuario aparece **con rol Operador**; puede iniciar sesión.

---

### 3.2 CP-006 — Siempre exige cambiar contraseña aunque se desactive la opción

**Causa:** No concluyente en estático — el backend respeta la bandera (`CreateUserAsync` asigna `dto.MustChangePassword` y el DTO tiene default `= true` solo si el campo no viaja). Hay que reproducir.

**Pasos:**

1. Levantar API + frontend. En Seguridad > Usuarios > Agregar, **desmarcar** "debe cambiar contraseña".
2. Con DevTools (F12) > Network, capturar el `POST /api/users` y revisar el JSON: ¿incluye `"mustChangePassword": false`?
   - **Si NO viaja el campo:** el default `= true` del DTO (`Core/.../Identity/IdentityService.cs:68`) lo activa. Corregir el frontend para que siempre lo incluya (el `getRawValue()` de `usuarios.component.ts:494` debería incluirlo — revisar que el control no esté `disabled`, porque `getRawValue` lo incluye pero un `removeControl` no).
   - **Si viaja `false`:** consultar la BD (`SELECT MustChangePassword FROM Users WHERE Username = '...'`). Si quedó `1`, el bug está en el binding del DTO; si quedó `0`, el bug está en el login (revisar `AuthController.Login:44` y la respuesta al frontend).
3. Cambiar el default del DTO a `false` para eliminar la trampa: en `CreateUserDto` (línea 68) `public bool MustChangePassword { get; set; } = false;` — el checkbox del formulario es la única fuente de verdad.
4. Agregar caso de regresión: crear usuario con bandera apagada → login → debe entrar directo al dashboard.

---

### 3.3 CP-007 — "Olvidaste contraseña" no envía correo (SMTP)

**Causa:** `Presentation/HiCone.API/appsettings.json` tiene SMTP placeholder (`Host: localhost, Port: 25`, sin credenciales).

**Pasos:**

1. **Decisión de negocio previa:** elegir proveedor (SendGrid, Office 365, Gmail Workspace, servidor propio) y obtener host/puerto/credenciales.
2. NO poner credenciales en `appsettings.json` (queda en el repo). Usar `appsettings.Production.json` fuera de control de versiones, variables de entorno o `dotnet user-secrets`:

```powershell
cd MigraHi/HiCone_ERP/src/Presentation/HiCone.API
dotnet user-secrets init
dotnet user-secrets set "Smtp:Host" "smtp.office365.com"
dotnet user-secrets set "Smtp:Port" "587"
dotnet user-secrets set "Smtp:Username" "no-reply@tudominio.com"
dotnet user-secrets set "Smtp:Password" "<contraseña>"
dotnet user-secrets set "Smtp:EnableSsl" "true"
dotnet user-secrets set "Smtp:FromEmail" "no-reply@tudominio.com"
```

3. Revisar `Infrastructure/Services/EmailService.cs`: confirmar que lee esas claves y que usa `SecureSocketOptions`/SSL según `EnableSsl`.
4. Para probar sin proveedor real: levantar [smtp4dev](https://github.com/rnwood/smtp4dev) (`dotnet tool install -g Rnwood.Smtp4dev; smtp4dev`) y apuntar `Smtp:Host=localhost, Port=25`; los correos se ven en `http://localhost:5000`.

**Verificación:** Login > "olvidaste contraseña" con un correo registrado → llega correo con contraseña temporal → al entrar pide cambio de contraseña (flujo de `AuthController.ForgotPassword`).

---

### 3.4 CP-024 — La auditoría siempre muestra `admin@hicone.com`

**Causa:** `Infrastructure/HiCone.Infrastructure/Services/CurrentUserService.cs` tiene **todo hardcodeado** (UserId, Email, TenantId, permisos). El `AuditLogInterceptor` registra siempre ese correo.

**Pasos:**

1. Reescribir `CurrentUserService.cs` para leer los claims del JWT:

```csharp
using System.Security.Claims;
using HiCone.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace HiCone.Infrastructure.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        => _httpContextAccessor = httpContextAccessor;

    private ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;

    public string? UserId => User?.FindFirstValue(ClaimTypes.NameIdentifier);
    public string? Email  => User?.FindFirstValue(ClaimTypes.Email);
    public Guid? TenantId => Guid.TryParse(User?.FindFirstValue("tenant_id"), out var t)
        ? t : new Guid("00000000-0000-0000-0000-000000000001");
    public IEnumerable<string> Permissions =>
        User?.FindAll("permission").Select(c => c.Value) ?? Enumerable.Empty<string>();
}
```

2. Registrar el accessor en `Infrastructure/HiCone.Infrastructure/DependencyInjection.cs`:

```csharp
services.AddHttpContextAccessor();
```

3. **Requisito:** verificar en `TokenService` (generación del JWT) que los claims `ClaimTypes.NameIdentifier`, `ClaimTypes.Email`, `tenant_id` y `permission` realmente se emiten; si usan otros nombres (`sub`, `email`), alinear los `FindFirstValue`.
4. **Prueba de impacto (este cambio toca todo el sistema):** con dos usuarios distintos, crear un silo cada uno y revisar Inventario > Silos > Visualizar (auditoría): cada registro debe mostrar el correo correcto. Revisar también que `CreatedBy/UpdatedBy` (interceptor `AuditableEntityInterceptor`) y el filtro por tenant siguen funcionando en los tres módulos.

---

### 3.5 CP-033 — Exportar usuarios a Excel "en preparación"

**Causa:** Stub doble: frontend muestra `alert(...)` (`usuarios.component.ts:416`) y el backend `ExportUsersToExcelAsync` es scaffolding sin implementar (`Core/.../Identity/IdentityService.cs:214`).

**Pasos:**

1. Instalar librería en el proyecto Application o Infrastructure: `dotnet add src/Core/HiCone.Application package ClosedXML`.
2. Implementar `ExportUsersToExcelAsync` en `IdentityService`:

```csharp
public async Task<byte[]> ExportUsersToExcelAsync()
{
    var users = await GetUsersAsync();
    using var wb = new ClosedXML.Excel.XLWorkbook();
    var ws = wb.Worksheets.Add("Usuarios");
    ws.Cell(1, 1).InsertTable(users.Select(u => new
    {
        u.Username, u.Email, u.FirstName, u.LastName,
        Activo = u.IsActive ? "Sí" : "No",
        Bloqueado = u.IsLockedOut ? "Sí" : "No",
        UltimoAcceso = u.LastLoginAt?.ToString("dd/MM/yyyy HH:mm") ?? ""
    }));
    ws.Columns().AdjustToContents();
    using var ms = new MemoryStream();
    wb.SaveAs(ms);
    return ms.ToArray();
}
```

3. Exponer endpoint en `UsersController`:

```csharp
[HttpGet("export")]
public async Task<IActionResult> ExportToExcel()
{
    var bytes = await _identityService.ExportUsersToExcelAsync();
    return File(bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        $"usuarios_{DateTime.Now:yyyyMMdd}.xlsx");
}
```

4. En `usuarios.component.ts:414-417`, reemplazar el alert:

```ts
exportarExcel() {
  this.http.get(`${this.apiUrl}/users/export`, { headers: this.headers(), responseType: 'blob' })
    .subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `usuarios_${new Date().toISOString().slice(0,10)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    });
}
```

5. `ImportUsersFromExcelAsync` (importar) puede quedar para una iteración posterior; si se pospone, ocultar el botón de importar en vez de dejar el alert.

**Verificación:** Seguridad > Usuarios > Exportar → descarga un .xlsx con los usuarios reales.

---

### 3.6 CP-031 — Dashboard de Seguridad sin indicadores

**Causa:** Los KPI del template (`src/Frontend/.../seguridad/inicio/`) están hardcodeados como `—`.

**Pasos:**

1. En el componente de inicio de seguridad, inyectar `HttpClient` (o el servicio existente) y cargar:
   - `GET /api/users` → total y activos (`isActive`).
   - `GET /api/roles?page=1&pageSize=1` → usar `totalCount` del `PaginatedResult`.
   - `GET /api/.../permissions?page=1&pageSize=1` → `totalCount` (misma paginación).
2. Sustituir los `<span class="kpi-value">—</span>` por bindings: `{{ usuariosActivos() }}`, `{{ totalRoles() }}`, `{{ totalPermisos() }}` con `signal(0)` como valor inicial y skeleton/`…` mientras carga.

**Verificación:** Seguridad > Inicio muestra números reales; los botones de acceso rápido siguen funcionando.

---

## FASE 4 — UX y pulido

### 4.1 CP-002 / CP-003 — Mensaje de credenciales

En `src/Infrastructure/HiCone.Infrastructure/Identity/IdentityService.cs` líneas **54** y **88**, cambiar:

```csharp
return (false, new[] { "Usuario o contraseña incorrectos." }, null);
```

### 4.2 CP-010 — Hora incorrecta en mensaje de bloqueo

Mismo archivo, línea 59: `LockoutEnd` está en UTC. Cambiar a:

```csharp
return (false, new[] { $"Cuenta bloqueada hasta {user.LockoutEnd?.ToLocalTime():dd/MM/yyyy hh:mm tt}." }, null);
```
> Opción más robusta: devolver el dato como campo (`lockoutEnd`) y formatear en el frontend con el locale es-MX ya configurado.

### 4.3 CP-012 — Sin mensaje al entrar sin credenciales

En `login.component.ts`, método `onLogin()` (línea ~432), al detectar formulario inválido agregar:

```ts
if (this.loginForm.invalid) {
  this.loginForm.markAllAsTouched();
  this.errorMessage.set('Debe ingresar usuario y contraseña.');
  return;
}
```

### 4.4 CP-013 — El borde rojo de validación no se limpia

1. Reproducir: dejar usuario vacío → submit → escribir un carácter. Según el código (`isFieldInvalid`, línea 421) debería limpiarse al volverse válido el control.
2. Si no se limpia: revisar en DevTools si la clase `.error` del `input-wrapper` desaparece del DOM.
   - Si la clase desaparece pero el estilo persiste → el problema es CSS (revisar los estilos del componente, posible regla sobre `.input-wrapper` que no depende de la clase `error`).
   - Si la clase no desaparece → problema de change detection; forzar re-evaluación suscribiéndose a `valueChanges` o convertir el estado a señal.
3. Verificar también el banner `errorMessage`: hoy solo se limpia al reenviar; limpiarlo en `valueChanges` del formulario:

```ts
ngOnInit() {
  // ...código existente...
  this.loginForm.valueChanges.subscribe(() => this.errorMessage.set(null));
}
```

### 4.5 CP-014 — Inicio de Extrusión: mocks y Tablero Directivo

En `src/Frontend/.../produccion/extrusion-inicio/extrusion-inicio.ts`:

1. **Eliminar `cargarMocks()`** (líneas ~793-870) y su invocación en el manejador de error (línea ~780). En su lugar, estado de error visible:

```ts
error: (err) => {
  console.error('Error al cargar extrusiones:', err);
  this.errorCarga = true; // mostrar banner con botón "Reintentar" en el template
}
```

2. Agregar botón "← Regresar" en la vista Tablero Directivo (junto al título, visible cuando `showTableroDirectivo`):

```html
<button class="btn-secondary" routerLink="." [queryParams]="{}" *ngIf="showTableroDirectivo">← Regresar</button>
```

3. Conectar las estadísticas de la vista estándar a datos reales (mismo `getExtrusiones()` que alimenta el tablero).

### 4.6 CP-025 / CP-028 — Datos falsos en encabezado de PDF

1. Abrir `src/Frontend/hicone-web/src/app/core/services/pdf-export.service.ts` y localizar el encabezado (teléfono, dirección, etc.).
2. Reemplazar los valores fijos por datos de empresa desde configuración: usar `GET /api/v1/produccion/referencias/configuracion` (ya existe y auto-siembra) o un objeto `environment.empresa`.
3. Mientras no exista el dato real, dejar el campo vacío — nunca datos inventados.

### 4.7 CP-026 — Cero de más al seleccionar silo en Lote

1. En el modal de lote (`src/Frontend/.../inventario/lotes/`), localizar dónde se muestra la capacidad del silo seleccionado (buscar `capacidad` en el componente).
2. El valor se multiplica ×10 al mostrarse (67,000 → 670,000): revisar si se aplica un pipe `number` sobre un string concatenado o una conversión con separador de miles (`parseFloat("67,000")`). Corregir manteniendo el valor numérico crudo y formateando solo en el template: `{{ silo.capacidadMaxima | number:'1.0-0' }}`.

### 4.8 CP-009 — Botón "Descargar APK" → PWA

1. En la pantalla de login, localizar el botón de descarga del APK.
2. Reemplazar la descarga por la URL de la PWA (`hicone-mobile` es PWA: tiene `ngsw-config.json` y `manifest.webmanifest`). Definir con infraestructura la URL pública de despliegue y apuntar el botón ahí con texto "Abrir versión móvil (PWA)".

---

## FASE 5 — Regresión y cierre

1. **Preparar entorno limpio:** BD `HiCone_ERP_V3` re-sembrada (con los nuevos seeds de claves), API y frontend levantados.
2. **Re-ejecutar los 18 casos** del Excel en orden, más estos flujos de regresión:
   - Login completo (CP-001 a CP-013) — el cambio de `CurrentUserService` y mensajes toca este flujo.
   - Extrusión de punta a punta: extrusora → extrusora-producto → turnos-semana → operación → bobina.
   - Inventario: silo (válido, inválido, duplicado) → lote → cierre de mes → detalle del cierre → exports.
   - Auditoría con dos usuarios distintos.
3. **Actualizar el Excel** con resultados, evidencia y fecha por caso.
4. **Corregir las fórmulas de la hoja Resumen:** hoy reporta Total=18, Pasó=16, Falló=17 y % Avance=1.83 — imposible (16+17 > 18). Revisar los rangos de `CONTAR.SI` para que apunten exactamente a `'Casos de Prueba'!I5:I65` y el % de avance divida ejecutados entre el total real.

---

## Checklist rápido de ejecución

| # | Corrección | Caso(s) | Tipo | Estado |
|---|-----------|---------|------|--------|
| 1.1 | Alinear rutas extrusora-producto | CP-018 | FE | ☐ |
| 1.2 | Seed CatalogoClaves + avisos de catálogo vacío | CP-017 | BE+FE | ☐ |
| 1.3 | Fix 500 turnos-semana (FK operario, fechas) | CP-015 | BE | ☐ |
| 1.4 | Botón agregar bobinas | CP-020 | FE | ☐ |
| 1.5 | Reprobar operación extrusiones | CP-019 | QA | ☐ |
| 2.1 | Validaciones de silo (capacidad, duplicados) | CP-021, CP-022 | BE+FE | ☐ |
| 2.2 | Cierre de mes con datos + endpoint detalle | CP-029 | BE+FE | ☐ |
| 2.3 | Dashboard inicio Inventario | CP-030 | FE | ☐ |
| 3.1 | Rol "Operador" en registro desde login | CP-008 | BE | ☐ |
| 3.2 | Depurar bandera cambiar contraseña | CP-006 | BE/FE | ☐ |
| 3.3 | Configurar SMTP real | CP-007 | Infra | ☐ |
| 3.4 | CurrentUserService con claims JWT | CP-024 | BE | ☐ |
| 3.5 | Exportar usuarios a Excel | CP-033 | BE+FE | ☐ |
| 3.6 | KPIs dashboard Seguridad | CP-031 | FE | ☐ |
| 4.1–4.8 | Mensajes, hora bloqueo, mocks, PDF, formato, PWA | CP-002/003/009/010/012/013/014/025/026/028 | FE/BE | ☐ |
| 5 | Regresión completa + actualizar Excel | Todos | QA | ☐ |
