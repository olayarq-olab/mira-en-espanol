export default function SiteHeader() {
  return (
    <header className="border-b border-foreground/10 px-6 py-4 flex items-baseline justify-between">
      <div className="flex items-baseline gap-4">
        <h1 className="font-display text-xl font-bold tracking-tight">
          Observatorio de Sesgo
        </h1>
        <span className="label-mono hidden sm:inline">
          Archivo de Sesgo Antisemita en Medios Españoles
        </span>
      </div>
      <nav className="flex gap-6">
        <span className="label-mono hover:text-foreground transition-colors cursor-pointer">
          Archivo
        </span>
        <span className="label-mono hover:text-foreground transition-colors cursor-pointer">
          Estadísticas
        </span>
        <span className="label-mono hover:text-foreground transition-colors cursor-pointer">
          Metodología
        </span>
      </nav>
    </header>
  );
}
