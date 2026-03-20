import { motion, AnimatePresence } from "framer-motion";
import type { Cartoon } from "@/data/cartoonMeta";

export default function CartoonModal({
  cartoon,
  onClose,
}: {
  cartoon: Cartoon | null;
  onClose: () => void;
}) {
  if (!cartoon) return null;

  const formattedDate = new Date(cartoon.date).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AnimatePresence>
      {cartoon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 pt-[3vh] sm:pt-[5vh] px-3 sm:px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
            className="bg-background border border-foreground/20 w-full max-w-3xl max-h-[90vh] sm:max-h-[88vh] overflow-y-auto"
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
              <p className="label-mono mb-2">Viñeta editorial</p>
              <h2 className="font-display text-xl sm:text-3xl font-bold leading-tight">
                {cartoon.title}
              </h2>
            </div>

            {/* Image */}
            <div className="border-b border-foreground/10 bg-muted flex items-center justify-center p-3 sm:p-6">
              <img
                src={cartoon.imageUrl}
                alt={cartoon.title}
                className="max-w-full max-h-[40vh] sm:max-h-[50vh] object-contain"
              />
            </div>

            {/* Metadata */}
            <div className="border-b border-foreground/10 p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <p className="label-mono mb-1">Artista</p>
                <p className="text-sm">{cartoon.artist}</p>
              </div>
              <div>
                <p className="label-mono mb-1">Medio</p>
                <p className="text-sm">{cartoon.newspaper}</p>
              </div>
              <div>
                <p className="label-mono mb-1">Fecha de publicación</p>
                <p className="text-sm">{formattedDate}</p>
              </div>
            </div>

            {/* Analysis */}
            <div className="p-4 sm:p-8">
              <p className="label-mono mb-3">Análisis</p>
              <p className="text-sm sm:text-base leading-relaxed">
                {cartoon.description}
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
