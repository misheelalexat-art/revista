import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { useState } from "react";

import Navbar from './componentes/navbar.jsx';
import Footer from './componentes/Footer.jsx'
import Section from './componentes/section.jsx';
import Somos from './componentes/Somos.jsx';
import Hero from './componentes/hero.jsx';
import Login from './componentes/login.jsx';
import RegistrarCuenta from './componentes/RegistrarCuenta.jsx';
import Articulo from './componentes/Articulo.jsx';
import Articulos from './componentes/articulos.jsx';
import CrearEditarArticulo from './componentes/CrearEditarArticulo.jsx';
import Comunidad from './componentes/comunidad.jsx';
import RutaPriv from './componentes/rutaPriv.jsx';
import BotonEscribir from './componentes/boton.jsx';
import ModalExperiencia from './componentes/ModalExperiencia.jsx';
import Escribir from './componentes/Escribir.jsx';
import Buscador from './componentes/Buscador.jsx';
import BuscadorNavbar from './componentes/BuscadorNavbar.jsx';
import ArticuloPage from "./componentes/ArticuloPage.jsx";
import CrearArticulo from './componentes/CrearArticulo.jsx';
// import ImagePicker from './componentes/ImagePicker.jsx';
import Contenido from './componentes/Contenido.jsx';
import Retos from './componentes/Retos.jsx';
import Galeria from './componentes/Galeria.jsx';
import Encuesta from './componentes/Encuesta.jsx';
import AgregarUsuario from './componentes/AgregarUsuario.jsx';
import Contacto from "./componentes/Contacto.jsx";
import ArticulosLocales from './componentes/ArticulosLocales.jsx';

function App() {
  const [busqueda, setBusqueda] = useState("");

  return (
   <BrowserRouter>
  <Navbar onBuscar={(texto) => setBusqueda(texto)} />

  <Routes>
    <Route path="/" element={<><Hero /><Contenido /><Section /></>} />
    {/* <Route path="/articulos" element={<Articulos busqueda={busqueda} />} /> */}
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/somos" element={<Somos />} />
    <Route path="/iniciar_sesion" element={<Login />} />
    <Route path="/registrarse" element={<RegistrarCuenta />} />
    <Route path="/crear" element={<CrearArticulo />} />
    <Route path="/perfil" element={<AgregarUsuario />} />
    <Route path="/buscar" element={<><BuscadorNavbar /><Buscador /></>} />
    <Route path="/articulos" element={<Articulos />} />
    <Route path="/articulos-locales" element={<ArticulosLocales />} />

    {/* <Route path="/articulo/:id" element={<Articulo />} /> */}

    {/* COMUNIDAD PRIVADA */}
    <Route
      path="/comunidad"
      element={
        <RutaPriv>
          <Comunidad />
        </RutaPriv>
      }
    />
  </Routes>

  {/* FOOTER GLOBAL */}
  <Footer />
</BrowserRouter>

  );
}

export default App;
