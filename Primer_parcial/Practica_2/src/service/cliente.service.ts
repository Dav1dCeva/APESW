import type { IClientes } from '../domain/cliente';

// Registro interno que puede marcar eliminación lógica
type ClientRecord = IClientes & { deleted?: boolean | undefined };

// Almacenamiento en memoria (simulación de base de datos)
const clientes: ClientRecord[] = [];
let nextId = 1;

// Utilidad: validación básica de datos de cliente
function validateClientData(data: Partial<IClientes>): string | null {
    if (!data) return 'Datos de cliente vacíos';
    if (typeof data.nombre !== 'string' || data.nombre.trim().length === 0) return 'El nombre es obligatorio';
    if (typeof data.apellido !== 'string' || data.apellido.trim().length === 0) return 'El apellido es obligatorio';
    if (typeof data.dni !== 'string' || !/^\d{6,12}$/.test(data.dni)) return 'DNI inválido (solo dígitos, 6-12 caracteres)';
    if (typeof data.email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) return 'Email inválido';
    return null;
}

// --------- CREATE (CALLBACK) ---------
/**
 * Inserta un cliente en la 'DB' simulada usando patrón callback (error, resultado)
 * Simula latencia de red.
 */
export function createClienteCallback(
    newClient: Partial<IClientes>,
    callback: (err: Error | null, resultado?: ClientRecord | null) => void
): void {
    const latency = 100 + Math.floor(Math.random() * 400); // 100-500ms

    setTimeout(() => {
        // Validación de datos antes de insertar
        const errMsg = validateClientData(newClient);
        if (errMsg) {
            callback(new Error(errMsg));
            return;
        }

        const created: ClientRecord = {
            id: nextId++,
            nombre: (newClient.nombre as string).trim(),
            apellido: (newClient.apellido as string).trim(),
            dni: (newClient.dni as string).trim(),
            telefono: (newClient.telefono as string) || '',
            email: (newClient.email as string).trim(),
            pedidos: newClient.pedidos || [],
            facturas: newClient.facturas || [],
        };

        clientes.push(created);
        callback(null, created);
    }, latency);
}

// --------- UPDATE (PROMISE) ---------
/**
 * Actualiza parcialmente un cliente. Retorna Promise que resuelve con el cliente actualizado.
 * Rechaza si no existe.
 */
export function updateClientePromise(id: number, patch: Partial<IClientes>): Promise<ClientRecord> {
    return new Promise<ClientRecord>((resolve, reject) => {
        // Simular latencia corta
        setTimeout(() => {
            const idx = clientes.findIndex(c => c.id === id && !c.deleted);
            if (idx === -1) {
                reject(new Error(`Cliente con id=${id} no encontrado`));
                return;
            }

            // Validar parcialmente si vienen campos obligatorios
            if (patch.nombre !== undefined && (typeof patch.nombre !== 'string' || patch.nombre.trim() === '')) {
                reject(new Error('Nombre inválido')); return;
            }
            if (patch.apellido !== undefined && (typeof patch.apellido !== 'string' || patch.apellido.trim() === '')) {
                reject(new Error('Apellido inválido')); return;
            }
            if (patch.dni !== undefined && (typeof patch.dni !== 'string' || !/^\d{6,12}$/.test(patch.dni))) {
                reject(new Error('DNI inválido')); return;
            }

            const existing = clientsNonNull(idx);

            const updated: ClientRecord = {
                id: existing.id,
                nombre: patch.nombre ?? existing.nombre,
                apellido: patch.apellido ?? existing.apellido,
                dni: patch.dni ?? existing.dni,
                telefono: patch.telefono ?? existing.telefono,
                email: patch.email ?? existing.email,
                pedidos: patch.pedidos ?? existing.pedidos,
                facturas: patch.facturas ?? existing.facturas,
                deleted: existing.deleted,
            };

            clientes[idx] = updated;
            resolve(updated);
        }, 120);
    });
}

// Helper to assert non-null client at index
function clientsNonNull(idx: number): ClientRecord {
    const rec = clientes[idx];
    if (!rec) throw new Error('Registro interno inconsistente');
    return rec;
}

// Ejemplo de encadenamiento con .then()/.catch() (comentario de uso):
// updateClientePromise(1, { telefono: '999999' })
//   .then(c => console.log('Actualizado', c))
//   .catch(err => console.error('Error', err));

// --------- READ (ASYNC/AWAIT) ---------
/**
 * Obtiene un cliente por id. Lanza error si no existe.
 */
export async function getClienteById(id: number): Promise<ClientRecord> {
    // Simular operación asíncrona
    await new Promise(r => setTimeout(r, 80));
    const found = clientes.find(c => c.id === id && !c.deleted);
    if (!found) throw new Error(`Cliente con id=${id} no encontrado`);
    return found;
}

/**
 * Lista todos los clientes. Por defecto excluye eliminados lógicamente.
 */
export async function getAllClientes(includeDeleted = false): Promise<ClientRecord[]> {
    await new Promise(r => setTimeout(r, 80));
    return clientes.filter(c => includeDeleted ? true : !c.deleted);
}

// --------- DELETE (ASYNC/AWAIT) ---------
/**
 * Elimina un cliente. Por defecto realiza eliminación lógica (deleted = true).
 * Si options.physical = true, elimina físicamente del arreglo.
 * Retorna true si la operación tuvo éxito, false si no se encontró.
 */
export async function deleteCliente(id: number, options?: { physical?: boolean }): Promise<boolean> {
    await new Promise(r => setTimeout(r, 100));
    const idx = clientes.findIndex(c => c.id === id && !c.deleted);
    if (idx === -1) return false;

    if (options?.physical) {
        clientes.splice(idx, 1);
        return true;
    }

    // Eliminación lógica
    const rec = clientsNonNull(idx);
    rec.deleted = true;
    return true;
}

// Para pruebas rápidas (no exportado por defecto): limpiar DB en memoria
export function _clearClientesForTest() {
    clientes.length = 0;
    nextId = 1;
}
