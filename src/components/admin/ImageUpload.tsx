import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X } from "lucide-react";

interface Props {
  currentUrl: string;
  onUploaded: (url: string) => void;
  folder: string;
}

export default function ImageUpload({ currentUrl, onUploaded, folder }: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      console.error("Upload error:", error);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    setPreview(publicUrl);
    onUploaded(publicUrl);
    setUploading(false);
  };

  const handleClear = () => {
    setPreview("");
    onUploaded("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {preview ? (
        <div className="relative border border-foreground/10 p-2 inline-block">
          <img src={preview} alt="Preview" className="max-h-40 object-contain" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-2 -right-2 bg-background border border-foreground/20 rounded-full p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <label className="border border-dashed border-foreground/20 p-8 flex flex-col items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
          <Upload className="w-5 h-5 text-muted-foreground" />
          <span className="label-mono">
            {uploading ? "Subiendo..." : "Haz clic para subir imagen"}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
