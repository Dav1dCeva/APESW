# 🚀 DEMO - Practica_2: Webhooks con Supabase

## 📋 REQUISITOS PREVIOS (TODO DEBE ESTAR CORRIENDO)

### 1️⃣ Terminal 1: PostgreSQL (Base de datos local)

**📂 Carpeta:** `/Practica_2/`

```bash
cd /home/david/Escritorio/Codigos/Aplicaciones_servidores/APESW/Segundo_parcial/Practica_2
docker-compose up
```

✅ Esperar hasta ver:

```
✓ ms_detallepedido database initialized
✓ ms_producto database initialized
```

---

### 2️⃣ Terminal 2: ms-detallepedido (Microservicio Detalles)

**📂 Carpeta:** `/Practica_2/ms-detallepedido/`

```bash
cd /home/david/Escritorio/Codigos/Aplicaciones_servidores/APESW/Segundo_parcial/Practica_2/ms-detallepedido
npm install  # (solo primera vez)
npm run start:dev
```

✅ Esperar hasta ver:

```
[Nest] ... LOG [NestApplication] Nest application successfully started
🚀 MS-DetailPedido escuchando en http://localhost:3002
```

---

### 3️⃣ Terminal 3: ms-producto (Microservicio Producto)

**📂 Carpeta:** `/Practica_2/ms-producto/`

```bash
cd /home/david/Escritorio/Codigos/Aplicaciones_servidores/APESW/Segundo_parcial/Practica_2/ms-producto
npm install  # (solo primera vez)
npm run start:dev
```

✅ Esperar hasta ver:

```
[Nest] ... LOG [NestApplication] Nest application successfully started
🚀 MS-Producto escuchando en http://localhost:3003
```

---

### 4️⃣ Terminal 4: Testing (Ejecutar curl aquí)

**📂 Carpeta:** Cualquiera (preferiblemente `/Practica_2/`)

```bash
cd /home/david/Escritorio/Codigos/Aplicaciones_servidores/APESW/Segundo_parcial/Practica_2
# Aquí ejecutarás los curl commands
```

---

### 5️⃣ Navegador: Webhook.site (Ver webhooks en tiempo real)

**🌐 URL:**

```
https://webhook.site/b5eea99a-0edc-40c4-b3c8-071318badca2
```

Abre esta URL en tu navegador para ver los webhooks llegando en tiempo real ✅

---

## 🧪 TESTS - PASO A PASO

### TEST 1: Crear un Detalle de Pedido (Evento: detalle.creado)

**📂 Ejecutar en Terminal 4** - Carpeta: `/Practica_2/`

```bash
curl -X POST http://localhost:3002/detalles-pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "pedido_id": 100,
    "producto_id": 10,
    "cantidad": 2,
    "precio_unitario": 99.99,
    "subtotal": 199.98
  }'
```

**✅ Respuesta esperada (201 Created):**

```json
{
  "mensaje": "Detalle creado y eventos enviados",
  "detalle": {
    "productoId": 10,
    "cantidad_solicitada": 2,
    "precio_unitario": 99.99,
    "subtotal": 199.98,
    "pedidoId": 100,
    "id": 69
  }
}
```

**📤 Verificar:**

- ✅ En **Terminal 2** verás logs: `✅ Detalle creado: 69` y `📥 Event saved to webhook_events`
- ✅ En **webhook.site** (navegador) aparecerá el webhook recibido
- ✅ Detalle guardado en PostgreSQL (base de datos `ms_detallepedido` puerto 5434)

---

### TEST 2: Reservar Stock de Producto (Evento: producto.reservado)

**📂 Ejecutar en Terminal 4** - Carpeta: `/Practica_2/`

```bash
curl -X POST http://localhost:3003/productos/reservar \
  -H "Content-Type: application/json" \
  -d '{
    "producto_id": 10,
    "cantidad_solicitada": 2,
    "detalle_pedido_id": 69
  }'
```

**✅ Respuesta esperada (201 Created):**

```json
{
  "mensaje": "Stock reservado exitosamente",
  "producto": {
    "id": 10,
    "nombre": "Producto Test",
    "stock": 98,
    "precio": 99.99,
    ...
  }
}
```

**📤 Verificar:**

- ✅ En **Terminal 3** verás logs de webhook publicado
- ✅ En **webhook.site** aparecerá otro webhook
- ✅ Stock actualizado en PostgreSQL (base de datos `ms_producto` puerto 5433)

---

### TEST 3: Verificar Webhooks en Supabase (HMAC + Idempotencia)

**📂 Verificar en navegador** + **Supabase Dashboard**

1. Abre en navegador: `https://webhook.site/b5eea99a-0edc-40c4-b3c8-071318badca2`

**Deberías ver:**

