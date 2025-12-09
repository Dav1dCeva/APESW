import { createProductoCallback, updateProductoPromise, getAllProductos, getProductoById } from './service/producto.service';
import { createClienteUseCase, updateClienteUseCase, listClientesUseCase, getClienteUseCase, deleteClienteUseCase } from './usecases/cliente.usecase';

async function main() {
	console.log('Demo inicio');

	// CREATE cliente (usecase -> Promise)
	try {
		const createdCliente = await createClienteUseCase({ nombre: 'Luis', apellido: 'Rojas', dni: '98765432', telefono: '555444', email: 'luis@example.com' });
		console.log('Cliente creado (usecase):', createdCliente);
	} catch (err: any) {
		console.error('Error crear cliente (usecase):', err.message);
	}

	// CREATE producto (callback)
	createProductoCallback({ nombre: 'chifle de yuca', descripcion: 'hecho con yuca', precio: 250, stock: 3 }, (err, res) => {
		if (err) return console.error('Error crear producto:', err.message);
		console.log('Producto creado (callback):', res);
	});

	// Esperar un poco para que se creen
	await new Promise(r => setTimeout(r, 600));

	// UPDATE cliente (usecase -> Promise)
	updateClienteUseCase(1, { telefono: '000111222' })
		.then(c => console.log('Cliente actualizado (usecase):', c))
		.catch((e: any) => console.error('Error actualizar cliente:', e.message));

	// READ con async/await usando usecases
	try {
		const clientes = await listClientesUseCase();
		console.log('Listado clientes (usecase):', clientes);
		const cliente1 = await getClienteUseCase(1);
		console.log('Cliente 1 (usecase):', cliente1);
	} catch (e: any) {
		console.error('Error lectura (usecase):', e.message);
	}

	// DELETE con async/await (usecase)
	const delOk = await deleteClienteUseCase(1);
	console.log('Cliente 1 eliminado (lógico) (usecase):', delOk);

	// Productos - operaciones similares
	try {
		const productos = await getAllProductos();
		console.log('Listado productos:', productos);
		const prod1 = await getProductoById(1);
		console.log('Producto 1:', prod1);

		const upd = await updateProductoPromise(1, { stock: 10 });
		console.log('Producto actualizado:', upd);
	} catch (e: any) {
		console.error('Error productos:', e.message);
	}

	console.log('Demo fin');
}


main().catch(err => console.error('Fatal:', err));

