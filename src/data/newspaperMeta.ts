import type { Newspaper } from "./entries";

export interface NewspaperStaff {
  role: string;
  name: string;
}

export interface NewspaperMeta {
  staff: NewspaperStaff[];
  empresaMatriz: string;
  accionistaMayoritario: string;
  corporateContact?: { email?: string; phone?: string };
  logoUrl?: string;
}

export const newspaperMeta: Record<Newspaper, NewspaperMeta> = {
  "El Mundo": {
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/El_Mundo_logo.svg/1200px-El_Mundo_logo.svg.png",
    staff: [
      { role: "Director", name: "Joaquín Manso" },
      { role: "Subdirector", name: "Esteban Urreiztieta" },
      { role: "Jefe de Opinión", name: "Jorge Bustos" },
      { role: "Redactora Jefa", name: "Lucía Méndez" },
    ],
    empresaMatriz: "Grupo Unidad Editorial",
    accionistaMayoritario: "RCS Media Group",
    corporateContact: { email: "affarisocietari@rcs.it", phone: "+39 02 2584 5407" },
  },
  "El País": {
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/El_Pa%C3%ADs_logo_2007.svg/1200px-El_Pa%C3%ADs_logo_2007.svg.png",
    staff: [
      { role: "Director", name: "Pepa Bueno" },
      { role: "Subdirector", name: "Javier Moreno" },
    ],
    empresaMatriz: "PRISA Media",
    accionistaMayoritario: "Grupo PRISA",
    corporateContact: { email: "redaccion@elpais.es" },
  },
  "La Vanguardia": {
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/La_Vanguardia_logo.svg/1200px-La_Vanguardia_logo.svg.png",
    staff: [
      { role: "Director", name: "Jordi Juan" },
    ],
    empresaMatriz: "Grupo Godó",
    accionistaMayoritario: "Familia Godó",
  },
  "ABC": {
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/ABC_%28periódico%29_logo.svg/1200px-ABC_%28periódico%29_logo.svg.png",
    staff: [
      { role: "Director", name: "Julián Quirós" },
    ],
    empresaMatriz: "Vocento",
    accionistaMayoritario: "Vocento S.A.",
  },
  "Público": {
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Publico-logo.svg/1200px-Publico-logo.svg.png",
    staff: [
      { role: "Directora", name: "Virginia Pérez Alonso" },
    ],
    empresaMatriz: "Display Connectors",
    accionistaMayoritario: "Jaume Roures",
  },
  "elDiario.es": {
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Eldiario.es_Logo.svg/1200px-Eldiario.es_Logo.svg.png",
    staff: [
      { role: "Director", name: "Ignacio Escolar" },
    ],
    empresaMatriz: "Diario de Prensa Digital S.L.",
    accionistaMayoritario: "Socios/Cooperativa",
  },
  "La Razón": {
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/La_Razón_logo.svg/1200px-La_Razón_logo.svg.png",
    staff: [
      { role: "Director", name: "Francisco Marhuenda" },
    ],
    empresaMatriz: "Planeta DeAgostini",
    accionistaMayoritario: "Grupo Planeta",
  },
};
