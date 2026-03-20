import { useState, useRef, useEffect } from "react";
import { newspapers, tropeTypes, type Newspaper, type TropeType } from "@/data/entries";
import { X, ChevronDown, Filter } from "lucide-react";

interface FilterBarProps {
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

function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 border px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-mono-ui uppercase transition-colors duration-150 ${
          selected.length > 0
            ? "bg-primary text-primary-foreground border-primary"
            : "border-foreground/20 text-foreground hover:bg-muted"
        }`}
      >
        {label}
        {selected.length > 0 && (
          <span className="bg-accent text-accent-foreground px-1.5 py-0.5 text-[9px] leading-none">
            {selected.length}
          </span>
        )}
        <ChevronDown className="h-3 w-3 opacity-50" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-popover border border-foreground/10 shadow-lg min-w-[200px] max-h-[300px] overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`w-full text-left px-3 py-2 text-xs font-mono-ui flex items-center gap-2 transition-colors ${
                selected.includes(opt)
                  ? "bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span
                className={`w-3 h-3 border flex-shrink-0 flex items-center justify-center ${
                  selected.includes(opt)
                    ? "bg-primary border-primary"
                    : "border-foreground/30"
                }`}
              >
                {selected.includes(opt) && (
                  <span className="text-primary-foreground text-[8px]">✓</span>
                )}
              </span>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterBar({
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
}: FilterBarProps) {
  const hasFilters =
    selectedNewspapers.length > 0 ||
    selectedTropes.length > 0 ||
    selectedAuthors.length > 0;

  return (
    <div className="border-b border-foreground/10 px-4 sm:px-6 py-3">
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 mr-1 sm:mr-2">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="label-mono">Filtrar</span>
        </div>

        <FilterDropdown
          label="Medio"
          options={[...newspapers]}
          selected={selectedNewspapers}
          onToggle={(v) => onToggleNewspaper(v as Newspaper)}
        />

        <FilterDropdown
          label="Autor"
          options={allAuthors}
          selected={selectedAuthors}
          onToggle={onToggleAuthor}
        />

        <FilterDropdown
          label="Tropo"
          options={[...tropeTypes]}
          selected={selectedTropes}
          onToggle={(v) => onToggleTrope(v as TropeType)}
        />

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {hasFilters && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 text-xs font-mono-ui uppercase text-accent hover:underline"
            >
              <X className="h-3 w-3" />
              Limpiar
            </button>
          )}
          <span className="label-mono tabular">
            {filteredCount} / {totalEntries}
          </span>
        </div>
      </div>
    </div>
  );
}
