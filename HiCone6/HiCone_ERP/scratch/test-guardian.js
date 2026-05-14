const { TerminalGuardian } = require('./terminal-guardian');
const path = require('path');

async function test() {
  const guardian = new TerminalGuardian();
  
  console.log("--- TEST 1: Listar dependencias Frontend ---");
  try {
    // Primero navegamos al directorio del frontend
    await guardian.runSafe('cd src/Frontend/hicone-web');
    const result = await guardian.runSafe('npm list --depth=0');
    console.log("Resultado Frontend:\n", result.stdout);
  } catch (e) {
    console.error("Error en Test 1:", e.message);
  }

  console.log("\n--- TEST 2: Intento Malicioso (Bloqueo esperado) ---");
  try {
    await guardian.runSafe('npm install; rm -rf node_modules');
  } catch (e) {
    console.log("✅ Bloqueo exitoso:", e.message);
  }

  console.log("\n--- TEST 3: Listar dependencias Backend ---");
  try {
    // Volvemos a la raíz y vamos al proyecto API
    const guardianBackend = new TerminalGuardian();
    await guardianBackend.runSafe('cd src/Presentation/HiCone.API');
    const result = await guardianBackend.runSafe('dotnet list package');
    console.log("Resultado Backend:\n", result.stdout);
  } catch (e) {
    console.error("Error en Test 3:", e.message);
  }
}

test();
