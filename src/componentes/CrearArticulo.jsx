import { useState } from "react";
// import ImagePicker from "./ImagePicker";

function CrearArticulo() {
  const [imagen, setImagen] = useState(null);

  return (
    <div className="min-h-screen w-full bg-[#41644A] py-10 px-4 flex justify-center">
      
      {/* Tarjeta central */}
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-2xl border border-[#D6A354]">
        
        <h1 className="text-3xl font-bold text-[#41644A] text-center mb-6">
          Crear nuevo artículo
        </h1>


        {/* Preview opcional */}
        {/* {imagen && (
          <img
            src={URL.createObjectURL(imagen)}
            className="w-full mt-4 rounded-xl shadow-lg border border-[#D6A354] max-h-64 object-cover"
            alt="preview"
          />
        )} */}

        <button className="mt-6 w-full bg-[#6B3F2C] text-white font-semibold py-3 rounded-lg 
                           hover:bg-[#D1861C] transition shadow-md">
          Publicar artículo
        </button>
      </div>
    </div>
  );
}

export default CrearArticulo;
