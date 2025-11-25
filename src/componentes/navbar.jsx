import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // usamos la exportación nombrada de firebase.js

import NavbarUsuario from "./NavbarUsuario";
import NavbarVisitante from "./NavbarVisitante";

function Navbar({ onBuscar }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user ? user : null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {usuario ? (
        <NavbarUsuario onBuscar={onBuscar} />
      ) : (
        <NavbarVisitante onBuscar={onBuscar} />
      )}
    </>
  );
}

export default Navbar;
