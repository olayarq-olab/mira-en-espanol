import { motion } from "framer-motion";
import type { Entry } from "@/data/entries";

const listItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.16, 1, 0.3, 1] as [number, number, number, number], duration: 0.4 },
  },
};

export default function EntryRow({
  entry,
  onClick,
}: {
  entry: Entry;
  onClick: (entry: Entry) => void;
}) {
  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      variants={listItem}
      className="ledger-row group flex-col sm:flex-row gap-2 sm:gap-8"
      onClick={() => onClick(entry)}
    >
      {/* Mobile: date + newspaper inline */}
      <div className="flex items-baseline gap-3 sm:contents">
        <div className="shrink-0 sm:w-24">
          <span className="font-mono-ui text-xs tabular text-muted-foreground">
            {formattedDate}
          </span>
        </div>
        <div className="shrink-0 sm:w-36">
          <span className="font-display text-sm sm:text-base font-bold">{entry.newspaper}</span>
        </div>
      </div>

      {/* Title + Excerpt */}
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm sm:text-base font-bold leading-snug line-clamp-2 sm:truncate">
          {entry.title}
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-1">
          {entry.excerpt}
        </p>
      </div>

      {/* Meta */}
      <div className="shrink-0 flex items-center gap-3 sm:gap-4">
        <span className="label-mono text-[9px] sm:text-[10px]">{entry.trope}</span>
        {entry.flagged && (
          <span className="inline-block w-2 h-2 bg-accent" title="Flagged" />
        )}
      </div>
    </motion.div>
  );
}
