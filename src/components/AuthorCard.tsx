import { useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Newspaper } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { entries } from "@/data/entries";
import { authorAvatars } from "@/data/authorAvatars";

interface AuthorCardProps {
  author: string;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const stats = useMemo(() => {
    const authorEntries = entries.filter((e) => e.author === author);
    const newspapers = [...new Set(authorEntries.map((e) => e.newspaper))];
    return { count: authorEntries.length, newspapers };
  }, [author]);

  const avatarSrc = authorAvatars[author];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border-b-2 border-foreground/20 bg-muted/50 px-6 py-4"
    >
      <div className="border border-foreground/15 bg-background px-6 py-5 shadow-[0_2px_20px_-4px_hsl(var(--foreground)/0.08)]">
        <p className="label-mono mb-3 tracking-[0.15em]">Ficha del Autor</p>

        <div className="flex items-center gap-4 mb-1">
          <Avatar className="h-12 w-12 border border-foreground/10">
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt={author} className="object-cover" />
            ) : null}
            <AvatarFallback className="font-display font-bold text-sm bg-muted text-foreground">
              {author.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-display text-xl md:text-2xl font-black tracking-tight">
            {author}
          </h2>
        </div>

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
