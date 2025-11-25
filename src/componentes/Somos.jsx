function Somos() {
  return (
    <section className="py-16 px-6 md:px-16 flex flex-col md:flex-row items-center gap-10 rounded-3xl shadow-xl bg-[#41644A]">
      
      {/* Contenido */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serifElegant mb-6 text-[#F8C662]">
          Acerca de Nosotros
        </h1>

        <p className="mb-4 font-sansYouth text-[#FFF3E0]">
          <strong className="text-[#D1861C]">Morena</strong> no es solo una
          revista digital, es un universo donde moda, belleza y cultura se
          encuentran. Aquí celebramos la autenticidad, la creatividad y la
          inspiración de cada persona.
        </p>

        <p className="mb-4 font-sansYouth text-[#FFF3E0]">
          Creemos que cada artículo, cada consejo y cada historia es una chispa
          que puede encender nuevas ideas y acompañarte en tu día a día con
          estilo.
        </p>

        <p className="italic font-sansYouth text-lg mt-4 text-[#F8C662]">
          “La inspiración está en todas partes, solo hay que saber mirarla.”
        </p>
      </div>

      {/* Imagen */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src="https://i.pinimg.com/736x/71/92/78/719278993931174929c9fe122e61aa40.jpg"
          alt="Revista estilo icónico"
          className="rounded-[50%] shadow-2xl max-w-[330px] md:max-w-[380px] h-auto object-cover"
        />
      </div>
    </section>
  );
}

export default Somos;
