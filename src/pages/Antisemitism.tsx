import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export default function Antisemitism() {
  const navigate = useNavigate();

  const handleNavigate = (page: "home" | "archive" | "stats" | "about" | "contact" | "antisemitism" | "media") => {
    if (page === "home") navigate("/");
    else if (page === "archive") navigate("/?view=archive");
    else if (page === "stats") navigate("/stats");
    else if (page === "about") navigate("/about");
    else if (page === "contact") navigate("/contact");
    else if (page === "antisemitism") navigate("/antisemitismo");
    else if (page === "media") navigate("/medios");
  };

  const categorias: { title: string; body: string }[] = [
    {
      title: "La negación y banalización del Holocausto",
      body:
        "Negar el hecho, el ámbito, los mecanismos —como las cámaras de gas— o la intencionalidad del genocidio del pueblo judío perpetrado por la Alemania nacionalsocialista y sus cómplices durante la Segunda Guerra Mundial, así como minimizar su magnitud, presentarlo como una exageración o instrumentalizarlo políticamente. Se incluye también la acusación de que los judíos o el Estado de Israel habrían inventado o magnificado el Holocausto con fines propios.",
    },
    {
      title: "La imagen del judío sanguinario",
      body:
        "Reedición contemporánea de la antigua calumnia de sangre (blood libel), que atribuía a los judíos asesinatos rituales de niños cristianos para emplear su sangre en ceremonias religiosas. Hoy reaparece en marcos narrativos que presentan a Israel o a los judíos como agentes que se complacen en matar civiles —especialmente niños— sin necesidad militar ni contexto, reproduciendo el imaginario medieval bajo apariencia de información actual.",
    },
    {
      title: "La equiparación de Israel con los nazis",
      body:
        "Comparación directa o sugerida entre la política del Estado de Israel y el régimen nacionalsocialista alemán: uso de términos como «nazis», «gestapo», «campos de concentración», «solución final» o «Holocausto» referidos al ejército o al gobierno israelí. Esta equiparación banaliza el genocidio nazi, invierte la condición histórica de las víctimas y constituye, según la definición operativa de la IHRA, una manifestación de antisemitismo contemporáneo.",
    },
    {
      title: "La deslegitimación de Israel",
      body:
        "Negación del derecho del pueblo judío a la autodeterminación nacional, calificando la mera existencia del Estado de Israel como un proyecto racista, colonial o ilegítimo. Incluye la aplicación de un doble rasero —exigiendo a Israel un comportamiento no requerido a ningún otro Estado democrático— y la voluntad de convertirlo en un paria entre las naciones. La crítica a políticas concretas de un gobierno no entra en esta categoría.",
    },
    {
      title: "La acusación falsa de genocidio",
      body:
        "Atribución sistemática y descontextualizada del crimen de genocidio a Israel, al margen de la definición jurídica internacional y de los hechos verificables. La utilización del término como etiqueta política —desligada de su significado en el derecho internacional— sirve para demonizar al Estado judío, equipararlo con los regímenes más criminales de la historia y deslegitimar cualquier acción de defensa.",
    },
    {
      title: "El mito del judío desleal y antipatriota",
      body:
        "Acusación a los ciudadanos judíos de ser más leales a Israel —o a unos supuestos intereses globales judíos— que a los países en los que viven y de los que son ciudadanos. Este tropo, característico del antisemitismo moderno, cuestiona la plena pertenencia nacional de los judíos y los presenta como un cuerpo extraño dentro de la comunidad política.",
    },
    {
      title: "El mito del judío como raza inferior y parásita",
      body:
        "Herencia del antisemitismo racial decimonónico y nacionalsocialista, que clasificó a los judíos como una «raza» biológicamente distinta e inferior, descrita mediante metáforas zoológicas o parasitarias —insectos, ratas, sanguijuelas— que vivirían a costa de los pueblos «sanos». Estas imágenes preparan discursivamente la deshumanización y, en su forma extrema, la violencia.",
    },
    {
      title: "El mito del judío como ser endemoniado",
      body:
        "Representación del judío como encarnación del mal, vinculado al diablo o a fuerzas oscuras. Tiene raíces en la teología medieval —el judío como deicida y aliado de Satán— y reaparece en la propaganda moderna que atribuye al colectivo judío una maldad esencial, ajena al ámbito de lo humano, justificando así su exclusión moral de la comunidad.",
    },
    {
      title: "El mito del control judío de Estados Unidos",
      body:
        "Variante contemporánea de las teorías conspirativas que sostienen que un supuesto «lobby judío» dirige en la sombra la política exterior de Estados Unidos, sus medios de comunicación y sus instituciones financieras. La crítica legítima a grupos de presión concretos se convierte en antisemitismo cuando se atribuye a la identidad judía un poder oculto, coordinado y desproporcionado sobre la primera potencia mundial.",
    },
    {
      title: "El mito de la conspiración judía mundial",
      body:
        "Núcleo histórico del antisemitismo moderno, formulado paradigmáticamente en los falsos Protocolos de los Sabios de Sión: la creencia en un complot judío internacional para dominar el mundo, controlar los gobiernos, los bancos, los medios y las instituciones supranacionales. Este marco conspirativo es la matriz desde la que se reformulan la mayoría de los tropos antisemitas contemporáneos.",
    },
    {
      title: "El mito de la avaricia judía",
      body:
        "Asociación del colectivo judío con el dinero, la usura y el beneficio económico ilícito. Se remonta a la economía medieval —que excluyó a los judíos de la mayoría de oficios y los confinó al préstamo— y se proyecta hoy en imágenes que vinculan identidad judía con codicia, control bancario o lucro a costa del sufrimiento ajeno.",
    },
    {
      title: "El judío como enemigo del cristianismo",
      body:
        "Tradición teológica que durante siglos presentó a los judíos como pueblo deicida, responsable colectivo de la muerte de Jesús, y como adversario permanente de la fe cristiana. Aunque el Concilio Vaticano II (Nostra Aetate, 1965) corrigió oficialmente esta enseñanza, sus ecos persisten en formulaciones culturales y políticas que reactivan la imagen del judío como enemigo civilizatorio de Occidente cristiano.",
    },
  ];



  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader onNavigate={handleNavigate} currentPage="antisemitism" />

      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 max-w-3xl mx-auto px-6 py-12 space-y-6"
      >
        <h2 className="font-display text-2xl font-bold tracking-tight border-b border-foreground/10 pb-4">
          El antisemitismo
        </h2>

        <div className="space-y-5 text-sm leading-relaxed text-foreground/85">
          <p>
            A lo largo de la historia, el antisemitismo ha adoptado distintas formas según la época, el lugar o las características de cada individuo. Incluso dentro de una misma sociedad, como la española en la actualidad, pueden observarse simultáneamente diferentes manifestaciones: desde el antisemitismo de corte dogmático hasta el que asocia a los judíos con el capital, pasando por el que los acusa de estar detrás del marxismo internacional, como otros muchos otros lugares comunes anclados en la sociedad…
          </p>

          <p>
            El antisemitismo es, por lo tanto, camaleónico. Pese a ello, mantiene en la mayoría de los casos un elemento conspiratorio común: los antisemitas suelen acusar a los judíos de ser los causantes de los problemas que aquejan a su sociedad. El antisemitismo como teoría de la conspiración constituye así uno de sus rasgos definitorios y singulares.
          </p>

          <p>
            Es por ello que el antisemitismo no solo tiene consecuencias nocivas para los judíos —sus primeras víctimas— sino también para las sociedades en las que se extiende. El despertar del antisemitismo es un signo inequívoco de que un país se aleja de los principios de la democracia liberal y, en su lugar, avanza una ideología oscurantista e irracional que termina por amenazar la libertad de todos.
          </p>

          <p>
            El ejemplo más claro es el de la Alemania nazi, que demostró cómo una sociedad avanzada pudo, en poco tiempo, cometer el más grave de los crímenes contra la humanidad: el Holocausto. No obstante, como es ampliamente conocido, son numerosísimos los casos de discriminación institucionalizada, persecución y matanzas de judíos a lo largo de la historia.
          </p>

          <p>
            Tras el Holocausto y el posterior Concilio Vaticano II, que corrigió las tesis más dañinas de la Iglesia contra los judíos, la expresión abierta del antisemitismo más descarnado dejó de ser socialmente tolerada en Occidente.
          </p>

          <p>
            Sin embargo, la fundación del Estado de Israel en 1948 ofreció una nueva vía para expresar este odio milenario: en lugar de dirigir directamente las vejaciones contra los judíos, podían canalizarse hacia su Estado. Y aquí conviene hacer un inciso. Ante las objeciones ya conocidas, desde la Asociación afirmamos que <strong>la crítica a políticas concretas del Estado de Israel y de su gobierno no es, por sí misma, antisemita</strong>. Lo que sí lo es, es la demonización singular de Israel, los esfuerzos por convertirlo en un paria entre Estados —como antes se convirtió a los judíos en paria entre los pueblos— y la negación del derecho a existir del Estado judío. Todas ellas son hoy actitudes lamentablemente muy extendidas.
          </p>

          <p>
            La Asociación Española Contra el Antisemitismo hace frente a esta lacra movida por dos motivos principales. En primer lugar, porque considera que el antisemitismo es éticamente inaceptable y supone una amenaza para la seguridad y la vida de los judíos que viven en España. Pero es que, además, basándonos en las lecciones de la historia, sostenemos que la deriva de una sociedad hacia el antisemitismo conduce a su descomposición. En este sentido, actuamos también impulsados por un compromiso con España.
          </p>

          <p>
            A la hora de definir qué puede constituir antisemitismo, la Asociación se basará en un marco ampliamente reconocido: la definición de la <strong>IHRA</strong> (Alianza Internacional para el Recuerdo del Holocausto). Esta definición ha sido adoptada por el Parlamento Europeo y por 25 Estados miembros de la Unión Europea, entre ellos España. La IHRA define el antisemitismo de la siguiente forma:
          </p>

          <blockquote className="border-l-2 border-accent pl-5 py-2 my-6 italic text-foreground/90">
            El antisemitismo es una determinada percepción de los judíos, que puede expresarse como odio hacia ellos. Las manifestaciones retóricas y físicas del antisemitismo se dirigen contra personas judías o no judías y/o sus propiedades, contra instituciones de la comunidad judía y contra instalaciones religiosas.
          </blockquote>

          <p>
            Asimismo, para ilustrar cómo se manifiesta el antisemitismo, la IHRA acompaña su definición con un conjunto de ejemplos que, junto a la literatura académica especializada, sirven de referencia a esta Asociación para clasificar las categorías que se detallan a continuación.
          </p>
        </div>

        <section className="pt-10 mt-10 border-t border-foreground/10 space-y-6">
          <header className="space-y-3">
            <h3 className="font-display text-xl font-bold tracking-tight">
              Categorías de Antisemitismo
            </h3>
            <p className="text-sm leading-relaxed text-foreground/70 max-w-2xl">
              Las siguientes categorías se basan en la definición de antisemitismo de la International Holocaust Remembrance Alliance (IHRA) y en la literatura académica especializada sobre antisemitismo histórico y contemporáneo.
            </p>
          </header>

          <Accordion type="single" collapsible className="w-full">
            {categorias.map((cat, i) => (
              <AccordionItem
                key={i}
                value={`cat-${i}`}
                className="border-b border-foreground/10 data-[state=open]:border-l-2 data-[state=open]:border-l-accent data-[state=open]:bg-foreground/[0.015] data-[state=open]:pl-4 transition-all"
              >
                <AccordionTrigger className="text-left font-display text-base sm:text-lg font-semibold tracking-tight hover:no-underline py-5 gap-4">
                  <span className="flex items-baseline gap-3">
                    <span className="label-mono text-[10px] text-foreground/40 tabular w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{cat.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-foreground/80 pb-6 pl-9 pr-2">
                  {cat.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </motion.article>

      <SiteFooter />
    </div>
  );
}
