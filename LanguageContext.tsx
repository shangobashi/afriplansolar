import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'EN' | 'FR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Nav
    'nav.technology': 'TECHNOLOGY',
    'nav.mission': 'MISSION',
    'nav.infrastructure': 'INFRASTRUCTURE',
    'nav.getAccess': 'GET ACCESS',

    // Hero
    'hero.tagline': 'SOLAR INTELLIGENCE',
    'hero.title1': 'POWERING',
    'hero.title2': 'THE',
    'hero.title3': 'HEART',
    'hero.title4': 'OF AFRICA',
    'hero.description': 'We deploy autonomous, high-yield solar infrastructure powered by predictive algorithms. Sustainable energy sovereignty for the Democratic Republic of the Congo.',
    'hero.cta': 'INITIATE PROTOCOL',

    // Stats
    'stats.gridUptime': 'GRID UPTIME',
    'stats.capacity': 'CAPACITY',
    'stats.nodes': 'NODES',
    'stats.region': 'REGION',

    // Mission
    'mission.title1': 'THE NEW',
    'mission.title2': 'STANDARD.',
    'mission.p1': 'Conventional grids are failing. AFRIPLAN SOLAR bypasses legacy limitations by establishing decentralized, AI-optimized solar microgrids directly where power is needed most.',
    'mission.p2': 'We leverage proprietary geospatial analysis to position arrays for maximum irradiance capture, ensuring minimal loss and maximum uptime for industrial and residential sectors across the Democratic Republic of the Congo.',
    'mission.solarCapture': 'SOLAR CAPTURE',
    'mission.aiOptimization': 'AI OPTIMIZATION',
    'mission.modularStorage': 'MODULAR STORAGE',
    'mission.zeroLatency': 'ZERO LATENCY',

    // Infrastructure
    'infra.title1': 'INFRASTRUCTURE',
    'infra.title2': 'DEPLOYMENT',
    'infra.status': 'CURRENT STATUS',
    'infra.operational': 'OPERATIONAL',
    'infra.node1.title': 'KINSHASA SOLAR BELT',
    'infra.node1.desc': '400MW capacity primarily serving industrial zones.',
    'infra.node2.title': 'LUBUMBASHI LINK',
    'infra.node2.desc': 'Mining sector dedicated autonomous grid.',
    'infra.node3.title': 'GOMA RURAL INITIATIVE',
    'infra.node3.desc': 'Decentralized pods for rapid residential deployment.',
    'infra.node4.title': 'MATADI HYDRO HYBRID',
    'infra.node4.desc': 'Experimental solar-hydro load balancing systems.',

    // Contact
    'contact.title1': 'JOIN THE',
    'contact.title2': 'NETWORK',
    'contact.description': 'We are scaling rapidly. Investors, engineers, and government partners are invited to access our secure portal.',
    'contact.identification': 'Identification',
    'contact.namePlaceholder': 'NAME / ORG',
    'contact.frequency': 'Frequency',
    'contact.emailPlaceholder': 'EMAIL ADDRESS',
    'contact.submit': 'TRANSMIT',
    'contact.rights': 'ALL RIGHTS RESERVED.',
  },
  FR: {
    // Nav
    'nav.technology': 'TECHNOLOGIE',
    'nav.mission': 'MISSION',
    'nav.infrastructure': 'INFRASTRUCTURE',
    'nav.getAccess': 'ACCÈS',

    // Hero
    'hero.tagline': 'INTELLIGENCE SOLAIRE',
    'hero.title1': 'ALIMENTER',
    'hero.title2': 'LE',
    'hero.title3': 'CŒUR',
    'hero.title4': "DE L'AFRIQUE",
    'hero.description': "Nous déployons une infrastructure solaire autonome à haut rendement alimentée par des algorithmes prédictifs. Souveraineté énergétique durable pour la République Démocratique du Congo.",
    'hero.cta': 'INITIER LE PROTOCOLE',

    // Stats
    'stats.gridUptime': 'DISPONIBILITÉ',
    'stats.capacity': 'CAPACITÉ',
    'stats.nodes': 'NŒUDS',
    'stats.region': 'RÉGION',

    // Mission
    'mission.title1': 'LA NOUVELLE',
    'mission.title2': 'NORME.',
    'mission.p1': "Les réseaux conventionnels échouent. AFRIPLAN SOLAR contourne les limitations héritées en établissant des micro-réseaux solaires décentralisés et optimisés par l'IA directement là où l'énergie est la plus nécessaire.",
    'mission.p2': "Nous exploitons l'analyse géospatiale propriétaire pour positionner les panneaux pour une capture maximale de l'irradiance, assurant une perte minimale et une disponibilité maximale pour les secteurs industriels et résidentiels à travers la République Démocratique du Congo.",
    'mission.solarCapture': 'CAPTURE SOLAIRE',
    'mission.aiOptimization': 'OPTIMISATION IA',
    'mission.modularStorage': 'STOCKAGE MODULAIRE',
    'mission.zeroLatency': 'ZÉRO LATENCE',

    // Infrastructure
    'infra.title1': 'DÉPLOIEMENT',
    'infra.title2': "D'INFRASTRUCTURE",
    'infra.status': 'STATUT ACTUEL',
    'infra.operational': 'OPÉRATIONNEL',
    'infra.node1.title': 'CEINTURE SOLAIRE DE KINSHASA',
    'infra.node1.desc': 'Capacité de 400MW servant principalement les zones industrielles.',
    'infra.node2.title': 'LIAISON LUBUMBASHI',
    'infra.node2.desc': 'Réseau autonome dédié au secteur minier.',
    'infra.node3.title': 'INITIATIVE RURALE GOMA',
    'infra.node3.desc': 'Pods décentralisés pour déploiement résidentiel rapide.',
    'infra.node4.title': 'HYBRIDE HYDRO MATADI',
    'infra.node4.desc': "Systèmes expérimentaux d'équilibrage de charge solaire-hydro.",

    // Contact
    'contact.title1': 'REJOIGNEZ LE',
    'contact.title2': 'RÉSEAU',
    'contact.description': 'Nous évoluons rapidement. Investisseurs, ingénieurs et partenaires gouvernementaux sont invités à accéder à notre portail sécurisé.',
    'contact.identification': 'Identification',
    'contact.namePlaceholder': 'NOM / ORG',
    'contact.frequency': 'Fréquence',
    'contact.emailPlaceholder': 'ADRESSE EMAIL',
    'contact.submit': 'TRANSMETTRE',
    'contact.rights': 'TOUS DROITS RÉSERVÉS.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
