import type { TropeType } from "./entries";

interface TropeMeta {
  name: TropeType;
  definition: string;
  methodology: string;
}

export const tropeMeta: Record<TropeType, TropeMeta> = {
  "Doble Lealtad": {
    name: "Doble Lealtad",
    definition:
      "Acusación, explícita o implícita, de que los judíos son más leales a Israel o a los supuestos intereses globales judíos que a los países en los que viven. Este tropo cuestiona la pertenencia plena de los judíos a la comunidad nacional.",
    methodology:
      "Se identifican textos que cuestionan la lealtad nacional de ciudadanos judíos, que presentan su identidad como un conflicto inherente o que sugieren que deben «elegir bando» entre su país de residencia e Israel.",
  },
  "Deshumanización": {
    name: "Deshumanización",
    definition:
      "Empleo de lenguaje, imágenes o marcos narrativos que niegan o minimizan la humanidad de las víctimas israelíes o judías, aplicando un doble rasero en la cobertura del sufrimiento según el origen étnico o nacional.",
    methodology:
      "Se detectan asimetrías sistemáticas en el tratamiento de víctimas: uso de nombres y rostros para unas frente a cifras abstractas para otras, así como lenguaje que reduce a personas a categorías militares o estadísticas.",
  },
  "Conspiración": {
    name: "Conspiración",
    definition:
      "Atribución a los judíos —de forma directa o mediante lenguaje codificado— de un poder desproporcionado y oculto sobre gobiernos, medios de comunicación, finanzas o instituciones internacionales.",
    methodology:
      "Se rastrean referencias a «lobbies en la sombra», «tentáculos», «hilos del poder» u otras expresiones que evocan los Protocolos de los Sabios de Sión o teorías conspirativas clásicas sobre el control judío.",
  },
  "Negación": {
    name: "Negación",
    definition:
      "Minimización, banalización o instrumentalización del Holocausto y otros episodios de persecución antisemita, presentándolos como «narrativas» manipuladas con fines políticos.",
    methodology:
      "Se identifican artículos que relativizan hechos históricos documentados, que presentan la memoria del Holocausto como un «arma política» o que equiparan las acciones de Israel con el nazismo de forma trivializadora.",
  },
  "Falsa Equivalencia": {
    name: "Falsa Equivalencia",
    definition:
      "Equiparación artificial entre acciones de naturaleza jurídica y moral distinta, difuminando la distinción entre agresión y defensa legítima o entre terrorismo y operaciones militares.",
    methodology:
      "Se detectan marcos narrativos que borran diferencias cualitativas entre las partes del conflicto, omiten contexto histórico clave o aplican estándares de derecho internacional de manera selectiva para crear simetría artificial.",
  },
  "Demonización": {
    name: "Demonización",
    definition:
      "Representación de Israel o de los judíos como encarnación del mal absoluto, mediante comparaciones desproporcionadas, lenguaje deshumanizante o narrativas que niegan toda legitimidad a sus acciones o existencia.",
    methodology:
      "Se identifican textos que emplean comparaciones con regímenes genocidas, que presentan a Israel como un proyecto colonial sin matices o que utilizan representaciones visuales o cartográficas sesgadas para demonizar.",
  },
  "Estereotipo Económico": {
    name: "Estereotipo Económico",
    definition:
      "Reproducción del tropo antisemita clásico que asocia a los judíos con la avaricia, el control financiero o el beneficio económico ilícito, vinculando identidades étnicas con intereses monetarios.",
    methodology:
      "Se rastrean artículos que insinúan vínculos entre identidad judía y beneficios económicos de conflictos, que describen «perfiles étnicos y financieros» o que reproducen estereotipos sobre el control de la banca y los mercados.",
  },
};
