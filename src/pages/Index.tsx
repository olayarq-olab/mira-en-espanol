import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { entries, type Newspaper, type TropeType } from "@/data/entries";
import SiteHeader from "@/components/SiteHeader";
import FilterSidebar from "@/components/FilterSidebar";
import EntryRow from "@/components/EntryRow";
import EntryModal from "@/components/EntryModal";
import type { Entry } from "@/data/entries";

const ITEMS_PER_PAGE = 8;

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

export default function Index() {
  const [selectedNewspapers, setSelectedNewspapers] = useState<Newspaper[]>([]);
  const [selectedTropes, setSelectedTropes] = useState<TropeType[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (selectedNewspapers.length && !selectedNewspapers.includes(e.newspaper))
        return false;
      if (selectedTropes.length && !selectedTropes.includes(e.trope))
        return false;
      return true;
    });
  }, [selectedNewspapers, selectedTropes]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const toggleNewspaper = (n: Newspaper) => {
    setSelectedNewspapers((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
    setPage(1);
  };

  const toggleTrope = (t: TropeType) => {
    setSelectedTropes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
    setPage(1);
  };

  const clearAll = () => {
    setSelectedNewspapers([]);
    setSelectedTropes([]);
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — 4 cols */}
        <div className="hidden lg:block w-[33.333%] border-r border-foreground/10">
          <FilterSidebar
            selectedNewspapers={selectedNewspapers}
            selectedTropes={selectedTropes}
            onToggleNewspaper={toggleNewspaper}
            onToggleTrope={toggleTrope}
            onClearAll={clearAll}
            totalEntries={entries.length}
            filteredCount={filtered.length}
          />
        </div>

        {/* Content — 8 cols */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Section header */}
          <div className="border-b border-foreground/10 px-6 py-3 flex items-baseline justify-between">
            <span className="label-mono">Últimas Entradas</span>
            <span className="label-mono tabular">
              Página {page} de {totalPages}
            </span>
          </div>

          {/* Entry list */}
          <motion.div
            key={`${selectedNewspapers.join()}-${selectedTropes.join()}-${page}`}
            variants={listContainer}
            initial="hidden"
            animate="show"
            className="flex-1"
          >
            {paginated.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p className="label-mono">Sin resultados</p>
                <p className="text-sm mt-2">
                  No se encontraron entradas con los filtros seleccionados.
                </p>
              </div>
            ) : (
              paginated.map((entry) => (
                <EntryRow
                  key={entry.id}
                  entry={entry}
                  onClick={setSelectedEntry}
                />
              ))
            )}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-foreground/10 px-6 py-3 flex items-center justify-between">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="label-mono disabled:opacity-30 hover:text-foreground transition-colors"
              >
                ← Anterior
              </button>
              <span className="label-mono tabular">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="label-mono disabled:opacity-30 hover:text-foreground transition-colors"
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      </div>

      <EntryModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </div>
  );
}
