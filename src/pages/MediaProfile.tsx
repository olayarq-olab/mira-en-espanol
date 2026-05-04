import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewspaperCard from "@/components/NewspaperCard";
import EntryRow from "@/components/EntryRow";
import EntryModal from "@/components/EntryModal";
import CartoonCarousel from "@/components/CartoonCarousel";
import { supabase } from "@/integrations/supabase/client";
import { newspapers as staticNewspapers } from "@/data/entries";
import type { Entry, Newspaper, TropeType } from "@/data/entries";
import type { Tables } from "@/integrations/supabase/types";
import { slugToNewspaper } from "@/lib/newspaperSlug";

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

export default function MediaProfile() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const newspaper = slug ? slugToNewspaper(slug, staticNewspapers) : undefined;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Entry | null>(null);

  const handleNavigate = (page: "home" | "archive" | "stats" | "about" | "contact" | "antisemitism" | "media") => {
    if (page === "home") navigate("/");
    else if (page === "archive") navigate("/?view=archive");
    else if (page === "stats") navigate("/stats");
    else if (page === "about") navigate("/about");
    else if (page === "contact") navigate("/contact");
    else if (page === "antisemitism") navigate("/antisemitismo");
    else if (page === "media") navigate("/medios");
  };

  useEffect(() => {
    if (!newspaper) {
      setLoading(false);
      return;
    }
    const load = async () => {
      const { data } = await supabase
        .from("cases")
        .select("*")
        .eq("newspaper", newspaper)
        .order("date", { ascending: false });
      setEntries((data ?? []).map(mapCaseToEntry));
      setLoading(false);
    };
    load();
  }, [newspaper]);

  if (!newspaper) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader onNavigate={handleNavigate} currentPage="media" />
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 py-12">
          <p className="font-display text-xl">Medio no encontrado</p>
          <button
            onClick={() => navigate("/medios")}
            className="label-mono hover:text-foreground transition-colors"
          >
            ← Volver a Medios
          </button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader onNavigate={handleNavigate} currentPage="media" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col"
      >
        <div className="px-4 sm:px-6 pt-5">
          <button
            onClick={() => navigate("/medios")}
            className="inline-flex items-center gap-1.5 label-mono hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Todos los medios
          </button>
        </div>

        <NewspaperCard newspaper={newspaper} />

        <div className="border-b border-foreground/10 px-4 sm:px-6 py-2">
          <span className="label-mono">Casos documentados ({entries.length})</span>
        </div>

        {loading ? (
          <div className="p-8 text-center"><span className="label-mono">Cargando...</span></div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p className="label-mono">Sin casos documentados</p>
          </div>
        ) : (
          entries.map((e) => <EntryRow key={e.id} entry={e} onClick={setSelected} />)
        )}

        <CartoonCarousel newspaper={newspaper} />
      </motion.div>

      <SiteFooter />
      <EntryModal entry={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
