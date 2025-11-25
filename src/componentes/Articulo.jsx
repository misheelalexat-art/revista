import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import articulosData from "../data/morenaArticulos.json";
import CrearEditarArticulo from "./CrearEditarArticulo";

function Articulo() {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [modalEditar, setModalEditar] = useState(false);

  useEffect(() => {
    const encontrado = articulosData.articulos.find(a => String(a.id) === String(id));
    setArt(encontrado || null);
  }, [id]);

  if (!art) return <p className="text-center py-20">Artículo no encontrado 💔</p>;

  return (
    <div className="bg-morenaHunter min-h-screen py-10 px-6 flex justify-center">
      <article className="bg-[#FFF3E0] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative">
        <img src={art.img} alt={art.titulo} className="w-full h-72 object-cover rounded-t-3xl" />

        <div className="p-8 relative">
          <h1 className="text-4xl font-serif font-extrabold text-morenaSaffron mb-2">{art.titulo}</h1>
          <p className="text-morenaBrown text-sm italic mb-4">
            Publicado por <span className="font-bold">{art.autor}</span> • {art.fecha}
          </p>
          <span className="inline-block bg-morenaBrown text-white px-3 py-1 rounded-full text-sm font-semibold mb-6">
            {art.categoria}
          </span>
          <div className="text-morenaHunter text-lg leading-relaxed whitespace-pre-line">{art.contenido}</div>

          <div className="flex gap-3 mt-5">
            <button onClick={() => setModalEditar(true)} className="bg-morenaSaffron px-4 py-2 rounded shadow">
              Editar
            </button>
          </div>

          {modalEditar && <CrearEditarArticulo cerrar={() => setModalEditar(false)} articulo={art} />}

          <div className="mt-10 text-center">
            <Link to="/" className="bg-morenaBrown text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-morenaSaffron hover:text-morenaHunter transition-all duration-300">
              ← Volver a artículos
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Articulo;
