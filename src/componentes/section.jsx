function Section({ children }) {
  return (
    <section
      className="
        bg-[#F8C662]           /* morenaSaffron */
        rounded-3xl 
        shadow-xl 
        py-12 px-6 md:px-16 
        flex flex-col gap-8 
        border border-[#D1861C]/40  /* borde suave dorado */
      "
    >
      {children}
    </section>
  );
}

export default Section;
