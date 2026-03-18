import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import type { TropeType } from "@/data/entries";
import { tropeMeta } from "@/data/tropeMeta";

interface TropeCardProps {
  trope: TropeType;
}

export default function TropeCard({ trope }: TropeCardProps) {
  const meta = tropeMeta[trope];
  if (!meta) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border-b-2 border-foreground/20 bg-muted/50 px-6 py-4"
    >
      <div className="border border-foreground/15 bg-background px-6 py-5 shadow-[0_2px_20px_-4px_hsl(var(--foreground)/0.08)]">
        {/* Section label */}
        <p className="label-mono mb-3 tracking-[0.15em]">Ficha del Tropo</p>

        {/* Header */}
        <h2 className="font-display text-xl md:text-2xl font-black tracking-tight mb-1 flex items-center gap-2">
          <span className="text-accent">■</span>
          {meta.name}
        </h2>

        <hr className="border-foreground/15 my-5 max-w-[120px]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <BookOpen className="h-3 w-3" />
              <span className="font-mono-ui text-[10px] uppercase tracking-wider">Definición</span>
            </div>
            <p className="text-xs leading-relaxed text-foreground/80">{meta.definition}</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Search className="h-3 w-3" />
              <span className="font-mono-ui text-[10px] uppercase tracking-wider">Metodología de detección</span>
            </div>
            <p className="text-xs leading-relaxed text-foreground/80">{meta.methodology}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
