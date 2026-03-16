import { newspapers, tropeTypes, type Newspaper, type TropeType } from "@/data/entries";

interface FilterSidebarProps {
  selectedNewspapers: Newspaper[];
  selectedTropes: TropeType[];
  selectedAuthors: string[];
  allAuthors: string[];
  onToggleNewspaper: (n: Newspaper) => void;
  onToggleTrope: (t: TropeType) => void;
  onToggleAuthor: (a: string) => void;
  onClearAll: () => void;
  totalEntries: number;
  filteredCount: number;
}

const FilterChip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`border border-foreground/20 px-3 py-1 text-xs font-mono-ui uppercase transition-colors duration-150 ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-transparent text-foreground hover:bg-muted"
    }`}
  >
    {label}
  </button>
);

export default function FilterSidebar({
  selectedNewspapers,
  selectedTropes,
  selectedAuthors,
  allAuthors,
  onToggleNewspaper,
  onToggleTrope,
  onToggleAuthor,
  onClearAll,
  totalEntries,
  filteredCount,
}: FilterSidebarProps) {
  const hasFilters =
    selectedNewspapers.length > 0 ||
    selectedTropes.length > 0 ||
    selectedAuthors.length > 0;

  return (
    <aside className="border-r border-foreground/10 p-6 space-y-8 h-full overflow-y-auto">
      <div>
        <p className="label-mono mb-1">Registro</p>
        <p className="font-display text-2xl font-bold leading-tight">
          Filtros del Archivo
        </p>
      </div>

      <div className="border-t border-foreground/10 pt-4">
        <div className="flex items-baseline justify-between mb-3">
          <p className="label-mono">Resultados</p>
          <p className="font-mono-ui text-xs tabular">
            {filteredCount} / {totalEntries}
          </p>
        </div>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="text-xs font-mono-ui uppercase text-accent hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="border-t border-foreground/10 pt-4">
        <p className="label-mono mb-3">Medio</p>
        <div className="flex flex-wrap gap-2">
          {newspapers.map((n) => (
            <FilterChip
              key={n}
              label={n}
              active={selectedNewspapers.includes(n)}
              onClick={() => onToggleNewspaper(n)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-foreground/10 pt-4">
        <p className="label-mono mb-3">Autor</p>
        <div className="flex flex-wrap gap-2">
          {allAuthors.map((a) => (
            <FilterChip
              key={a}
              label={a}
              active={selectedAuthors.includes(a)}
              onClick={() => onToggleAuthor(a)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-foreground/10 pt-4">
        <p className="label-mono mb-3">Tipo de Tropo</p>
        <div className="flex flex-wrap gap-2">
          {tropeTypes.map((t) => (
            <FilterChip
              key={t}
              label={t}
              active={selectedTropes.includes(t)}
              onClick={() => onToggleTrope(t)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-foreground/10 pt-4 mt-auto">
        <p className="label-mono mb-2">Acerca de</p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[60ch]">
          Observatorio de Sesgo documenta y analiza instancias de sesgo
          antisemita en medios de comunicación españoles. Cada entrada es
          revisada por un equipo de analistas independientes.
        </p>
      </div>
    </aside>
  );
}
