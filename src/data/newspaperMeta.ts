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
    staff: [
      { role: "Director", name: "Pepa Bueno" },
      { role: "Subdirector", name: "Javier Moreno" },
    ],
    empresaMatriz: "PRISA Media",
    accionistaMayoritario: "Grupo PRISA",
    corporateContact: { email: "redaccion@elpais.es" },
  },
  "La Vanguardia": {
    staff: [
      { role: "Director", name: "Jordi Juan" },
    ],
    empresaMatriz: "Grupo Godó",
    accionistaMayoritario: "Familia Godó",
  },
  "ABC": {
    staff: [
      { role: "Director", name: "Julián Quirós" },
    ],
    empresaMatriz: "Vocento",
    accionistaMayoritario: "Vocento S.A.",
  },
  "Público": {
    staff: [
      { role: "Directora", name: "Virginia Pérez Alonso" },
    ],
    empresaMatriz: "Display Connectors",
    accionistaMayoritario: "Jaume Roures",
  },
  "elDiario.es": {
    staff: [
      { role: "Director", name: "Ignacio Escolar" },
    ],
    empresaMatriz: "Diario de Prensa Digital S.L.",
    accionistaMayoritario: "Socios/Cooperativa",
  },
  "La Razón": {
    staff: [
      { role: "Director", name: "Francisco Marhuenda" },
    ],
    empresaMatriz: "Planeta DeAgostini",
    accionistaMayoritario: "Grupo Planeta",
  },
};
