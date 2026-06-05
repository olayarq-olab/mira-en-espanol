import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import { newspapers as staticNewspapers } from "@/data/entries";
import type { Newspaper } from "@/data/entries";
import { newspaperMeta } from "@/data/newspaperMeta";
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
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight border-b border-foreground/10 pb-4 mb-8 sm:mb-10">
          Medios que divulgan el antisemitismo
        </h2>

        {loading ? (
          <p className="label-mono">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((s, i) => {
              const meta = newspaperMeta[s.newspaper];
              return (
                <Link
                  key={s.newspaper}
                  to={`/medios/${newspaperToSlug(s.newspaper)}`}
                  className="group relative flex flex-col border border-foreground/15 bg-background p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:border-foreground/40 hover:shadow-[0_8px_30px_-8px_hsl(var(--foreground)/0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`Ver ficha de ${s.newspaper}`}
                >
                  <div className="flex-1 flex flex-col">
                    <div className="mb-6 sm:mb-8">
                      <h3 className="font-display text-2xl sm:text-[1.75rem] font-black tracking-tight leading-tight">
                        {s.newspaper}
                      </h3>
                    </div>

                    {meta && (
                      <div className="mb-6 sm:mb-8 space-y-3">
                        <div>
                          <p className="label-mono text-muted-foreground">Empresa matriz</p>
                          <p className="font-display text-sm sm:text-base font-semibold mt-0.5">
                            {meta.empresaMatriz}
                          </p>
                        </div>
                        <div>
                          <p className="label-mono text-muted-foreground">Accionista mayoritario</p>
                          <p className="font-display text-sm sm:text-base font-semibold mt-0.5">
                            {meta.accionistaMayoritario}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-5 border-t border-foreground/10 flex items-baseline gap-4 sm:gap-6">
                      <div>
                        <span className="font-display text-xl sm:text-2xl font-black tabular">
                          {s.articles}
                        </span>
                        <span className="label-mono text-muted-foreground ml-1.5">
                          artículos
                        </span>
                      </div>
                      <div>
                        <span className="font-display text-xl sm:text-2xl font-black tabular">
                          {s.authors}
                        </span>
                        <span className="label-mono text-muted-foreground ml-1.5">
                          autores
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </motion.section>

      <SiteFooter />
    </div>
  );
}
