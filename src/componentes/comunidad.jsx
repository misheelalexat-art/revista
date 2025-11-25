import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  getDoc,
  setDoc,
} from "firebase/firestore";

import ModalExperiencia from "./ModalExperiencia";
import BotonCrear from "./boton";

// Retos
const retosData = [
  { id: "coral", title: "Maquillaje color coral", img: "https://picsum.photos/600/300?random=21" },
  { id: "mono", title: "Outfit monocromático", img: "https://picsum.photos/600/300?random=22" },
  { id: "skincare3", title: "Skincare 3 días", img: "https://picsum.photos/600/300?random=23" },
];

function Retos() {
  const [participantes, setParticipantes] = useState({});
  const participar = (id) => setParticipantes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h2 className="text-4xl font-serif font-bold text-[#6B1F2A] mb-10 text-center tracking-wide">
        Retos Semanales
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {retosData.map((r) => (
          <div key={r.id} className="bg-[#F8C662] rounded-3xl shadow-xl p-5 flex flex-col items-center border border-[#D1861C]/40 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
            <img src={r.img} alt={r.title} className="w-full h-36 object-cover rounded-xl mb-4 shadow-md" />
            <h3 className="text-[#2C263F] font-semibold text-lg mb-3 text-center">{r.title}</h3>
            <button onClick={() => participar(r.id)} className="bg-[#E7681D] text-white px-5 py-2 font-semibold rounded-full shadow hover:bg-[#A02E01] hover:shadow-md transition-all">
              Participar
            </button>
            <p className="text-[#595082] mt-2 text-sm font-medium">{participantes[r.id] || 0} participantes</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Galería
function Galeria() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("fecha", "desc"));
    const unsub = onSnapshot(q, snap => {
      setItems(snap.docs.map(d => d.data()).filter(i => i.imagen));
    });
    return () => unsub();
  }, []);
  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#41644A] rounded-2xl shadow-lg my-8">
      <h3 className="text-2xl font-bold mb-4 text-[#F8C662]">Galería</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <img key={i} src={it.imagen} alt="foto" className="w-full h-40 object-cover rounded-xl shadow-md border border-[#D6A354]" />
        ))}
      </div>
    </div>
  );
}

