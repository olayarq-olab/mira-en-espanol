import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import { newspapers as staticNewspapers } from "@/data/entries";
import type { Newspaper } from "@/data/entries";
import { newspaperToSlug } from "@/lib/newspaperSlug";

interface MediaStat {
  newspaper: Newspaper;
  articles: number;
  authors: number;
}

export default function Media() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<MediaStat[]>([]);
  const [loading, setLoading] = useState(true);

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
    const load = async () => {
      const { data } = await supabase.from("cases").select("newspaper, author");
      const map = new Map<string, { articles: number; authors: Set<string> }>();
      staticNewspapers.forEach((n) => map.set(n, { articles: 0, authors: new Set() }));
      (data ?? []).forEach((row) => {
        const entry = map.get(row.newspaper) ?? { articles: 0, authors: new Set() };
        entry.articles += 1;
        if (row.author) entry.authors.add(row.author);
        map.set(row.newspaper, entry);
      });
      const result: MediaStat[] = Array.from(map.entries()).map(([newspaper, v]) => ({
        newspaper: newspaper as Newspaper,
        articles: v.articles,
        authors: v.authors.size,
      }));
      setStats(result);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader onNavigate={handleNavigate} currentPage="media" />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight border-b border-foreground/10 pb-4 mb-8">
          Medios que divulgan el antisemitismo
        </h2>

        {loading ? (
          <p className="label-mono">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((s) => (
              <article
                key={s.newspaper}
                className="border border-foreground/15 bg-background p-5 flex flex-col shadow-[0_2px_20px_-4px_hsl(var(--foreground)/0.08)]"
              >
                <p className="label-mono text-center text-muted-foreground tracking-[0.15em]">
                  Periódico
                </p>
                <div className="border border-foreground/20 mt-3 mb-5 py-8 px-4 flex items-center justify-center min-h-[110px]">
                  <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-center">
                    {s.newspaper}
                  </h3>
                </div>

                <div className="flex justify-around border-t border-foreground/10 pt-4 mb-5">
                  <div className="text-center">
                    <p className="font-display text-3xl sm:text-4xl font-black tabular">
                      {s.articles}
                    </p>
                    <p className="label-mono text-muted-foreground mt-1">Artículos analizados</p>
                  </div>
                  <div className="w-px bg-foreground/10" />
                  <div className="text-center">
                    <p className="font-display text-3xl sm:text-4xl font-black tabular">
                      {s.authors}
                    </p>
                    <p className="label-mono text-muted-foreground mt-1">Autores analizados</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/medios/${newspaperToSlug(s.newspaper)}`)}
                  className="mt-auto self-center inline-flex items-center gap-2 border border-foreground/30 px-4 py-2 label-mono hover:bg-foreground hover:text-background transition-colors"
                >
                  Ver medio <ArrowRight className="w-3 h-3" />
                </button>
              </article>
            ))}
          </div>
        )}
      </motion.section>

      <SiteFooter />
    </div>
  );
}
