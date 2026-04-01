import { useState, useEffect } from "react";

// ── DATOS ──────────────────────────────────────────────────────────────────
const categories = [
  { id: "acetato",    name: "Acetato",     image: "https://images.unsplash.com/photo-1761896906649-f95c9d061e1b?w=800", description: "Diseños clásicos y modernos", accent: "#c8a96e" },
  { id: "metal",      name: "Metal",       image: "https://images.unsplash.com/photo-1749527306067-a30652c9e885?w=800", description: "Elegantes y ligeros",        accent: "#8fb3c8" },
  { id: "3piezas",   name: "3 Piezas",    image: "https://images.unsplash.com/photo-1762718900539-c51799fd71b3?w=800", description: "Minimalistas y sofisticados",accent: "#a8c4a2" },
  { id: "ninos",     name: "Niños",       image: "https://images.unsplash.com/photo-1720575786473-5ad162acbe3f?w=800", description: "Resistentes y divertidos",  accent: "#e8a87c" },
  { id: "graduados", name: "Graduados",   image: "https://images.unsplash.com/photo-1760446032123-f66e0c7a005b?w=800", description: "Lentes pre-graduados",      accent: "#b8a0d4" },
  { id: "micas",     name: "Micas",       image: "https://images.unsplash.com/photo-1762432837041-381e6b15b474?w=800", description: "Graduaciones y tratamientos",accent: "#7ec8c8" },
  { id: "accesorios",name: "Accesorios",  image: "https://images.unsplash.com/photo-1755719401891-327552d72892?w=800", description: "Estuches, franelas y sprays",accent: "#d4a0a0" },
  { id: "refacciones",name:"Refacciones", image: "https://images.unsplash.com/photo-1592075761608-07fbdec431ba?w=800", description: "Mariposas, correas y más",  accent: "#c4b89a" },
  { id: "reparacion",name: "Reparación",  image: "https://images.unsplash.com/photo-1585600738948-cec7f1b2927b?w=800", description: "Cambios de piezas",         accent: "#98b4d4" },
];

