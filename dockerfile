# Imagen base ligera de Node
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar solo manifest para aprovechar la cache
COPY package*.json ./

# Instalar dependencias (prod + dev si necesitas build/test)
RUN npm install

# Copiar el resto del código
COPY . .

# Variable de entorno para el puerto
ENV PORT=3001

# Exponer puerto de la API
EXPOSE 3001

# Comando de inicio
CMD ["npm", "start"]
