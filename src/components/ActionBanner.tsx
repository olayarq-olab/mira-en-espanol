import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { entries, type Newspaper } from "@/data/entries";

interface ActionBannerProps {
  selectedAuthors: string[];
}

const newspaperEmails: Record<Newspaper, { email: string; director: string }> = {
  "ABC": { email: "director@abc.es", director: "el director de ABC" },
  "El País": { email: "elpais@prisa.com", director: "el director de El País" },
  "El Mundo": { email: "director@elmundo.es", director: "el director de El Mundo" },
  "La Vanguardia": { email: "redaccion@lavanguardia.es", director: "el director de La Vanguardia" },
  "Público": { email: "redaccion@publico.es", director: "el director de Público" },
  "elDiario.es": { email: "redaccion@eldiario.es", director: "el director de elDiario.es" },
  "La Razón": { email: "redaccion@larazon.es", director: "el director de La Razón" },
};

export default function ActionBanner({ selectedAuthors }: ActionBannerProps) {
  if (selectedAuthors.length === 0) return null;

  // Find newspapers associated with selected authors
  const authorNewspapers = new Map<string, Set<Newspaper>>();
  entries.forEach((e) => {
    if (selectedAuthors.includes(e.author)) {
      if (!authorNewspapers.has(e.author)) authorNewspapers.set(e.author, new Set());
      authorNewspapers.get(e.author)!.add(e.newspaper);
    }
  });

  const buildMailtoLink = (author: string, newspaper: Newspaper) => {
    const info = newspaperEmails[newspaper];
    const subject = encodeURIComponent(
      `Solicitud de revisión del contenido de ${author}`
    );
    const body = encodeURIComponent(
      `Estimado/a ${info.director},\n\nMe dirijo a usted para expresar mi preocupación por el contenido publicado por ${author} en ${newspaper}, que contiene tropos antisemitas y promueve el odio hacia la comunidad judía.\n\nLes solicito que revisen dicho contenido y tomen las medidas necesarias para evitar la difusión de discurso de odio en su medio.\n\nEl antisemitismo no tiene cabida en una sociedad democrática y los medios de comunicación tienen una responsabilidad fundamental en la prevención de la intolerancia.\n\nAtentamente.`
    );
    return `mailto:${info.email}?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-t-2 border-accent bg-accent/5 px-6 py-6"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight">
          EL ANTISEMITISMO SE COMBATE
        </h3>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          ¡Ayúdanos a construir una sociedad sin antisemitismo!
        </p>

        <div className="space-y-3 mt-4">
          {selectedAuthors.map((author) => {
            const nps = authorNewspapers.get(author);
            if (!nps) return null;
            return [...nps].map((newspaper) => (
              <a
                key={`${author}-${newspaper}`}
                href={buildMailtoLink(author, newspaper)}
                className="inline-flex items-center gap-2 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-4 py-2.5 text-xs font-mono-ui uppercase tracking-wide transition-colors duration-150 mx-1"
              >
                <Mail className="h-3.5 w-3.5" />
                Envía un email a {newspaperEmails[newspaper].director} pidiendo que {author} deje de publicar contenido antisemita
              </a>
            ));
          })}
        </div>

        <p className="text-[10px] text-muted-foreground/60 font-mono-ui uppercase mt-3">
          Se abrirá tu cliente de correo con un borrador preparado
        </p>
      </div>
    </motion.div>
  );
}
