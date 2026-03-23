import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleNavigate = (page: "home" | "archive" | "stats" | "about" | "contact" | "antisemitism") => {
    if (page === "home") navigate("/");
    else if (page === "archive") navigate("/?view=archive");
    else if (page === "stats") navigate("/stats");
    else if (page === "about") navigate("/about");
    else if (page === "contact") navigate("/contact");
    else if (page === "antisemitism") navigate("/antisemitismo");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:contacto@contraelantisemitismo.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader onNavigate={handleNavigate} currentPage="contact" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 max-w-3xl mx-auto w-full px-6 py-12"
      >
        <h2 className="font-display text-2xl font-bold tracking-tight border-b border-foreground/10 pb-4 mb-8">
          Contacto
        </h2>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="label-mono mb-2">Email</p>
              <a
                href="mailto:contacto@asociacioncontraelantisemitismo.es"
                className="text-sm flex items-center gap-2 text-accent hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                contacto@asociacioncontraelantisemitismo.es
              </a>
            </div>

            <div>
              <p className="label-mono mb-2">Organización</p>
              <p className="text-sm text-foreground/85">
                Asociación Española Contra el Antisemitismo
              </p>
            </div>

            <div>
              <p className="label-mono mb-2">Propósito</p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Para reportar artículos, proponer colaboraciones o cualquier consulta relacionada con nuestro trabajo.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div>
              <label className="label-mono block mb-1.5">Nombre</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border border-foreground/15 bg-background px-3 py-2 text-sm font-mono-ui focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-shadow"
              />
            </div>

            <div>
              <label className="label-mono block mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full border border-foreground/15 bg-background px-3 py-2 text-sm font-mono-ui focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-shadow"
              />
            </div>

            <div>
              <label className="label-mono block mb-1.5">Asunto</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                className="w-full border border-foreground/15 bg-background px-3 py-2 text-sm font-mono-ui focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-shadow"
              />
            </div>

            <div>
              <label className="label-mono block mb-1.5">Mensaje</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full border border-foreground/15 bg-background px-3 py-2 text-sm font-mono-ui focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-shadow resize-y"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs font-mono-ui uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <Send className="h-3.5 w-3.5" />
              Enviar mensaje
            </button>
          </form>
        </div>
      </motion.div>

      <SiteFooter />
    </div>
  );
}
