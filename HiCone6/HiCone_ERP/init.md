# Guía de Inicio del Proyecto HiCone ERP

Este archivo contiene los comandos necesarios para iniciar tanto el servidor backend como el frontend, así como para ejecutar las pruebas.

## 1. Backend (.NET 8 Web API)

Para restaurar las dependencias, compilar y ejecutar el servidor Backend:

### Restaurar y Compilar
```powershell
dotnet restore
dotnet build
```

### Ejecutar el Servidor API
```powershell
dotnet run --project src/Presentation/HiCone.API/HiCone.API.csproj
```
El backend estará disponible típicamente en `http://localhost:5000` o según lo configurado en su `launchSettings.json`.

---

## 2. Frontend (Angular)

Los siguientes comandos deben ejecutarse desde el directorio del frontend: `src/Frontend/hicone-web`

### Instalar Dependencias
```powershell
npm install
```

### Ejecutar Servidor de Desarrollo
```powershell
npm run start
```
O bien:
```powershell
npx ng serve
```
El frontend estará disponible en `http://localhost:4200/`.

---

## 3. Ejecutar Pruebas

### Pruebas del Frontend
Para ejecutar las pruebas unitarias del frontend con Vitest:
```powershell
npm run test
```
O bien:
```powershell
npx ng test --no-watch
```
*(Nota: Actualmente existen algunos archivos `.spec.ts` legacy en el repositorio con advertencias/errores de tipos, pero la aplicación compila exitosamente).*
