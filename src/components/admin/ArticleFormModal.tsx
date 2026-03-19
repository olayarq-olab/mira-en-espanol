import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";
import ImageUpload from "./ImageUpload";

type Article = Tables<"editorial_articles">;

interface Props {
  existingArticle: Article | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ArticleFormModal({ existingArticle, onClose, onSaved }: Props) {
  const isEdit = !!existingArticle;
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: existingArticle?.title ?? "",
    author: existingArticle?.author ?? "",
    date: existingArticle?.date ?? new Date().toISOString().split("T")[0],
    content: existingArticle?.content ?? "",
    cover_image_url: existingArticle?.cover_image_url ?? "",
    published: existingArticle?.published ?? false,
  });

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      date: form.date,
      content: form.content.trim(),
      cover_image_url: form.cover_image_url || null,
      published: form.published,
    };

    let error;
    if (isEdit) {
      ({ error } = await supabase.from("editorial_articles").update(payload).eq("id", existingArticle.id));
    } else {
      ({ error } = await supabase.from("editorial_articles").insert(payload));
    }

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: isEdit ? "Artículo actualizado" : "Artículo creado" });
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 pt-[5vh] px-4" onClick={onClose}>
      <div
        className="bg-background border border-foreground/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-foreground/10 p-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">
            {isEdit ? "Editar Artículo" : "Nuevo Artículo Editorial"}
          </h2>
          <button onClick={onClose} className="label-mono hover:text-foreground">Cerrar ✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="label-mono">Título *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="label-mono">Autor *</Label>
              <Input value={form.author} onChange={(e) => set("author", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label className="label-mono">Fecha *</Label>
              <Input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="label-mono">Contenido *</Label>
            <Textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={10} required />
          </div>

          <div className="space-y-2">
            <Label className="label-mono">Imagen de portada</Label>
            <ImageUpload
              currentUrl={form.cover_image_url}
              onUploaded={(url) => set("cover_image_url", url)}
              folder="articles"
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={(v) => set("published", v)} />
            <Label className="label-mono cursor-pointer">Publicar inmediatamente</Label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-foreground/10">
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? "Guardando..." : isEdit ? "Guardar Cambios" : "Crear Artículo"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