const products = {
  acetato: [
    { id:1, name:"Armazón Clásico Negro",   price:850,  image:"https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600", desc:"Marco acetato grueso, estilo vintage." },
    { id:2, name:"Armazón Carey Moderno",   price:1100, image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600", desc:"Patrón carey con lentes ámbar." },
    { id:3, name:"Armazón Translúcido",     price:950,  image:"https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600", desc:"Acetato transparente, look moderno." },
    { id:4, name:"Armazón Bicolor",         price:1200, image:"https://images.unsplash.com/photo-1577803645773-f96470509666?w=600", desc:"Combinación de colores vibrantes." },
  ],
  metal: [
    { id:5, name:"Aviador Dorado",          price:1300, image:"https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600", desc:"Clásico aviador en metal dorado." },
    { id:6, name:"Marco Fino Plateado",     price:980,  image:"https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600", desc:"Ultra delgado, peso mínimo." },
    { id:7, name:"Redondo Cobre",           price:1150, image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600", desc:"Estilo retro en tono cobre." },
    { id:8, name:"Rectangular Negro Mate",  price:890,  image:"https://images.unsplash.com/photo-1580628765937-dc8d1f7cc68e?w=600", desc:"Marco metálico negro mate elegante." },
  ],
  "3piezas": [
    { id:9,  name:"Minimalista Titanio",    price:1600, image:"https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600", desc:"Sin montura, máxima ligereza." },
    { id:10, name:"Tres Piezas Plateado",   price:1450, image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600", desc:"Diseño modular con bisagras ocultas." },
    { id:11, name:"Semi Sin Montura",       price:1250, image:"https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600", desc:"Montura inferior visible, superior limpia." },
  ],
  ninos: [
    { id:12, name:"Armazón Flexible Azul",  price:650,  image:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600", desc:"Material irrompible, cómodo para niños." },
    { id:13, name:"Carita Feliz Rosa",      price:580,  image:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600", desc:"Colores brillantes, diseño divertido." },
    { id:14, name:"Deportivo Infantil",     price:720,  image:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600", desc:"Resistente a golpes y caídas." },
  ],
  graduados: [
    { id:15, name:"Lentes +1.50 Negro",     price:450,  image:"https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600", desc:"Pre-graduado para lectura." },
    { id:16, name:"Lentes +2.00 Carey",     price:480,  image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600", desc:"Graduación media, estilo elegante." },
    { id:17, name:"Lentes +2.50 Dorado",    price:520,  image:"https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600", desc:"Alta graduación en marco dorado." },
  ],
  micas: [
    { id:18, name:"Mica Antirreflejante",   price:350,  image:"https://images.unsplash.com/photo-1584979585778-b68ca9e3bbca?w=600", desc:"Reduce reflejos y mejora visión nocturna." },
    { id:19, name:"Mica Fotocromática",     price:680,  image:"https://images.unsplash.com/photo-1584979585778-b68ca9e3bbca?w=600", desc:"Se oscurece automáticamente al sol." },
    { id:20, name:"Mica Blue Light",        price:420,  image:"https://images.unsplash.com/photo-1584979585778-b68ca9e3bbca?w=600", desc:"Protege de luz azul de pantallas." },
    { id:21, name:"Mica Polarizada",        price:580,  image:"https://images.unsplash.com/photo-1584979585778-b68ca9e3bbca?w=600", desc:"Elimina deslumbramiento en exteriores." },
  ],
  accesorios: [
    { id:22, name:"Estuche Premium Negro",  price:180,  image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", desc:"Estuche rígido con forro suave." },
    { id:23, name:"Franela Microfibra",     price:45,   image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", desc:"Limpia sin rayar tus lentes." },
    { id:24, name:"Spray Limpiador",        price:85,   image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", desc:"Solución limpiadora profesional." },
    { id:25, name:"Cordón Ajustable",       price:60,   image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", desc:"Evita que pierdas tus lentes." },
  ],
  refacciones: [
    { id:26, name:"Kit Mariposas",          price:95,   image:"https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=600", desc:"Mariposas de diferentes tamaños." },
    { id:27, name:"Correas Nasales",        price:65,   image:"https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=600", desc:"Almohadillas de repuesto." },
    { id:28, name:"Tornillos Surtidos",     price:50,   image:"https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=600", desc:"Kit de tornillos para armazones." },
  ],
  reparacion: [
    { id:29, name:"Cambio de Mica",         price:0,    image:"https://images.unsplash.com/photo-1585600738948-cec7f1b2927b?w=600", desc:"Precio según evaluación del daño." },
    { id:30, name:"Soldadura de Armazón",   price:0,    image:"https://images.unsplash.com/photo-1585600738948-cec7f1b2927b?w=600", desc:"Reparación de roturas en metal." },
    { id:31, name:"Ajuste General",         price:0,    image:"https://images.unsplash.com/photo-1585600738948-cec7f1b2927b?w=600", desc:"Ajuste completo de tu armazón." },
  ],
};

const treatments = [
  { emoji:"🛡️", title:"Antirreflejante", description:"Reduce reflejos molestos mejorando la claridad visual al conducir de noche o trabajar con pantallas." },
  { emoji:"🌓", title:"Fotocromático",   description:"Lentes que se oscurecen con la luz solar y se aclaran en interiores. Protección UV total." },
  { emoji:"💻", title:"Blue Light",      description:"Filtra la luz azul de pantallas. Reduce fatiga ocular y mejora el sueño." },
  { emoji:"🕶️", title:"Polarizado",     description:"Elimina deslumbramiento en superficies reflectantes. Ideal para deportes y conducir." },
];

// ── COMPONENTE PRINCIPAL ───────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (to) => {
    setPage(to);
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentCategory = categories.find(c => c.id === page);
  const currentProducts = products[page] || [];
  const filteredProducts = currentProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.desc.toLowerCase().includes(search.toLowerCase())
  );
  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily:"'DM Sans', sans-serif", color:"#1a1a2e", margin:0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { margin:0; }

        .navbar {
          position:fixed; top:0; left:0; right:0; z-index:100;
          transition:all 0.3s ease; padding:0 2rem;
        }
        .navbar.scrolled {
          background:rgba(13,17,23,0.96);
          backdrop-filter:blur(16px);
          box-shadow:0 2px 30px rgba(0,0,0,0.3);
        }
        .navbar.top { background:transparent; }
        .navbar-inner {
          max-width:1200px; margin:0 auto;
          display:flex; align-items:center; gap:1.5rem; padding:1rem 0;
        }
        .nav-logo {
          font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:700;
          color:#c8a96e; cursor:pointer; white-space:nowrap; flex-shrink:0;
          background:none; border:none;
        }
        .nav-links { display:flex; gap:0.2rem; flex-shrink:0; flex-wrap:wrap; }
        .nav-link {
          background:none; border:none; cursor:pointer;
          color:rgba(255,255,255,0.65); font-size:0.78rem;
          padding:0.35rem 0.6rem; border-radius:6px;
          transition:all 0.2s; font-family:'DM Sans',sans-serif; white-space:nowrap;
        }
        .nav-link:hover, .nav-link.active { color:#c8a96e; background:rgba(200,169,110,0.1); }
        .nav-search { flex:1; position:relative; min-width:160px; }
        .nav-search input {
          width:100%; padding:0.5rem 1rem 0.5rem 2.2rem;
          background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12);
          border-radius:8px; color:#fff; font-size:0.83rem;
          font-family:'DM Sans',sans-serif; outline:none; transition:all 0.2s;
        }
        .nav-search input::placeholder { color:rgba(255,255,255,0.3); }
        .nav-search input:focus { background:rgba(255,255,255,0.12); border-color:rgba(200,169,110,0.4); }
        .search-icon { position:absolute; left:0.65rem; top:50%; transform:translateY(-50%); color:rgba(255,255,255,0.3); font-size:0.85rem; pointer-events:none; }

        .hero {
          position:relative; min-height:100vh;
          display:flex; align-items:center; overflow:hidden; background:#0d1117;
        }
        .hero-bg {
          position:absolute; inset:0;
          background-image:
            linear-gradient(135deg,rgba(10,10,30,0.88) 0%,rgba(10,10,30,0.4) 60%,rgba(10,10,30,0.75) 100%),
            url('https://images.unsplash.com/photo-1762718900539-c51799fd71b3?w=1600');
          background-size:cover; background-position:center;
          animation:slowZoom 18s ease-in-out infinite alternate;
        }
        @keyframes slowZoom { from{transform:scale(1.05)} to{transform:scale(1.12)} }
        .hero-inner {
          position:relative; z-index:2; max-width:1100px; margin:0 auto;
          padding:8rem 2rem 5rem; display:grid; grid-template-columns:1fr 1fr;
          gap:4rem; align-items:center; width:100%;
        }
        .hero-badge {
          display:inline-flex; align-items:center; gap:0.5rem;
          background:rgba(200,169,110,0.15); border:1px solid rgba(200,169,110,0.4);
          color:#c8a96e; padding:0.4rem 1rem; border-radius:100px;
          font-size:0.78rem; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:1.5rem;
        }
        .hero-title { font-family:'Playfair Display',serif; font-size:clamp(2.8rem,5vw,4.5rem); font-weight:700; color:#fff; line-height:1.1; margin-bottom:1rem; }
        .hero-title span { color:#c8a96e; font-style:italic; }
        .hero-tagline { font-family:'Playfair Display',serif; font-style:italic; font-size:1.1rem; color:rgba(255,255,255,0.65); margin-bottom:1.25rem; }
        .hero-desc { color:rgba(255,255,255,0.55); font-size:0.95rem; line-height:1.75; margin-bottom:2.5rem; font-weight:300; }
        .hero-btn {
          display:inline-flex; align-items:center; gap:0.6rem;
          background:#c8a96e; color:#0d1117; padding:0.9rem 2rem;
          border-radius:6px; font-weight:600; font-size:0.9rem;
          border:none; cursor:pointer; transition:all 0.3s ease;
        }
        .hero-btn:hover { background:#d4b87c; transform:translateY(-2px); box-shadow:0 12px 40px rgba(200,169,110,0.35); }
        .stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; }
        .stat-card { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); backdrop-filter:blur(12px); border-radius:12px; padding:1.5rem; text-align:center; }
        .stat-num { font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:700; color:#c8a96e; line-height:1; margin-bottom:0.3rem; }
        .stat-lbl { color:rgba(255,255,255,0.45); font-size:0.75rem; letter-spacing:0.08em; text-transform:uppercase; }

        .section-label { display:block; text-align:center; font-size:0.72rem; letter-spacing:0.2em; text-transform:uppercase; color:#c8a96e; margin-bottom:0.6rem; }
        .section-title { font-family:'Playfair Display',serif; font-size:clamp(1.8rem,3vw,2.6rem); font-weight:600; text-align:center; color:#1a1a2e; margin-bottom:0.75rem; }
        .section-sub { text-align:center; color:#888; font-size:0.95rem; max-width:500px; margin:0 auto 3.5rem; line-height:1.7; font-weight:300; }

        .features { padding:6rem 2rem; background:#faf9f7; }
        .features-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.75rem; max-width:1050px; margin:0 auto; }
        .feature-card { background:#fff; border:1px solid #eee; border-radius:16px; padding:2.25rem 1.75rem; text-align:center; transition:all 0.3s ease; position:relative; overflow:hidden; }
        .feature-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#c8a96e,#d4b87c); transform:scaleX(0); transition:transform 0.3s ease; }
        .feature-card:hover { transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,0,0,0.07); }
        .feature-card:hover::before { transform:scaleX(1); }
        .feature-icon { width:64px; height:64px; background:linear-gradient(135deg,#fdf6e3,#f5e6c8); border-radius:16px; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem; font-size:1.75rem; }
        .feature-title { font-family:'Playfair Display',serif; font-size:1.15rem; font-weight:600; color:#1a1a2e; margin-bottom:0.6rem; }
        .feature-desc { color:#999; font-size:0.88rem; line-height:1.7; font-weight:300; }

        .categories { padding:6rem 2rem; background:#fff; }
        .cat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.1rem; max-width:1150px; margin:0 auto; }
        .cat-card { position:relative; overflow:hidden; border-radius:13px; display:block; aspect-ratio:1; background:#111; cursor:pointer; border:none; padding:0; }
        .cat-card:first-child { grid-column:span 2; aspect-ratio:2/1; }
        .cat-card img { width:100%; height:100%; object-fit:cover; transition:transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94),opacity 0.3s; opacity:0.75; }
        .cat-card:hover img { transform:scale(1.08); opacity:0.55; }
        .cat-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 55%); display:flex; flex-direction:column; justify-content:flex-end; padding:1.4rem; }
        .cat-accent { width:22px; height:3px; border-radius:2px; margin-bottom:0.5rem; transition:width 0.3s ease; }
        .cat-card:hover .cat-accent { width:38px; }
        .cat-name { font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:600; color:#fff; margin-bottom:0.2rem; }
        .cat-desc { color:rgba(255,255,255,0.65); font-size:0.8rem; font-weight:300; }
        .cat-arrow { position:absolute; top:1rem; right:1rem; width:32px; height:32px; background:rgba(255,255,255,0.12); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:0.9rem; opacity:0; transition:all 0.3s; }
        .cat-card:hover .cat-arrow { opacity:1; }

        .treatments { padding:6rem 2rem; background:#0d1117; }
        .treatments .section-label { color:#c8a96e; }
        .treatments .section-title { color:#fff; }
        .treatments .section-sub { color:rgba(255,255,255,0.4); }
        .treat-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1.25rem; max-width:900px; margin:0 auto; }
        .treat-card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.75rem; display:flex; gap:1.1rem; transition:all 0.3s ease; }
        .treat-card:hover { border-color:rgba(200,169,110,0.3); transform:translateY(-3px); box-shadow:0 20px 50px rgba(0,0,0,0.3); }
        .treat-emoji { font-size:1.9rem; line-height:1; flex-shrink:0; }
        .treat-title { font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:600; color:#fff; margin-bottom:0.4rem; }
        .treat-desc { color:rgba(255,255,255,0.45); font-size:0.85rem; line-height:1.65; font-weight:300; }
        .treat-note { max-width:680px; margin:2.5rem auto 0; background:rgba(200,169,110,0.07); border:1px solid rgba(200,169,110,0.2); border-radius:12px; padding:1.6rem 2rem; text-align:center; }
        .treat-note h3 { font-family:'Playfair Display',serif; font-size:1rem; color:#c8a96e; margin-bottom:0.5rem; }
        .treat-note p { color:rgba(255,255,255,0.4); font-size:0.85rem; line-height:1.7; font-weight:300; }

        .mission { padding:6rem 2rem; background:#faf9f7; }
        .mission-grid { display:grid; grid-template-columns:1fr 1fr; gap:2rem; max-width:980px; margin:0 auto; }
        .mission-card { background:#fff; border-radius:18px; padding:2.75rem; border:1px solid #eee; position:relative; overflow:hidden; transition:all 0.3s ease; }
        .mission-card:hover { transform:translateY(-4px); box-shadow:0 24px 60px rgba(0,0,0,0.07); }
        .mission-bar { position:absolute; top:0; left:0; width:5px; height:100%; background:linear-gradient(to bottom,#c8a96e,#d4b87c); border-radius:18px 0 0 18px; }
        .mission-lbl { font-size:0.68rem; letter-spacing:0.2em; text-transform:uppercase; color:#c8a96e; margin-bottom:0.6rem; }
        .mission-title { font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:600; color:#1a1a2e; margin-bottom:0.9rem; }
        .mission-text { color:#888; line-height:1.8; font-size:0.92rem; font-weight:300; }

        .cat-page { min-height:100vh; background:#f8f7f5; padding-top:80px; }
        .cat-page-hero { background:#0d1117; padding:3rem 2rem 2.5rem; border-bottom:1px solid rgba(255,255,255,0.06); }
        .cat-page-inner { max-width:1150px; margin:0 auto; }
        .breadcrumb { display:flex; align-items:center; gap:0.5rem; margin-bottom:1.25rem; }
        .breadcrumb-btn { background:none; border:none; cursor:pointer; color:rgba(255,255,255,0.4); font-size:0.82rem; font-family:'DM Sans',sans-serif; padding:0; transition:color 0.2s; }
        .breadcrumb-btn:hover { color:#c8a96e; }
        .breadcrumb-sep { color:rgba(255,255,255,0.2); font-size:0.75rem; }
        .breadcrumb-current { color:#c8a96e; font-size:0.82rem; }
        .cat-page-title { font-family:'Playfair Display',serif; font-size:clamp(2rem,4vw,3.5rem); font-weight:700; color:#fff; margin-bottom:0.5rem; }
        .cat-page-sub { color:rgba(255,255,255,0.4); font-size:0.9rem; font-weight:300; }
        .products-section { padding:3rem 2rem; max-width:1150px; margin:0 auto; }
        .products-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:1.5rem; }
        .product-card { background:#fff; border-radius:14px; overflow:hidden; border:1px solid #eee; transition:all 0.3s ease; cursor:default; }
        .product-card:hover { transform:translateY(-5px); box-shadow:0 16px 48px rgba(0,0,0,0.1); }
        .product-img { aspect-ratio:1; overflow:hidden; background:#f0ede8; }
        .product-img img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease; }
        .product-card:hover .product-img img { transform:scale(1.07); }
        .product-info { padding:1.25rem; }
        .product-name { font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:600; color:#1a1a2e; margin-bottom:0.35rem; }
        .product-desc { color:#aaa; font-size:0.82rem; line-height:1.5; margin-bottom:1rem; font-weight:300; }
        .product-price { font-size:1.2rem; font-weight:700; color:#c8a96e; }
        .product-price.service { font-size:0.85rem; color:#e8a87c; font-weight:500; }
        .empty-state { text-align:center; padding:5rem 2rem; color:#bbb; }
        .empty-state div { font-size:3rem; margin-bottom:1rem; }

        @media (max-width:900px) {
          .hero-inner { grid-template-columns:1fr; text-align:center; padding:7rem 1.5rem 4rem; }
          .features-grid { grid-template-columns:1fr; max-width:420px; margin:0 auto; }
          .cat-grid { grid-template-columns:repeat(2,1fr); }
          .cat-card:first-child { grid-column:span 2; }
          .treat-grid { grid-template-columns:1fr; }
          .mission-grid { grid-template-columns:1fr; }
          .nav-links { display:none; }
        }
        @media (max-width:540px) {
          .cat-grid { grid-template-columns:1fr; }
          .cat-card:first-child { grid-column:span 1; aspect-ratio:1; }
          .stats-grid { grid-template-columns:1fr; }
          .products-grid { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      {/* ── NAVBAR FIJA ── */}
      <nav className={`navbar ${scrolled || page !== "home" ? "scrolled" : "top"}`}>
        <div className="navbar-inner">
          <button className="nav-logo" onClick={() => navigate("home")}>Óptica Lain</button>
          <div className="nav-links">
            {categories.map(c => (
              <button key={c.id} className={`nav-link ${page === c.id ? "active" : ""}`} onClick={() => navigate(c.id)}>
                {c.name}
              </button>
            ))}
          </div>
          <div className="nav-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={page === "home" ? "Buscar categorías..." : `Buscar en ${currentCategory?.name}...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* ── HOME ── */}
      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-bg" />
            <div className="hero-inner">
              <div>
                <div className="hero-badge">✨ Óptica Lain</div>
                <h1 className="hero-title">Ve el mundo<br />con <span>claridad</span></h1>
                <p className="hero-tagline">"Te vez bien, te queremos bien"</p>
                <p className="hero-desc">Armazones, micas y tratamientos de alta calidad. Asesoría personalizada para cada necesidad visual. Tu salud ocular, nuestra prioridad.</p>
                <button className="hero-btn" onClick={() => document.getElementById("categorias").scrollIntoView({ behavior:"smooth" })}>
                  Explorar catálogo →
                </button>
              </div>
              <div className="stats-grid">
                <div className="stat-card"><div className="stat-num">9+</div><div className="stat-lbl">Categorías</div></div>
                <div className="stat-card"><div className="stat-num">4</div><div className="stat-lbl">Tratamientos</div></div>
                <div className="stat-card"><div className="stat-num">∞</div><div className="stat-lbl">Satisfacción</div></div>
              </div>
            </div>
          </section>

          <section className="features">
            <span className="section-label">¿Por qué elegirnos?</span>
            <h2 className="section-title">Lo que nos distingue</h2>
            <p className="section-sub">Combinamos tecnología, estilo y atención personalizada para brindarte la mejor experiencia óptica.</p>
            <div className="features-grid">
              {[
                { icon:"👁️", title:"Armazones de Calidad",   desc:"Amplia selección en acetato, metal, 3 piezas y más. Diseños para toda la familia." },
                { icon:"🏆", title:"Micas y Tratamientos",    desc:"Antirreflejante, fotocromático, blue light y polarizado. La protección que necesitas." },
                { icon:"❤️", title:"Atención Personalizada",  desc:"Asesoría experta para encontrar el producto perfecto según tus necesidades." },
              ].map((f,i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-title">{f.title}</div>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="categories" id="categorias">
            <span className="section-label">Colección</span>
            <h2 className="section-title">Explora nuestras categorías</h2>
            <p className="section-sub">Haz clic en cualquier categoría para ver sus productos.</p>
            <div className="cat-grid">
              {(search ? filteredCategories : categories).map((cat) => (
                <button className="cat-card" key={cat.id} onClick={() => navigate(cat.id)}>
                  <img src={cat.image} alt={cat.name} />
                  <div className="cat-overlay">
                    <div className="cat-accent" style={{ background:cat.accent }} />
                    <div className="cat-name">{cat.name}</div>
                    <div className="cat-desc">{cat.description}</div>
                  </div>
                  <div className="cat-arrow">→</div>
                </button>
              ))}
            </div>
          </section>

          <section className="treatments">
            <span className="section-label">Protección visual</span>
            <h2 className="section-title">Tratamientos para tus lentes</h2>
            <p className="section-sub">Cada tratamiento está diseñado para mejorar tu experiencia visual.</p>
            <div className="treat-grid">
              {treatments.map((t,i) => (
                <div className="treat-card" key={i}>
                  <div className="treat-emoji">{t.emoji}</div>
                  <div>
                    <div className="treat-title">{t.title}</div>
                    <p className="treat-desc">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="treat-note">
              <h3>💡 ¿Puedo combinar tratamientos?</h3>
              <p>¡Sí! Muchos tratamientos se pueden combinar. Consulta con nuestro equipo para la mejor combinación.</p>
            </div>
          </section>

          <section className="mission">
            <span className="section-label">Nuestra esencia</span>
            <h2 className="section-title" style={{ marginBottom:"3rem" }}>Óptica Lain</h2>
            <div className="mission-grid">
              <div className="mission-card">
                <div className="mission-bar" />
                <div className="mission-lbl">Misión</div>
                <div className="mission-title">Cuidamos tu visión</div>
                <p className="mission-text">Proporcionar productos ópticos de la más alta calidad, combinando tecnología de vanguardia con un servicio personalizado.</p>
              </div>
              <div className="mission-card">
                <div className="mission-bar" />
                <div className="mission-lbl">Visión</div>
                <div className="mission-title">Líderes en excelencia</div>
                <p className="mission-text">Ser la óptica líder reconocida por la excelencia en productos y servicios, innovando constantemente para satisfacer las necesidades visuales de nuestra comunidad.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── PÁGINA DE CATEGORÍA ── */}
      {page !== "home" && currentCategory && (
        <div className="cat-page">
          <div className="cat-page-hero">
            <div className="cat-page-inner">
              <div className="breadcrumb">
                <button className="breadcrumb-btn" onClick={() => navigate("home")}>Inicio</button>
                <span className="breadcrumb-sep">›</span>
                <span className="breadcrumb-current">{currentCategory.name}</span>
              </div>
              <h1 className="cat-page-title">{currentCategory.name}</h1>
              <p className="cat-page-sub">{currentCategory.description} — {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="products-section">
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(p => (
                  <div className="product-card" key={p.id}>
                    <div className="product-img"><img src={p.image} alt={p.name} /></div>
                    <div className="product-info">
                      <div className="product-name">{p.name}</div>
                      <p className="product-desc">{p.desc}</p>
                      {p.price > 0
                        ? <div className="product-price">${p.price.toLocaleString()} MXN</div>
                        : <div className="product-price service">Precio según evaluación</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div>🔍</div>
                <p>No se encontraron productos para "{search}"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}