- ✅ Headers: `X-Webhook-Signature` (firma HMAC-SHA256)
- ✅ Headers: `X-Webhook-Timestamp` (protección anti-replay)
- ✅ Body contiene: `event`, `id`, `idempotency_key`, `timestamp`, `data`

2. Abre Supabase: `https://supabase.com/dashboard` y ejecuta en SQL Editor:

```sql
-- Ver eventos publicados
SELECT id, event_type, idempotency_key, status FROM webhook_events ORDER BY created_at DESC LIMIT 5;

-- Ver entregas de webhooks
SELECT event_id, subscription_id, status, attempt_number FROM webhook_deliveries ORDER BY created_at DESC LIMIT 10;
```

---

### TEST 4: Probar Idempotencia (Enviar mismo webhook 2 veces)

**📂 Ejecutar en Terminal 4** - Carpeta: `/Practica_2/`

```bash
# Petición 1
curl -X POST http://localhost:3002/detalles-pedidos \
  -H "Content-Type: application/json" \
  -d '{"pedido_id":200,"producto_id":20,"cantidad":3,"precio_unitario":50.00,"subtotal":150.00}'

# Esperar 2 segundos
sleep 2

# Petición 2 (IDÉNTICA a la 1)
curl -X POST http://localhost:3002/detalles-pedidos \
  -H "Content-Type: application/json" \
  -d '{"pedido_id":200,"producto_id":20,"cantidad":3,"precio_unitario":50.00,"subtotal":150.00}'
```

**✅ Resultado esperado:**

- Ambas peticiones retornan 201 Created
- **PERO** en la BD solo se crea UN registro (deduplicación por idempotency_key)
- El webhook solo se envía UNA SOLA VEZ

---

### TEST 5: Verificar Retry Exponencial (OPCIONAL)

Los reintentos están configurados con delays:

- Intento 1: Inmediato
- Intento 2: 1 minuto
- Intento 3: 5 minutos
- Intento 4: 30 minutos
- Intento 5: 2 horas
- Intento 6: 12 horas
- Intento 7: 24 horas (última oportunidad)

**Para ver cómo funciona:** Mata temporalmente webhook.site y verifica que los reintentos se ejecuten.

---

## 🔍 VERIFICACIÓN FINAL (Mostrar al Profesor)

### ✅ Opción A: Desde Terminal 2 y Terminal 3 (Ver logs)

**Terminal 2 (ms-detallepedido):**
Deberías ver después de ejecutar TEST 1:

```
[Nest] ... LOG [DetallePedidoService] ✅ Detalle creado: 69
📤 Intentando publicar webhook...
[Nest] ... LOG [WebhookPublisherService] 📥 Event saved to webhook_events: evt_abc123
[Nest] ... LOG [WebhookPublisherService] Sending webhook attempt 1/6 to: https://gfatzgtxzryjtbeirygb.supabase.co/functions/v1/webhook-event-logger
[Nest] ... LOG [WebhookPublisherService] ✅ Published event: detalle.creado (evt_abc123) to 3 subscribers
[Nest] ... LOG [DetallePedidoService] ✅ Webhook "detalle.creado" publicado a Edge Functions
```

**Terminal 3 (ms-producto):**
Deberías ver después de ejecutar TEST 2:

```
[Nest] ... LOG [ProductoService] ✅ Stock reservado: 10
📤 Intentando publicar webhook...
[Nest] ... LOG [WebhookPublisherService] 📥 Event saved to webhook_events: evt_def456
[Nest] ... LOG [WebhookPublisherService] ✅ Published event: producto.reservado (evt_def456) to 3 subscribers
```

---

### ✅ Opción B: Desde Supabase Dashboard

**📂 Acceso:** https://supabase.com/dashboard
**Proyecto:** gfatzgtxzryjtbeirygb

1. Navega a `SQL Editor`
2. Ejecuta estas queries:

```sql
-- Query 1: Ver todos los eventos publicados
SELECT id, event_type, idempotency_key, status, created_at
FROM webhook_events
ORDER BY created_at DESC
LIMIT 10;
```

**Resultado esperado:**

- Verás 2 filas: `detalle.creado` y `producto.reservado`
- Status: `success`
- Cada uno con su `idempotency_key` único

```sql
-- Query 2: Ver todas las entregas de webhooks
SELECT event_id, subscription_id, status, attempt_number, status_code, created_at
FROM webhook_deliveries
ORDER BY created_at DESC
LIMIT 15;
```

**Resultado esperado:**

- Verás múltiples filas (cada evento se envía a 3 suscriptores)
- Status: `success`
- Status_code: `200`

```sql
-- Query 3: Ver si hay eventos procesados (deduplicación)
SELECT * FROM processed_webhooks
ORDER BY created_at DESC
LIMIT 5;
```

**Resultado esperado:**

- Después de TEST 4 (idempotencia), verás que solo se procesa UNA vez

