
import type { Article, Product } from './types';

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "L'art vestimentaire des enfants pygmées",
    date: "15 Juillet 2024",
    imageUrl: "/images/vetpygme.jpeg",
    summary: "Découvrez comment les vêtements traditionnels des enfants pygmées sont plus qu'une simple parure, mais un langage culturel riche et une adaptation ingénieuse à leur environnement forestier.",
    content: [
      "Au cœur de la forêt équatoriale, les communautés pygmées ont développé une culture vestimentaire unique, profondément liée à leur mode de vie nomade et à leur environnement. Pour les enfants, les vêtements ne sont pas seulement une protection, mais aussi un moyen d'expression et d'apprentissage.",
      "Fabriqués à partir de fibres végétales, d'écorces battues et de feuilles, les habits des plus jeunes sont légers, résistants et parfaitement adaptés au climat humide. Les mères enseignent dès le plus jeune âge à leurs filles l'art du tressage et de la décoration, transmettant un savoir-faire ancestral.",
      "Chaque motif, chaque parure de perles de graines ou de coquillages raconte une histoire. Ils peuvent indiquer le clan d'appartenance, marquer une étape de la vie de l'enfant ou servir de protection symbolique contre les esprits de la forêt. C'est un langage silencieux qui renforce les liens sociaux au sein de la communauté.",
      "Loin des conventions de la mode occidentale, l'habillement des enfants pygmées est un témoignage fascinant de l'harmonie entre l'homme et la nature, un art durable et plein de sens qui mérite d'être préservé et célébré."
    ]
  },
  {
    id: 2,
    title: "L'Eveil des petits pygmées",
    date: "10 Juillet 2024",
    imageUrl: "/images/pygmees.jpeg",
    summary: "Plongez dans l'univers ludique des enfants des communautés forestières, où chaque jeu est une leçon de vie et de survie.",
    content: [
      "Pour un enfant pygmée, la forêt n'est pas seulement un lieu de vie, c'est un immense terrain de jeu et d'apprentissage. Les jouets ne sont pas manufacturés, mais trouvés ou créés à partir des ressources naturelles : lianes pour les balançoires, noix pour les toupies, ou encore de petites figurines sculptées dans le bois.",
      "Les jeux d'imitation tiennent une place centrale. Les garçons apprennent à pister et à chasser en imitant les adultes avec de petits arcs, tandis que les filles construisent des huttes miniatures, s'exerçant à leur futur rôle dans la communauté. Ces activités ludiques sont essentielles au développement de leurs compétences.",
      "La musique et la danse sont également omniprésentes. Au son des tambours et des chants, les enfants apprennent les rythmes, les histoires et les traditions de leur peuple. C'est une éducation joyeuse et collective, où chaque membre de la communauté participe à l'éveil des plus jeunes."
    ]
  },
   {
    id: 3,
    title: "La symbolique des couleurs dans les tissus africains",
    date: "5 Juillet 2024",
    imageUrl: "https://picsum.photos/seed/africancolors/800/600",
    summary: "Du bleu indigo au rouge vif, chaque couleur des tissus traditionnels africains porte une signification profonde et ancestrale.",
    content: [
      "Les tissus africains sont célèbres pour leurs motifs vibrants et leurs couleurs éclatantes. Mais au-delà de leur beauté esthétique, ces couleurs sont porteuses de messages et de symboles forts qui varient d'une culture à l'autre.",
      "Le rouge, souvent associé au sang, peut symboliser la vie, la force, mais aussi le danger ou le deuil lors de funérailles. Le blanc représente la pureté, la spiritualité et la paix. C'est la couleur des cérémonies et des rites de passage.",
      "Le bleu, particulièrement l'indigo, est une couleur de royauté et de richesse dans de nombreuses cultures d'Afrique de l'Ouest. Il évoque le ciel et la sagesse. Le vert, quant à lui, est le symbole de la terre, de la fertilité, de la croissance et de la bonne santé.",
      "Comprendre cette palette symbolique permet de lire les tissus comme un livre ouvert sur l'histoire, les croyances et les valeurs des peuples qui les ont créés."
    ]
  },
  {
    id: 4,
    title: "Les enfants oubliés du Cameroun : entre pauvreté, espoir et résilience",
    date: "20 Septembre 2025",
    imageUrl: "/images/afac1téléchargement.jpeg",
    summary: "La quete du bonheur pour les enfants defavorisées ducameroun, du nord au Sud, de l'Est à l'Ouest.",
    content: [
      "Au Cameroun, des milliers d’enfants grandissent dans des conditions précaires, souvent sans accès à l’éducation, à la santé ou à une alimentation équilibrée.",
      "Ces enfants défavorisés, vivant dans les rues ou dans les zones rurales marginalisées, représentent pourtant l’avenir d’un pays riche en potentiel humain.",
      "Les causes sont multiples : pauvreté, chômage des parents, absence de structures sociales adaptées, et parfois conflits familiaux.",
      "Heureusement, de nombreuses associations locales et ONG œuvrent chaque jour pour leur redonner une chance : programmes de scolarisation, réinsertion sociale, parrainage éducatif, etc.",
      "Ces initiatives montrent qu’avec un minimum d’engagement et de solidarité, il est possible de transformer des vies et de redonner de l’espoir à toute une génération."
    ]
  }

];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tunique  'Forêt Sacrée'",
    price: 120,
    imageUrl: "https://picsum.photos/seed/bogolan/600/600",
    description: "Une pièce unique teinte à la main selon la technique ancestrale du Bogolan. Les motifs d'argile fermentée racontent une histoire de la terre et des esprits. Tissu en coton épais, idéal pour toutes les saisons."
  },
  {
    id: 2,
    name: "Collier de perles 'Reine Masaï'",
    price: 75,
    imageUrl: "https://picsum.photos/seed/masainecklace/600/600",
    description: "Ce collier plastron, entièrement réalisé à la main par des artisanes Masaï, est un symbole de beauté et de statut social. Ses couleurs vives apporteront une touche d'élégance et d'audace à votre tenue."
  },
  {
    id: 3,
    name: "Boubou en wax 'Soleil de Dakar'",
    price: 150,
    imageUrl: "https://picsum.photos/seed/boubouwax/600/600",
    description: "Ample et confortable, ce boubou est confectionné dans un tissu wax hollandais de haute qualité aux motifs solaires. Parfait pour une allure chic et décontractée lors d'événements spéciaux ou au quotidien."
  },
  {
    id: 4,
    name: "Bracelets Touareg en argent ciselé",
    price: 95,
    imageUrl: "https://picsum.photos/seed/tuareg/600/600",
    description: "Jeu de trois bracelets en argent massif finement ciselés par des artisans Touareg. Chaque gravure est un symbole protecteur du désert. Un bijou intemporel et chargé d'histoire."
  },
  {
    id: 5,
    name: "Bracelets Touareg ",
    price: 65,
    imageUrl: "https://picsum.photos/seed/tuareg/600/600",
    description: "Jeu de trois bracelets Chaque gravure est un symbole protecteur du désert. Un bijou intemporel et chargé d'histoire."
  }
];
