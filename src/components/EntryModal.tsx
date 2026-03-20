import { motion, AnimatePresence } from "framer-motion";
import type { Entry } from "@/data/entries";

export default function EntryModal({
  entry,
  onClose,
}: {
  entry: Entry | null;
  onClose: () => void;
}) {
  if (!entry) return null;

  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AnimatePresence>
      {entry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 pt-[5vh] sm:pt-[10vh] px-3 sm:px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
            className="bg-background border border-foreground/20 w-full max-w-3xl max-h-[85vh] sm:max-h-[75vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-foreground/10 p-4 sm:p-8">
              <div className="flex items-baseline justify-between mb-3 sm:mb-4">
                <span className="label-mono text-[9px] sm:text-[10px]">{formattedDate}</span>
                <button
                  onClick={onClose}
                  className="label-mono hover:text-foreground transition-colors"
                >
                  Cerrar ✕
                </button>
              </div>
              <h2 className="font-display text-xl sm:text-3xl font-bold leading-tight mb-2">
                {entry.newspaper}
              </h2>
              <p className="font-display text-base sm:text-xl leading-snug text-foreground/80">
                {entry.title}
              </p>
            </div>

            {/* Metadata */}
            <div className="border-b border-foreground/10 p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <p className="label-mono mb-1">Autor</p>
                <p className="text-sm">{entry.author}</p>
              </div>
              <div>
                <p className="label-mono mb-1">Sección</p>
                <p className="text-sm">{entry.section}</p>
              </div>
              <div>
                <p className="label-mono mb-1">Tropo Identificado</p>
                <p className="text-sm">{entry.trope}</p>
              </div>
            </div>

            {/* Status */}
            {entry.flagged && (
              <div className="border-b border-foreground/10 px-4 sm:px-8 py-3 sm:py-4 flex items-center gap-3 bg-accent/5">
                <span className="inline-block w-2 h-2 bg-accent" />
                <span className="font-mono-ui text-[10px] sm:text-xs uppercase text-accent">
                  Entrada Marcada — Requiere Revisión Prioritaria
                </span>
              </div>
            )}

            {/* Fragment */}
            {entry.fragment && (
              <div className="border-b border-foreground/10 p-4 sm:p-8">
                <p className="label-mono mb-3">Fragmento Citado</p>
                <blockquote className="border-l-2 border-accent pl-4 italic text-sm sm:text-base leading-relaxed text-foreground/70">
                  «{entry.fragment}»
                </blockquote>
              </div>
            )}

            {/* Analysis */}
            <div className="p-4 sm:p-8">
              <p className="label-mono mb-3">Análisis</p>
              <p className="text-sm sm:text-base leading-relaxed">
                {entry.excerpt}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-foreground/10 px-4 sm:px-8 py-3 sm:py-4 flex flex-wrap gap-3 sm:gap-6">
              <button className="label-mono hover:text-foreground transition-colors">
                Link al artículo ↗
              </button>
              <button className="label-mono hover:text-foreground transition-colors">
                Exportar PDF
              </button>
              <button className="label-mono hover:text-foreground transition-colors">
                Compartir
              </button>
              <button className="label-mono hover:text-foreground transition-colors">
                Citar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
