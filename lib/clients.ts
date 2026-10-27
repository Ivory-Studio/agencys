// Central registry of client presentations.
//
// To add a new client presentation, add ONE entry to `clients` below.
// The `slug` becomes the public path (e.g. slug "deutsche-bahn" -> /deutsche-bahn),
// and `name` replaces "Munich Re" everywhere in the shared deck.
// Optionally provide `extraReplacements` for client-specific text swaps.
//
// No new folders or files are needed — the dynamic route at
// app/[client]/[[...path]]/route.ts serves any client listed here.
//
// Set `lang: 'zh'` for the Chinese deck (public/munichre-zh) or
// `lang: 'en-eb'` for the English employer-branding cut (public/munichre-en-eb),
// or `lang: 'de-eb'` for the German employer-branding cut (public/munichre-de-eb),
// or `lang: 'de-buch'` for the German book-trailer deck (public/munichre-de-buch).
// Images and videos always come from public/munichre, so translations
// only need the HTML files.

export type ClientDeck = {
  slug: string
  name: string
  lang?: 'de' | 'zh' | 'en-eb' | 'de-eb' | 'de-buch'
  extraReplacements?: [string, string][]
  /** Section-IDs, die fuer diesen Kunden nicht ausgeliefert werden, z. B. ['netzwerk']. */
  removeSections?: string[]
  // Abschnittspaare tauschen, z. B. [['referenz-1', 'referenz-3']]
  swapSections?: [string, string][]
}

// Gestaltung der NÜRNBERGER-Mappe: eigenes Startbild, Alexander von Wasielewski als Kontakt,
// "Hallo" statt "Hello", ohne Netzwerk-Folie. Für weitere Direktkunden-Mappen wiederverwendet.
const NUERNBERGER_STYLE: [string, string][] = [
      // !important, weil der Zeilenabstand im h1 inline gesetzt ist.
      // Auf dem Handy wird der lange Name sonst mitten im Wort umbrochen.
      [
        '</head>',
        '<style>section#start h1 { line-height: 1.05 !important; }' +
          '@media (max-width: 700px) { section#start h1 { font-size: clamp(28px, 10.2vw, 72px) !important; } }' +
          '</style></head>',
      ],
      // Eigenes Startbild fuer diese Mappe.
      // Erst das Hero-Bild samt Alt-Text, dann die restlichen Vorkommen
      // der alten URL (og:image und twitter:image).
      [
        'src="https://bzdfahumhkjas3hb.public.blob.vercel-storage.com/assets/7d8c3a9e33ca15db27a3e54ce8538eb1.jpg" alt="Still aus der LinkedIn-Kampagne „Trapped in Routine“"',
        'src="/films/nuernberger-hero.jpg" alt="Still aus einem Employer-Branding-Film von IVORY"',
      ],
      [
        'https://bzdfahumhkjas3hb.public.blob.vercel-storage.com/assets/7d8c3a9e33ca15db27a3e54ce8538eb1.jpg',
        'https://agencys-topaz.vercel.app/films/nuernberger-share.jpg',
      ],
      ['<meta property="og:image:width" content="1920">',
        '<meta property="og:image:width" content="1200">'],
      ['<meta property="og:image:height" content="1080">',
        '<meta property="og:image:height" content="630">'],
      // Ansprechpartner fuer diese Mappe: Alexander von Wasielewski.
      ['Michael Retzer', 'Alexander von Wasielewski'],
      ['retzer@ivory-productions.com', 'alex@ivory-productions.com'],
      ['tel:+4915221713237', 'tel:+491797196918'],
      ['+49 152 217 132 37', '+49 179 719 69 18'],
      // Deutsche Ansprache auf der Startseite und in der Link-Vorschau.
      ['Hello', 'Hallo'],
]

