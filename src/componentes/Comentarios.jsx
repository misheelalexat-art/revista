import { useState, useEffect } from "react";
import { db } from "../firebase";

import {
  collection,
  addDoc,
  query,
  onSnapshot,
  serverTimestamp,
  where,
  orderBy
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

function Comentarios({ articuloId }) {
  const [comentario, setComentario] = useState("");
  const [lista, setLista] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    if (!articuloId) return;

    const q = query(
      collection(db, "comentarios"),
      where("articuloId", "==", articuloId),
      orderBy("fecha", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const datos = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setLista(datos);
    });

    return () => unsub();
  }, [articuloId]);

  const enviarComentario = async () => {
    if (!comentario.trim()) return;

    const user = auth.currentUser;

    await addDoc(collection(db, "comentarios"), {
      texto: comentario,
      articuloId,
      usuario: user ? user.displayName || "Anónimo" : "Visitante",
      fecha: serverTimestamp(),
    });

    setComentario("");
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-3 text-morenaGold">
        Comentarios
      </h3>

      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe un comentario..."
        className="w-full p-3 border border-morenaOchre rounded-xl 
                   bg-morenaIvory shadow-sm focus:ring-2 
                   focus:ring-morenaGold outline-none"
      />

      <button
        onClick={enviarComentario}
        className="mt-3 bg-morenaBrown hover:bg-morenaOchre text-white 
                   px-4 py-2 rounded-xl shadow transition-all font-semibold"
      >
        Enviar
      </button>

      <div className="mt-6 space-y-4">
        {lista.map((c) => (
          <div
            key={c.id}
            className="bg-morenaIvory border border-morenaOchre 
                       p-3 rounded-xl shadow-sm text-morenaGold"
          >
            <p className="font-semibold text-morenaSaffron">{c.usuario}</p>
            <p>{c.texto}</p>
            <p className="text-xs text-morenaOchre mt-1">
              {c.fecha?.toDate?.().toLocaleString() || "..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comentarios;
