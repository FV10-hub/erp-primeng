# utiliza como base la imagen de node 15 con alpine como distro del sistema operativo
FROM node:18.16.0 AS builder

# establece el directorio de trabajo dentro del contenedor
WORKDIR /app

COPY package.json package-lock.json ./

# instala las dependencias de la aplicación
RUN npm install

#RUN npm cache clean --force

# copia todos los archivos de la aplicación al directorio de trabajo en la imagen
COPY . .

# compila la aplicación para producción
RUN npm run build

# utiliza como base para la imagen final la imagen oficial de Nginx alpine
#FROM nginx:1.23.3

# copia los archivos compilados de la aplicación a la carpeta de Nginx
#COPY --from=builder /app/dist/lubricampeon-erp/ /usr/share/nginx/html
## COPY assets/ /usr/share/nginx/html/assets
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx/nginx.conf /etc/nginx/conf.d
#
## expone el puerto 80 para servir el sitio web
#EXPOSE 80
#
## inicia el servidor web de Nginx cuando se inicia el contenedor
#CMD ["nginx", "-g", "daemon off;"]
