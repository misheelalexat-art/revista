import { useState } from "react";

const retos = [
  { id: "coral", title: "Maquillaje color coral", img: "https://picsum.photos/600/300?random=21" },
  { id: "mono", title: "Outfit monocromático", img: "https://picsum.photos/600/300?random=22" },
  { id: "skincare3", title: "Skincare 3 días", img: "https://picsum.photos/600/300?random=23" },
];

function Retos() {
  const [participantes, setParticipantes] = useState({});

  const participar = (id) => {
    setParticipantes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      
      {/* Título */}
      <h2 className="text-4xl font-serif font-bold text-[#6B1F2A] mb-10 text-center tracking-wide">
        Retos Semanales
      </h2>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {retos.map((r) => (
          <div
            key={r.id}
            className="
              bg-[#F8C662] 
              rounded-3xl 
              shadow-xl 
              p-5 
              flex flex-col items-center 
              border border-[#D1861C]/40
              hover:shadow-2xl hover:scale-[1.03]
              transition-all duration-300
            "
          >
            {/* Imagen */}
            <img
              src={r.img}
              alt={r.title}
              className="w-full h-36 object-cover rounded-xl mb-4 shadow-md"
            />

            {/* Título */}
            <h3 className="text-[#2C263F] font-semibold text-lg mb-3 text-center">
              {r.title}
            </h3>

            {/* Botón */}
            <button
              onClick={() => participar(r.id)}
              className="
                bg-[#E7681D] 
                text-white 
                px-5 py-2 
                font-semibold 
                rounded-full 
                shadow 
                hover:bg-[#A02E01] 
                hover:shadow-md
                transition-all
              "
            >
              Participar
            </button>

            {/* Participantes */}
            <p className="text-[#595082] mt-2 text-sm font-medium">
              {participantes[r.id] || 0} participantes
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Retos;
