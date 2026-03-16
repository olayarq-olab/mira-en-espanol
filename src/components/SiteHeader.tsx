interface SiteHeaderProps {
  onNavigate?: (page: "home" | "archive" | "stats") => void;
  currentPage?: "archive" | "stats";
}

export default function SiteHeader({ onNavigate, currentPage = "archive" }: SiteHeaderProps) {
  return (
    <header className="border-b border-foreground/10 px-6 py-4 flex items-baseline justify-between">
      <div className="flex items-baseline gap-4">
        <h1
          className="font-display text-xl font-bold tracking-tight cursor-pointer hover:text-accent transition-colors"
          onClick={() => onNavigate?.("home")}
        >
          Observatorio de Sesgo
        </h1>
        <span className="label-mono hidden sm:inline">
          Archivo de Sesgo Antisemita en Medios Españoles
        </span>
      </div>
      <nav className="flex gap-6">
        <button
          onClick={() => onNavigate?.("archive")}
          className={`label-mono transition-colors ${
            currentPage === "archive" ? "text-foreground" : "hover:text-foreground"
          }`}
        >
          Archivo
        </button>
        <button
          onClick={() => onNavigate?.("stats")}
          className={`label-mono transition-colors ${
            currentPage === "stats" ? "text-foreground" : "hover:text-foreground"
          }`}
        >
          Estadísticas
        </button>
      </nav>
    </header>
  );
}
