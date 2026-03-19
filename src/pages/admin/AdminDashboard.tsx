import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Newspaper, FileText, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ cases: 0, flagged: 0, articles: 0 });

  useEffect(() => {
    const load = async () => {
      const [casesRes, flaggedRes, articlesRes] = await Promise.all([
        supabase.from("cases").select("id", { count: "exact", head: true }),
        supabase.from("cases").select("id", { count: "exact", head: true }).eq("flagged", true),
        supabase.from("editorial_articles").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        cases: casesRes.count ?? 0,
        flagged: flaggedRes.count ?? 0,
        articles: articlesRes.count ?? 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Casos Documentados", value: stats.cases, icon: Newspaper, path: "/admin/cases" },
    { label: "Casos Marcados", value: stats.flagged, icon: AlertTriangle, path: "/admin/cases" },
    { label: "Artículos Editoriales", value: stats.articles, icon: FileText, path: "/admin/articles" },
  ];

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold mb-2">Panel de Control</h1>
      <p className="text-muted-foreground mb-8">Gestiona el contenido del Observatorio de Sesgo</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <button
            key={card.label}
            onClick={() => navigate(card.path)}
            className="border border-foreground/10 p-6 text-left hover:bg-muted transition-colors"
          >
            <card.icon className="w-5 h-5 text-muted-foreground mb-3" />
            <p className="font-display text-3xl font-bold">{card.value}</p>
            <p className="label-mono mt-1">{card.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
