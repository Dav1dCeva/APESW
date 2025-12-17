#!/bin/bash

# Script para levantar todos los servicios requeridos para Practica_2

set -e

echo "🚀 Iniciando servicios para Practica_2..."
echo ""

# Detectar si Docker está disponible
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Instálalo primero."
    exit 1
fi

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. RabbitMQ
echo -e "${YELLOW}[1/5]${NC} Iniciando RabbitMQ en puerto 5672..."
docker run -d \
  --name practica2-rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3.12-management \
  2>/dev/null || echo -e "${GREEN}✓ RabbitMQ ya está corriendo${NC}"

# 2. PostgreSQL para ms-detallepedido
echo -e "${YELLOW}[2/5]${NC} Iniciando PostgreSQL (detalle) en puerto 5434..."
docker run -d \
  --name practica2-postgres-detalle \
  -e POSTGRES_PASSWORD=postgres \
  -p 5434:5432 \
  postgres:15 \
  2>/dev/null || echo -e "${GREEN}✓ PostgreSQL (detalle) ya está corriendo${NC}"

# 3. PostgreSQL para ms-producto
echo -e "${YELLOW}[3/5]${NC} Iniciando PostgreSQL (producto) en puerto 5433..."
docker run -d \
  --name practica2-postgres-producto \
  -e POSTGRES_PASSWORD=postgres \
  -p 5433:5432 \
  postgres:15 \
  2>/dev/null || echo -e "${GREEN}✓ PostgreSQL (producto) ya está corriendo${NC}"

# 4. Redis
echo -e "${YELLOW}[4/5]${NC} Iniciando Redis en puerto 6379..."
docker run -d \
  --name practica2-redis \
  -p 6379:6379 \
  redis:7 \
  2>/dev/null || echo -e "${GREEN}✓ Redis ya está corriendo${NC}"

# Esperar a que PostgreSQL esté listo
echo -e "${YELLOW}[5/5]${NC} Esperando a que PostgreSQL esté listo..."
sleep 3

# Crear bases de datos
echo "Creando bases de datos..."
docker exec practica2-postgres-detalle psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'ms_detallepedido'" | grep -q 1 || \
  docker exec practica2-postgres-detalle psql -U postgres -c "CREATE DATABASE ms_detallepedido" \
  && echo -e "${GREEN}✓ BD ms_detallepedido creada${NC}" || echo -e "${YELLOW}! BD ms_detallepedido ya existe${NC}"

docker exec practica2-postgres-producto psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'ms_producto'" | grep -q 1 || \
  docker exec practica2-postgres-producto psql -U postgres -c "CREATE DATABASE ms_producto" \
  && echo -e "${GREEN}✓ BD ms_producto creada${NC}" || echo -e "${YELLOW}! BD ms_producto ya existe${NC}"

echo ""
echo -e "${GREEN}✅ Todos los servicios están listos!${NC}"
echo ""
echo "📋 Próximos pasos:"
echo "1. En una terminal, corre: cd ms-detallepedido && npm run start:dev"
echo "2. En otra terminal, corre: cd ms-producto && npm run start:dev"
echo "3. En otra terminal, corre: cd gateway && npm run start:dev"
echo ""
echo "🧪 Luego revisa TESTING_GUIDE.md para los casos de prueba"
echo ""
echo "Para detener los servicios, ejecuta:"
echo "  docker stop practica2-rabbitmq practica2-postgres-detalle practica2-postgres-producto practica2-redis"
echo "  docker rm practica2-rabbitmq practica2-postgres-detalle practica2-postgres-producto practica2-redis"
