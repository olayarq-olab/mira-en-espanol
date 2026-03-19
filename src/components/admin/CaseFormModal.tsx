import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";
import type { Database } from "@/integrations/supabase/types";
import ImageUpload from "./ImageUpload";

type Case = Tables<"cases">;
type TropeType = Database["public"]["Enums"]["trope_type"];

const TROPES: TropeType[] = [
  "Doble Lealtad", "Deshumanización", "Conspiración", "Negación",
  "Falsa Equivalencia", "Demonización", "Estereotipo Económico",
];

interface Props {
  existingCase: Case | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function CaseFormModal({ existingCase, onClose, onSaved }: Props) {
  const isEdit = !!existingCase;
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    newspaper: existingCase?.newspaper ?? "",
    author: existingCase?.author ?? "",
    date: existingCase?.date ?? new Date().toISOString().split("T")[0],
    title: existingCase?.title ?? "",
    excerpt: existingCase?.excerpt ?? "",
    analysis: existingCase?.analysis ?? "",
    trope: (existingCase?.trope ?? "Conspiración") as TropeType,
    source_url: existingCase?.source_url ?? "",
    fragment: existingCase?.fragment ?? "",
    section: existingCase?.section ?? "",
    flagged: existingCase?.flagged ?? false,
    image_url: existingCase?.image_url ?? "",
    image_caption: existingCase?.image_caption ?? "",
  });

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      newspaper: form.newspaper.trim(),
      author: form.author.trim() || null,
      date: form.date,
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      analysis: form.analysis.trim(),
      trope: form.trope,
      source_url: form.source_url.trim() || null,
      fragment: form.fragment.trim() || null,
      section: form.section.trim() || null,
      flagged: form.flagged,
      image_url: form.image_url || null,
      image_caption: form.image_caption.trim() || null,
    };

    let error;
    if (isEdit) {
      ({ error } = await supabase.from("cases").update(payload).eq("id", existingCase.id));
    } else {
      ({ error } = await supabase.from("cases").insert(payload));
    }

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: isEdit ? "Caso actualizado" : "Caso creado" });
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
            {isEdit ? "Editar Caso" : "Nuevo Caso"}
          </h2>
          <button onClick={onClose} className="label-mono hover:text-foreground">Cerrar ✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="label-mono">Medio *</Label>
              <Input value={form.newspaper} onChange={(e) => set("newspaper", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label className="label-mono">Autor</Label>
              <Input value={form.author} onChange={(e) => set("author", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="label-mono">Fecha *</Label>
              <Input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label className="label-mono">Sección</Label>
              <Input value={form.section} onChange={(e) => set("section", e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="label-mono">Título del artículo *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label className="label-mono">Tropo *</Label>
            <select
              value={form.trope}
              onChange={(e) => set("trope", e.target.value)}
              className="w-full border border-input bg-background px-3 py-2 text-sm"
              required
            >
              {TROPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <Label className="label-mono">Fragmento citado</Label>
            <Textarea value={form.fragment} onChange={(e) => set("fragment", e.target.value)} rows={3} />
          </div>

          <div className="space-y-2">
            <Label className="label-mono">Extracto / Resumen *</Label>
            <Textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3} required />
          </div>

          <div className="space-y-2">
            <Label className="label-mono">Análisis completo *</Label>
            <Textarea value={form.analysis} onChange={(e) => set("analysis", e.target.value)} rows={6} required />
          </div>

          <div className="space-y-2">
            <Label className="label-mono">URL del artículo original</Label>
            <Input type="url" value={form.source_url} onChange={(e) => set("source_url", e.target.value)} />
          </div>

          {/* Image upload */}
          <div className="space-y-2">
            <Label className="label-mono">Imagen o viñeta</Label>
            <ImageUpload
              currentUrl={form.image_url}
              onUploaded={(url) => set("image_url", url)}
              folder="cases"
            />
          </div>

          <div className="space-y-2">
            <Label className="label-mono">Pie de imagen</Label>
            <Input value={form.image_caption} onChange={(e) => set("image_caption", e.target.value)} />
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.flagged} onCheckedChange={(v) => set("flagged", v)} />
            <Label className="label-mono cursor-pointer">Marcar como prioritario</Label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-foreground/10">
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? "Guardando..." : isEdit ? "Guardar Cambios" : "Crear Caso"}
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
