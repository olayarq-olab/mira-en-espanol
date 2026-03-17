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
    excerpt:
      "La selección editorial de imágenes presenta un sesgo sistemático en la humanización de las víctimas, aplicando criterios fotográficos asimétricos según el origen de las víctimas.",
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
