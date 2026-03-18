import { motion } from "framer-motion";
import { Building2, Users, Mail, Phone } from "lucide-react";
import type { Newspaper } from "@/data/entries";
import { newspaperMeta } from "@/data/newspaperMeta";

interface NewspaperCardProps {
  newspaper: Newspaper;
}

export default function NewspaperCard({ newspaper }: NewspaperCardProps) {
  const meta = newspaperMeta[newspaper];
  if (!meta) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border-b-2 border-foreground/20 bg-muted/50 px-6 py-4"
    >
      <div className="border border-foreground/15 bg-background px-6 py-4 shadow-[0_2px_20px_-4px_hsl(var(--foreground)/0.08)]">
        {/* Section label */}
        <p className="label-mono text-center mb-4 tracking-[0.15em]">Ficha del Medio</p>

        {/* Header */}
        <h2 className="font-display text-2xl md:text-3xl font-black tracking-tight text-center mb-1">
          {newspaper}
        </h2>

        <hr className="border-foreground/15 my-5 max-w-[120px] mx-auto" />

        {/* Staff grid */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-6">
          {meta.staff.map((s) => (
            <div key={s.role} className="text-center">
              <p className="label-mono text-muted-foreground">{s.role}</p>
              <p className="font-display text-sm font-bold mt-0.5">{s.name}</p>
            </div>
          ))}
        </div>

        <hr className="border-foreground/10 mb-6 max-w-xs mx-auto" />

        {/* Corporate info */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="label-mono text-muted-foreground">Empresa Matriz</span>
            </div>
            <p className="font-display text-sm font-bold">{meta.empresaMatriz}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="label-mono text-muted-foreground">Accionista Mayoritario</span>
            </div>
            <p className="font-display text-sm font-bold">{meta.accionistaMayoritario}</p>
          </div>
        </div>

        {/* Contact info */}
        {meta.corporateContact && (
          <div className="mt-5 text-center space-y-1">
            <p className="label-mono text-muted-foreground">Corporate Affairs</p>
            <div className="flex items-center justify-center gap-4 text-xs font-mono-ui">
              {meta.corporateContact.email && (
                <a
                  href={`mailto:${meta.corporateContact.email}`}
                  className="flex items-center gap-1 text-accent hover:underline"
                >
                  <Mail className="h-3 w-3" />
                  {meta.corporateContact.email}
                </a>
              )}
              {meta.corporateContact.phone && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  {meta.corporateContact.phone}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
