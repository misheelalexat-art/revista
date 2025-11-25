import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Contenido() {
  return (
    <section className="w-full overflow-hidden bg-morenaHunter py-20 space-y-32">

      {/* ------- ARTÍCULOS ------- */}
      <BloqueSeccion
        titulo="Artículos"
        subtitulo="Moda, belleza, identidad y temas que nos representan."
        imagenes={[
          "https://images.unsplash.com/photo-1529638397026-34a5cf3f5c5c",
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
        ]}
        link="/articulos"
        duration={20}
      />

      {/* ------- COMUNIDAD ------- */}
      <BloqueSeccion
        titulo="Comunidad"
        subtitulo="Comparte, expresa y conecta con otras chicas como tú."
        imagenes={[
          "https://images.unsplash.com/photo-1526662092594-e98c1e356d6a",
          "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
        ]}
        link="/comunidad"
        duration={24}
      />

      {/* ------- HISTORIAS ------- */}
      <BloqueSeccion
        titulo="Historias"
        subtitulo="Relatos reales, experiencias y voces latinas."
        imagenes={[
          "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
          "https://images.unsplash.com/photo-1520440229-a0ce6a0b05c9",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        ]}
        link="/historias"
        duration={26}
      />

    </section>
  );
}

/* ---------------------------------------------
   COMPONENTE REUTILIZABLE PARA CADA BLOQUE
--------------------------------------------- */
function BloqueSeccion({ titulo, subtitulo, imagenes, link, duration }) {
  return (
    <div>
      <h3 className="text-center text-5xl font-extrabold font-serif text-morenaSaffron mb-4 tracking-wider uppercase drop-shadow-xl">
        {titulo}
      </h3>

      <p className="text-center text-morenaGold text-xl mb-10 italic">
        {subtitulo}
      </p>

      <div className="relative w-full h-[420px] overflow-hidden rounded-3xl shadow-xl border border-morenaGold/40">

        {/* Capa cálida encima de las imágenes */}
        <div className="absolute inset-0 bg-morenaBrown opacity-25 z-10 mix-blend-multiply"></div>

        {/* Carrusel animado */}
        <motion.div
          className="flex w-full h-full"
          animate={{ x: ["0%", "-100%", "-200%", "0%"] }}
          transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
        >
          {imagenes.map((src, i) => (
            <img
              key={i}
              src={src}
              loading="lazy"
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </motion.div>

        {/* Botón */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
          <Link
            to={link}
            className="bg-morenaBrown text-white px-8 py-3 rounded-full shadow-lg 
                       hover:bg-morenaOchre transition-all hover:scale-105 font-semibold tracking-wide"
          >
            Ver {titulo.toLowerCase()}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contenido;
