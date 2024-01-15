# Utilizar la imagen base de Node.js 14
<<<<<<< HEAD
FROM node:14
=======
FROM node:20-alpine

ENV port=5173
>>>>>>> dev

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /App

# Copiar el código del cliente al directorio de trabajo
COPY ./client ./client

# Instalar las dependencias del cliente
RUN cd client && npm install

# Exponer el puerto utilizado por el cliente
<<<<<<< HEAD
EXPOSE 3000

# Iniciar el cliente
CMD ["sh", "-c", "cd client && npm start"]
=======
EXPOSE 5173

# Iniciar el cliente
CMD ["sh", "-c", "cd client && npm run dev -- --port 5173 --host 0.0.0.0"]
>>>>>>> dev
