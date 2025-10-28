# Práctica 5 - API GraphQL con NestJS

## 📋 Descripción

Este proyecto es un servidor GraphQL construido con NestJS que funciona como una capa intermedia entre el cliente y la API REST de la práctica-4. Consume los endpoints REST y los expone a través de queries y mutations de GraphQL, proporcionando una interfaz más flexible y eficiente para consultar datos.

## 🏗️ Arquitectura

```
Cliente GraphQL → Servidor GraphQL (practica-5) → API REST (practica-4) → Base de Datos SQLite
```

## 🚀 Tecnologías

- **NestJS** - Framework progresivo de Node.js
- **GraphQL** - Lenguaje de consulta para APIs
- **Apollo Server** - Servidor GraphQL
- **TypeScript** - Lenguaje de programación
- **Axios** - Cliente HTTP para consumir la API REST

## 📦 Entidades y Operaciones

El proyecto implementa las siguientes entidades con operaciones CRUD completas:

### 1. **Clientes**
- `clientes` - Obtener todos los clientes
- `cliente(id)` - Obtener un cliente por ID
- `createCliente` - Crear un nuevo cliente
- `updateCliente` - Actualizar un cliente existente
- `removeCliente` - Eliminar un cliente

### 2. **Productos**
- `productos` - Obtener todos los productos
- `producto(id)` - Obtener un producto por ID
- `createProducto` - Crear un nuevo producto
- `updateProducto` - Actualizar un producto
- `removeProducto` - Eliminar un producto

### 3. **Insumos**
- `insumos` - Obtener todos los insumos
- `insumo(id)` - Obtener un insumo por ID
- `createInsumo` - Crear un nuevo insumo
- `updateInsumo` - Actualizar un insumo
- `removeInsumo` - Eliminar un insumo

### 4. **Pedidos**
- `pedidos` - Obtener todos los pedidos
- `pedido(id)` - Obtener un pedido por ID
- `createPedido` - Crear un nuevo pedido
- `updatePedido` - Actualizar un pedido
- `removePedido` - Eliminar un pedido

### 5. **Facturas**
- `facturas` - Obtener todas las facturas
- `factura(id)` - Obtener una factura por ID
- `createFactura` - Crear una nueva factura
- `updateFactura` - Actualizar una factura
- `removeFactura` - Eliminar una factura

### 6. **Órdenes de Producción**
- `ordenProduccion` - Obtener todas las órdenes
- `ordenProduccion(id)` - Obtener una orden por ID
- `createOrdenProduccion` - Crear una nueva orden
- `updateOrdenProduccion` - Actualizar una orden
- `removeOrdenProduccion` - Eliminar una orden

### 7. **Detalles de Pedidos**
- `detallesPedidos` - Obtener todos los detalles
- `detallesPedido(id)` - Obtener un detalle por ID
- `createDetallesPedido` - Crear un nuevo detalle
- `updateDetallesPedido` - Actualizar un detalle
- `removeDetallesPedido` - Eliminar un detalle

### 8. **Detalle Orden Producción**
- `detalleOrdenProduccion` - Obtener todos los detalles
- `detalleOrdenProduccion(id)` - Obtener un detalle por ID
- `createDetalleOrdenProduccion` - Crear un nuevo detalle
- `updateDetalleOrdenProduccion` - Actualizar un detalle
- `removeDetalleOrdenProduccion` - Eliminar un detalle

### 9. **Productos-Insumos**
- `productosInsumos` - Obtener todas las relaciones
- `productosInsumo(id)` - Obtener una relación por ID
- `createProductosInsumo` - Crear una nueva relación
- `updateProductosInsumo` - Actualizar una relación
- `removeProductosInsumo` - Eliminar una relación

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene con Node.js)
- **La API REST de la práctica-4 ejecutándose en `http://localhost:3000`**

## 🔧 Instalación

1. Navega al directorio del proyecto:
```bash
cd Practicas/practica-5
```

2. Instala las dependencias:
```bash
npm install
```

## ⚙️ Configuración

El proyecto está configurado para consumir la API REST en `http://localhost:3000/chifles/*`. Si tu API REST usa un puerto diferente, actualiza la variable `baseUrl` en cada servicio ubicado en:

- `src/clientes/clientes.service.ts`
- `src/productos/productos.service.ts`
- `src/insumos/insumos.service.ts`
- `src/pedidos/pedidos.service.ts`
- `src/facturas/facturas.service.ts`
- `src/orden-produccion/orden-produccion.service.ts`
- `src/detalles-pedidos/detalles-pedidos.service.ts`
- `src/detalle-orden-produccion/detalle-orden-produccion.service.ts`
- `src/productos-insumos/productos-insumos.service.ts`

## 🚀 Ejecución

**⚠️ IMPORTANTE**: Primero debes iniciar la API REST de la práctica-4 en el puerto 3000.