export const clients: ClientDeck[] = [
  { slug: 'defaultagency', name: 'DefaultAgency' },
  { slug: 'accenture-song-w3fj', name: 'Accenture Song' },
  { slug: 'bbdo-69p7', name: 'BBDO' },
  { slug: 'antoni-jg7e', name: 'antoni' },
  { slug: 'mother-pxqd', name: 'Mother' },
  { slug: 'kemmler-kemmler-pd2x', name: 'Kemmler Kemmler' },
  { slug: 'heimattbwa-86pw', name: 'Ms. Heffels' },
  { slug: 'ogilvy-8cyf', name: 'Ogilvy' },
  { slug: 'rysm-k67a', name: 'RYSM' },
  { slug: 'fette-beute-sbyq', name: 'DES WAHNSINNS FETTE BEUTE' },
  { slug: 'la-red-xcgm', name: 'la red' },
  { slug: 'grey-6nra', name: 'Grey' },
  { slug: 'haeppy-fs44', name: 'häppy' },
  { slug: 'leo-burnett-6w45', name: 'Leo Burnett' },
  { slug: 'knsk-mvkj', name: 'KNSK' },
  { slug: 'thjnk-vhuq', name: 'thjnk' },
  { slug: 'scholz-friends-berlin-4zss', name: 'Scholz & Friends Berlin' },
  { slug: 'brunp-recycling-ef4n', name: 'Brunp Recycling' },
  { slug: 'catl-qgfv', name: 'CATL' },
  { slug: 'yddo-w74x', name: 'yddo' },
  { slug: 'paulaner-ev83', name: 'Paulaner' },
  { slug: 'swiss-life-g86p', name: 'Swiss Life' },
  { slug: 'havas-jmxy', name: 'Havas' },
  { slug: 'scholz-friends-hamburg-93wu', name: 'Scholz & Friends Hamburg' },
  { slug: 'leo-germany-qepe', name: 'Leo Germany' },
  { slug: 'twenty-rising-y2w8', name: 'Twenty Rising' },
  { slug: 'room-6-rf88', name: 'ROOM6' },
  { slug: 'octopus-energy-wjny', name: 'Octopus Energy' },
  { slug: 'ketchum-fhus', name: 'Ketchum' },
  { slug: 'cheil-worldwide-s7tn', name: 'Cheil Worldwide' },
  { slug: 'dentsu-me5f', name: 'dentsu' },
  { slug: 'fever-mgbf', name: 'Fever' },
  { slug: 'hello-china-n9kt', name: 'China', lang: 'zh' },
  { slug: 'deutsche-bahn-dpsr', name: 'Deutsche Bahn' },
  { slug: 'db-employer-branding-rdfu', name: 'Deutsche Bahn', lang: 'en-eb' },
  // Employer-Branding-Kaltakquise Oktober 2026 (IVORY NEWS Liste)
  { slug: 'bsh-p5tm', name: 'BSH', lang: 'de-eb' },
  { slug: 'siemens-energy-yd7g', name: 'Siemens Energy', lang: 'en-eb' },
  { slug: 'siemens-uk-c6yz', name: 'Siemens', lang: 'en-eb' },
  { slug: 'allianz-aobb', name: 'Allianz', lang: 'de-eb' },
  { slug: 'mercedes-benz-3tjm', name: 'Mercedes-Benz', lang: 'de-eb' },
  { slug: 'telekom-zk8b', name: 'Deutsche Telekom', lang: 'de-eb' },
  { slug: 'volkswagen-l34l', name: 'Volkswagen', lang: 'de-eb' },
  { slug: 'bosch-1o3c', name: 'Bosch', lang: 'de-eb' },
  { slug: 'everllence-mvi5', name: 'Everllence', lang: 'de-eb' },
  { slug: 'rwe-iz2w', name: 'RWE', lang: 'de-eb' },
  { slug: 'turck-hojb', name: 'Turck', lang: 'de-eb' },
  { slug: 'leoni-ck1k', name: 'Leoni', lang: 'de-eb' },
  { slug: 'leoni-china-kfe3', name: 'Leoni China', lang: 'en-eb' },
  { slug: 'daimler-truck-jeka', name: 'Daimler Truck', lang: 'de-eb' },
  { slug: 'daimler-truck-en-bsd0', name: 'Daimler Truck', lang: 'en-eb' },
  { slug: 'europaeisches-parlament-q929', name: 'Europäisches Parlament', lang: 'de-eb' },
  {
    slug: 'nuernberger-versicherung-j8kn',
    name: 'NÜRNBERGER Versicherung',
    lang: 'de-eb',
    extraReplacements: NUERNBERGER_STYLE,
    removeSections: ['netzwerk'],
  },
  // Direktkunden-Kaltakquise 26.10.2026 (Absender Alexander von Wasielewski)
  { slug: 'weihenstephan-u3wj', name: 'Weihenstephan', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'wiener-staatsoper-zr9j', name: 'Wiener Staatsoper', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'hochland-jjsj', name: 'Hochland', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'giesecke-devrient-wf8h', name: 'Giesecke+Devrient', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'oebb-49cp', name: 'ÖBB', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  // Direktkunden-Kaltakquise 27.10.2026 (Absender Alexander von Wasielewski)
  { slug: 'residenztheater-xxwb', name: 'Residenztheater', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'muenchner-philharmoniker-x7by', name: 'Münchner Philharmoniker', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'andechser-natur-rxua', name: 'Andechser Natur', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-2']] },
  { slug: 'flughafen-wien-84xs', name: 'Flughafen Wien', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'versicherungskammer-rg73', name: 'Versicherungskammer', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  // Direktkunden-Kaltakquise 27.10.2026, Energie (Absender Alexander von Wasielewski)
  { slug: 'wemag-rtha', name: 'WEMAG', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'lichtblick-7y33', name: 'LichtBlick', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'statkraft-7phx', name: 'Statkraft', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'pne-ssk6', name: 'PNE', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'wpd-jp8q', name: 'wpd', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'avacon-h9sb', name: 'Avacon', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: '50hertz-3x64', name: '50Hertz', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'vattenfall-q2gp', name: 'Vattenfall', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'enercity-sc7d', name: 'enercity', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'ewe-3a65', name: 'EWE', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-2']] },
  // Verlage
  { slug: 'goldmann-verlag-3yba', name: 'Goldmann Verlag', lang: 'de-buch' },
  { slug: 'kosmos-verlag-mu4w', name: 'Kosmos Verlag', lang: 'de-buch' },
]

export function getClient(slug: string): ClientDeck | undefined {
  return clients.find((c) => c.slug === slug)
}
