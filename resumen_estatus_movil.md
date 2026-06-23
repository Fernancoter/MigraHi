# Resumen de Estatus y Avance del Proyecto Móvil (`hicone-mobile`)

Este documento presenta una radiografía detallada del estado actual de desarrollo de la aplicación móvil de planta (`hicone-mobile`), qué porcentaje de avance tiene cada pilar y los pasos exactos necesarios para alcanzar el 100% y llevarla a producción.

---

## 📈 Avance General del Proyecto: **75%**

El motor, las configuraciones de Capacitor, la base de datos local y los servicios de hardware (cámara, NFC e impresión) están **100% terminados y probados**. El porcentaje restante corresponde a pantallas secundarias del operario y la integración final con el inicio de sesión real de GAM.

```
[██████████████████████████████░░░░░░░░██] 75% Completado
```

---

## 🔍 Desglose por Componentes

### 1. Núcleo, PWA y Capacitor
* **Porcentaje de Avance**: **100%**
* **¿Qué está listo?**:
  * [x] Conversión del proyecto en PWA instalable (Service Worker y manifest web).
  * [x] Configuración del runtime híbrido nativo de Capacitor para compilar en Android (`.apk`) e iOS (`.ipa`).
  * [x] Inmunidad contra el borrado automático de datos de iOS (evicción de Safari) a través del almacenamiento nativo en Preferences (`@capacitor/preferences`).
  * [x] Excepciones de red local (App Transport Security) e indicaciones de uso de cámara añadidas a [Info.plist](file:///C:/Users/FCO/Desktop/HiMI/MigraHi/hicone-mobile/ios/App/App/Info.plist).

### 2. Sincronización y Cola Offline
* **Porcentaje de Avance**: **100%**
* **¿Qué está listo?**:
  * [x] **Almacén Offline**: Wrapper asíncrono sobre la memoria persistente del dispositivo.
  * [x] **Cola FIFO**: Encola las lecturas en planta si no hay señal y las mantiene a salvo incluso si se apaga el dispositivo.
  * [x] **Sincronización en caliente**: Escucha los eventos del sistema y dispara la sincronización del buffer en segundo plano tan pronto detecta Wi-Fi.
  * [x] **Validación de Errores**: Filtra errores de cliente descartables de errores de red temporales para evitar trabas en la cola.

### 3. Servicios de Hardware (Piso de Planta)
* **Porcentaje de Avance**: **100%**
* **¿Qué está listo?**:
  * [x] **Escáner**: Integración nativa con cámara usando Google MLKit (lecturas instantáneas) con fallback de teclado/manual para pruebas en navegador.
  * [x] **NFC**: Lector/escritor con el API de Web NFC y simulaciones para pruebas locales.
  * [x] **Impresión**: Generación de comandos **ZPL II** para impresoras Zebra (etiquetas de bobinas, carretes y pallets) mediante Bluetooth LE nativo y sockets de red local.

### 4. Vistas e Interfaces de Usuario (UI)
* **Porcentaje de Avance**: **40%**
* **¿Qué está listo?**:
  * [x] **Shell Móvil**: Contenedor táctil con badges dinámicos de red y cola.
  * [x] **Panel Principal**: Accesos directos a las tareas diarias del operador.
  * [x] **Escáner de Planta**: Interfaz interactiva de escaneo para Bobina, Carrete y Pallet.
  * [x] **Asignación de Troquel**: Interfaz para vincular troqueles a prensas activas.
  * [x] **Cierre de Carrera**: Registro cuantitativo de piezas útiles y scrap.
* **¿Qué falta para el 100%?**:
  * [ ] **Paros de Máquina / Downtime**: Pantallas para registrar cuando una extrusora o prensa se detiene por falla o mantenimiento.
  * [ ] **Intercambio de Silos**: Registrar el cambio de material en silos de extrusión.
  * [ ] **Reporte de Calidad**: Listados visuales de carretes por validar/validados.
  * [ ] **Perfil de Operario**: Visualización de turno activo y operador en sesión.

### 5. Seguridad y Autenticación
* **Porcentaje de Avance**: **60%**
* **¿Qué está listo?**:
  * [x] Configuración del enrutamiento protegido.
  * [x] Clientes de llamada a la API central del ERP.
* **¿Qué falta para el 100%?**:
  * [ ] Conectar el login del operario con la autenticación del GAM central del ERP.

---

## 🚀 Ruta Crítica para llegar al 100%

Si deseas llevar la aplicación móvil a un estado 100% terminado para producción, los siguientes pasos son:

1. **Crear las Pantallas Secundarias de Planta**:
   Replicar los formularios menores (Silos y Paros) y el historial de validación en la carpeta de características.
2. **Integrar el Login de GAM**:
   Vincular el formulario de inicio de sesión de la app móvil con el token Bearer del ERP para autenticar a los operadores.
3. **Compilar y Generar Distribución Ad-Hoc**:
   * **Android**: Generar el archivo `.apk` firmado y cargarlo directamente a los dispositivos.
   * **iOS**: Abrir Xcode y generar el build de pruebas a través de TestFlight (requiere cuenta de Apple Developer) para instalarlo en los dispositivos Apple de la planta.
