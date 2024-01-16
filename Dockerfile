# Utilizar la imagen base de Node.js 14
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /App

# Copiar el código del servidor al directorio de trabajo
COPY . ./server

# Instalar las dependencias del servidor
RUN cd server && npm install

# Exponer el puerto utilizado por el servidor
EXPOSE 3000

# Ejecutar el script de hardening
RUN cd server && chmod +x hardening.sh

# Iniciar el servidor
CMD ["sh", "-c", "cd server && npm start && hardening.sh"]
