import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import ArticleFormModal from "@/components/admin/ArticleFormModal";
import { useToast } from "@/hooks/use-toast";

type Article = Tables<"editorial_articles">;

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("editorial_articles")
      .select("*")
      .order("date", { ascending: false });
    setArticles(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este artículo?")) return;
    await supabase.from("editorial_articles").delete().eq("id", id);
    toast({ title: "Artículo eliminado" });
    load();
  };

  const togglePublish = async (article: Article) => {
    await supabase
      .from("editorial_articles")
      .update({ published: !article.published })
      .eq("id", article.id);
    toast({ title: article.published ? "Artículo despublicado" : "Artículo publicado" });
    load();
  };

  const filtered = articles.filter((a) =>
    !search || a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Artículos Editoriales</h1>
          <p className="text-muted-foreground text-sm">{filtered.length} artículos</p>
        </div>
        <Button onClick={() => setCreating(true)}>
          <Plus className="w-4 h-4 mr-1" /> Nuevo Artículo
        </Button>
      </div>

      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por título o autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <p className="label-mono py-8 text-center">Cargando...</p>
      ) : (
        <div className="border border-foreground/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-foreground/10 bg-muted/50">
                <th className="text-left p-3 label-mono">Fecha</th>
                <th className="text-left p-3 label-mono">Título</th>
                <th className="text-left p-3 label-mono">Autor</th>
                <th className="text-left p-3 label-mono">Estado</th>
                <th className="p-3 label-mono w-32">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-foreground/5 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-mono-ui text-xs tabular">
                    {new Date(a.date).toLocaleDateString("es-ES")}
                  </td>
                  <td className="p-3 max-w-xs truncate font-display font-bold">{a.title}</td>
                  <td className="p-3">{a.author}</td>
                  <td className="p-3">
                    <span className={`label-mono text-[10px] ${a.published ? "text-green-600" : "text-muted-foreground"}`}>
                      {a.published ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => togglePublish(a)}
                        className="p-1 hover:text-foreground text-muted-foreground"
                        title={a.published ? "Despublicar" : "Publicar"}
                      >
                        {a.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setEditing(a)} className="p-1 hover:text-foreground text-muted-foreground">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(a.id)} className="p-1 hover:text-accent text-muted-foreground">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No hay artículos. Crea el primero.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {(creating || editing) && (
        <ArticleFormModal
          existingArticle={editing}
          onClose={() => { setCreating(false); setEditing(null); }}
          onSaved={() => { setCreating(false); setEditing(null); load(); }}
        />
      )}
    </div>
  );
}
