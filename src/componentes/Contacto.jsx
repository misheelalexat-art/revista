function Contacto() {
  return (
    <section className="w-full min-h-screen bg-[#41644A] py-14 px-6 flex flex-col items-center">
      
      {/* Intro */}
      <div className="text-center max-w-xl text-white">
        <h1 className="text-4xl font-bold">Contáctanos</h1>
        <p className="mt-2 text-white/80">
          Queremos escucharte. Tu voz, tus ideas y tu historia también son parte de MORENA.
        </p>
      </div>

      {/* Caja principal */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl mt-10 p-10 
                      grid md:grid-cols-2 gap-10 border border-white/30">
        
        {/* Formulario */}
        <form className="space-y-6">
          <div>
            <label className="block text-[#6b1f2a] font-semibold mb-1">Nombre</label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-xl border border-[#e4b6a4] 
              focus:border-[#6b1f2a] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#6b1f2a] font-semibold mb-1">Correo</label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-xl border border-[#e4b6a4] 
              focus:border-[#6b1f2a] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#6b1f2a] font-semibold mb-1">Mensaje</label>
            <textarea
              required
              className="w-full p-3 h-32 rounded-xl border border-[#e4b6a4] 
              focus:border-[#6b1f2a] outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6b1f2a] text-white py-3 rounded-xl font-semibold 
            hover:bg-[#57201f] transition"
          >
            Enviar mensaje
          </button>
        </form>

        {/* Redes sociales */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h3 className="text-2xl font-bold text-[#6b1f2a]">Conectemos</h3>
          <p className="text-[#a86a6a] mt-2 mb-6">
            Síguenos y forma parte de la comunidad más poderosa y real.
          </p>

          {/* Links con emojis */}
          <div className="flex flex-col space-y-4">

            <a className="flex items-center gap-3 p-3 rounded-xl border border-[#e4b6a4] 
                          hover:bg-[#e4b6a4]/20 transition cursor-pointer">
              <span className="text-2xl">📸</span>
              <span className="text-[#6b1f2a] font-semibold">Instagram</span>
            </a>

            <a className="flex items-center gap-3 p-3 rounded-xl border border-[#e4b6a4] 
                          hover:bg-[#e4b6a4]/20 transition cursor-pointer">
              <span className="text-2xl">🎵</span>
              <span className="text-[#6b1f2a] font-semibold">TikTok</span>
            </a>

            <a className="flex items-center gap-3 p-3 rounded-xl border border-[#e4b6a4] 
                          hover:bg-[#e4b6a4]/20 transition cursor-pointer">
              <span className="text-2xl">▶️</span>
              <span className="text-[#6b1f2a] font-semibold">YouTube</span>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Contacto;
