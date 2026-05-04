import type { Newspaper } from "@/data/entries";

export const newspaperToSlug = (n: string) =>
  n
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const slugToNewspaper = (slug: string, newspapers: Newspaper[]): Newspaper | undefined =>
  newspapers.find((n) => newspaperToSlug(n) === slug);
