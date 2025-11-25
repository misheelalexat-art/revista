// src/componentes/ArticuloPage.jsx
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comentarios from "./Comentarios";
import { db } from "../firebase";

function ArticuloPage() {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);

  useEffect(() => {
    async function cargarArticulo() {
      const ref = doc(db, "articulos", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setArticulo({ id: snap.id, ...snap.data() });
      } else {
        setArticulo("no-encontrado");
      }
    }

    cargarArticulo();
  }, [id]);

  if (articulo === null) {
    return <p className="text-center mt-10">Cargando artículo...</p>;
  }

  if (articulo === "no-encontrado") {
    return <p className="text-center mt-10">Artículo no encontrado 💔</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-morenaHunter rounded-2xl shadow-2xl">

      <img
        src={articulo.img}
        alt={articulo.titulo}
        className="w-full h-64 object-cover rounded-xl shadow-md border-2 border-morenaSaffron"
      />

      <h1 className="text-4xl font-bold text-morenaSaffron mt-6 font-serif">
        {articulo.titulo}
      </h1>

      <div className="mt-3 text-morenaBrown text-sm font-serif">
        <p>Por <span className="font-semibold">{articulo.autor}</span></p>
        <p>{articulo.fecha?.toDate?.().toLocaleDateString() || articulo.fecha}</p>
      </div>

      {articulo.categoria && (
        <span className="inline-block bg-morenaBrown text-white px-3 py-1 rounded-full text-sm font-semibold mt-3">
          {articulo.categoria}
        </span>
      )}

      <p className="mt-6 text-morenaSaffron leading-relaxed text-lg whitespace-pre-line font-serif">
        {articulo.contenido}
      </p>

      <div className="mt-10">
        <Comentarios articuloId={id} />
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/articulos"
          className="bg-morenaBrown text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-morenaSaffron hover:text-morenaHunter transition-all duration-300"
        >
          ← Volver a artículos
        </Link>
      </div>

    </div>
  );
}

export default ArticuloPage;
