import type { Newspaper } from "./entries";

export interface Cartoon {
  id: string;
  newspaper: Newspaper;
  date: string;
  title: string;
  artist: string;
  description: string;
  imageUrl: string;
}

export const cartoons: Cartoon[] = [
  {
    id: "c1",
    newspaper: "El País",
    date: "2024-02-15",
    title: "La balanza de Oriente",
    artist: "El Roto",
    description: "Viñeta que representa una balanza desequilibrada con estereotipos sobre el conflicto.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "c2",
    newspaper: "El País",
    date: "2024-01-20",
    title: "Muro de silencio",
    artist: "Peridis",
    description: "Caricatura que emplea tropos visuales asociados a la conspiración.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "c3",
    newspaper: "El País",
    date: "2023-12-10",
    title: "Los hilos del poder",
    artist: "El Roto",
    description: "Viñeta con imaginería clásica de control financiero y tropos antisemitas.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "c4",
    newspaper: "El Mundo",
    date: "2024-03-01",
    title: "Doble rasero",
    artist: "Ricardo",
    description: "Caricatura que presenta una falsa equivalencia visual entre agresores y víctimas.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "c5",
    newspaper: "El Mundo",
    date: "2024-02-05",
    title: "Sombras alargadas",
    artist: "Gallego & Rey",
    description: "Viñeta que utiliza sombras para insinuar una influencia oculta desproporcionada.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "c6",
    newspaper: "ABC",
    date: "2024-02-28",
    title: "El titiritero",
    artist: "Mingote (homenaje)",
    description: "Caricatura que recurre al tropo del control a través de marionetas.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "c7",
    newspaper: "ABC",
    date: "2024-01-15",
    title: "Monedas de sangre",
    artist: "JM Nieto",
    description: "Viñeta que asocia directamente el estereotipo económico con violencia.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "c8",
    newspaper: "La Vanguardia",
    date: "2024-03-05",
    title: "Dos banderas, un fuego",
    artist: "Kap",
    description: "Viñeta que simplifica el conflicto con falsa equivalencia visual.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "c9",
    newspaper: "Público",
    date: "2024-02-20",
    title: "La red invisible",
    artist: "Ferreres",
    description: "Caricatura que sugiere una red de influencia con tropos conspirativos.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "c10",
    newspaper: "elDiario.es",
    date: "2024-01-30",
    title: "Cifras y caras",
    artist: "Malagón",
    description: "Viñeta que deshumaniza reduciendo personas a estadísticas.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "c11",
    newspaper: "La Razón",
    date: "2024-02-10",
    title: "El peso de la historia",
    artist: "Idígoras y Pachi",
    description: "Caricatura que minimiza el contexto histórico del antisemitismo.",
    imageUrl: "/placeholder.svg",
  },
];
