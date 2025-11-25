import { Pencil } from "lucide-react";

function BotonCrear({ abrir }) {
  return (
    <button
      onClick={abrir}
      className="
        fixed bottom-6 right-6 z-50 
        bg-morenaBrown text-white 
        p-4 rounded-full shadow-xl 
        hover:bg-morenaSaffron hover:scale-105 
        transition-all duration-300
      "
      aria-label="Crear publicación"
    >
      <Pencil size={22} />
    </button>
  );
}

export default BotonCrear;