---

### ✅ Opción C: Desde webhook.site (Visualización en navegador)

**📂 URL:** https://webhook.site/b5eea99a-0edc-40c4-b3c8-071318badca2

**Verás:**

- ✅ 2 webhooks recibidos (uno de cada evento)
- ✅ Cada uno con Headers: `X-Webhook-Signature`, `X-Webhook-Timestamp`
- ✅ Body con estructura: `{ event, id, idempotency_key, timestamp, data, metadata }`
- ✅ Timestamp ISO 8601 válido
- ✅ Datos correctos del evento

---

### ✅ Opción D: Desde PostgreSQL Local (Terminal 4)

**📂 Carpeta:** `/Practica_2/`

```bash
# Ver datos en ms_detallepedido (Puerto 5434)
PGPASSWORD=postgres psql -h localhost -p 5434 -U postgres -d ms_detallepedido -c "SELECT * FROM detalle_pedido ORDER BY id DESC LIMIT 5;"

# Resultado esperado: Verás el registro creado en TEST 1
# id | productoId | cantidad_solicitada | precio_unitario | subtotal | pedidoId
# 69 | 10         | 2                   | 99.99           | 199.98   | 100
```

```bash
# Ver datos en ms_producto (Puerto 5433)
PGPASSWORD=postgres psql -h localhost -p 5433 -U postgres -d ms_producto -c "SELECT * FROM producto WHERE id = 10;"

# Resultado esperado: Stock actualizado de 100 a 98
# id | nombre         | stock | precio | estado
# 10 | Producto Test  | 98    | 99.99  | active
```

---

## 📊 ARQUITECTURA A PRESENTAR

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (curl/Postman)                  │
└────────────┬──────────────────────────────────────────────┘
             │
    ┌────────▼────────┐              ┌──────────────────┐
    │ ms-detallepedido│◄──webhook───►│ ms-producto      │
    │  (Puerto 3002)  │              │  (Puerto 3003)   │
    └────────┬────────┘              └──────────────────┘
             │
    ┌────────▼──────────────────────────────────┐
    │  PostgreSQL Local (Docker)                │
    │  - ms_detallepedido (5434)                │
    │  - ms_producto (5433)                     │
    └──────────────────────────────────────────┘
             │
    ┌────────▼──────────────────────────────────┐
    │  Supabase PostgreSQL (Cloud)              │
    │  - webhook_events                         │
    │  - webhook_deliveries                     │
    │  - webhook_subscriptions                  │
    │  - processed_webhooks (DLQ)               │
    └──────────────────────────────────────────┘
             │
    ┌────────▼──────────────────────────────────┐
    │  Supabase Edge Functions                  │
    │  - webhook-event-logger                   │
    │  - webhook-external-notifier              │
    └──────────────────────────────────────────┘
             │
    ┌────────▼──────────────────────────────────┐
    │  webhook.site (Visualización)             │
    │  https://webhook.site/b5eea99a...        │
    └──────────────────────────────────────────┘
```

---

## 🎯 PUNTOS CLAVE A MENCIONAR AL PROFESOR

### 1. **Patrón Webhooks (Event-Driven)**

- Los microservicios se comunican mediante eventos (publish-subscribe)
- Desacoplamiento total entre servicios
- Escalabilidad horizontal

### 2. **Seguridad**

- ✅ HMAC-SHA256 para firmar webhooks
- ✅ Timestamp validation (ventana de 5 minutos anti-replay)
- ✅ SERVICE_ROLE_KEY para autenticación en Supabase

### 3. **Confiabilidad**

- ✅ Retry exponencial (6 intentos con delays crecientes)
- ✅ Dead Letter Queue (DLQ) para webhooks fallidos
- ✅ Idempotencia por idempotency_key (deduplicación)

### 4. **Auditabilidad**

- ✅ webhook_events: registro de todos los eventos publicados
- ✅ webhook_deliveries: tracking de cada intento
- ✅ webhook_audit_log: historial completo

### 5. **Tecnologías Utilizadas**

- NestJS (microservicios)
- TypeORM (ORM)
- PostgreSQL (persistencia local)
- Supabase (PostgreSQL cloud + Edge Functions)
- Deno (Edge Functions para procesamiento)
- HMAC-SHA256 (criptografía)

---

## ⚠️ TROUBLESHOOTING

### Problema: "Port 3002 already in use"

```bash
pkill -f "nest start"
sleep 2
npm run start:dev
```

### Problema: "Cannot connect to Supabase"

```bash
# Verifica las credenciales en .env
cat .env | grep SUPABASE
```

### Problema: "Webhooks no se entregan"

```bash
# Verifica webhook_subscriptions en Supabase tiene URL correcta
SELECT * FROM webhook_subscriptions WHERE is_active = true;
```

### Problema: "Decimal values not working"

```bash
# Los tipos de columna ya están arreglados en las entidades
# precio_unitario, subtotal, precio ahora son DECIMAL(10, 2)
```

---

## 📝 CHECKLIST ANTES DE PRESENTAR

### Paso 0: Posicionate en la carpeta correcta

```bash
cd /home/david/Escritorio/Codigos/Aplicaciones_servidores/APESW/Segundo_parcial/Practica_2
```

### Paso 1: Abre 4 terminales/pestañas

- [ ] **Terminal 1** - Para `docker-compose up`
- [ ] **Terminal 2** - Para `ms-detallepedido` con `npm run start:dev`
- [ ] **Terminal 3** - Para `ms-producto` con `npm run start:dev`
- [ ] **Terminal 4** - Para ejecutar `curl` commands

### Paso 2: En cada terminal, antes de ejecutar

```bash
# IMPORTANTE: Asegúrate de estar en la carpeta correcta

