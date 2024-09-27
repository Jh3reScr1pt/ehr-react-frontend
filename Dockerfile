# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

# Instalar dependencias de producción
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm install

# Construir la aplicación
FROM deps AS build
COPY . ./
RUN npm run build

# Etapa final
FROM base AS final
WORKDIR /usr/src/app

# Copiar archivos construidos y dependencias
COPY --from=build /usr/src/app/dist ./dist
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Instalar un servidor estático
RUN npm install -g serve

# Exponer el puerto
EXPOSE 5173

# Comando para ejecutar la aplicación
CMD ["serve", "-s", "dist", "-l", "5173"]
