import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function CrearEditarArticulo({ cerrar, usuario, articulo }) {
  const [titulo, setTitulo] = useState(articulo?.titulo || "");
  const [contenido, setContenido] = useState(articulo?.contenido || "");
  const [categoria, setCategoria] = useState(articulo?.categoria || "");
  const [imgFile, setImgFile] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    let imgURL = articulo?.img || null;

    if (imgFile) {
      const imgRef = ref(storage, `articulos/${Date.now()}-${imgFile.name}`);
      await uploadBytes(imgRef, imgFile);
      imgURL = await getDownloadURL(imgRef);
    }

    const datos = {
      titulo,
      contenido,
      categoria,
      img: imgURL,
      autor: usuario.displayName || "Usuario",
      autorUid: usuario.uid,
      fecha: serverTimestamp(),
    };

    try {
      if (articulo) {
        const docRef = doc(db, "articulos", articulo.id);
        await updateDoc(docRef, datos);
      } else {
        await addDoc(collection(db, "articulos"), datos);
      }
    } catch (error) {
      console.error("Error guardando artículo:", error);
    }

    setCargando(false);
    cerrar();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F8C662] p-8 rounded-3xl max-w-md w-full shadow-2xl border-2 border-[#D1861C]">
        <h2 className="text-3xl font-serif text-center text-[#2C263F] mb-6">
          {articulo ? "Editar Artículo" : "Crear Artículo"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            className="w-full p-3 rounded-lg border border-[#E7681D]"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Categoría"
            className="w-full p-3 rounded-lg border border-[#E7681D]"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            required
          />
          <textarea
            rows="4"
            placeholder="Contenido"
            className="w-full p-3 rounded-lg border border-[#E7681D]"
            value={contenido}
            onChange={e => setContenido(e.target.value)}
            required
          />
          <input type="file" accept="image/*" onChange={e => setImgFile(e.target.files[0])} />

          <button
            type="submit"
            className="w-full bg-[#E7681D] text-white p-3 rounded-xl font-semibold hover:bg-[#d45c17] transition-colors"
          >
            {cargando ? "Guardando..." : articulo ? "Guardar cambios" : "Crear"}
          </button>
        </form>

        <button
          onClick={cerrar}
          className="mt-4 w-full text-[#2C263F] font-semibold hover:text-[#595082]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default CrearEditarArticulo;
    