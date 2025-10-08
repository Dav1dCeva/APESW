"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const datasource_1 = require("./datasource");
const ProductoService_1 = require("./service/ProductoService");
const ProductoInsumoService_1 = require("./service/ProductoInsumoService");
const DetallePedidoService_1 = require("./service/DetallePedidoService");
datasource_1.AppDataSource.initialize()
    .then(async () => {
    console.log("✅ Conexión a la base de datos establecida correctamente.");
    const productoService = new ProductoService_1.ProductoService();
    const productoInsumoService = new ProductoInsumoService_1.ProductoInsumoService();
    const detallePedidoService = new DetallePedidoService_1.DetallePedidoService();
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
//# sourceMappingURL=main.js.map