# Terminal 1 (Docker)
cd /home/david/Escritorio/Codigos/Aplicaciones_servidores/APESW/Segundo_parcial/Practica_2

# Terminal 2 (ms-detallepedido)
cd /home/david/Escritorio/Codigos/Aplicaciones_servidores/APESW/Segundo_parcial/Practica_2/ms-detallepedido

# Terminal 3 (ms-producto)
cd /home/david/Escritorio/Codigos/Aplicaciones_servidores/APESW/Segundo_parcial/Practica_2/ms-producto

# Terminal 4 (testing)
cd /home/david/Escritorio/Codigos/Aplicaciones_servidores/APESW/Segundo_parcial/Practica_2
```

### Paso 3: Inicia en orden

1. [ ] Terminal 1: `docker-compose up` (esperar 5 segundos)
2. [ ] Terminal 2: `npm install && npm run start:dev` (esperar a ver "escuchando en 3002")
3. [ ] Terminal 3: `npm install && npm run start:dev` (esperar a ver "escuchando en 3003")
4. [ ] Navegador: Abre https://webhook.site/b5eea99a-0edc-40c4-b3c8-071318badca2
5. [ ] Terminal 4: Listo para ejecutar curl commands

### Paso 4: Verifica conexiones

```bash
# En Terminal 4, verifica que ambos microservicios responden
curl -s http://localhost:3002/health || echo "❌ ms-detallepedido no responde"
curl -s http://localhost:3003/health || echo "❌ ms-producto no responde"
```

Si ambos responden, ¡estás listo para presentar! ✅

---

## 🎬 GUIÓN PRESENTACIÓN (2-3 minutos)

1. **Mostrar arquitectura** (30 segundos)

   - Explica: "Tenemos 2 microservicios que se comunican mediante webhooks"
   - Muestra el DEMO.md - apartado "Arquitectura a presentar"

2. **Ejecutar TEST 1** (30 segundos)

   - Ejecuta en Terminal 4: `curl POST /detalles-pedidos`
   - Muestra respuesta 201 Created
   - Explica: "El detalle se guardó en PostgreSQL local"

3. **Ver log en Terminal 2** (20 segundos)

   - Señala los logs: "✅ Detalle creado" y "📥 Event saved to webhook_events"
   - Explica: "El evento se publicó a Supabase"

4. **Mostrar webhook.site** (20 segundos)

   - Actualiza navegador en webhook.site
   - Muestra: "¡El webhook llegó!" con firma HMAC

5. **Ejecutar TEST 2** (30 segundos)

   - Ejecuta en Terminal 4: `curl POST /productos/reservar`
   - Muestra respuesta 201 Created
   - Muestra log en Terminal 3

6. **Mostrar Supabase dashboard** (40 segundos)

   - Abre https://supabase.com/dashboard
   - Ejecuta SQL: `SELECT * FROM webhook_events LIMIT 5;`
   - Explica: "Aquí ves todos los eventos publicados con su idempotency_key"

7. **Explicar seguridad** (30 segundos)
   - Muestra headers en webhook.site: `X-Webhook-Signature`
   - Explica: "Firmamos cada webhook con HMAC-SHA256 para que webhook.site verifique que vino de nosotros"
   - Explica: "Si alguien intenta alterar el webhook, la firma es inválida"

---

**Total: ~3 minutos** ✅

Puntos clave a mencionar:

- ✅ **Event-Driven**: Microservicios se comunican por eventos
- ✅ **Desacoplado**: No hay dependencia directa entre servicios
- ✅ **Seguro**: HMAC-SHA256 para firmar webhooks
- ✅ **Confiable**: Retry exponencial + idempotencia
- ✅ **Auditable**: webhook_events, webhook_deliveries, webhook_audit_log

---

¡Listo! Ahora tienes todo para demostrar el proyecto al profesor. 🎓
