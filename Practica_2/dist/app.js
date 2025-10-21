"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const producto_service_1 = require("./service/producto.service");
const cliente_usecase_1 = require("./usecases/cliente.usecase");
async function main() {
    console.log('Demo inicio');
    // CREATE cliente (usecase -> Promise)
    try {
        const createdCliente = await (0, cliente_usecase_1.createClienteUseCase)({ nombre: 'Luis', apellido: 'Rojas', dni: '98765432', telefono: '555444', email: 'luis@example.com' });
        console.log('Cliente creado (usecase):', createdCliente);
    }
    catch (err) {
        console.error('Error crear cliente (usecase):', err.message);
    }
    // CREATE producto (callback)
    (0, producto_service_1.createProductoCallback)({ nombre: 'chifle de yuca', descripcion: 'hecho con yuca', precio: 250, stock: 3 }, (err, res) => {
        if (err)
            return console.error('Error crear producto:', err.message);
        console.log('Producto creado (callback):', res);
    });
    // Esperar un poco para que se creen
    await new Promise(r => setTimeout(r, 600));
    // UPDATE cliente (usecase -> Promise)
    (0, cliente_usecase_1.updateClienteUseCase)(1, { telefono: '000111222' })
        .then(c => console.log('Cliente actualizado (usecase):', c))
        .catch((e) => console.error('Error actualizar cliente:', e.message));
    // READ con async/await usando usecases
    try {
        const clientes = await (0, cliente_usecase_1.listClientesUseCase)();
        console.log('Listado clientes (usecase):', clientes);
        const cliente1 = await (0, cliente_usecase_1.getClienteUseCase)(1);
        console.log('Cliente 1 (usecase):', cliente1);
    }
    catch (e) {
        console.error('Error lectura (usecase):', e.message);
    }
    // DELETE con async/await (usecase)
    const delOk = await (0, cliente_usecase_1.deleteClienteUseCase)(1);
    console.log('Cliente 1 eliminado (lógico) (usecase):', delOk);
    // Productos - operaciones similares
    try {
        const productos = await (0, producto_service_1.getAllProductos)();
        console.log('Listado productos:', productos);
        const prod1 = await (0, producto_service_1.getProductoById)(1);
        console.log('Producto 1:', prod1);
        const upd = await (0, producto_service_1.updateProductoPromise)(1, { stock: 10 });
        console.log('Producto actualizado:', upd);
    }
    catch (e) {
        console.error('Error productos:', e.message);
    }
    console.log('Demo fin');
}
main().catch(err => console.error('Fatal:', err));
//# sourceMappingURL=app.js.map