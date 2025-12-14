/**
 * PRUEBA DE DUPLICADOS - Idempotent Consumer
 * 
 * Ejecutar con: node peticiones.js
 * 
 * Esta prueba envía 1 petición que internamente emite el evento 2 veces
 * para demostrar cómo funciona la idempotencia.
 */

const BASE_URL = "http://localhost:3000/api";

async function pruebaDuplicados() {
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║          PRUEBA DE DUPLICADOS - IDEMPOTENCIA             ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  const datos = {
    pedidoId: 999,
    productoId: 1,
    cantidad_solicitada: 10,
    precio_unitario: 50,
    subtotal: 500
  };

  console.log("📋 Datos de la petición:");
  console.log(JSON.stringify(datos, null, 2));
  console.log("\n🚀 Enviando petición (el servidor emitirá el evento 2 veces)...\n");

  try {
    const response = await fetch(`${BASE_URL}/detalle-pedido`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    
    const data = await response.json();
    console.log("✅ Respuesta del servidor:");
    console.log(JSON.stringify(data, null, 2));

    console.log("\n" + "═".repeat(60));
    console.log("📊 RESULTADO ESPERADO EN LOS LOGS");
    console.log("═".repeat(60));
    
    console.log("\n📋 En ms-detallepedido:");
    console.log("   ✅ Primer evento enviado");
    console.log("   ✅ Segundo evento enviado (DUPLICADO)");
    
    console.log("\n📋 En ms-producto:");
    console.log("   ✔️ Stock actualizado correctamente");
    console.log("   ⚠️ Mensaje duplicado ignorado: detalle-X");
    
    console.log("\n💡 El stock solo se descontó 1 vez (no 2) gracias a la idempotencia");

  } catch (error) {
    console.log("❌ Error:", error.message);
  }

  console.log("\n" + "═".repeat(60));
  console.log("📋 Comandos para verificar:");
  console.log("═".repeat(60));
  console.log("\n# Ver stock (debe haberse descontado solo 10, no 20):");
  console.log('sudo docker exec -it db_producto psql -U postgres -d ms_producto -c "SELECT id, nombre, stock FROM producto WHERE id = 1;"');
  console.log("\n# Ver clave de idempotencia registrada:");
  console.log('sudo docker exec -it db_producto psql -U postgres -d ms_producto -c "SELECT * FROM idempotencia ORDER BY id DESC LIMIT 5;"');
}

// Ejecutar
pruebaDuplicados();
