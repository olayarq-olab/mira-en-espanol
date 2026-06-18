import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { entries } from "@/data/entries";
import { newspaperToSlug } from "@/lib/newspaperSlug";
import { useMemo } from "react";

import elpaisLogo from "@/assets/logos/elpais.png.asset.json";
import theobjectiveLogo from "@/assets/logos/theobjective.png.asset.json";
import abcLogo from "@/assets/logos/abc.png.asset.json";
import elmundoLogo from "@/assets/logos/elmundo.png.asset.json";

const mediaLogos = [
  { name: "elDiario.es", logo: "/logos/eldiario-clean.png" },
  { name: "El País", logo: elpaisLogo.url },
  { name: "The Objective", logo: theobjectiveLogo.url },
  { name: "ABC", logo: abcLogo.url },
  { name: "El Mundo", logo: elmundoLogo.url },
];

const counter = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
};

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
  const stats = useMemo(() => {
    const uniqueAuthors = new Set(entries.map((e) => e.author));
    const uniqueNewspapers = new Set(entries.map((e) => e.newspaper));
    return {
      articles: entries.length,
      media: uniqueNewspapers.size,
      authors: uniqueAuthors.size,
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-4 md:py-8 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 } and
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="label-mono">Archivo independiente · España</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mt-6 leading-[1.1]"
        >
          España Libre de Antisemitismo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-muted-foreground mt-6 sm:mt-8 max-w-2xl leading-relaxed"
        >
          Documentamos, clasificamos y analizamos instancias de sesgo antisemita
          en la prensa española. Cada entrada es revisada por un equipo de
          analistas independientes con metodología transparente y replicable.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-16 mt-4 border-t border-b border-foreground/putting the old content back and trying a different approach