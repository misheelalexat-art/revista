import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import BuscadorNavbar from "./BuscadorNavbar";

function NavbarUsuario({ onBuscar }) {
  const auth = getAuth();

  const cerrarSesion = async () => {
    await signOut(auth);
  };

  return (
    <header className="w-full py-6 border-b shadow-md bg-[#41644A] flex flex-col items-center gap-4">

      {/* Título */}
      <h1 className="text-3xl font-serif tracking-widest text-[#F8C662]">
        <strong>Morena</strong>
      </h1>
      <p className="text-sm italic mt-1 text-[#D1861C]">
        “Más que piel, somos historia.”
      </p>


      {/* Buscador */}
      <BuscadorNavbar onBuscar={onBuscar} />

      {/* Menú */}
      <nav className="flex gap-8 text-sm uppercase tracking-wide text-white font-medium">
        <Link to="/" className="hover:text-[#F8C662] transition-colors">Inicio</Link>
        <Link to="/articulos" className="hover:text-[#F8C662] transition-colors">Artículos</Link>
        <Link to="/comunidad" className="hover:text-[#F8C662] transition-colors">Comunidad</Link>
        <Link to="/contacto" className="hover:text-[#F8C662] transition-colors">Contacto</Link>
        <Link to="/somos" className="hover:text-[#F8C662] transition-colors">Somos</Link>
        <Link to="/articulos-locales" className="hover:text-[#F8C662] transition-colors">Articulos Locales</Link>
      </nav>

      {/* Cerrar sesión */}
      <button
        onClick={cerrarSesion}
        className="mt-1 text-white hover:text-[#D1861C] font-semibold tracking-wide transition-all"
      >
        Cerrar Sesión
      </button>
    </header>
  );
}

export default NavbarUsuario;