// Encuesta
function Encuesta({ id = "encuesta-1", pregunta = "¿Gloss o mate?", opciones = ["Gloss", "Mate"] }) {
  const [votos, setVotos] = useState(null);
  const [votoRealizado, setVotoRealizado] = useState(false);

  const votar = async (op) => {
    if (votoRealizado) return;

    const ref = doc(db, "encuestas", id);
    const snap = await getDoc(ref);
    let data = snap.exists() ? snap.data() : { resultados: {} };

    data.resultados[op] = (data.resultados[op] || 0) + 1;
    await setDoc(ref, data);
    setVotos(data.resultados);
    setVotoRealizado(true);
  };

  const totalVotos = votos ? Object.values(votos).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="bg-[#41644A] p-5 rounded-2xl shadow-xl border border-[#D6A354] max-w-md mx-auto my-8 text-center">
      <h4 className="font-bold text-[#F8C662] text-lg">{pregunta}</h4>
      <div className="mt-4 flex justify-center gap-3">
        {opciones.map(o => (
          <button key={o} onClick={() => votar(o)} disabled={votoRealizado} className={`px-4 py-2 rounded-lg font-semibold transition ${votoRealizado ? "bg-[#D6A354] text-white cursor-not-allowed" : "bg-[#F8C662] text-[#41644A] hover:bg-[#D1861C]"}`}>
            {o}
          </button>
        ))}
      </div>
      {votos && (
        <div className="mt-5 text-left bg-white p-4 rounded-xl shadow-md border border-[#D6A354]">
          <h5 className="text-[#6B3F2C] font-semibold mb-2">Resultados:</h5>
          {opciones.map(o => {
            const cantidad = votos[o] || 0;
            const porcentaje = totalVotos ? Math.round((cantidad / totalVotos) * 100) : 0;
            return (
              <div key={o} className="mb-2">
                <p className="text-sm font-medium text-[#6B3F2C]">{o} — {cantidad} voto(s) · {porcentaje}%</p>
                <div className="w-full bg-[#D6A354]/30 rounded-full h-3 mt-1">
                  <div className="h-3 rounded-full bg-[#F8C662]" style={{ width: `${porcentaje}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Comunidad completa
function Comunidad() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");
  const [uid, setUid] = useState("");
  const [cargando, setCargando] = useState(true);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaFoto, setNuevaFoto] = useState("");

  const [contenidoPost, setContenidoPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [editandoID, setEditandoID] = useState(null);
  const [nuevoContenido, setNuevoContenido] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);

  const auth = getAuth();

  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const d = fecha.toDate();
    return d.toLocaleDateString("es-PE", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  // Autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setEmail(user.email);
        setNombre(user.displayName || "Usuario sin nombre");
        setFoto(user.photoURL || "user.webp");
        setNuevoNombre(user.displayName || "");
        setNuevaFoto(user.photoURL || "");
      } else {
        setUid(""); setEmail(""); setNombre(""); setFoto("");
      }
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  // Posts en tiempo real
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("fecha", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(lista);
    });
    return () => unsub();
  }, []);

  // Funciones CRUD post
  const actualizarPerfil = async () => {
    const user = auth.currentUser;
    if (!user) return alert("No hay un usuario activo");
    await updateProfile(user, { displayName: nuevoNombre || user.displayName, photoURL: nuevaFoto || user.photoURL });
    setNombre(nuevoNombre); setFoto(nuevaFoto);
    alert("Perfil actualizado");
  };

  const crearPost = async () => {
    if (!contenidoPost.trim()) return;
    await addDoc(collection(db, "posts"), { contenido: contenidoPost, fecha: new Date(), autor: nombre, autorFoto: foto, autorUid: uid, likes: 0 });
    setContenidoPost("");
  };

  const guardarEdicion = async (id) => {
    await updateDoc(doc(db, "posts", id), { contenido: nuevoContenido });
    setEditandoID(null); setNuevoContenido("");
  };

  const eliminarPost = async (id) => { if (confirm("¿Deseas eliminar este post?")) await deleteDoc(doc(db, "posts", id)); };
  const darLike = async (post) => await updateDoc(doc(db, "posts", post.id), { likes: (post.likes || 0) + 1 });

  if (cargando) return <p className="text-center text-morenaGold mt-10 text-xl">Cargando datos...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-morenaHunter min-h-screen">
      <h1 className="text-center text-4xl font-extrabold text-morenaSaffron tracking-wider mb-3">Comunidad Morena</h1>
      <p className="text-center text-morenaGold mb-8 text-lg italic">Comparte, conecta y exprésate sin miedo. Aquí brillamos juntas ✨</p>

      {/* INFO USUARIO */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 text-center">
        <img className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-morenaGold object-cover" src={foto} alt="foto" />
        <h1 className="text-2xl font-bold text-morenaSaffron">Bienvenido a la comunidad</h1>
        <p className="text-morenaGold mt-2">Hola, <strong>{nombre}</strong></p>
        <p className="text-morenaGold">{email}</p>
      </div>

      {/* EDITAR PERFIL */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-morenaSaffron">Editar mis datos</h2>
        <input type="text" placeholder="Actualizar nombre" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} className="w-full px-4 py-2 border border-morenaGold rounded-lg mb-3 focus:ring-2 focus:ring-morenaSaffron outline-none" />
        <input type="text" placeholder="URL de nueva foto" value={nuevaFoto} onChange={e => setNuevaFoto(e.target.value)} className="w-full px-4 py-2 border border-morenaGold rounded-lg mb-3 focus:ring-2 focus:ring-morenaSaffron outline-none" />
        <button onClick={actualizarPerfil} className="bg-morenaBrown hover:bg-morenaOchre text-white px-5 py-2 rounded-lg">Guardar cambios</button>
      </div>

      {/* CREAR POST */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-morenaSaffron">Crear una publicación</h2>
        <textarea placeholder="¿Qué estás pensando?" value={contenidoPost} onChange={e => setContenidoPost(e.target.value)} className="w-full border border-morenaGold rounded-lg p-3 mb-3 h-28 focus:ring-2 focus:ring-morenaSaffron outline-none"></textarea>
        <button onClick={crearPost} className="bg-morenaBrown hover:bg-morenaOchre text-white px-5 py-2 rounded-lg">Publicar</button>
      </div>

      {/* POSTS */}
      <h2 className="text-2xl font-bold text-morenaSaffron mb-5">Publicaciones</h2>
      <div className="space-y-5">
        {posts.map(post => (
          <div key={post.id} className="bg-white border border-morenaGold shadow p-5 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <img className="w-12 h-12 rounded-full object-cover border border-morenaGold" src={post.autorFoto} />
              <div>
                <p className="font-semibold text-morenaSaffron">{post.autor}</p>
                <p className="text-morenaGold text-sm">{formatearFecha(post.fecha)}</p>
              </div>
            </div>

            {editandoID === post.id ? (
              <div>
                <textarea value={nuevoContenido} onChange={e => setNuevoContenido(e.target.value)} className="w-full border border-morenaGold rounded-lg p-3 mb-3 focus:ring-2 focus:ring-morenaSaffron outline-none" />
                <button onClick={() => guardarEdicion(post.id)} className="bg-morenaBrown text-white px-4 py-1 rounded mr-3 hover:bg-morenaOchre">Guardar</button>
                <button onClick={() => setEditandoID(null)} className="bg-morenaGold text-white px-4 py-1 rounded hover:bg-morenaOchre">Cancelar</button>
              </div>
            ) : <p className="text-morenaGold mb-3">{post.contenido}</p>}

            <button onClick={() => darLike(post)} className="px-4 py-1 bg-morenaSaffron hover:bg-morenaOchre rounded-full text-sm text-white transition">💖 {post.likes || 0}</button>
            {post.autorUid === uid && editandoID !== post.id && (
              <div className="flex gap-3 mt-3">
                <button onClick={() => { setEditandoID(post.id); setNuevoContenido(post.contenido); }} className="text-morenaSaffron hover:underline">Editar</button>
                <button onClick={() => eliminarPost(post.id)} className="text-morenaBrown hover:underline">Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BOTÓN FLOTANTE + MODAL EXPERIENCIA */}
      <BotonCrear abrir={() => setModalAbierto(true)} />
      <ModalExperiencia visible={modalAbierto} cerrar={() => setModalAbierto(false)} />

      {/* Retos, Galería, Encuesta */}
      <Retos />
      <Galeria />
      <Encuesta />
    </div>
  );
}

export default Comunidad;
