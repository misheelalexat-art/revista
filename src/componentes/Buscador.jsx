import { useState } from "react";

function Buscador({ articulos }) {
  const [busqueda, setBusqueda] = useState("");

  const resultados =
    articulos?.filter(
      (art) =>
        art.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        art.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
        art.contenido.toLowerCase().includes(busqueda.toLowerCase())
    ) || [];

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar en Morena..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="
            w-full p-3 pl-10 
            border-2 border-morenaGold
            rounded-xl shadow-md 
            focus:ring-2 focus:ring-morenaGold 
            font-serif text-morenaBrown 
            bg-morenaIvory outline-none
            transition-all duration-300
          "
        />
        <span className="absolute left-3 top-3 text-morenaSaffron">🔍</span>
      </div>

      <div className="mt-4 space-y-3">
        {busqueda && resultados.length === 0 && (
          <p className="text-morenaBrown text-center">
            No se encontró nada 😢
          </p>
        )}

        {resultados.map((r) => (
          <div
            key={r.id}
            className="bg-morenaIvory p-4 shadow-md rounded-xl border border-morenaGold"
          >
            <h3 className="text-xl font-serif font-bold text-morenaSaffron">
              {r.titulo}
            </h3>

            <p className="text-morenaRust text-sm">{r.categoria}</p>

            <p className="mt-2 text-morenaHunter line-clamp-2">
              {r.contenido}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buscador;
