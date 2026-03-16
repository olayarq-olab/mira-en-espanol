import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { entries, newspapers, tropeTypes } from "@/data/entries";
import SiteHeader from "@/components/SiteHeader";

const COLORS = [
  "hsl(0, 72%, 45%)",
  "hsl(0, 0%, 25%)",
  "hsl(0, 0%, 45%)",
  "hsl(0, 0%, 60%)",
  "hsl(0, 40%, 55%)",
  "hsl(0, 0%, 35%)",
  "hsl(0, 0%, 75%)",
];

export default function Stats() {
  const navigate = useNavigate();

  const byNewspaper = useMemo(
    () =>
      newspapers
        .map((n) => ({
          name: n,
          count: entries.filter((e) => e.newspaper === n).length,
          flagged: entries.filter((e) => e.newspaper === n && e.flagged).length,
        }))
        .filter((d) => d.count > 0)
        .sort((a, b) => b.count - a.count),
    []
  );

  const byTrope = useMemo(
    () =>
      tropeTypes
        .map((t) => ({
          name: t,
          count: entries.filter((e) => e.trope === t).length,
        }))
        .filter((d) => d.count > 0)
        .sort((a, b) => b.count - a.count),
    []
  );

  const byAuthor = useMemo(() => {
    const map: Record<string, number> = {};
    entries.forEach((e) => (map[e.author] = (map[e.author] || 0) + 1));
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, []);

  const flaggedRate = useMemo(() => {
    const flagged = entries.filter((e) => e.flagged).length;
    return Math.round((flagged / entries.length) * 100);
  }, []);

  const uniqueAuthors = useMemo(
    () => new Set(entries.map((e) => e.author)).size,
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader onNavigate={(page) => page === "home" ? navigate("/") : null} currentPage="stats" />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-8 md:py-12 border-b border-foreground/10 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="label-mono">Análisis cuantitativo</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Estadísticas del Archivo
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm">
              Distribución y análisis cuantitativo de las entradas documentadas en el
              Observatorio de Sesgo Antisemita en Medios Españoles.
            </p>
          </motion.div>
        </div>

        {/* Summary cards */}
        <div className="max-w-5xl mx-auto w-full px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total artículos", value: entries.length },
            { label: "Medios analizados", value: newspapers.filter((n) => entries.some((e) => e.newspaper === n)).length },
            { label: "Autores identificados", value: uniqueAuthors },
            { label: "Tasa de gravedad", value: `${flaggedRate}%` },
          ].map((s) => (
            <div
              key={s.label}
              className="border border-foreground/10 p-4"
            >
              <span className="font-display text-3xl font-bold">{s.value}</span>
              <p className="label-mono mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="max-w-5xl mx-auto w-full px-6 pb-12 space-y-12">
          {/* By newspaper */}
          <section>
            <h2 className="font-display text-xl font-bold mb-1">
              Entradas por Medio
            </h2>
            <p className="label-mono mb-6">
              Distribución de artículos documentados por cabecera
            </p>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={byNewspaper}
                  layout="vertical"
                  margin={{ left: 100, right: 20, top: 0, bottom: 0 }}
                >
                  <XAxis type="number" tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }}
                    width={95}
                  />
                  <Tooltip
                    contentStyle={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      border: "1px solid hsl(0,0%,15%)",
                      background: "hsl(0,0%,98%)",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(0, 0%, 15%)" name="Total" />
                  <Bar dataKey="flagged" fill="hsl(0, 72%, 45%)" name="Grave" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* By trope */}
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-xl font-bold mb-1">
                Tipos de Tropo
              </h2>
              <p className="label-mono mb-6">Clasificación por tipología</p>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={byTrope}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      strokeWidth={1}
                      stroke="hsl(0,0%,98%)"
                    >
                      {byTrope.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        border: "1px solid hsl(0,0%,15%)",
                        background: "hsl(0,0%,98%)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold mb-1">Leyenda</h2>
              <p className="label-mono mb-6">Categorías identificadas</p>
              <div className="space-y-2">
                {byTrope.map((t, i) => (
                  <div key={t.name} className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 flex-shrink-0"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-sm flex-1">{t.name}</span>
                    <span className="font-mono-ui text-xs tabular text-muted-foreground">
                      {t.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* By author */}
          <section>
            <h2 className="font-display text-xl font-bold mb-1">
              Autores más frecuentes
            </h2>
            <p className="label-mono mb-6">
              Top autores con mayor número de entradas documentadas
            </p>
            <div className="space-y-1">
              {byAuthor.map((a, i) => (
                <div
                  key={a.name}
                  className="flex items-center gap-4 py-2 border-b border-foreground/5"
                >
                  <span className="font-mono-ui text-xs text-muted-foreground w-6 tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm flex-1">{a.name}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 bg-primary"
                      style={{ width: `${(a.count / byAuthor[0].count) * 120}px` }}
                    />
                    <span className="font-mono-ui text-xs tabular w-6 text-right">
                      {a.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