### Paso 1: Iniciar la API REST (práctica-4)
```bash
cd Practicas/Practica-4
npm run start:dev
```

### Paso 2: Iniciar el servidor GraphQL (práctica-5)
```bash
cd Practicas/practica-5
npm run start:dev
```

El servidor GraphQL estará disponible en: `http://localhost:3001/graphql`

## 🎮 Uso del GraphQL Playground

Una vez que ambos servidores estén ejecutándose, accede a:
```
http://localhost:3001/graphql
```

### Ejemplos de Queries

#### Obtener todos los clientes
```graphql
query {
  clientes {
    id
    nombre
    apellido
    email
    telefono
    dni
  }
}
```

#### Obtener un cliente con sus pedidos
```graphql
query {
  cliente(id: 1) {
    id
    nombre
    apellido
    email
    pedidos {
      id
      fecha
      estado
    }
  }
}
```

#### Obtener todos los productos
```graphql
query {
  productos {
    id
    nombre
    descripcion
    precio
    stock
  }
}
```

### Ejemplos de Mutations

#### Crear un nuevo cliente
```graphql
mutation {
  createCliente(createClienteInput: {
    nombre: "Juan"
    apellido: "Pérez"
    dni: "12345678"
    telefono: "987654321"
    email: "juan@example.com"
  }) {
    id
    nombre
    apellido
    email
  }
}
```

#### Actualizar un cliente
```graphql
mutation {
  updateCliente(updateClienteInput: {
    id: 1
    nombre: "Juan Carlos"
    email: "juancarlos@example.com"
  }) {
    id
    nombre
    apellido
    email
  }
}
```

#### Eliminar un cliente
```graphql
mutation {
  removeCliente(id: 1) {
    id
    nombre
  }
}
```

#### Crear un nuevo producto
```graphql
mutation {
  createProducto(createProductoInput: {
    nombre: "Chifles Picantes"
    descripcion: "Chifles con sabor picante"
    precio: 5.50
    stock: 100
  }) {
    id
    nombre
    precio
    stock
  }
}
```

## 🏗️ Estructura del Proyecto

```
src/
├── app.module.ts                 # Módulo principal
├── app.controller.ts             # Controlador principal
├── app.service.ts                # Servicio principal
├── main.ts                       # Punto de entrada
├── clientes/                     # Módulo de clientes
│   ├── clientes.module.ts
│   ├── clientes.resolver.ts
│   ├── clientes.service.ts
│   ├── entities/
│   └── dto/
├── productos/                    # Módulo de productos
├── insumos/                      # Módulo de insumos
├── pedidos/                      # Módulo de pedidos
├── facturas/                     # Módulo de facturas
├── orden-produccion/             # Módulo de órdenes de producción
├── detalles-pedidos/             # Módulo de detalles de pedidos
├── detalle-orden-produccion/     # Módulo de detalle orden producción
└── productos-insumos/            # Módulo de relación productos-insumos
```

## 🔍 Solución de Problemas

### Error: "Cannot GET /graphql"
- Verifica que el servidor esté ejecutándose en modo desarrollo con `npm run start:dev`
- Accede a la URL correcta: `http://localhost:3001/graphql`

### Error de conexión con la API REST
- Asegúrate de que la práctica-4 esté ejecutándose en `http://localhost:3000`
- Verifica que los endpoints de la API REST estén disponibles en `http://localhost:3000/chifles/*`
- Revisa los logs en la consola para ver mensajes de error específicos

### Error: "Module not found"
- Ejecuta `npm install` para instalar todas las dependencias
- Verifica que estés en el directorio correcto

## 📝 Scripts Disponibles

```bash
# Modo desarrollo (con hot-reload)
npm run start:dev

# Modo producción
npm run start:prod

# Compilar el proyecto
npm run build

# Ejecutar tests
npm run test

# Ejecutar tests e2e
npm run test:e2e

# Ver cobertura de tests
npm run test:cov
```

## 🤝 Relaciones entre Entidades

- **Cliente** → **Pedidos** (1:N)
- **Pedido** → **Detalles Pedido** (1:N)
- **Pedido** → **Factura** (1:1)
- **Producto** → **Detalles Pedido** (1:N)
- **Producto** → **Productos-Insumos** (1:N)
- **Insumo** → **Productos-Insumos** (1:N)
- **Orden Producción** → **Detalle Orden Producción** (1:N)
- **Producto** → **Orden Producción** (1:N)

## 📚 Recursos Adicionales

- [Documentación de NestJS](https://docs.nestjs.com)
- [Documentación de GraphQL](https://graphql.org/learn/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [TypeORM](https://typeorm.io)

## 👨‍💻 Autor

Proyecto desarrollado como parte de las prácticas de Aplicaciones Web 5B
