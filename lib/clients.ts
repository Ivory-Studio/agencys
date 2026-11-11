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
  /** 'wagner': Wagner-Spot ersetzt C-Date (Referenz 06); mit swapSections [['referenz-1','referenz-6']] steht er vorne. */
  feature?: 'wagner'
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

// Nur das Startbild der NÜRNBERGER-Mappe, ohne Kontakt- und Textänderungen.
// Die Agenturfassung hat einen anderen Alt-Text ("Szene" statt "Still"),
// deshalb ein eigener Satz Ersetzungen.
const NUERNBERGER_HEADER: [string, string][] = [
  [
    'src="https://bzdfahumhkjas3hb.public.blob.vercel-storage.com/assets/7d8c3a9e33ca15db27a3e54ce8538eb1.jpg" alt="Szene aus der LinkedIn-Kampagne „Trapped in Routine“"',
    'src="/films/nuernberger-hero.jpg" alt="Szene aus einem Film von IVORY"',
  ],
  [
    'https://bzdfahumhkjas3hb.public.blob.vercel-storage.com/assets/7d8c3a9e33ca15db27a3e54ce8538eb1.jpg',
    'https://agencys-topaz.vercel.app/films/nuernberger-share.jpg',
  ],
  ['<meta property="og:image:width" content="1920">', '<meta property="og:image:width" content="1200">'],
  ['<meta property="og:image:height" content="1080">', '<meta property="og:image:height" content="630">'],
]

// Englische Direktkunden-Mappen: wie NUERNBERGER_STYLE, aber mit "Hello".
const EN_DIRECT_STYLE: [string, string][] = NUERNBERGER_STYLE.filter(([from]) => from !== 'Hello')

// Audi: Agenturmappe als Follow-up zum Call am 05.11.2026, mit eigenem Abschnitt
// "Unser Konzept für Audi", der auf die Konzeptpräsentation im pitches-Projekt verlinkt.
// Kontakt Alexander von Wasielewski, NÜRNBERGER-Startbild, Porsche-Referenz vorne.
const AUDI_CONCEPT_URL = 'https://agencys-topaz.vercel.app/audi-modern-family'
const AUDI_KONZEPT_SECTION = `<section id="konzept" style="min-height: min(100vh, 1000px); box-sizing: border-box; padding: 96px 80px; border-top: 1px solid #26262A; display: flex; flex-direction: column; gap: 40px;">
    <style>@media (max-width: 700px) { section#konzept > div:first-child { flex-direction: row !important; flex-wrap: wrap !important; gap: 4px 12px !important; font-size: 11px !important; } section#konzept > div:nth-child(3) { flex-direction: column !important; gap: 24px !important; } section#konzept > div:nth-child(3) > div { width: 100% !important; flex: none !important; } section#konzept > div:last-child { flex-direction: column !important; align-items: stretch !important; gap: 10px !important; } section#konzept > div:last-child a { text-align: center !important; font-size: 11px !important; } section#konzept div[style*="font-size: 36px"] { font-size: 21px !important; } }</style>
    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">
      <span style="color: #5A77FF;">Unser Konzept für Audi</span>
      <span style="color: #8E8D87;">Vertical Comedy · 9:16</span>
    </div>
    <div style="display: flex; gap: 64px; align-items: flex-start;">
      <div style="flex: 7 1 0; min-width: 0; display: flex; flex-direction: column; gap: 20px;">
        <h2 style="margin: 0; font-size: 88px; line-height: 0.88; font-weight: 800; letter-spacing: -0.045em; text-transform: uppercase; color: #F5F4EF;">Modern Family</h2>
        <div style="font-size: 36px; line-height: 1.05; font-weight: 700; letter-spacing: -0.02em; text-transform: uppercase; color: #B4B3AD;">Perfect Car. Imperfect Family.</div>
      </div>
      <div style="flex: 5 1 0; min-width: 0; display: flex; flex-direction: column; gap: 16px;">
        <p style="margin: 0; font-size: 18px; line-height: 1.5; color: #C9C8C2;">Eine fiktionale Vertical-Serie über eine moderne Familie in Garmisch-Partenkirchen – gecastet nach dem Vorbild der Familie Neureuther. Audi ist Teil ihres Alltags, nie Thema.</p>
        <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #8E8D87;">Mehrere Staffeln à 5 Folgen · bis 60 Sekunden · 9:16</p>
      </div>
    </div>
    <a href="${AUDI_CONCEPT_URL}" target="_blank" rel="noopener" style="display: block;"><img src="/films/audi-modern-family.jpg" alt="Die Familie aus dem Konzept „Modern Family“ beim Frühstück, draußen steht der Audi" style="width: 100%; aspect-ratio: 21 / 9; object-fit: cover; object-position: 50% 45%; display: block;"></a>
    <div style="display: flex; justify-content: flex-end; align-items: center; gap: 16px;">
      <a href="${AUDI_CONCEPT_URL}" target="_blank" rel="noopener" style="flex-shrink: 0; text-decoration: none; background: #F5F4EF; color: #0A0A0B; padding: 16px 22px; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">Konzept ansehen ↗</a>
      <a href="#ivory" style="flex-shrink: 0; text-decoration: none; border: 1px solid #F5F4EF; padding: 15px 21px; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">Über IVORY ↓</a>
    </div>
  </section>

  `
