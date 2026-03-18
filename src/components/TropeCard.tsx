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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-foreground/10 bg-muted/30"
    >
      <div className="px-6 py-5 max-w-4xl space-y-4">
        <h3 className="font-display text-sm font-bold tracking-tight uppercase flex items-center gap-2">
          <span className="text-accent">■</span>
          {meta.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
