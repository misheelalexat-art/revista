// import { useState } from "react";

// function ImagePicker({ onImageSelect }) {
//   const [previewIcon, setPreviewIcon] = useState("");

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Enviar archivo al componente padre
//     onImageSelect(file);

//     // Emoticones tropicales estilo Morena
//     const icons = ["🌺", "🍊", "✨", "🌼", "🌴", "❤️‍🔥"];
//     const randomIcon = icons[Math.floor(Math.random() * icons.length)];
//     setPreviewIcon(randomIcon);
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <label className="font-semibold text-[#D1861C]">
//         Imagen del artículo
//       </label>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImage}
//         className="bg-white/90 border-2 border-[#E7681D] rounded-xl px-4 py-2 cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-[#D1861C] transition"
//       />

//       {previewIcon && (
//         <p className="text-4xl mt-2 animate-bounce text-[#2C263F]">
//           {previewIcon}
//         </p>
//       )}
//     </div>
//   );
// }

// export default ImagePicker;