const AUDI_STYLE: [string, string][] = [
  // Kontakt und "Hallo" aus der NÜRNBERGER-Gestaltung.
  ...NUERNBERGER_STYLE.filter(([from]) => !from.includes('7d8c3a9e33ca15db27a3e54ce8538eb1') && !from.includes('og:image')),
  // Startbild wie in der NÜRNBERGER-Mappe.
  ...NUERNBERGER_HEADER,
  // Konzept-Abschnitt direkt nach dem Start, plus Links in Navigation und Startbutton.
  ['<section id="ivory"', AUDI_KONZEPT_SECTION + '<section id="ivory"'],
  ['<a href="#ivory" style="text-decoration: none; color: #E4E3DD;">Über IVORY</a>',
    '<a href="#konzept" style="text-decoration: none; color: #E4E3DD;">Konzept</a>\n        <a href="#ivory" style="text-decoration: none; color: #E4E3DD;">Über IVORY</a>'],
  ['<a href="#referenz-1" style="text-decoration: none; background: #F5F4EF; color: #0A0A0B; padding: 20px 28px; font-size: 14px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">Zu den Referenzen →</a>',
    '<a href="#konzept" style="text-decoration: none; background: #F5F4EF; color: #0A0A0B; padding: 20px 28px; font-size: 14px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">Unser Konzept →</a>'],
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
  // Nike zuerst, dann LinkedIn
  { slug: 'leger-2qse', name: 'LeGer', extraReplacements: NUERNBERGER_HEADER, swapSections: [['referenz-1', 'referenz-2']] },
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
  { slug: 'lichtblick-7y33', name: 'LichtBlick', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'statkraft-7phx', name: 'Statkraft', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'pne-ssk6', name: 'PNE', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'wpd-jp8q', name: 'wpd', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'avacon-h9sb', name: 'Avacon', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: '50hertz-3x64', name: '50Hertz', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'vattenfall-q2gp', name: 'Vattenfall', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'enercity-sc7d', name: 'enercity', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'ewe-3a65', name: 'EWE', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-2']] },
  // Kultur & Wissenschaft 28.10.
  { slug: 'opernhaus-zuerich-4e49', name: 'Opernhaus Zürich', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'bamberger-symphoniker-hwnf', name: 'Bamberger Symphoniker', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'bregenzer-festspiele-8cva', name: 'Bregenzer Festspiele', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'deutsches-museum-1nuy', name: 'Deutsches Museum', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'brainlab-rx22', name: 'Brainlab', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  // Asien/Europa (Hongkong-Hook) 29.10.
  { slug: 'sungrow-5xyg', name: 'Sungrow', lang: 'en-eb', extraReplacements: EN_DIRECT_STYLE, removeSections: ['netzwerk'] },
  { slug: 'trinasolar-qoth', name: 'Trinasolar', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'geekplus-c7rg', name: 'Geekplus', lang: 'en-eb', extraReplacements: EN_DIRECT_STYLE, removeSections: ['netzwerk'] },
  { slug: 'huawei-ujh5', name: 'Huawei', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'jinkosolar-h9kq', name: 'JinkoSolar', lang: 'en-eb', extraReplacements: EN_DIRECT_STYLE, removeSections: ['netzwerk'] },
  { slug: 'ja-solar-6vq8', name: 'JA Solar', lang: 'en-eb', extraReplacements: EN_DIRECT_STYLE, removeSections: ['netzwerk'] },
  { slug: 'zte-96wa', name: 'ZTE', lang: 'en-eb', extraReplacements: EN_DIRECT_STYLE, removeSections: ['netzwerk'] },
  { slug: 'goodwe-pmed', name: 'GoodWe', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  // Tech & Industrie 02.11.
  { slug: 'ionos-ihw5', name: 'IONOS', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'teamviewer-8x2l', name: 'TeamViewer', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'paessler-c39e', name: 'Paessler', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'commercetools-rkrc', name: 'commercetools', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'qaware-lqpk', name: 'QAware', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'nemetschek-303s', name: 'Nemetschek', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'infineon-zqm2', name: 'Infineon', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'suse-b1cw', name: 'SUSE', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'datev-b2pf', name: 'DATEV', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'knorr-bremse-ez92', name: 'Knorr-Bremse', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  // Tech 02.11. (zweite Liste)
  { slug: 'jetbrains-txn8', name: 'JetBrains', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'red-hat-xaj3', name: 'Red Hat', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'workday-cjj9', name: 'Workday', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'google-m98j', name: 'Google', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-7']] },
  { slug: 'adobe-01us', name: 'Adobe', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-8']] },
  { slug: 'microsoft-ls20', name: 'Microsoft', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'autodesk-zwol', name: 'Autodesk', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'ibm-g59s', name: 'IBM', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'sap-h3tr', name: 'SAP', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-5']] },
  { slug: 'apple-awgm', name: 'Apple', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-2']] },
  // Leads 06.11.
  { slug: 'kaercher-ri9z', name: 'Kärcher', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], feature: 'wagner', swapSections: [['referenz-1', 'referenz-6']] },
  { slug: 'lapp-a5ch', name: 'LAPP', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'ziehl-abegg-cg1r', name: 'ZIEHL-ABEGG', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], feature: 'wagner', swapSections: [['referenz-1', 'referenz-6']] },
  { slug: 'sew-eurodrive-rlht', name: 'SEW-EURODRIVE', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'reinhausen-j489', name: 'Reinhausen', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'delo-9pul', name: 'DELO', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'kraussmaffei-u0vk', name: 'KraussMaffei', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], feature: 'wagner', swapSections: [['referenz-1', 'referenz-6']] },
  { slug: 'bauer-2iw7', name: 'BAUER', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], feature: 'wagner', swapSections: [['referenz-1', 'referenz-6']] },
  { slug: 'palfinger-dygi', name: 'PALFINGER', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], feature: 'wagner', swapSections: [['referenz-1', 'referenz-6']] },
  { slug: 'tttech-qibx', name: 'TTTech', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'itm-d13p', name: 'ITM', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'siltronic-08qz', name: 'Siltronic', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'eos-rc29', name: 'EOS', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'mobility-house-jdjd', name: 'The Mobility House', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'exploration-company-o9nr', name: 'The Exploration Company', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'isar-aerospace-jzp5', name: 'Isar Aerospace', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'kontron-9gsb', name: 'Kontron', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'mymuesli-aqko', name: 'mymuesli', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-7']] },
  { slug: 'douglas-jwo2', name: 'DOUGLAS', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-2']] },
  { slug: 'mueller-qvzg', name: 'Müller', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'aldi-sued-yvsl', name: 'ALDI SÜD', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'rossmann-4ioz', name: 'ROSSMANN', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'dm-6gx7', name: 'dm', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'fritz-kola-vbin', name: 'fritz-kola', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-8']] },
  { slug: 's-oliver-bi3c', name: 's.Oliver', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-2']] },
  { slug: 'ottakringer-l2fm', name: 'Ottakringer', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-8']] },
  { slug: 'develey-10dx', name: 'Develey', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'ororatech-tyv2', name: 'OroraTech', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  // Leads 11.11. (Schweiz & Österreich)
  { slug: 'sk-rapid-nmwj', name: 'SK Rapid', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'hoch-health-x2f6', name: 'HOCH Health Ostschweiz', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'vontobel-lfvg', name: 'Vontobel', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-2']] },
  { slug: 'kunsthaus-zuerich-2jlr', name: 'Kunsthaus Zürich', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'vat-group-cx4s', name: 'VAT', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'rosenbauer-wtni', name: 'Rosenbauer', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'lucerne-festival-73w1', name: 'Lucerne Festival', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'hirslanden-h4ia', name: 'Hirslanden', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  { slug: 'helvetia-baloise-2soi', name: 'Helvetia Baloise', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-2']] },
  { slug: 'zkb-2p7c', name: 'Zürcher Kantonalbank', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  { slug: 'flughafen-zuerich-bkmy', name: 'Flughafen Zürich', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-4']] },
  { slug: 'avl-vkx6', name: 'AVL', lang: 'de-eb', extraReplacements: NUERNBERGER_STYLE, removeSections: ['netzwerk'] },
  // Automotive
  { slug: 'audi-m7fk', name: 'Audi', extraReplacements: AUDI_STYLE, removeSections: ['netzwerk'], swapSections: [['referenz-1', 'referenz-3']] },
  // Verlage
  { slug: 'goldmann-verlag-3yba', name: 'Goldmann Verlag', lang: 'de-buch' },
  { slug: 'kosmos-verlag-mu4w', name: 'Kosmos Verlag', lang: 'de-buch' },
]

export function getClient(slug: string): ClientDeck | undefined {
  return clients.find((c) => c.slug === slug)
}
