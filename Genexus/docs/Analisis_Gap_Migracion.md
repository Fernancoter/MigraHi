# 🔍 Análisis de Brecha para Migración (Gap Analysis)

Para que una migración desde GeneXus sea exitosa y automatizable (o asistida por IA), el dataset actual es excelente en **Lógica**, pero aún tiene huecos en la **Arquitectura de Datos** y la **Infraestructura**.

Aquí detallo los componentes faltantes categorizados por su impacto en la migración:

---

## 1. El Pilar de Datos (Prioridad Crítica)
La lógica no puede migrarse sin saber dónde viven los datos. Falta:
- **Estructura de Tablas Físicas:** Sin esto, la IA no puede generar el código de acceso a datos (ej. Entity Framework o SQL puro).
- **Atributos y Dominios:** GeneXus usa "Dominios" (tipos de datos reutilizables). Si no extraemos los dominios, perdemos la consistencia de tipos en la nueva plataforma.
- **Fórmulas Globales:** Mucha lógica reside en fórmulas en atributos. Si no se capturan, la migración dejará cálculos vacíos.

## 2. El Pilar de Conectividad (Prioridad Alta)
- **External Objects (EO):** Las aplicaciones GeneXus suelen usar DLLs externas, Java Classes o Web Services externos. Necesitamos saber qué métodos de estos EO se llaman y cómo están definidos.
- **Configuraciones de Data Store:** Los detalles de conexión (DBMS, esquemas) son necesarios para configurar el nuevo entorno.

## 3. El Pilar de Flujo de Datos (Relaciones CRUD)
- **Mapeo de Impacto:** Actualmente sabemos que el Objeto A llama al Objeto B. Pero no sabemos si el Objeto A **escribe** en la Tabla `Clientes`. 
  - *Facilitador:* Saber qué objetos escriben permite identificar los "Services" de persistencia en una arquitectura moderna.

## 4. El Pilar de UI y Navegación (Prioridad Media)
- **Master Pages:** La estructura visual general.
- **Menús y Dashboards:** Cómo el usuario navega entre WebPanels. Actualmente los WebPanels están "sueltos", falta el pegamento que los une.

---

## 💡 ¿Qué facilitaría más la migración hoy?

Si tuviéramos que elegir el "siguiente paso ganador", sería:
**"El Diccionario de Datos Físico + CRUD"**

**¿Por qué?**
Porque si le das a una IA el código de un `Procedure` y además le das el `CREATE TABLE` de las tablas que toca ese procedure, la IA puede reescribir ese código en C#, Java o Python con un 90% de precisión. Sin la tabla, la IA solo puede "adivinar" los campos.

---

### Resumen del Inventario Actual vs Necesario:

| Componente | Estado Actual | Importancia para Migración |
| :--- | :--- | :--- |
| **Lógica (Procedures/Events)** | ✅ Completo | Vital |
| **Estructura SDT** | ✅ Completo | Alta |
| **Dependencias (Calls)** | ✅ Completo | Alta |
| **Esquema de Tablas** | ❌ Faltante | **Crítica** |
| **Atributos/Fórmulas** | ❌ Faltante | Alta |
| **CRUD (Lectura/Escritura)** | ❌ Faltante | Alta |
| **Seguridad (Roles/GAM)** | ⚠️ Parcial | Media |

---
> [!TIP]
> Mi recomendación es no intentar extraer todo, sino centrarnos en completar el **Esquema de Tablas** y el **Mapeo CRUD**. Con eso, tendrías un dataset "360 grados" de la aplicación.
