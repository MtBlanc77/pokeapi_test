# Imagen base
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json si existe
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar el resto del código
COPY . .

# Exponer puerto de la API
EXPOSE 3001

# Comando de inicio
CMD ["npm", "start"]
