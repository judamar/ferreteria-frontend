# --------------------------
# Etapa 1: Construcción
# --------------------------
FROM node:24 AS builder

WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias (sin romper por peer deps)
RUN npm install --legacy-peer-deps

# Copiar código fuente
COPY . .

# Compilar la aplicación (Vite crea la carpeta dist)
RUN npm run build

# --------------------------
# Etapa 2: Servidor de producción
# --------------------------
FROM node:24

WORKDIR /app

# Instalar un servidor HTTP simple
RUN npm install -g serve

# Copiar el resultado del build
COPY --from=builder /app/dist ./dist

# Exponer el puerto (5173)
EXPOSE 5173

# Iniciar el servidor
CMD ["serve", "-s", "dist", "-l", "5173"]
