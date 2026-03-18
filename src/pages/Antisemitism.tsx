import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Antisemitism() {
  const navigate = useNavigate();

  const handleNavigate = (page: "home" | "archive" | "stats" | "about" | "contact" | "antisemitism") => {
    if (page === "home") navigate("/");
    else if (page === "archive") navigate("/?view=archive");
    else if (page === "stats") navigate("/stats");
    else if (page === "about") navigate("/about");
    else if (page === "contact") navigate("/contact");
    else if (page === "antisemitism") navigate("/antisemitismo");
  };

  const ihraExamples = [
    "Pedir, apoyar o justificar muertes o daños contra los judíos, en nombre de una ideología radical o de una visión extremista de la religión",
    "Formular acusaciones falsas, deshumanizadas, perversas o estereotipadas sobre los judíos, como tales, o sobre el poder de los judíos como colectivo, por ejemplo, aunque no de forma exclusiva, el mito sobre la conspiración judía mundial o el control judío de los medios de comunicación, la economía, el Gobierno u otras instituciones de la Sociedad",
    "Acusar a los judíos como el pueblo responsable de un perjuicio, real o imaginario, cometido por una persona o grupo judío, o incluso de los actos cometidos por personas que no sean judías",
    "Negar el hecho, el ámbito, los mecanismos (por ejemplo, las cámaras de gas) o la intencionalidad del genocidio del pueblo judío en la Alemania nacionalsocialista y sus partidarios y cómplices durante la Segunda Guerra Mundial (el Holocausto)",
    "Culpar a los judíos como pueblo o a Israel, como Estado, de inventar o exagerar el Holocausto",
    "Acusar a los ciudadanos judíos de ser más leales a Israel, o a las supuestas prioridades de los judíos en todo el mundo, que a los intereses de sus propios países",
    "Denegar a los judíos su derecho a la autodeterminación, por ejemplo, alegando que la existencia de un Estado de Israel es un empeño racista",
    "Aplicar un doble rasero al pedir a Israel un comportamiento no esperado ni exigido a ningún otro país democrático",
    "Usar los símbolos y las imágenes asociados con el antisemitismo clásico (por ejemplo, las calumnias como el asesinato de Jesús por los judíos o los rituales sangrientos) para caracterizar a Israel o a los israelíes",
    "Establecer comparaciones entre la política actual de Israel y la de los nazis",
    "Considerar a los judíos responsables de las actuaciones del Estado de Israel",
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
            Asimismo, para ilustrar cómo se manifiesta el antisemitismo y cómo identificarlo, la IHRA acompaña su definición con los siguientes once ejemplos, que no son exhaustivos pero que servirán de referencia a esta Asociación para clasificar determinadas actitudes o declaraciones como antisemitas:
          </p>

          <ol className="list-decimal list-outside pl-5 space-y-3 mt-4">
            {ihraExamples.map((example, i) => (
              <li key={i} className="pl-1">{example}</li>
            ))}
          </ol>
        </div>
      </motion.article>

      <SiteFooter />
    </div>
  );
}
