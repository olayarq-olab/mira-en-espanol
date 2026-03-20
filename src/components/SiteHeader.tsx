import { useState } from "react";
import { Menu, X } from "lucide-react";

interface SiteHeaderProps {
  onNavigate?: (page: "home" | "archive" | "stats" | "about" | "contact" | "antisemitism") => void;
  currentPage?: "archive" | "stats" | "about" | "contact" | "antisemitism";
}

export default function SiteHeader({ onNavigate, currentPage = "archive" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: { label: string; page: "about" | "antisemitism" | "archive" | "stats" | "contact" }[] = [
    { label: "Sobre nosotros", page: "about" },
    { label: "Antisemitismo", page: "antisemitism" },
    { label: "Archivo", page: "archive" },
    { label: "Estadísticas", page: "stats" },
    { label: "Contacto", page: "contact" },
  ];

  const handleNav = (page: "home" | "archive" | "stats" | "about" | "contact" | "antisemitism") => {
    onNavigate?.(page);
    setMenuOpen(false);
  };

  return (
    <header className="border-b border-foreground/10 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3 min-w-0">
          <h1
            className="font-display text-lg sm:text-xl font-bold tracking-tight cursor-pointer hover:text-accent transition-colors shrink-0"
            onClick={() => handleNav("home")}
          >
            Observatorio de Sesgo
          </h1>
          <span className="label-mono hidden md:inline truncate">
            Archivo de Sesgo Antisemita en Medios Españoles
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 shrink-0">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNav(item.page)}
              className={`label-mono transition-colors whitespace-nowrap ${currentPage === item.page ? "text-foreground" : "hover:text-foreground"}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 -mr-2 hover:bg-muted transition-colors"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-foreground/10 mt-4 pt-4 pb-2 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNav(item.page)}
              className={`label-mono text-left py-2.5 px-2 transition-colors ${currentPage === item.page ? "text-foreground bg-muted" : "hover:text-foreground hover:bg-muted/50"}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
