# Taller TypeORM Puro - Aplicación para el Servidor Web

## 🎯 Objetivo
Modelar entidades y relaciones utilizando TypeORM (sin frameworks) e implementar operaciones CRUD conectadas a una base de datos SQLite.

## 🧱 Entidades implementadas
- **Producto**: Representa los productos disponibles.
- **ProductoInsumo**: Define los insumos necesarios para fabricar un producto.
- **DetallePedido**: Registra los detalles de un pedido con la cantidad y subtotal.

## 🔗 Relaciones
- Un **Producto** tiene muchos **ProductoInsumo**.
- Un **Producto** tiene muchos **DetallePedido**.
- Un **ProductoInsumo** y un **DetallePedido** pertenecen a un solo **Producto**.

## ⚙️ Instalación y ejecución
1. Instala dependencias:
   ```bash
   npm install

![alt text](image.png)