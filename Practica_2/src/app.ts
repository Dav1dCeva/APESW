import { ProveedorAppService } from "../src/aplicacion/Proveedor_app_servicio";

const appService = new ProveedorAppService();

async function mostrarLista() {
  const proveedores = await appService.listarProveedores();
  console.log("\nLista de proveedores:");
  proveedores.forEach((p, index) => {
    console.log(`${index + 1}. ${p.nombre} - Tel: ${p.telefono} - Producto: ${p.producto_suministrado}`);
  });
}

async function main() {
  console.log("=== CRUD de Proveedores ===");

  // CREATE con Callback
  console.log("\n🟢 Insertar proveedor (CREATE con Callback):");
  appService.crearProveedor(
    { nombre: "Proveedor X", telefono: "099123456", producto_suministrado: "Cajas" },
    (err, result) => {
      if (err) {
        console.error("❌ Error al crear:", err.message);
      } else {
        console.log("✅ Proveedor creado:", result);
      }
    }
  );

  // READ con Async/Await
  console.log("\n🔵 Listar proveedores (READ con Async/Await):");
  try {
    await mostrarLista();
  } catch (error: any) {
    console.error("❌ Error al listar:", error.message);
  }

  // UPDATE con Promise
  console.log("\n🟡 Actualizar proveedor (UPDATE con Promise):");
  const proveedores = await appService.listarProveedores();
  const idActualizar = proveedores[0]?.id_proveedor;

  if (idActualizar !== undefined) {
    await appService
      .actualizarProveedor(idActualizar, { telefono: "099999999" })
      .then((actualizado) => console.log("✅ Proveedor actualizado:", actualizado))
      .catch((error) => console.error("❌ Error al actualizar:", error.message));
  } else {
    console.error("❌ No hay proveedores para actualizar.");
  }

  // DELETE con Async/Await
  console.log("\n🔴 Eliminar proveedor (DELETE con Async/Await):");
  try {
    const idEliminar = proveedores[1]?.id_proveedor;
    if (idEliminar !== undefined) {
      const eliminado = await appService.eliminarProveedor(idEliminar);
      console.log("✅ Eliminado:", eliminado);
    } else {
      console.error("❌ No hay un segundo proveedor para eliminar.");
    }
  } catch (error: any) {
    console.error("❌ Error al eliminar:", error.message);
  }

  console.log("\n📋 Lista final de proveedores después de UPDATE y DELETE:");
  await mostrarLista();
}

main();
