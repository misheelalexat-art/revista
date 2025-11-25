// src/componentes/ModalExperiencia.jsx
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function ModalExperiencia({ visible, cerrar }) {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [imagenLink, setImagenLink] = useState(""); // Aquí guardamos el link
  const [cargando, setCargando] = useState(false);

  if (!visible) return null;

  const enviarExperiencia = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      await addDoc(collection(db, "experiencias"), {
        nombre,
        mensaje,
        imagen: imagenLink || null, // guarda el link
        fecha: new Date(),
      });
      setNombre("");
      setMensaje("");
      setImagenLink("");
    } catch (error) {
      console.error("Error al enviar experiencia:", error);
      alert("Hubo un error al enviar tu experiencia");
    }

    setCargando(false);
    cerrar();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#F8C662] p-8 rounded-3xl max-w-md w-full shadow-2xl border-2 border-[#D1861C]">

        <h2 className="text-3xl font-serif text-center text-[#2C263F] mb-6 tracking-wide">
          Comparte tu experiencia ✨
        </h2>

        <form onSubmit={enviarExperiencia} className="space-y-5">
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full bg-white/90 border border-[#E7681D] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1861C]"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <textarea
            rows="4"
            placeholder="Escribe tu experiencia…"
            className="w-full bg-white/90 border border-[#E7681D] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1861C]"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          ></textarea>

          <input
            type="text"
            placeholder="Link de tu imagen (opcional)"
            className="w-full bg-white/90 border border-[#E7681D] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1861C]"
            value={imagenLink}
            onChange={(e) => setImagenLink(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-[#E7681D] text-white p-3 rounded-xl font-semibold hover:bg-[#d45c17] transition-colors shadow-md"
          >
            {cargando ? "Enviando..." : "Enviar"}
          </button>
        </form>

        <button
          onClick={cerrar}
          className="mt-5 w-full text-[#2C263F] hover:text-[#595082] font-semibold tracking-wide"
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}

export default ModalExperiencia;
