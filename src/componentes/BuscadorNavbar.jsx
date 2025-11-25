import { useState } from "react";

function BuscadorNavbar({ onBuscar }) {
  const [texto, setTexto] = useState("");

  const manejarCambio = (e) => {
    setTexto(e.target.value);
    onBuscar(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar…"
        value={texto}
        onChange={manejarCambio}
        className="
          px-3 py-1 pl-8 rounded-full
          bg-morenaIvory text-morenaBrown font-serif
          border border-morenaGold shadow-md
          focus:ring-2 focus:ring-morenaGold
          outline-none w-40 transition-all duration-300
        "
      />

      <span className="absolute left-2 top-1.5 text-morenaSaffron text-sm">🔍</span>
    </div>
  );
}

export default BuscadorNavbar;
