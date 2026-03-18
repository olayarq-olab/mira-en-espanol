import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function About() {
  const navigate = useNavigate();

  const handleNavigate = (page: "home" | "archive" | "stats" | "about" | "contact") => {
    if (page === "home" || page === "archive") navigate("/");
    if (page === "stats") navigate("/stats");
    if (page === "about") navigate("/about");
    if (page === "contact") navigate("/contact");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader onNavigate={handleNavigate} currentPage="about" />

      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 max-w-3xl mx-auto px-6 py-12 space-y-6"
      >
        <h2 className="font-display text-2xl font-bold tracking-tight border-b border-foreground/10 pb-4">
          Sobre nosotros
        </h2>

        <div className="space-y-5 text-sm leading-relaxed text-foreground/85">
          <p>
            La <strong>Asociación Española Contra el Antisemitismo</strong> es una organización independiente de la sociedad civil cuyo objetivo es hacer frente al antisemitismo en el espacio público de nuestro país.
          </p>
          <p>
            La prioridad de la Asociación es visibilizar y combatir el antisemitismo presente en los medios de comunicación españoles. Nuestra iniciativa surge tras constatar cómo, en España, periódicos de referencia, cadenas de televisión y emisoras de radio permiten de manera recurrente la difusión de contenidos claramente antisemitas.
          </p>
          <p>
            Hemos observado con preocupación que, ante la publicación y difusión de mensajes antisemitas, los medios españoles —ya sea por desconocimiento de lo que constituye antisemitismo, por falta de voluntad o incluso por la intención deliberada de dar cabida a dichas narrativas— no aplican los controles editoriales que sí ejercen frente a otros mensajes de odio.
          </p>
          <p>
            Esta tendencia se ha intensificado de forma alarmante desde el 7 de octubre de 2023, pero no es un fenómeno nuevo. Con anterioridad, en España ya se publicaban contenidos de carácter antisemita que difícilmente superarían los estándares editoriales de publicaciones homólogas en democracias liberales como, por ejemplo, Reino Unido, Francia, Alemania o Estados Unidos, etc. y que, de publicarse por error, son retirados de inmediato junto con la correspondiente rectificación.
          </p>
          <p>
            Consideramos que, en una sociedad avanzada, la publicación de odio antisemita debe quedar fuera de los estándares editoriales que rigen en cualquier medio de un país democrático. Esto es particularmente acuciante en el momento histórico actual, dado que, desde el ataque terrorista perpetrado por Hamás el 7 de octubre de 2023 y la posterior guerra en Gaza, se ha desatado un aumento dramático del antisemitismo a nivel internacional. Los datos en España son especialmente alarmantes: <strong>en 2024 hubo un aumento del 321% en los discursos, incidentes y ataques antisemitas con respecto a 2023 y del 567% con respecto a 2022</strong> (Informe anual sobre el antisemitismo en España, 2024).
          </p>
          <p>
            En este contexto, los medios de comunicación desempeñan un papel clave en la configuración de esta nueva ola de antisemitismo y deben hacerse plenamente responsables de los contenidos que deciden difundir.
          </p>
          <p>
            La Asociación Española Contra el Antisemitismo reclama a los medios de comunicación que actúen con responsabilidad y no agraven el clima de hostilidad que están sufriendo los judíos españoles. En este sentido, la Asociación monitorizará, documentará y denunciará los casos de antisemitismo en el ámbito mediático con el objetivo de que cese en España la difusión impune de contenidos antisemitas y de que nuestro país se equipare a otras democracias de nuestro entorno en esta materia.
          </p>
          <p>
            En su propósito de señalar el antisemitismo imperante en el espacio mediático, y entre otras actuaciones, la Asociación establecerá un archivo de artículos y manifestaciones antisemitas con base en la definición de antisemitismo establecida por la <strong>IHRA</strong> (Alianza Internacional para el Recuerdo del Holocausto), ratificada por España, así como por otras 34 naciones.
          </p>
        </div>
      </motion.article>

      <SiteFooter />
    </div>
  );
}
