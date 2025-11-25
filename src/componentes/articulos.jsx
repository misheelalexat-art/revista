import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import CrearEditarArticulo from "./CrearEditarArticulo";

function Articulos() {
  const [articulos, setArticulos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const auth = getAuth();

  // Escuchar login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  // Cargar artículos desde Firebase
  useEffect(() => {
    const q = query(collection(db, "articulos"), orderBy("fecha", "desc"));
    const unsub = onSnapshot(q, snap => {
      const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setArticulos(lista);
    });
    return () => unsub();
  }, []);

  // Formatear fecha seguro para strings o timestamps
  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    if (fecha.toDate) {
      return fecha.toDate().toLocaleDateString();
    }
    return fecha;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* Botón crear artículo */}
      {usuario && (
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-morenaBrown text-white px-6 py-2 rounded-full shadow-md 
                     hover:bg-morenaSaffron hover:text-morenaHunter transition-all font-semibold"
        >
          + Crear Artículo
        </button>
      )}

      {/* Lista */}
      {articulos.length === 0 ? (
        <p className="text-center text-morenaBrown mt-6 text-lg font-serif">
          No hay artículos aún 😔
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {articulos.map((a) => (
            <Link
              key={a.id}
              to={`/articulo/${a.id}`}
              className="group bg-[#FFF3E0] rounded-3xl overflow-hidden shadow-md 
                         hover:shadow-xl transition-all duration-300 border border-morenaSaffron/40"
            >
              {/* Imagen arriba en estilo revista */}
              {a.img && (
                <img
                  src={a.img}
                  alt={a.titulo}
                  className="w-full h-48 object-cover group-hover:brightness-110 transition-all"
                />
              )}

              <div className="p-5">
                <h2 className="text-2xl font-serif font-bold text-morenaBrown group-hover:text-morenaSaffron transition">
                  {a.titulo}
                </h2>

                <p className="text-sm italic text-morenaBrown mt-1">
                  {a.categoria} • {formatearFecha(a.fecha)}
                </p>

                <p className="mt-2 text-morenaHunter line-clamp-3 text-sm">
                  {a.contenido || a.texto}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalAbierto && (
        <CrearEditarArticulo cerrar={() => setModalAbierto(false)} usuario={usuario} />
      )}
    </div>
  );
}

export default Articulos;
