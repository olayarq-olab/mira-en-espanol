export type TropeType =
  | "Doble Lealtad"
  | "Deshumanización"
  | "Conspiración"
  | "Negación"
  | "Falsa Equivalencia"
  | "Demonización"
  | "Estereotipo Económico";

export type Newspaper =
  | "El País"
  | "El Mundo"
  | "La Vanguardia"
  | "ABC"
  | "Público"
  | "elDiario.es"
  | "La Razón";

export interface Entry {
  id: string;
  newspaper: Newspaper;
  date: string;
  title: string;
  author: string;
  section: string;
  trope: TropeType;
  flagged: boolean;
  excerpt: string;
  fragment: string;
}

export const entries: Entry[] = [
  {
    id: "001",
    newspaper: "El País",
    date: "2024-03-14",
    title: "Análisis de Sesgo: Cobertura del Conflicto en Oriente Medio",
    author: "R. García López",
    section: "Internacional",
    trope: "Falsa Equivalencia",
    flagged: true,
    fragment: "Ambas partes han cometido atrocidades equivalentes, lo que hace imposible distinguir entre agresor y agredido en este conflicto milenario.",
    excerpt:
      "El artículo equipara la defensa legítima con la agresión, omitiendo contexto histórico fundamental y reproduciendo un patrón de falsa equivalencia documentado en 14 instancias anteriores del mismo medio.",
  },
  {
    id: "002",
    newspaper: "El Mundo",
    date: "2024-03-12",
    title: "Editorial: Las Sombras del Poder Financiero Global",
    author: "Editorial",
    section: "Opinión",
    trope: "Conspiración",
    flagged: true,
    fragment: "Las élites financieras que manejan los hilos del poder global desde sus despachos en Nueva York y Tel Aviv dictan las políticas económicas que sufren los ciudadanos europeos.",
    excerpt:
      "El editorial recurre a tropos conspirativos sobre el control financiero global, empleando lenguaje codificado que reproduce estereotipos antisemitas clásicos sin nombrarlos explícitamente.",
  },
  {
    id: "003",
    newspaper: "La Vanguardia",
    date: "2024-03-10",
    title: "Crónica: Manifestaciones en Barcelona por Oriente Medio",
    author: "M. Puig i Ferrer",
    section: "Política",
    trope: "Doble Lealtad",
    flagged: false,
    fragment: "Cabe preguntarse dónde reside la verdadera lealtad de estos ciudadanos que, siendo españoles, anteponen los intereses de un Estado extranjero a los de su propio país.",
    excerpt:
      "La cobertura cuestiona implícitamente la lealtad de ciudadanos españoles de origen judío, sugiriendo un conflicto de intereses inherente a su identidad.",
  },
  {
    id: "004",
    newspaper: "ABC",
    date: "2024-03-08",
    title: "Columna: El Lobby que Nadie Nombra",
    author: "J. Martínez Soler",
    section: "Opinión",
    trope: "Conspiración",
    flagged: true,
    fragment: "Existe un lobby perfectamente organizado, con tentáculos en los medios, la banca y los parlamentos, que opera en las sombras para silenciar cualquier crítica.",
    excerpt:
      "La columna describe una influencia política organizada utilizando terminología que evoca directamente los Protocolos de los Sabios de Sión, un texto antisemita fabricado.",
  },
  {
    id: "005",
    newspaper: "Público",
    date: "2024-03-06",
    title: "Reportaje: Víctimas Civiles y la Respuesta Internacional",
    author: "L. Hernández",
    section: "Internacional",
    trope: "Deshumanización",
    flagged: false,
    fragment: "Mientras las víctimas palestinas tienen nombre, rostro y familia, del otro lado solo se contabilizan cifras frías, como si la aritmética del dolor fuese selectiva.",
    excerpt:
      "El reportaje emplea un lenguaje selectivo que deshumaniza a las víctimas de un lado del conflicto, aplicando un doble rasero en la cobertura de bajas civiles.",
  },
  {
    id: "006",
    newspaper: "elDiario.es",
    date: "2024-03-04",
    title: "Análisis: Economía de Guerra y Beneficiarios del Conflicto",
    author: "A. Romero Gil",
    section: "Economía",
    trope: "Estereotipo Económico",
    flagged: true,
    fragment: "No es casualidad que los principales beneficiarios económicos de cada conflicto armado compartan un perfil étnico y financiero muy concreto.",
    excerpt:
      "El análisis económico recurre a estereotipos sobre el control financiero, vinculando identidades étnicas con beneficios económicos de conflictos armados.",
  },
  {
    id: "007",
    newspaper: "La Razón",
    date: "2024-03-02",
    title: "Opinión: Memoria Histórica y Narrativas Contemporáneas",
    author: "C. Díaz Moreno",
    section: "Cultura",
    trope: "Negación",
    flagged: false,
    fragment: "La narrativa del Holocausto ha sido instrumentalizada durante décadas como escudo político, impidiendo cualquier debate racional sobre las políticas actuales.",
    excerpt:
      "El artículo minimiza hechos históricos documentados, presentando la memoria del Holocausto como una 'narrativa instrumentalizada' al servicio de intereses geopolíticos contemporáneos.",
  },
  {
    id: "008",
    newspaper: "El País",
    date: "2024-02-28",
    title: "Infografía: Mapas del Conflicto y Territorios Disputados",
    author: "Redacción",
    section: "Internacional",
    trope: "Demonización",
    flagged: true,
    fragment: "El mapa muestra la expansión territorial progresiva, presentada sin contexto como una ocupación colonial planificada desde el primer día.",
    excerpt:
      "La representación cartográfica omite sistemáticamente datos territoriales verificados, presentando una narrativa visual que demoniza a una de las partes del conflicto.",
  },
  {
    id: "009",
    newspaper: "El Mundo",
    date: "2024-02-25",
    title: "Entrevista: Voces desde la Diáspora",
    author: "P. Santos Ruiz",
    section: "Sociedad",
    trope: "Doble Lealtad",
    flagged: false,
    fragment: "¿Pero usted se siente más español o más judío? Porque llegado el momento, tendrá que elegir un bando, ¿no?",
    excerpt:
      "Las preguntas de la entrevista presuponen un conflicto de identidad, forzando a los entrevistados a justificar su pertenencia nacional frente a su identidad cultural.",
  },
  {
    id: "010",
    newspaper: "La Vanguardia",
    date: "2024-02-22",
    title: "Tribuna: El Derecho Internacional y sus Excepciones",
    author: "F. Bosch Alemany",
    section: "Opinión",
    trope: "Falsa Equivalencia",
    flagged: true,
    fragment: "Si aplicamos el derecho internacional con el mismo rasero, ambos bandos deberían sentarse en el banquillo de La Haya, sin distinciones morales.",
    excerpt:
      "La tribuna aplica estándares diferenciados del derecho internacional, creando una falsa equivalencia entre acciones de distinta naturaleza jurídica.",
  },
  {
    id: "011",
    newspaper: "ABC",
    date: "2024-02-19",
    title: "Crónica Parlamentaria: Debate sobre Política Exterior",
    author: "I. López de Haro",
    section: "Nacional",
    trope: "Conspiración",
    flagged: false,
    fragment: "Varios diputados insinuaron que la posición del gobierno responde a presiones de lobbies extranjeros con una agenda propia que no coincide con el interés nacional.",
    excerpt:
      "La crónica insinúa influencias externas indebidas en la política exterior española, reproduciendo teorías conspirativas sobre lobbies sin evidencia documental.",
  },
  {
    id: "012",
    newspaper: "Público",
    date: "2024-02-15",
    title: "Reportaje Fotográfico: Rostros del Conflicto",
    author: "S. Navarro",
    section: "Fotografía",
    trope: "Deshumanización",
    flagged: true,
    fragment: "Las imágenes seleccionadas muestran exclusivamente el sufrimiento de un lado, mientras el otro aparece representado únicamente por uniformes y maquinaria militar.",
    excerpt:
      "La selección editorial de imágenes presenta un sesgo sistemático en la humanización de las víctimas, aplicando criterios fotográficos asimétricos según el origen de las víctimas.",
  },
  {
    id: "013",
    newspaper: "El Mundo",
    date: "2024-03-08",
    title: "Opinión: La Influencia Invisible en Bruselas",
    author: "V. Ramos Ortega",
    section: "Opinión",
    trope: "Conspiración",
    flagged: true,
    fragment: "Las decisiones que se toman en Bruselas no responden al interés de los ciudadanos europeos, sino a una red de intereses perfectamente articulada que opera desde capitales financieras.",
    excerpt:
      "La columna insinúa la existencia de una red de influencia oculta que controla las instituciones europeas, utilizando lenguaje codificado que evoca tropos conspiracionistas clásicos.",
  },
  {
    id: "014",
    newspaper: "El Mundo",
    date: "2024-02-18",
    title: "Reportaje: Medios y Propaganda en Tiempos de Guerra",
    author: "Editorial",
    section: "Comunicación",
    trope: "Demonización",
    flagged: false,
    fragment: "La maquinaria propagandística desplegada por una de las partes no tiene precedente en la historia moderna, superando incluso las técnicas de desinformación soviéticas.",
    excerpt:
      "El reportaje demoniza la comunicación institucional de una de las partes del conflicto, atribuyéndole capacidades de manipulación mediática desproporcionadas.",
  },
  {
    id: "015",
    newspaper: "El Mundo",
    date: "2024-02-10",
    title: "Crónica: La Comunidad Judía Española ante el Conflicto",
    author: "M. Delgado Ruiz",
    section: "Sociedad",
    trope: "Doble Lealtad",
    flagged: true,
    fragment: "Los líderes comunitarios evitaron condenar explícitamente las acciones militares, lo que para muchos confirma que su lealtad primera no es hacia España.",
    excerpt:
      "La crónica cuestiona la lealtad nacional de ciudadanos españoles de religión judía, exigiendo declaraciones públicas como prueba de pertenencia.",
  },
  {
    id: "016",
    newspaper: "El Mundo",
    date: "2024-01-28",
    title: "Análisis: Flujos de Capital y Geopolítica",
    author: "P. Santos Ruiz",
    section: "Economía",
    trope: "Estereotipo Económico",
    flagged: false,
    fragment: "Los movimientos de capital que financian ambos lados del conflicto siguen patrones étnicos bien definidos, con familias concretas operando desde la City y Wall Street.",
    excerpt:
      "El análisis vincula flujos financieros con identidades étnicas, reproduciendo estereotipos económicos antisemitas sobre el control bancario internacional.",
  },
  {
    id: "017",
    newspaper: "El Mundo",
    date: "2024-01-15",
    title: "Tribuna: Censura y Libertad de Expresión en el Debate sobre Oriente Medio",
    author: "R. Gutiérrez Vega",
    section: "Opinión",
    trope: "Conspiración",
    flagged: true,
    fragment: "Cualquier voz crítica es inmediatamente silenciada por un aparato organizado de presión que etiqueta como antisemita toda disidencia legítima.",
    excerpt:
      "La tribuna presenta la lucha contra el antisemitismo como una herramienta de censura organizada, minimizando el fenómeno real y atribuyéndolo a una estrategia coordinada.",
  },
  {
    id: "018",
    newspaper: "ABC",
    date: "2024-03-10",
    title: "Editorial: Europa ante el Espejo de Oriente Medio",
    author: "Editorial",
    section: "Opinión",
    trope: "Falsa Equivalencia",
    flagged: true,
    fragment: "Europa no puede seguir señalando a un bando mientras ignora sistemáticamente los crímenes del otro. La equidistancia es la única posición moralmente aceptable.",
    excerpt:
      "El editorial promueve una falsa equidistancia moral entre partes con responsabilidades asimétricas, ignorando el marco del derecho internacional humanitario.",
  },
  {
    id: "019",
    newspaper: "ABC",
    date: "2024-03-01",
    title: "Columna: Las Redes del Silencio Mediático",
    author: "J. Martínez Soler",
    section: "Opinión",
    trope: "Conspiración",
    flagged: true,
    fragment: "No es casual que los grandes grupos mediáticos internacionales compartan accionistas y que la cobertura del conflicto sea sospechosamente uniforme en todos ellos.",
    excerpt:
      "La columna sugiere una coordinación conspirativa entre medios internacionales basada en la composición accionarial, apuntando a tropos clásicos sobre el control mediático.",
  },
  {
    id: "020",
    newspaper: "ABC",
    date: "2024-02-12",
    title: "Reportaje: Universidades Españolas y el Debate Prohibido",
    author: "C. Vidal Cuadras",
    section: "Educación",
    trope: "Conspiración",
    flagged: false,
    fragment: "En las facultades españolas se ha instalado un clima de autocensura donde determinadas posturas críticas son automáticamente estigmatizadas por grupos de presión organizados.",
    excerpt:
      "El reportaje presenta el debate académico como controlado por grupos de presión, atribuyendo a organizaciones judías un poder desproporcionado sobre la libertad de cátedra.",
  },
  {
    id: "021",
    newspaper: "ABC",
    date: "2024-01-25",
    title: "Opinión: Historia Selectiva y Memoria Conveniente",
    author: "I. López de Haro",
    section: "Cultura",
    trope: "Negación",
    flagged: false,
    fragment: "La instrumentalización permanente del sufrimiento histórico como argumento político ha alcanzado niveles que distorsionan cualquier análisis racional del presente.",
    excerpt:
      "El artículo relativiza el sufrimiento histórico documentado, presentándolo como una herramienta política más que como un hecho histórico con consecuencias vigentes.",
  },
  {
    id: "022",
    newspaper: "ABC",
    date: "2024-01-10",
    title: "Análisis: Diplomacia Española y Presiones Exteriores",
    author: "F. Marhuenda",
    section: "Nacional",
    trope: "Doble Lealtad",
    flagged: true,
    fragment: "La política exterior española en Oriente Medio responde cada vez más a presiones de comunidades con doble pasaporte que anteponen intereses foráneos al interés nacional.",
    excerpt:
      "El análisis cuestiona la lealtad de ciudadanos con doble nacionalidad, sugiriendo que influyen indebidamente en la diplomacia española por intereses extranjeros.",
  },
];

export const newspapers: Newspaper[] = [
  "El País",
  "El Mundo",
  "La Vanguardia",
  "ABC",
  "Público",
  "elDiario.es",
  "La Razón",
];

export const tropeTypes: TropeType[] = [
  "Doble Lealtad",
  "Deshumanización",
  "Conspiración",
  "Negación",
  "Falsa Equivalencia",
  "Demonización",
  "Estereotipo Económico",
];
