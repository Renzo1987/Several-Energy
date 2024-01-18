# Full Stack Project: Energy Offers Calculator

<div align="center">
  
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
  
</div>

## Description of the Project 💼

This project is a web application that allows energy consultants to manage and calculate offers for clients in the electrical sector. Below are the features and key screens of the application.

## Project Architecture

<div align="center">
    <img width="600" alt="Captura de pantalla 2024-01-16 a las 16 14 53"
        src="https://github.com/Desafio-Tripulaciones/Fullstack-g1/assets/131009082/c95fd063-1583-4bc2-81e1-7afd84f545a0">
</div>

### 1. User Login Phase

#### Frontend (React Vite)

The login process begins when the user loads the React Vite interface in their browser, which presents login and registration forms. By providing their credentials, the frontend uses Axios to send the information to the backend to authenticate the user. Express, on the backend, receives these requests and, if the credentials are valid, responds by sending a JWT token to the frontend.


<div align="center">
    <img width="400" alt="Captura de pantalla 2024-01-16 a las 23 13 43"
        src="https://github.com/Desafio-Tripulaciones/Fullstack-g1/assets/131009082/01e52325-7cdd-4d63-b080-3c8d9bec5cf8">
</div>

### 2. Interaction Phase with the Backend

#### Backend (Express y PostgreSQL)

For actions that require access to the database, the frontend sends requests to the backend. Express manages these requests through its REST API, performing CRUD operations in PostgreSQL using SQL statements.

The frontend is responsible for sending requests to the backend whenever there are actions that require access to the database. This interaction is facilitated through the use of the Express API, which manages these requests using its RESTful API and interfaces with the Python API.

The information sent from the frontend is processed based on the specific requirements of the application. The backend, powered by Express and Python APIs, handles these requests, interacts with the database, and processes the data accordingly. This processed data is then sent back to the frontend as a response. 

Subsequently, the frontend displays the processed data on the user interface, allowing users to interact with and view the information. This entire process ensures a seamless flow of data between the frontend, backend, and database, ultimately enhancing the user experience.

<div align="center">
  
<img width="400" alt="Captura de pantalla 2024-01-16 a las 23 14 00" src="https://github.com/Desafio-Tripulaciones/Fullstack-g1/assets/131009082/3d817556-02b4-4516-8594-2c2328748d04">

<img width="400" alt="Captura de pantalla 2024-01-16 a las 23 14 34" src="https://github.com/Desafio-Tripulaciones/Fullstack-g1/assets/131009082/2de3d77d-455f-4942-9b26-09a5e6c38074">

<img width="400" alt="Captura de pantalla 2024-01-16 a las 23 15 01" src="https://github.com/Desafio-Tripulaciones/Fullstack-g1/assets/131009082/446a3de9-1668-4160-a481-b87e30f0cb57">

<img width="400" alt="Captura de pantalla 2024-01-16 a las 23 15 48" src="https://github.com/Desafio-Tripulaciones/Fullstack-g1/assets/131009082/2c4e0df2-0ad0-46ef-847e-1fb590b6b850">

<img width="400" heigth="250" alt="Captura de pantalla 2024-01-16 a las 23 17 11" src="https://github.com/Desafio-Tripulaciones/Fullstack-g1/assets/131009082/42d70338-8903-4a1c-b43e-3cb64c3cbc4d">
</div>

FALTAN IMÁGENES

## Project Organization 🗂️

### Backend (API)

<ul>
<li>ROUTES:API routes.</li>
<li>CONFIG:Configurations, such as corsOption.js and db-pgsql.js.</li>
<li>CONTROLLERS:Controladores para cada entidad.</li>
<li>MIDDLEWARES:Controllers for each entity.</li>
<li>MODELS:Data models.</li>
<li>QUERIES:SQL queries.</li>
</ul>

### Frontend (Client)

<ul>
<li>CLIENT:Main client directory.</li>
<li>SRC:Client source code.</li>
<li>API:Axios configuration for API calls.</li>
<li>STYLES:Styles for components and views.</li>
<li>CONTEXT:Contexts for state management.</li>
<li>COMPONENTS:Reusable components.</li>
</ul>

## Authors 🖋️

- [Antonio Mangado Ariza](https://github.com/AntonioMangado)
- [Alejandro Márquez Andrade](https://github.com/alejandroFMA)
- [Alicia Cortínez López](https://github.com/alicia3194)

Together with the entire team from the other areas: 
- Data Science.
- Cloud.
- Cybersecurity.
- Marketing
- UI/UX design.


## Deployment 🚀

The application is deployed and accessible at the following URL:

[Your Deployment URL](YOUR_DEPLOYMENT_URL)

