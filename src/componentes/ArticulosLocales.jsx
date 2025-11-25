import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import articulosData from "../data/morenaArticulos.json";

function ArticulosLocales() {
  const [articulos, setArticulos] = useState([]);

  // Cargar artículos desde JSON
  useEffect(() => {
    setArticulos(articulosData.articulos);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-morenaBrown mb-8 text-center">
        Revista Morena
      </h1>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {articulos.map((a) => (
          <Link
            key={a.id}
            to={`/articulo/${a.id}`}
            className="bg-[#FFF3E0] rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            {/* Imagen */}
            <img
              src={a.img}
              alt={a.titulo}
              className="w-full h-48 object-cover"
            />

            {/* Contenido */}
            <div className="p-4">
              <p className="text-morenaSaffron font-semibold text-sm mb-1">
                {a.categoria} • {a.fecha}
              </p>

              <h2 className="text-xl font-bold text-morenaBrown">
                {a.titulo}
              </h2>

              <p className="text-morenaBrown/80 mt-2 text-sm">
                {a.texto}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default ArticulosLocales;
