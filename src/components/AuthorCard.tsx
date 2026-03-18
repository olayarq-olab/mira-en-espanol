import { useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Newspaper } from "lucide-react";
import { entries } from "@/data/entries";

interface AuthorCardProps {
  author: string;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const stats = useMemo(() => {
    const authorEntries = entries.filter((e) => e.author === author);
    const newspapers = [...new Set(authorEntries.map((e) => e.newspaper))];
    return { count: authorEntries.length, newspapers };
  }, [author]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border-b-2 border-foreground/20 bg-muted/50 px-6 py-4"
    >
      <div className="border border-foreground/15 bg-background px-6 py-5 shadow-[0_2px_20px_-4px_hsl(var(--foreground)/0.08)]">
        <p className="label-mono mb-3 tracking-[0.15em]">Ficha del Autor</p>

        <h2 className="font-display text-xl md:text-2xl font-black tracking-tight mb-1">
          {author}
        </h2>

        <hr className="border-foreground/15 my-5 max-w-[120px]" />

        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="label-mono text-muted-foreground">Artículos detectados</span>
            </div>
            <p className="font-display text-sm font-bold">{stats.count}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Newspaper className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="label-mono text-muted-foreground">Medio(s)</span>
            </div>
            <p className="font-display text-sm font-bold">{stats.newspapers.join(", ")}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
