import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Galeria() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "experiencias"), orderBy("fecha", "desc")); 
    // Nota: aquí usamos la colección donde guardaste las experiencias con imagen

    const unsub = onSnapshot(q, snap => {
      const docs = snap.docs.map(d => d.data());
      console.log("Docs desde Firestore:", docs); // Para revisar qué llega
      setItems(docs.filter(i => i.imagen)); // Solo los que tienen imagen
    });

    return () => unsub();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#41644A] rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-[#F8C662]">
        Galería
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.length > 0 ? (
          items.map((it, i) => (
            <img
              key={i}
              src={it.imagen}
              alt={it.mensaje || "foto"}
              className="w-full h-40 object-cover rounded-xl shadow-md border border-[#D6A354]"
            />
          ))
        ) : (
          <p className="text-white col-span-full text-center">
            No hay imágenes para mostrar
          </p>
        )}
      </div>
    </div>
  );
}

export default Galeria;
