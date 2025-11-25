import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Escribir({ cerrar, editando, guardarEdicion }) {
  const [texto, setTexto] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editando) {
      setTexto(editando.texto || "");
      setPreview(editando.imagen || null);
    }
  }, [editando]);

  const subirImagen = async (file) => {
    if (!file) return null;
    const imgRef = ref(storage, `experiencias/${Date.now()}-${file.name}`);
    await uploadBytes(imgRef, file);
    return await getDownloadURL(imgRef);
  };

  const guardarNuevo = async () => {
    let urlImg = null;
    if (imagen) urlImg = await subirImagen(imagen);

    await addDoc(collection(db, "experiencias"), {
      texto,
      imagen: urlImg,
      fecha: serverTimestamp(),
    });

    cerrar();
  };

  const enviar = async () => {
    if (editando) {
      let urlImg = editando.imagen;
      if (imagen) urlImg = await subirImagen(imagen);
      guardarEdicion({ texto, imagen: urlImg });
    } else {
      guardarNuevo();
    }
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
      <div className="bg-[#41644A] w-full max-w-md p-6 rounded-2xl shadow-xl border border-[#D6A354]">

        {/* Título */}
        <h2 className="text-xl font-bold text-[#F8C662] mb-3">
          {editando ? "Editar experiencia ✨" : "Nueva experiencia ✨"}
        </h2>

        {/* Texto */}
        <textarea
          className="w-full p-3 border border-[#D6A354] rounded-lg mb-3 bg-white text-[#6B3F2C] focus:outline-none focus:ring-2 focus:ring-[#F8C662]"
          rows="4"
          placeholder="Comparte tu experiencia..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        ></textarea>

        {/* Preview imagen */}
        {preview && (
          <img
            src={preview}
            className="w-full rounded-lg mb-3 max-h-64 object-cover border border-[#D6A354] shadow-md"
          />
        )}

        {/* Selector imagen */}
        <input
          type="file"
          onChange={handleImagen}
          className="mb-4 w-full px-3 py-2 border border-[#D6A354] bg-white text-[#6B3F2C] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F8C662]"
        />

        {/* Botones */}
        <div className="flex justify-between mt-4">

          <button
            onClick={cerrar}
            className="px-4 py-2 bg-[#F8C662] text-[#41644A] font-semibold rounded-lg hover:bg-[#D1861C] transition"
          >
            Cancelar
          </button>

          <button
            onClick={enviar}
            className="px-4 py-2 bg-[#6B3F2C] text-white font-semibold rounded-lg hover:bg-[#D1861C] transition"
          >
            {editando ? "Guardar cambios" : "Publicar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Escribir;
