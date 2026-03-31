import { useState, useEffect } from "react";

// ─── ESTILOS GLOBALES ────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,900;1,900&family=Nunito+Sans:wght@300;400;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Nunito Sans', sans-serif;
      background: #FAFAFA;
      color: #111;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    @keyframes float {
      0%,100% { transform: translateY(0px) rotate(-2deg); }
      50%      { transform: translateY(-18px) rotate(3deg); }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .animate-float { animation: float 4s ease-in-out infinite; }
    .animate-fadeup { animation: fadeUp .7s ease forwards; }
    .marquee-track { animation: marquee 45s linear infinite; }

    .btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 12px 28px; border-radius: 999px;
      font-family: 'Nunito', sans-serif; font-weight: 900;
      font-size: 14px; cursor: pointer; border: 2.5px solid #111;
      transition: transform .15s, box-shadow .15s;
      text-decoration: none;
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 4px 4px 0 #111; }
    .btn:active { transform: translateY(0); box-shadow: none; }
    .btn-fill   { background: #A161E2; color: #fff; border-color: #111; }
    .btn-outline { background: #fff; color: #111; }
    .btn-dark   { background: #111; color: #fff; }
    .btn-light  { background: #E8F0FD; color: #5A2E93; border-color: #5A2E93; }

    .frame-card {
      border: 2.5px solid #111; border-radius: 20px; overflow: hidden;
      cursor: pointer; transition: transform .2s, box-shadow .2s;
      background: #fff;
    }
    .frame-card:hover {
      transform: translateY(-8px) rotate(-1deg);
      box-shadow: 8px 8px 0 #111;
    }
    .filter-pill {
      padding: 9px 22px; border-radius: 999px;
      border: 2px solid #ccc; background: #fff;
      font-family: 'Nunito', sans-serif; font-weight: 700;
      font-size: 14px; cursor: pointer; transition: all .15s;
      color: #111;
    }
    .filter-pill:hover {
      background: #E8F0FD; color: #5A2E93; border-color: #5A2E93;
    }
    .filter-pill.active {
      background: #5A2E93; color: #fff; border-color: #5A2E93;
    }
    .trat-card {
      background: #fff; border: 2.5px solid #111; border-radius: 20px;
      padding: 28px; display: flex; gap: 18px; align-items: flex-start;
      transition: transform .2s, box-shadow .2s;
    }
    .trat-card:hover { transform: translateY(-4px); box-shadow: 6px 6px 0 #111; }
    .step-card {
      background: #1C1020; border: 2px solid #3D2060;
      border-radius: 20px; padding: 32px 24px;
      transition: border-color .2s, transform .2s;
    }
    .step-card:hover { border-color: #A161E2; transform: translateY(-4px); }
    .opt-pill {
      padding: 9px 18px; border-radius: 999px;
      border: 2px solid #ccc; background: #fff;
      font-family: 'Nunito', sans-serif; font-weight: 700;
      font-size: 13px; cursor: pointer; transition: all .15s;
      display: flex; align-items: center; gap: 6px;
      color: #111;
    }
    .opt-pill:hover { border-color: #5A2E93; color: #5A2E93; background: #F3EEFF; }
    .opt-pill.sel { background: #5A2E93; color: #fff; border-color: #5A2E93; }
    .modal-input {
      width: 100%; padding: 12px 16px;
      border: 2px solid #e0e0e0; border-radius: 12px;
      font-family: 'Nunito Sans', sans-serif; font-size: 15px;
      margin-bottom: 10px; outline: none;
      transition: border-color .15s;
    }
    .modal-input:focus { border-color: #5A2E93; }
    .nav-link {
      font-size: 14px; font-weight: 600; color: #111;
      text-decoration: none; cursor: pointer;
      transition: color .15s; background:none; border:none;
    }
    .nav-link:hover { color: #A161E2; }
  `}</style>
);

// ─── COLORES ─────────────────────────────────────────────────────────────────
const C = {
  lilaClaro:  "#E8F0FD",
  lila:       "#A161E2",
  morado:     "#5A2E93",
  negro:      "#111111",
  blanco:     "#FFFFFF",
  grisF:      "#F5F3FA",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const FRAMES = [
  { id:1, name:"Aldgate",  tipo:"metal",   precio:350, color:"#B5975A", colorName:"Dorado mate",    tag:"Nuevo"    },
  { id:2, name:"Sorolla",  tipo:"acetato", precio:480, color:"#A161E2", colorName:"Morado cristal", tag:""         },
  { id:3, name:"Rimini",   tipo:"3piezas", precio:420, color:"#111",    colorName:"Negro pulido",   tag:"Popular"  },
  { id:4, name:"Mérida",   tipo:"acetato", precio:550, color:"#5A2E93", colorName:"Morado oscuro",  tag:""         },
  { id:5, name:"Alcázar",  tipo:"metal",   precio:650, color:"#C0C0C0", colorName:"Plata cepillado",tag:"Premium"  },
  { id:6, name:"Tulum",    tipo:"acetato", precio:490, color:"#3D7A4E", colorName:"Verde botella",  tag:""         },
  { id:7, name:"Sevilla",  tipo:"ninos",   precio:280, color:"#E85D4A", colorName:"Rojo coral",     tag:""         },
  { id:8, name:"Vallarta", tipo:"ninos",   precio:150, color:"#5B9BD5", colorName:"Azul cielo",     tag:"Económico"},
  { id:9, name:"Kadena",   tipo:"3piezas", precio:390, color:"#888",    colorName:"Gris titanio",   tag:""         },
];

const LENTES = [
  { id:"mono",   nombre:"Monofocal",                       precio:0   },
  { id:"bifocal",nombre:"Bifocal",                         precio:200 },
  { id:"bisel",  nombre:"Biselado (micas c/graduación)",   precio:350 },
];

const GRADS = [
  { id:"baja",   nombre:"Baja (–0.50 a –2.00)",  precio:0   },
  { id:"media",  nombre:"Media (–2.25 a –4.00)", precio:100 },
  { id:"alta",   nombre:"Alta (–4.25 a –6.00)",  precio:200 },
  { id:"muyalta",nombre:"Muy Alta (–6.25+)",     precio:350 },
];

const TRATS = [
  { id:"ar",      nombre:"Antirreflejante AR", precio:150, icon:"🔆" },
  { id:"blue",    nombre:"Blue",               precio:200, icon:"💻" },
  { id:"fotoblue",nombre:"Foto Blue",          precio:350, icon:"🌤️" },
  { id:"polariz", nombre:"Polarizado",         precio:400, icon:"🕶️" },
];

const TIPOS = ["Todos","Metal","Acetato","3 Piezas","Niños"];
const TIPO_MAP = { "Todos":"todos","Metal":"metal","Acetato":"acetato","3 Piezas":"3piezas","Niños":"ninos" };

const MARQUEE_ITEMS = [
  "Envíos a todo Mazatlán","Asesoría gratuita","Lentes con graduación",
  "Precio justo","#CuatroOjos","Monofocal & Bifocal",
  "Armazones de calidad","Tratamientos especializados","Atención personalizada",
];

const WHATSAPP = "526699000000"; // ← CAMBIA TU NÚMERO

// ─── FRAME SVG ────────────────────────────────────────────────────────────────
function FrameSVG({ frame, size = 170 }) {
  const shapes = {
    metal:    { rx:10, h:38, w:66 },
    acetato:  { rx:16, h:44, w:64 },
    "3piezas":{ rx:6,  h:30, w:60 },
    ninos:    { rx:18, h:42, w:60 },
  };
  const s = shapes[frame.tipo] || shapes.metal;
  const c = frame.color;
  const W = 200, H = 100, cy = H / 2;
  return (
    <svg width={size} height={size * 0.55} viewBox={`0 0 ${W} ${H}`} fill="none">
      <rect x={18} y={cy - s.h/2} width={s.w} height={s.h} rx={s.rx}
        stroke={c} strokeWidth="4" fill={c + "18"} />
      <rect x={W - 18 - s.w} y={cy - s.h/2} width={s.w} height={s.h} rx={s.rx}
        stroke={c} strokeWidth="4" fill={c + "18"} />
      <path d={`M${18+s.w} ${cy} Q${W/2} ${cy-14} ${W-18-s.w} ${cy}`}
        stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <line x1={18} y1={cy} x2={0} y2={cy - 16} stroke={c} strokeWidth="3" strokeLinecap="round" />
      <line x1={W-18} y1={cy} x2={W} y2={cy - 16} stroke={c} strokeWidth="3" strokeLinecap="round" />
      <line x1={26} y1={cy - s.h/2 + 8} x2={36} y2={cy - s.h/2 + 16}
        stroke="white" strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round" />
    </svg>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ onPedido }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,.95)" : C.blanco,
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: `2.5px solid ${C.negro}`,
      padding: "0 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 68, transition: "all .3s",
    }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
          <rect x="0" y="3" width="13" height="13" rx="6.5" stroke={C.negro} strokeWidth="2.5"/>
          <rect x="19" y="3" width="13" height="13" rx="6.5" stroke={C.negro} strokeWidth="2.5"/>
          <line x1="13" y1="9.5" x2="19" y2="9.5" stroke={C.negro} strokeWidth="2.5"/>
        </svg>
        <span style={{
          fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:21,
          letterSpacing:"-0.03em", color: C.negro,
        }}>
          Óptica <span style={{ color: C.lila }}>Lain</span>
        </span>
      </div>

      {/* Links */}
      <div style={{ display:"flex", gap:32, alignItems:"center" }}>
        <button className="nav-link" onClick={() => scroll("coleccion")}>Colección</button>
        <button className="nav-link" onClick={() => scroll("tratamientos")}>Tratamientos</button>
        <button className="nav-link" onClick={() => scroll("proceso")}>Cómo funciona</button>
        <button className="btn btn-fill" onClick={onPedido}>Armar pedido 👓</button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ onPedido }) {
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  return (
    <section style={{
      display:"grid", gridTemplateColumns:"1fr 1fr",
      minHeight:"calc(100vh - 68px)",
      borderBottom:`2.5px solid ${C.negro}`,
    }}>
      {/* Texto */}
      <div style={{
        padding:"80px 60px", display:"flex", flexDirection:"column",
        justifyContent:"center", borderRight:`2.5px solid ${C.negro}`,
        background: C.blanco,
      }}>
        <span style={{
          display:"inline-block", background: C.lilaClaro, color: C.morado,
          fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:12,
          padding:"5px 16px", borderRadius:999, border:`2px solid ${C.morado}`,
          marginBottom:24, letterSpacing:"0.05em", width:"fit-content",
        }}>#CuatroOjos y a mucha honra</span>

        <h1 style={{
          fontFamily:"'Nunito',sans-serif", fontWeight:900,
          fontSize:"clamp(44px,5.5vw,74px)", lineHeight:1.05,
          letterSpacing:"-0.03em", marginBottom:24, color: C.negro,
        }}>
          Te ves bien,<br />
          <em style={{ color: C.lila, fontStyle:"italic" }}>miras bien</em>
        </h1>

        <p style={{ fontSize:17, lineHeight:1.7, color:"#555", maxWidth:400, marginBottom:40, fontWeight:300 }}>
          Armazones chidos a precio justo, con los tratamientos que necesitas.
          Configura tu pedido en minutos y recibe tu cotización al instante.
        </p>

        <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          <button className="btn btn-fill" onClick={() => scroll("coleccion")}>
            Ver colección 👁️
          </button>
          <button className="btn btn-outline" onClick={onPedido}>
            Armar mi pedido
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display:"flex", gap:48, marginTop:56,
          paddingTop:36, borderTop:`1.5px solid #e8e8e4`,
        }}>
          {[["500+","Clientes felices"],["15+","Años de exp."],["100%","Garantía"]].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:30, color: C.lila }}>{n}</div>
              <div style={{ fontSize:13, color:"#888", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div style={{
        display:"flex",
        alignItems:"center", justifyContent:"center",
        position:"relative", overflow:"hidden",
        background: `linear-gradient(135deg, ${C.lilaClaro} 0%, #F0E8FF 100%)`,
      }}>
        <div className="animate-float" style={{ textAlign:"center" }}>
          <svg width="340" height="180" viewBox="0 0 340 180" fill="none">
            <rect x="20" y="55" width="130" height="70" rx="26"
              stroke={C.lila} strokeWidth="5.5" fill={C.lila + "18"} />
            <rect x="190" y="55" width="130" height="70" rx="26"
              stroke={C.lila} strokeWidth="5.5" fill={C.lila + "18"} />
            <path d="M150 90 Q170 76 190 90"
              stroke={C.lila} strokeWidth="5" fill="none" strokeLinecap="round" />
            <line x1="20" y1="72" x2="0" y2="56" stroke={C.lila} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="320" y1="72" x2="340" y2="56" stroke={C.lila} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="38" y1="68" x2="56" y2="84" stroke="white" strokeWidth="3" strokeOpacity="0.7" strokeLinecap="round" />
            <line x1="208" y1="68" x2="226" y2="84" stroke="white" strokeWidth="3" strokeOpacity="0.7" strokeLinecap="round" />
          </svg>
          <p style={{
            fontFamily:"'Nunito',sans-serif", fontWeight:900,
            fontSize:16, color: C.morado, marginTop:16,
          }}>Sorolla — Morado Cristal</p>
        </div>

        {/* Badges flotantes */}
        <div style={{
          position:"absolute", top:36, left:32,
          background: C.blanco, border:`2.5px solid ${C.negro}`,
          borderRadius:16, padding:"14px 20px",
          boxShadow:`5px 5px 0 ${C.negro}`,
          fontFamily:"'Nunito',sans-serif", fontWeight:900,
        }}>
          <span style={{ display:"block", fontSize:28, color: C.lila, lineHeight:1 }}>9+</span>
          <span style={{ fontSize:13 }}>modelos</span>
        </div>

        <div style={{
          position:"absolute", bottom:36, right:32,
          background: C.blanco, border:`2.5px solid ${C.negro}`,
          borderRadius:16, padding:"14px 20px",
          boxShadow:`5px 5px 0 ${C.negro}`,
          fontFamily:"'Nunito',sans-serif", fontWeight:900,
        }}>
          <span style={{ fontSize:13, color:"#888" }}>Desde</span>
          <span style={{ display:"block", fontSize:28, color: C.lila, lineHeight:1.1 }}>$350</span>
        </div>
      </div>
    </section>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{
      borderTop:`2.5px solid ${C.negro}`, borderBottom:`2.5px solid ${C.negro}`,
      background: C.lila, overflow:"hidden", padding:"14px 0",
    }}>
      <div className="marquee-track" style={{ display:"flex", gap:60, whiteSpace:"nowrap", width:"max-content" }}>
        {items.map((t, i) => (
          <span key={i} style={{
            fontFamily:"'Nunito',sans-serif", fontWeight:900,
            fontSize:14, letterSpacing:"0.06em", textTransform:"uppercase",
            color: C.blanco, display:"flex", alignItems:"center", gap:16,
          }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"rgba(255,255,255,.5)", display:"inline-block" }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── COLECCIÓN ────────────────────────────────────────────────────────────────
function Coleccion({ onSelectFrame }) {
  const [filtro, setFiltro] = useState("Todos");
  const filtered = filtro === "Todos"
    ? FRAMES
    : FRAMES.filter(f => f.tipo === TIPO_MAP[filtro]);

  const tagColors = {
    "Nuevo":     { bg: C.lilaClaro,  color: C.morado },
    "Popular":   { bg: "#7C3AED",    color: "#fff"   },
    "Premium":   { bg: C.negro,      color: "#fff"   },
    "Económico": { bg: "#E8F5E9",    color: "#2E7D32"},
  };

  return (
    <section id="coleccion" style={{ padding:"80px 40px", background: C.blanco }}>
      {/* Header */}
      <div style={{ marginBottom:48 }}>
        <span style={{
          display:"inline-flex", alignItems:"center", gap:8,
          fontFamily:"'Nunito',sans-serif", fontWeight:900,
          fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase",
          background: C.lilaClaro, border:`2px solid ${C.morado}`,
          borderRadius:999, padding:"6px 16px", marginBottom:20, color: C.morado,
        }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background: C.lila }} />
          Colección
        </span>
        <h2 style={{
          fontFamily:"'Nunito',sans-serif", fontWeight:900,
          fontSize:"clamp(34px,4vw,56px)", letterSpacing:"-0.03em", lineHeight:1.1,
          color: C.negro,
        }}>
          Encuentra tu <em style={{ color: C.lila, fontStyle:"italic" }}>armazón ideal</em>
        </h2>
      </div>

      {/* Filtros */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:48 }}>
        {TIPOS.map(t => (
          <button key={t} className={`filter-pill ${filtro===t?"active":""}`}
            onClick={() => setFiltro(t)}>{t}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:24 }}>
        {filtered.map(frame => {
          const tc = tagColors[frame.tag] || {};
          return (
            <div key={frame.id} className="frame-card" onClick={() => onSelectFrame(frame)}>
              <div style={{
                background:`linear-gradient(135deg, ${C.lilaClaro}80 0%, #F5F0FF 100%)`,
                padding:"40px 20px", display:"flex", alignItems:"center",
                justifyContent:"center", borderBottom:`2.5px solid ${C.negro}`,
                minHeight:180, position:"relative",
              }}>
                {frame.tag && (
                  <span style={{
                    position:"absolute", top:14, right:14,
                    background: tc.bg, color: tc.color,
                    fontFamily:"'Nunito',sans-serif", fontWeight:900,
                    fontSize:11, padding:"4px 12px", borderRadius:999,
                    border:`2px solid ${C.negro}`,
                  }}>{frame.tag}</span>
                )}
                <FrameSVG frame={frame} size={160} />
              </div>
              <div style={{ padding:20 }}>
                <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:18, marginBottom:4 }}>
                  {frame.name}
                </h3>
                <div style={{ fontSize:13, color:"#888", marginBottom:14, fontWeight:600 }}>
                  {{ metal:"Marco Metal", acetato:"Acetato Italiano", "3piezas":"3 Piezas Rimless", ninos:"Lentes Niños" }[frame.tipo]}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:22 }}>
                    ${frame.precio.toLocaleString("es-MX")}
                  </span>
                  <span style={{
                    width:22, height:22, borderRadius:"50%",
                    background: frame.color, border:`2px solid ${C.negro}`,
                    display:"inline-block",
                  }} title={frame.colorName} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── TRATAMIENTOS ─────────────────────────────────────────────────────────────
function Tratamientos() {
  return (
    <section id="tratamientos" style={{ padding:"80px 40px", background: C.grisF }}>
      <span style={{
        display:"inline-flex", alignItems:"center", gap:8,
        fontFamily:"'Nunito',sans-serif", fontWeight:900,
        fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase",
        background: C.lilaClaro, border:`2px solid ${C.morado}`,
        borderRadius:999, padding:"6px 16px", marginBottom:20, color: C.morado,
      }}>
        <span style={{ width:8, height:8, borderRadius:"50%", background: C.lila }} />
        Protege tu vista
      </span>

      <h2 style={{
        fontFamily:"'Nunito',sans-serif", fontWeight:900,
        fontSize:"clamp(32px,4vw,54px)", letterSpacing:"-0.03em",
        marginBottom:48, lineHeight:1.1, color: C.negro,
      }}>
        Tratamientos que<br />
        <em style={{ color: C.lila, fontStyle:"italic" }}>hacen la diferencia</em>
      </h2>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
        {TRATS.map(t => (
          <div key={t.id} className="trat-card">
            <div style={{
              width:52, height:52, flexShrink:0,
              background: C.lilaClaro, border:`2px solid ${C.morado}`,
              borderRadius:14, display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:22,
            }}>{t.icon}</div>
            <div>
              <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16, marginBottom:6 }}>
                {t.nombre}
              </h3>
              <p style={{ fontSize:14, color:"#666", lineHeight:1.6 }}>
                {{ ar:"Elimina reflejos molestos y cubre un 50% de la luz UV. Perfecto para pantallas y manejar de noche.",
                   blue:"Bloquea la luz azul de celulares y computadoras, cubriendo un 80% de la luz UV. Menos fatiga visual.",
                   fotoblue:"Se oscurece al salir al sol y protege de luz azul en interiores.",
                   polariz:"Elimina el deslumbramiento en días soleados. Ideal para el exterior.",
                }[t.id]}
              </p>
              <span style={{
                display:"inline-block", marginTop:10,
                background: C.lilaClaro, border:`1.5px solid ${C.morado}`,
                borderRadius:999, padding:"3px 14px",
                fontFamily:"'Nunito',sans-serif", fontWeight:900,
                fontSize:13, color: C.morado,
              }}>+${t.precio}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROCESO ──────────────────────────────────────────────────────────────────
function Proceso() {
  const steps = [
    { num:"01", title:"Elige tu marco", desc:"Explora nuestra colección de metal, acetato, 3 piezas y lentes para niños." },
    { num:"02", title:"Configura tus lentes", desc:"Escoge graduación, tipo de lente (monofocal, bifocal o biselado) y tratamientos." },
    { num:"03", title:"Ve tu precio", desc:"La calculadora muestra el total exacto en tiempo real, sin sorpresas." },
    { num:"04", title:"Pide por WhatsApp", desc:"Te mandamos un mensaje con todos los detalles y confirmamos en breve." },
  ];
  return (
    <section id="proceso" style={{ padding:"80px 40px", background: C.negro, color: C.blanco }}>
      <span style={{
        display:"inline-flex", alignItems:"center", gap:8,
        fontFamily:"'Nunito',sans-serif", fontWeight:900,
        fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase",
        background:"#1C1020", border:"2px solid #3D2060",
        borderRadius:999, padding:"6px 16px", marginBottom:20, color:"#C084FC",
      }}>
        <span style={{ width:8, height:8, borderRadius:"50%", background: C.lila }} />
        Súper fácil
      </span>
      <h2 style={{
        fontFamily:"'Nunito',sans-serif", fontWeight:900,
        fontSize:"clamp(34px,4vw,56px)", letterSpacing:"-0.03em",
        marginBottom:56, lineHeight:1.1,
      }}>
        Tu pedido en{" "}
        <em style={{ color: C.lila, fontStyle:"italic" }}>4 pasos</em>
      </h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24 }}>
        {steps.map(s => (
          <div key={s.num} className="step-card">
            <div style={{
              fontFamily:"'Nunito',sans-serif", fontWeight:900,
              fontSize:52, color: C.lila, lineHeight:1, marginBottom:20,
            }}>{s.num}</div>
            <h3 style={{ fontSize:17, fontWeight:900, marginBottom:10, color: C.blanco }}>{s.title}</h3>
            <p style={{ fontSize:14, color:"#999", lineHeight:1.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── MANIFESTO ────────────────────────────────────────────────────────────────
function Manifesto({ onPedido }) {
  return (
    <div style={{
      padding:"80px 40px", textAlign:"center",
      background:`linear-gradient(135deg, ${C.morado} 0%, ${C.lila} 100%)`,
      borderTop:`2.5px solid ${C.negro}`, borderBottom:`2.5px solid ${C.negro}`,
    }}>
      <h2 style={{
        fontFamily:"'Nunito',sans-serif", fontWeight:900, color: C.blanco,
        fontSize:"clamp(36px,6vw,78px)", lineHeight:1.05,
        letterSpacing:"-0.03em", maxWidth:900, margin:"0 auto 28px",
      }}>
        Somos{" "}
        <em style={{ fontStyle:"italic", color: C.lilaClaro }}>#CuatroOjos</em>
        <br />y a mucha honra.
      </h2>
      <p style={{ fontSize:18, color:"rgba(255,255,255,.85)", maxWidth:520, margin:"0 auto 40px", lineHeight:1.7 }}>
        Lentes chidos, precio justo y sin rodeos. Configura tu pedido ahora.
      </p>
      <button className="btn" onClick={onPedido}
        style={{ background: C.blanco, color: C.morado, borderColor: C.negro, fontSize:16, padding:"14px 36px" }}>
        ¡Armar mi pedido ya! 🚀
      </button>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title:"Productos", links:["Metal","Acetato","3 Piezas","Niños"] },
    { title:"Tratamientos", links:["Antirreflejante","Blue","Foto Blue","Polarizado"] },
    { title:"Contacto", links:["WhatsApp","Cómo funciona","Instagram"] },
  ];
  return (
    <footer style={{ background: C.negro, color: C.blanco, padding:"60px 40px 36px" }}>
      <div style={{
        display:"flex", justifyContent:"space-between", alignItems:"flex-start",
        paddingBottom:40, borderBottom:"1px solid #2a2a2a", marginBottom:32,
        gap:40, flexWrap:"wrap",
      }}>
        <div>
          <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:28, marginBottom:12 }}>
            Óptica <span style={{ color: C.lila }}>Lain</span>
          </div>
          <p style={{ fontSize:14, color:"#888", maxWidth:220, lineHeight:1.6 }}>
            Mazatlán, Sinaloa — Lentes para ver(te) mejor desde tu ciudad.
          </p>
        </div>
        <div style={{ display:"flex", gap:60 }}>
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{
                fontFamily:"'Nunito',sans-serif", fontWeight:900,
                fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase",
                color:"#666", marginBottom:16,
              }}>{col.title}</h4>
              {col.links.map(l => (
                <div key={l} style={{ fontSize:14, color:"#bbb", marginBottom:10, cursor:"pointer",
                  transition:"color .15s" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.lila}
                  onMouseLeave={e => e.currentTarget.style.color = "#bbb"}
                >{l}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#666", flexWrap:"wrap", gap:12 }}>
        <span>© 2025 Óptica Lain · Mazatlán, Sinaloa</span>
        <span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, color: C.lila }}>
          Lentes para ver(te) mejor 👓
        </span>
      </div>
    </footer>
  );
}

// ─── MODAL PEDIDO ─────────────────────────────────────────────────────────────
function Modal({ open, onClose, initialFrame }) {
  const [marco, setMarco] = useState(initialFrame?.id || null);
  const [lente, setLente] = useState("mono");
  const [grad, setGrad] = useState("baja");
  const [tratas, setTratas] = useState(new Set());
  const [nombre, setNombre] = useState("");
  const [tel, setTel] = useState("");
  const [notas, setNotas] = useState("");

  const toggleTrat = (id) => {
    setTratas(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const precioMarco  = FRAMES.find(f => f.id === marco)?.precio || 0;
  const precioLente  = LENTES.find(l => l.id === lente)?.precio || 0;
  const precioGrad   = GRADS.find(g => g.id === grad)?.precio || 0;
  const precioTrats  = [...tratas].reduce((a, id) => a + (TRATS.find(t => t.id === id)?.precio || 0), 0);
  const total        = precioMarco + precioLente + precioGrad + precioTrats;

  const enviar = () => {
    const f = FRAMES.find(x => x.id === marco);
    if (!f) { alert("👓 Elige un marco primero"); return; }
    const tratasStr = [...tratas].map(id => TRATS.find(t => t.id === id)?.nombre).join(", ") || "Ninguno";
    const msg = `👓 *NUEVO PEDIDO — Óptica Lain*\n━━━━━━━━━━━━━━━━━\n👤 ${nombre||"Sin nombre"}\n📞 ${tel||"Sin teléfono"}\n\n🕶️ *Marco:* ${f.name} — $${f.precio.toLocaleString("es-MX")}\n👁️ *Lentes:* ${LENTES.find(l=>l.id===lente)?.nombre}\n📊 *Graduación:* ${GRADS.find(g=>g.id===grad)?.nombre}\n✨ *Tratamientos:* ${tratasStr}\n\n💰 *TOTAL: $${total.toLocaleString("es-MX")} MXN*\n━━━━━━━━━━━━━━━━━\n📝 ${notas||"Sin notas"}\n\n_Favor confirmar disponibilidad_ 🙏`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (!open) return null;

  const Pill = ({ label, sel, onClick }) => (
    <button className={`opt-pill ${sel?"sel":""}`} onClick={onClick}>{label}</button>
  );

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position:"fixed", inset:0, zIndex:200,
      background:"rgba(0,0,0,.6)", display:"flex",
      alignItems:"center", justifyContent:"center", padding:20,
    }}>
      <div style={{
        background: C.blanco, border:`2.5px solid ${C.negro}`,
        borderRadius:28, width:"100%", maxWidth:640,
        maxHeight:"90vh", overflowY:"auto",
        boxShadow:`10px 10px 0 ${C.negro}`,
      }}>
        {/* Header */}
        <div style={{ padding:"28px 32px 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <span style={{
              display:"inline-block", background: C.lilaClaro, color: C.morado,
              fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:11,
              padding:"4px 14px", borderRadius:999, border:`2px solid ${C.morado}`,
              marginBottom:10, letterSpacing:"0.08em", textTransform:"uppercase",
            }}>Calculadora de precio</span>
            <h2 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:24, letterSpacing:"-0.02em", color: C.negro }}>
              Arma tu pedido 👓
            </h2>
          </div>
          <button onClick={onClose} style={{
            width:38, height:38, borderRadius:"50%",
            border:`2px solid ${C.negro}`, background: C.blanco,
            fontSize:18, cursor:"pointer", display:"flex",
            alignItems:"center", justifyContent:"center", fontWeight:900,
            flexShrink:0, transition:"background .15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background=C.negro; e.currentTarget.style.color=C.blanco; }}
            onMouseLeave={e => { e.currentTarget.style.background=C.blanco; e.currentTarget.style.color=C.negro; }}
          >✕</button>
        </div>

        <div style={{ padding:"24px 32px 32px" }}>
          {/* Marco */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:12,
              textTransform:"uppercase", letterSpacing:"0.08em", color:"#888", marginBottom:12 }}>
              1. Elige tu marco
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {FRAMES.map(f => (
                <Pill key={f.id}
                  label={<><span style={{ width:10, height:10, borderRadius:"50%", background:f.color, border:"1.5px solid #ccc", display:"inline-block" }} /> {f.name}</>}
                  sel={marco === f.id}
                  onClick={() => setMarco(f.id)} />
              ))}
            </div>
          </div>

          {/* Lente */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:12,
              textTransform:"uppercase", letterSpacing:"0.08em", color:"#888", marginBottom:12 }}>
              2. Tipo de lentes
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {LENTES.map(l => (
                <Pill key={l.id} label={`${l.nombre}${l.precio>0?` +$${l.precio}`:""}`}
                  sel={lente===l.id} onClick={() => setLente(l.id)} />
              ))}
            </div>
          </div>

          {/* Graduación */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:12,
              textTransform:"uppercase", letterSpacing:"0.08em", color:"#888", marginBottom:12 }}>
              3. Graduación
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {GRADS.map(g => (
                <Pill key={g.id} label={`${g.nombre}${g.precio>0?` +$${g.precio}`:""}`}
                  sel={grad===g.id} onClick={() => setGrad(g.id)} />
              ))}
            </div>
          </div>

          {/* Tratamientos */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:12,
              textTransform:"uppercase", letterSpacing:"0.08em", color:"#888", marginBottom:12 }}>
              4. Tratamientos (puedes elegir varios)
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {TRATS.map(t => (
                <Pill key={t.id} label={`${t.nombre} +$${t.precio}`}
                  sel={tratas.has(t.id)} onClick={() => toggleTrat(t.id)} />
              ))}
            </div>
          </div>

          {/* Precio */}
          <div style={{
            background: C.grisF, border:`2px solid ${C.negro}`,
            borderRadius:18, padding:"20px 24px",
            display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24,
          }}>
            <div>
              <div style={{ fontSize:14, color:"#888", fontWeight:600 }}>Tu cotización estimada</div>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:36, color: C.lila }}>
                ${total.toLocaleString("es-MX")}
              </div>
            </div>
            <div style={{ textAlign:"right", fontSize:13, color:"#aaa", maxWidth:160, lineHeight:1.5 }}>
              Precio final confirmado al revisar inventario
            </div>
          </div>

          {/* Datos */}
          <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:12,
            textTransform:"uppercase", letterSpacing:"0.08em", color:"#888", marginBottom:12 }}>
            5. Tus datos (opcional)
          </div>
          <input className="modal-input" placeholder="Tu nombre" value={nombre} onChange={e=>setNombre(e.target.value)} />
          <input className="modal-input" placeholder="Tu teléfono" value={tel} onChange={e=>setTel(e.target.value)} />
          <textarea className="modal-input" placeholder="Notas: color, receta, etc." rows={2}
            value={notas} onChange={e=>setNotas(e.target.value)} style={{ resize:"none" }} />

          {/* Aviso */}
          <div style={{
            background:"#FFFBEB", border:"2px solid #FCD34D",
            borderRadius:12, padding:"12px 16px",
            fontSize:13, color:"#92400E", marginBottom:20, display:"flex", gap:8,
          }}>
            ⏳ Revisaremos disponibilidad en inventario y te confirmamos por WhatsApp en breve.
          </div>

          {/* Botón WA */}
          <button onClick={enviar} style={{
            width:"100%", padding:16,
            background:"#25D366", color: C.blanco,
            border:`2px solid ${C.negro}`, borderRadius:999,
            fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:18,
            cursor:"pointer", display:"flex", alignItems:"center",
            justifyContent:"center", gap:10, transition:"transform .15s, box-shadow .15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`4px 4px 0 ${C.negro}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.184 1.62 5.988L.057 23.929l6.062-1.536A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.869 9.869 0 01-5.031-1.374l-.361-.214-3.741.981.999-3.648-.235-.374A9.869 9.869 0 012.106 12C2.106 6.533 6.533 2.106 12 2.106S21.894 6.533 21.894 12 17.467 21.894 12 21.894z"/>
            </svg>
            Enviar pedido por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(null);

  const openModal = (frame = null) => { setSelectedFrame(frame); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <GlobalStyles />
      <Nav onPedido={() => openModal()} />
      <Hero onPedido={() => openModal()} />
      <Marquee />
      <Coleccion onSelectFrame={openModal} />
      <Tratamientos />
      <Proceso />
      <Manifesto onPedido={() => openModal()} />
      <Footer />
      <Modal open={modalOpen} onClose={closeModal} initialFrame={selectedFrame} />
    </>
  );
}