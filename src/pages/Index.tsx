import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { Newspaper, TropeType } from "@/data/entries";
import { newspapers, tropeTypes } from "@/data/entries";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FilterBar from "@/components/FilterBar";
import EntryRow from "@/components/EntryRow";
import EntryModal from "@/components/EntryModal";
import HeroSection from "@/components/HeroSection";
import ActionBanner from "@/components/ActionBanner";
import NewspaperCard from "@/components/NewspaperCard";
import TropeCard from "@/components/TropeCard";
import CartoonCarousel from "@/components/CartoonCarousel";
import AuthorCard from "@/components/AuthorCard";
import type { Entry } from "@/data/entries";
import type { Tables } from "@/integrations/supabase/types";

type SortMode = "date-desc" | "date-asc" | "relevance";
const ITEMS_PER_PAGE = 8;

const listContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

// Map DB row to Entry type used by existing components
function mapCaseToEntry(c: Tables<"cases">): Entry {
  return {
    id: c.id,
    newspaper: c.newspaper as Newspaper,
    date: c.date,
    title: c.title,
    author: c.author ?? "Redacción",
    section: c.section ?? "",
    trope: c.trope as TropeType,
    flagged: c.flagged,
    excerpt: c.excerpt,
    fragment: c.fragment ?? "",
  };
}

export default function Index() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showHero, setShowHero] = useState(searchParams.get("view") !== "archive");
  const [selectedNewspapers, setSelectedNewspapers] = useState<Newspaper[]>([]);
  const [selectedTropes, setSelectedTropes] = useState<TropeType[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("date-desc");
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [page, setPage] = useState(1);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [dbLoading, setDbLoading] = useState(true);

  // Load cases from database
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("cases").select("*").order("date", { ascending: false });
      if (data && data.length > 0) {
        setEntries(data.map(mapCaseToEntry));
      } else {
        // Fallback to static data if DB is empty
        const { entries: staticEntries } = await import("@/data/entries");
        setEntries(staticEntries);
      }
      setDbLoading(false);
    };
    load();
  }, []);

  const allAuthors = useMemo(() => {
    return [...new Set(entries.map((e) => e.author))].sort();
  }, [entries]);

  const filtered = useMemo(() => {
    let result = entries.filter((e) => {
      if (selectedNewspapers.length && !selectedNewspapers.includes(e.newspaper)) return false;
      if (selectedTropes.length && !selectedTropes.includes(e.trope)) return false;
      if (selectedAuthors.length && !selectedAuthors.includes(e.author)) return false;
      return true;
    });

    if (sortMode === "date-desc") {
      result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortMode === "date-asc") {
      result = [...result].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortMode === "relevance") {
      result = [...result].sort((a, b) => {
        if (a.flagged !== b.flagged) return a.flagged ? -1 : 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }

    return result;
  }, [entries, selectedNewspapers, selectedTropes, selectedAuthors, sortMode]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleNewspaper = (n: Newspaper) => {
    setSelectedNewspapers((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
    setPage(1);
  };
  const toggleTrope = (t: TropeType) => {
    setSelectedTropes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
    setPage(1);
  };
  const toggleAuthor = (a: string) => {
    setSelectedAuthors((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
    setPage(1);
  };
  const clearAll = () => {
    setSelectedNewspapers([]);
    setSelectedTropes([]);
    setSelectedAuthors([]);
    setPage(1);
  };

  const handleNavigate = (page: "home" | "archive" | "stats" | "about" | "contact" | "antisemitism") => {
    if (page === "home") setShowHero(true);
    if (page === "archive") setShowHero(false);
    if (page === "stats") navigate("/stats");
    if (page === "about") navigate("/about");
    if (page === "contact") navigate("/contact");
    if (page === "antisemitism") navigate("/antisemitismo");
  };

  if (showHero) {
    return <HeroSection onEnter={() => setShowHero(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader onNavigate={handleNavigate} currentPage="archive" />

      <FilterBar
        selectedNewspapers={selectedNewspapers}
        selectedTropes={selectedTropes}
        selectedAuthors={selectedAuthors}
        allAuthors={allAuthors}
        onToggleNewspaper={toggleNewspaper}
        onToggleTrope={toggleTrope}
        onToggleAuthor={toggleAuthor}
        onClearAll={clearAll}
        totalEntries={entries.length}
        filteredCount={filtered.length}
      />

      <div className="border-b border-foreground/10 px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <span className="label-mono">Últimas Entradas</span>
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="label-mono">Ordenar:</span>
            {([
              { value: "date-desc" as SortMode, label: "Recientes" },
              { value: "date-asc" as SortMode, label: "Antiguas" },
              { value: "relevance" as SortMode, label: "Relevancia" },
            ]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setSortMode(opt.value); setPage(1); }}
                className={`font-mono-ui text-[10px] uppercase px-2 py-1 border transition-colors duration-150 ${
                  sortMode === opt.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-foreground/20 text-muted-foreground hover:bg-muted"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <span className="label-mono tabular">Pág. {page}/{totalPages}</span>
        </div>
      </div>

      {selectedNewspapers.length === 1 && selectedAuthors.length === 0 && (
        <NewspaperCard newspaper={selectedNewspapers[0]} />
      )}
      {selectedTropes.length === 1 && <TropeCard trope={selectedTropes[0]} />}
      {selectedAuthors.length === 1 && <AuthorCard author={selectedAuthors[0]} />}

      <motion.div
        key={`${selectedNewspapers.join()}-${selectedTropes.join()}-${selectedAuthors.join()}-${sortMode}-${page}`}
        variants={listContainer}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto"
      >
        {dbLoading ? (
          <div className="p-8 text-center"><span className="label-mono">Cargando...</span></div>
        ) : paginated.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p className="label-mono">Sin resultados</p>
            <p className="text-sm mt-2">No se encontraron entradas con los filtros seleccionados.</p>
          </div>
        ) : (
          paginated.map((entry) => (
            <EntryRow key={entry.id} entry={entry} onClick={setSelectedEntry} />
          ))
        )}
      </motion.div>

      {selectedNewspapers.length === 1 ? (
        <CartoonCarousel newspaper={selectedNewspapers[0]} />
      ) : (
        <CartoonCarousel />
      )}

      <ActionBanner selectedAuthors={selectedAuthors} selectedNewspapers={selectedNewspapers} />

      {totalPages > 1 && (
        <div className="border-t border-foreground/10 px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="label-mono disabled:opacity-30 hover:text-foreground transition-colors"
          >
            ← Anterior
          </button>
          <span className="label-mono tabular">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="label-mono disabled:opacity-30 hover:text-foreground transition-colors"
          >
            Siguiente →
          </button>
        </div>
      )}

      <SiteFooter />
      <EntryModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </div>
  );
}
