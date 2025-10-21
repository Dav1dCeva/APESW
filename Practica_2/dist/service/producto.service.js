"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductoCallback = createProductoCallback;
exports.updateProductoPromise = updateProductoPromise;
exports.getProductoById = getProductoById;
exports.getAllProductos = getAllProductos;
exports.deleteProducto = deleteProducto;
exports._clearProductosForTest = _clearProductosForTest;
const productos = [
    {
        id: 1,
        nombre: 'chifle de maduro',
        descripcion: 'Chifle hecho con plátano maduro frito',
        precio: 3.5,
        stock: 50,
        categoria: 'snack',
        precio_unitario: 3.5,
        unidad_medida: 'unidad',
        estado: 'activo',
        detalles_pedido: [],
    },
    {
        id: 2,
        nombre: 'chifle de verde',
        descripcion: 'Chifle hecho con plátano verde frito',
        precio: 3.0,
        stock: 40,
        categoria: 'snack',
        precio_unitario: 3.0,
        unidad_medida: 'unidad',
        estado: 'activo',
        detalles_pedido: [],
    },
    {
        id: 3,
        nombre: 'chifle camote',
        descripcion: 'Chifle hecho con camote',
        precio: 4.0,
        stock: 30,
        categoria: 'snack',
        precio_unitario: 4.0,
        unidad_medida: 'unidad',
        estado: 'activo',
        detalles_pedido: [],
    },
    {
        id: 4,
        nombre: 'chifle de yuca',
        descripcion: 'Chifle hecho con yuca frita',
        precio: 3.8,
        stock: 35,
        categoria: 'snack',
        precio_unitario: 3.8,
        unidad_medida: 'unidad',
        estado: 'activo',
        detalles_pedido: [],
    },
];
let nextProductId = 5;
function validateProductData(data) {
    if (!data)
        return 'Datos de producto vacíos';
    if (typeof data.nombre !== 'string' || data.nombre.trim() === '')
        return 'Nombre inválido';
    if (typeof data.precio !== 'number' || data.precio < 0)
        return 'Precio inválido';
    if (typeof data.stock !== 'number' || data.stock < 0)
        return 'Stock inválido';
    return null;
}
function createProductoCallback(newProduct, cb) {
    const latency = 50 + Math.floor(Math.random() * 200);
    setTimeout(() => {
        const errMsg = validateProductData(newProduct);
        if (errMsg) {
            cb(new Error(errMsg));
            return;
        }
        const created = {
            id: nextProductId++,
            nombre: newProduct.nombre.trim(),
            descripcion: newProduct.descripcion || '',
            precio: newProduct.precio,
            stock: newProduct.stock,
            categoria: newProduct.categoria || '',
            precio_unitario: newProduct.precio_unitario ?? newProduct.precio,
            unidad_medida: newProduct.unidad_medida || '',
            estado: newProduct.estado || 'activo',
            detalles_pedido: newProduct.detalles_pedido || [],
        };
        productos.push(created);
        cb(null, created);
    }, latency);
}
function updateProductoPromise(id, patch) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const idx = productos.findIndex(p => p.id === id && !p.deleted);
            if (idx === -1)
                return reject(new Error(`Producto id=${id} no encontrado`));
            if (patch.precio !== undefined && (typeof patch.precio !== 'number' || patch.precio < 0))
                return reject(new Error('Precio inválido'));
            if (patch.stock !== undefined && (typeof patch.stock !== 'number' || patch.stock < 0))
                return reject(new Error('Stock inválido'));
            const existing = productsNonNull(idx);
            const updated = {
                id: existing.id,
                nombre: patch.nombre ?? existing.nombre,
                descripcion: patch.descripcion ?? existing.descripcion,
                precio: patch.precio ?? existing.precio,
                stock: patch.stock ?? existing.stock,
                categoria: patch.categoria ?? existing.categoria,
                precio_unitario: patch.precio_unitario ?? existing.precio_unitario,
                unidad_medida: patch.unidad_medida ?? existing.unidad_medida,
                estado: patch.estado ?? existing.estado,
                detalles_pedido: patch.detalles_pedido ?? existing.detalles_pedido,
                deleted: existing.deleted,
            };
            productos[idx] = updated;
            resolve(updated);
        }, 80);
    });
}
function productsNonNull(idx) {
    const r = productos[idx];
    if (!r)
        throw new Error('Registro inconsistente productos');
    return r;
}
async function getProductoById(id) {
    await new Promise(r => setTimeout(r, 40));
    const found = productos.find(p => p.id === id && !p.deleted);
    if (!found)
        throw new Error(`Producto id=${id} no encontrado`);
    return found;
}
async function getAllProductos(includeDeleted = false) {
    await new Promise(r => setTimeout(r, 40));
    return productos.filter(p => includeDeleted ? true : !p.deleted);
}
async function deleteProducto(id, options) {
    await new Promise(r => setTimeout(r, 50));
    const idx = productos.findIndex(p => p.id === id && !p.deleted);
    if (idx === -1)
        return false;
    if (options?.physical) {
        productos.splice(idx, 1);
        return true;
    }
    const rec = productsNonNull(idx);
    rec.deleted = true;
    return true;
}
function _clearProductosForTest() {
    productos.length = 0;
    productos.push({
        id: 1,
        nombre: 'chifle de maduro',
        descripcion: 'Chifle hecho con plátano maduro frito',
        precio: 3.5,
        stock: 50,
        categoria: 'snack',
        precio_unitario: 3.5,
        unidad_medida: 'unidad',
        estado: 'activo',
        detalles_pedido: [],
    }, {
        id: 2,
        nombre: 'chifle de verde',
        descripcion: 'Chifle hecho con plátano verde frito',
        precio: 3.0,
        stock: 40,
        categoria: 'snack',
        precio_unitario: 3.0,
        unidad_medida: 'unidad',
        estado: 'activo',
        detalles_pedido: [],
    }, {
        id: 3,
        nombre: 'chifle camote',
        descripcion: 'Chifle hecho con camote',
        precio: 4.0,
        stock: 30,
        categoria: 'snack',
        precio_unitario: 4.0,
        unidad_medida: 'unidad',
        estado: 'activo',
        detalles_pedido: [],
    }, {
        id: 4,
        nombre: 'chifle de yuca',
        descripcion: 'Chifle hecho con yuca frita',
        precio: 3.8,
        stock: 35,
        categoria: 'snack',
        precio_unitario: 3.8,
        unidad_medida: 'unidad',
        estado: 'activo',
        detalles_pedido: [],
    });
    nextProductId = 5;
}
//# sourceMappingURL=producto.service.js.map