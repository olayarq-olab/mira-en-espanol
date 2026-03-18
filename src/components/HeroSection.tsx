import { motion } from "framer-motion";
import { entries, newspapers } from "@/data/entries";
import { useMemo } from "react";

const counter = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
};

export default function HeroSection({ onEnter }: {onEnter: () => void;}) {
  const stats = useMemo(() => {
    const uniqueAuthors = new Set(entries.map((e) => e.author));
    const uniqueNewspapers = new Set(entries.map((e) => e.newspaper));
    return {
      articles: entries.length,
      media: uniqueNewspapers.size,
      authors: uniqueAuthors.size
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 md:py-8 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          
          <span className="label-mono">Archivo independiente · España</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display md:text-6xl font-bold tracking-tight mt-6 leading-[1.1] text-5xl">
          
          Observatorio de Sesgo Antisemita en Medios Españoles
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-muted-foreground mt-8 max-w-2xl leading-relaxed md:text-lg">
          
          Documentamos, clasificamos y analizamos instancias de sesgo antisemita
          en la prensa española. Cada entrada es revisada por un equipo de
          analistas independientes con metodología transparente y replicable.
        </motion.p>

        {/* Counters */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-8 md:gap-16 mt-16 border-t border-b border-foreground/10 py-8 w-full max-w-xl">
          
          {[
          { value: stats.media, label: "Medios analizados" },
          { value: stats.articles, label: "Artículos detectados" },
          { value: stats.authors, label: "Autores identificados" }].
          map((stat) =>
          <motion.div key={stat.label} variants={counter} className="flex flex-col items-center">
              <span className="font-display text-4xl md:text-5xl font-bold">{stat.value}</span>
              <span className="label-mono mt-2 text-center">{stat.label}</span>
            </motion.div>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onEnter}
          className="mt-12 border border-foreground/20 px-8 py-3 font-mono-ui text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-200">
          
          Explorar el archivo →
        </motion.button>
      </div>
    </div>);

}