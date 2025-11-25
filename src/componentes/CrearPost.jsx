// src/componentes/CrearPost.jsx
import { useState } from "react";
import { db, storage, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function CrearPost({ visible, cerrar }) {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("Historias");
  const [file, setFile] = useState(null);
  const [cargando, setCargando] = useState(false);

  if (!visible) return null;

  const subirYGuardar = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      let url = null;

      if (file) {
        const storageRef = ref(storage, `posts/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        url = await getDownloadURL(storageRef);
      }

      const user = auth.currentUser;

      await addDoc(collection(db, "posts"), {
        texto,
        categoria,
        imagen: url,
        autor: user ? (user.displayName || user.email) : "Visitante",
        uid: user ? user.uid : null,
        fecha: serverTimestamp(),
        likes: 0,
      });

      setTexto("");
      setCategoria("Historias");
      setFile(null);
      cerrar();
    } catch (err) {
      console.error(err);
      alert("Error al crear el post");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">

      <form
        onSubmit={subirYGuardar}
        className="bg-[#41644A] w-full max-w-lg p-6 rounded-2xl shadow-2xl border border-[#D6A354] animate-scaleIn"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#F8C662]">
          Compartir experiencia
        </h2>

        {/* Categoría */}
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-white border border-[#D6A354]
                     focus:outline-none focus:ring-2 focus:ring-[#F8C662]"
        >
          <option>Historias</option>
          <option>Moda</option>
          <option>Autoestima</option>
          <option>Bienestar</option>
          <option>Cultura</option>
        </select>

        {/* Texto */}
        <textarea
          required
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Cuenta tu historia, pregunta o tip..."
          className="w-full p-3 bg-white border border-[#D6A354] rounded-lg mb-4
                     focus:outline-none focus:ring-2 focus:ring-[#F8C662]"
          rows={4}
        ></textarea>

        {/* Archivo */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full px-3 py-2 bg-white border border-[#D6A354] rounded-lg cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-[#F8C662]"
        />

        {/* Botones */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={cerrar}
            className="px-4 py-2 border border-[#D6A354] text-white rounded-lg
                       hover:bg-[#D6A354] hover:text-[#41644A] transition font-semibold"
          >
            Cancelar
          </button>

          <button
            disabled={cargando}
            type="submit"
            className="px-4 py-2 bg-[#6B3F2C] text-white rounded-lg font-semibold
                       hover:bg-[#D1861C] transition"
          >
            {cargando ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearPost;
