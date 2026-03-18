import { useNavigate } from "react-router-dom";

export default function SiteFooter() {
  const navigate = useNavigate();

  const links = [
    { label: "Archivo", path: "/" },
    { label: "Estadísticas", path: "/stats" },
    { label: "Sobre nosotros", path: "/about" },
    { label: "Contacto", path: "/contact" },
  ];

  return (
    <footer className="border-t border-foreground/10 bg-muted/30 px-6 py-6 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <nav className="flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => navigate(l.path)}
              className="label-mono hover:text-foreground transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <p className="label-mono text-muted-foreground">
          © {new Date().getFullYear()} Asociación Española Contra el Antisemitismo
        </p>
      </div>
    </footer>
  );
}
