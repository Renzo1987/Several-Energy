import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home"
import Cups from "./InfoClient/Cups";
import DataClient from "./InfoClient/DataClient";
import Login from "./Login";
import Register from "./Register";
import Energy from "./Invoice/Energy"
import Power from "./Invoice/Power";
import DataExtra from "./DataExtra/DataExtra";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cups" element={<Cups />} />
        <Route path="/client" element={<DataClient />} />
        <Route path="/energy" element={<Energy />} />
        <Route path="/power" element={<Power />} />
        <Route path="/dataextra" element={<DataExtra/>}/>
        <Route path="/proposal" />
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </main>
  )

};

export default Main;
