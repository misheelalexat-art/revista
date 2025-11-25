import { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Encuesta({
  id = "encuesta-1",
  pregunta = "¿Gloss o mate?",
  opciones = ["Gloss", "Mate"],
}) {
  const [votos, setVotos] = useState(null);
  const [votoRealizado, setVotoRealizado] = useState(false);

  const votar = async (op) => {
    if (votoRealizado) return; // evita votar 2 veces

    const ref = doc(db, "encuestas", id);
    const snap = await getDoc(ref);
    let data = snap.exists() ? snap.data() : { resultados: {} };

    data.resultados[op] = (data.resultados[op] || 0) + 1;

    await setDoc(ref, data);
    setVotos(data.resultados);
    setVotoRealizado(true);
  };

  const totalVotos =
    votos ? Object.values(votos).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="bg-[#41644A] p-5 rounded-2xl shadow-xl border border-[#D6A354] max-w-md mx-auto text-center">
      
      {/* Pregunta */}
      <h4 className="font-bold text-[#F8C662] text-lg">
        {pregunta}
      </h4>

      {/* Botones */}
      <div className="mt-4 flex justify-center gap-3">
        {opciones.map((o) => (
          <button
            key={o}
            onClick={() => votar(o)}
            disabled={votoRealizado}
            className={`px-4 py-2 rounded-lg font-semibold transition 
              ${
                votoRealizado
                  ? "bg-[#D6A354] text-white cursor-not-allowed"
                  : "bg-[#F8C662] text-[#41644A] hover:bg-[#D1861C]"
              }
            `}
          >
            {o}
          </button>
        ))}
      </div>

      {/* Resultados bonitos */}
      {votos && (
        <div className="mt-5 text-left bg-white p-4 rounded-xl shadow-md border border-[#D6A354]">
          <h5 className="text-[#6B3F2C] font-semibold mb-2">Resultados:</h5>
          
          {opciones.map((o) => {
            const cantidad = votos[o] || 0;
            const porcentaje = totalVotos
              ? Math.round((cantidad / totalVotos) * 100)
              : 0;

            return (
              <div key={o} className="mb-2">
                <p className="text-sm font-medium text-[#6B3F2C]">
                  {o} — {cantidad} voto(s) · {porcentaje}%
                </p>

                {/* Barra de progreso */}
                <div className="w-full bg-[#D6A354]/30 rounded-full h-3 mt-1">
                  <div
                    className="h-3 rounded-full bg-[#F8C662]"
                    style={{ width: `${porcentaje}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Encuesta;
