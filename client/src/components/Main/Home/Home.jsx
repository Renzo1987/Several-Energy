import React from "react";
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  return (
  <section id="home-section">
    <h1>Crear nueva oferta</h1>
    <article>
      <Link to="/cups">
        <button>Manualmente</button>
      </Link>
      <button>Subir factura</button>
    </article>
  </section>
  )
};

export default Home;
