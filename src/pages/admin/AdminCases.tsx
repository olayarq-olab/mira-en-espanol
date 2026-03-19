import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import CaseFormModal from "@/components/admin/CaseFormModal";
import { useToast } from "@/hooks/use-toast";

type Case = Tables<"cases">;

export default function AdminCases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterNewspaper, setFilterNewspaper] = useState("");
  const [filterTrope, setFilterTrope] = useState("");
  const [editing, setEditing] = useState<Case | null>(null);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    let query = supabase.from("cases").select("*").order("date", { ascending: false });
    if (filterNewspaper) query = query.eq("newspaper", filterNewspaper);
    if (filterTrope) query = query.eq("trope", filterTrope as any);
    const { data } = await query;
    setCases(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filterNewspaper, filterTrope]);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este caso?")) return;
    await supabase.from("cases").delete().eq("id", id);
    toast({ title: "Caso eliminado" });
    load();
  };

  const filtered = cases.filter((c) =>
    !search || c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.newspaper.toLowerCase().includes(search.toLowerCase()) ||
    (c.author?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  const newspapers = [...new Set(cases.map((c) => c.newspaper))].sort();
  const tropes = [
    "Doble Lealtad", "Deshumanización", "Conspiración", "Negación",
    "Falsa Equivalencia", "Demonización", "Estereotipo Económico",
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Casos Documentados</h1>
          <p className="text-muted-foreground text-sm">{filtered.length} casos</p>
        </div>
        <Button onClick={() => setCreating(true)}>
          <Plus className="w-4 h-4 mr-1" /> Nuevo Caso
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, medio o autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={filterNewspaper}
          onChange={(e) => setFilterNewspaper(e.target.value)}
          className="border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Todos los medios</option>
          {newspapers.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <select
          value={filterTrope}
          onChange={(e) => setFilterTrope(e.target.value)}
          className="border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Todos los tropos</option>
          {tropes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p className="label-mono py-8 text-center">Cargando...</p>
      ) : (
        <div className="border border-foreground/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-foreground/10 bg-muted/50">
                <th className="text-left p-3 label-mono">Fecha</th>
                <th className="text-left p-3 label-mono">Medio</th>
                <th className="text-left p-3 label-mono">Título</th>
                <th className="text-left p-3 label-mono">Tropo</th>
                <th className="text-left p-3 label-mono">Estado</th>
                <th className="p-3 label-mono w-24">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-foreground/5 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-mono-ui text-xs tabular">
                    {new Date(c.date).toLocaleDateString("es-ES")}
                  </td>
                  <td className="p-3 font-display font-bold">{c.newspaper}</td>
                  <td className="p-3 max-w-xs truncate">{c.title}</td>
                  <td className="p-3 label-mono text-[10px]">{c.trope}</td>
                  <td className="p-3">
                    {c.flagged && <span className="inline-block w-2 h-2 bg-accent" />}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => setEditing(c)} className="p-1 hover:text-foreground text-muted-foreground">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="p-1 hover:text-accent text-muted-foreground">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No hay casos. Crea el primero.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {(creating || editing) && (
        <CaseFormModal
          existingCase={editing}
          onClose={() => { setCreating(false); setEditing(null); }}
          onSaved={() => { setCreating(false); setEditing(null); load(); }}
        />
      )}
    </div>
  );
}
