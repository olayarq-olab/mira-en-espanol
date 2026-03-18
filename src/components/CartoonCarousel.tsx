import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cartoons, type Cartoon } from "@/data/cartoonMeta";
import type { Newspaper } from "@/data/entries";
import CartoonModal from "@/components/CartoonModal";

interface CartoonCarouselProps {
  newspaper?: Newspaper;
}

export default function CartoonCarousel({ newspaper }: CartoonCarouselProps) {
  const items = useMemo(
    () => newspaper ? cartoons.filter((c) => c.newspaper === newspaper) : cartoons,
    [newspaper]
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCartoon, setSelectedCartoon] = useState<Cartoon | null>(null);

  if (items.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-t border-foreground/10 px-6 py-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight">
              Viñetas y caricaturas
            </h2>
            <p className="label-mono mt-1">
            Ilustraciones editoriales{newspaper ? ` publicadas en ${newspaper}` : " en medios españoles"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="border border-foreground/20 p-2 hover:bg-foreground hover:text-background transition-colors duration-150"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="border border-foreground/20 p-2 hover:bg-foreground hover:text-background transition-colors duration-150"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((cartoon) => (
            <div
              key={cartoon.id}
              className="snap-start shrink-0 w-72 border border-foreground/10 group cursor-pointer hover:border-foreground/30 transition-colors"
              onClick={() => setSelectedCartoon(cartoon)}
            >
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={cartoon.imageUrl}
                  alt={cartoon.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-sm font-semibold leading-snug">
                  {cartoon.title}
                </p>
                <p className="label-mono mt-1">{cartoon.artist}</p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                  {cartoon.description}
                </p>
                <p className="label-mono mt-3 tabular text-muted-foreground">
                  {new Date(cartoon.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <CartoonModal cartoon={selectedCartoon} onClose={() => setSelectedCartoon(null)} />
    </>
  );
}
