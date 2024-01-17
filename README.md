<h1 align="center">Proyecto Full Stack: Calculadora de Ofertas Energéticas</h1>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JSON Web Tokens](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<h3> Este proyecto consiste en una aplicación web que permite a los asesores energéticos gestionar y calcular ofertas para clientes en el sector eléctrico. A continuación, se detallan las funcionalidades y pantallas clave de la aplicación. </h3>

<h2>Arquitectura del proyecto</h2>

<img width="600" width="600" alt="Captura de pantalla 2024-01-16 a las 16 14 53" src="https://github.com/Desafio-Tripulaciones/Fullstack-g1/assets/131009082/c95fd063-1583-4bc2-81e1-7afd84f545a0">

<h3>1. Fase de Ingreso del Usuario</h3>

<h4>Frontend (React Vite)</h4>
<p>
    El proceso de inicio comienza cuando el usuario carga la interfaz de React Vite en su navegador, la cual presenta formularios de inicio de sesión y registro. Al proporcionar sus credenciales, el frontend utiliza Axios para enviar la información al backend con el fin de autenticar al usuario. Express, en el backend, recibe estas solicitudes y, si las credenciales son válidas, responde enviando un token JWT al frontend.
</p>

<h3>2. Fase de Interacción con el Backend</h3>

<h4>Backend (Express y PostgreSQL)</h4>
<p>
    Para acciones que requieren acceso a la base de datos, el frontend envía solicitudes al backend. Express gestiona estas solicitudes a través de su API REST, ejecutando operaciones CRUD en PostgreSQL mediante sentencias SQL.
</p>

<h3>3. Fase de Interacción con la API (Python)</h3>
<p>
    La API en Python actúa como un intermediario entre el backend y Candela, facilitando la obtención de datos específicos solicitados por el usuario. Posteriormente, la API en Python transmite los datos de Candela al backend de Express. Este último procesa la información según las necesidades de la aplicación y responde al frontend con los datos procesados, los cuales se presentan en la interfaz de usuario.
</p>


<h2>Organización del Proyecto</h2>

<h3>Backend (API)</h3>
<ul>
  <li><strong>ROUTES:</strong> Rutas de la API.</li>
  <li><strong>CONFIG:</strong> Configuraciones, como corsOption.js y db-pgsql.js.</li>
  <li><strong>CONTROLLERS:</strong> Controladores para cada entidad.</li>
  <li><strong>MIDDLEWARES:</strong> Middleware, como morgan.js y verifyJWT.js.</li>
  <li><strong>MODELS:</strong> Modelos de datos.</li>
  <li><strong>QUERIES:</strong> Consultas SQL.</li>
</ul>

<h3>Frontend (Cliente)</h3>
<ul>
  <li><strong>CLIENT:</strong> Directorio principal del cliente.</li>
  <li><strong>SRC:</strong> Código fuente del cliente.</li>
  <li><strong>API:</strong> Configuración de Axios para llamadas a la API.</li>
  <li><strong>STYLES:</strong> Estilos para componentes y vistas.</li>
  <li><strong>CONTEXT:</strong> Contextos para la gestión del estado.</li>
  <li><strong>COMPONENTS:</strong> Componentes reutilizables.</li>
</ul>



