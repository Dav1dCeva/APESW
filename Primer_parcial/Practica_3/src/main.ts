import "reflect-metadata";
import { AppDataSource } from "./datasource";
import { ProductoService } from "./service/ProductoService";
import { ProductoInsumoService } from "./service/ProductoInsumoService";
import { DetallePedidoService } from "./service/DetallePedidoService";

AppDataSource.initialize()
  .then(async () => {
    console.log("✅ Conexión a la base de datos establecida correctamente.");

    const productoService = new ProductoService();
    const productoInsumoService = new ProductoInsumoService();
    const detallePedidoService = new DetallePedidoService();

    // Crear producto
    const producto = await productoService.create({
      nombre: "Chifle",
      categoria: "Maduro",
      descripcion: "Nose",
    });
    console.log("Producto creado:", producto);

    // Crear insumo relacionado
    const insumo = await productoInsumoService.create({
      insumo: "Platano",
      cantidad: 2,
      producto: producto,
    });
    console.log("Insumo añadido:", insumo);

    // Crear detalle de pedido relacionado
    const detalle = await detallePedidoService.create({
      cantidad: 3,
      subtotal: 15.99,
      producto: producto,
    });
    console.log("Detalle de pedido creado:", detalle);

    // Mostrar todo
    console.log("Productos con relaciones:", await productoService.findAll());
  })
  .catch((error) => console.error("❌ Error al conectar:", error));
