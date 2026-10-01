// Central registry of client presentations.
//
// To add a new client presentation, add ONE entry to `clients` below.
// The `slug` becomes the public path (e.g. slug "deutsche-bahn" -> /deutsche-bahn),
// and `name` replaces "Munich Re" everywhere in the shared deck.
// Optionally provide `extraReplacements` for client-specific text swaps.
//
// No new folders or files are needed — the dynamic route at
// app/[client]/[[...path]]/route.ts serves any client listed here.

export type ClientDeck = {
  slug: string
  name: string
  extraReplacements?: [string, string][]
}

export const clients: ClientDeck[] = [
  { slug: 'defaultagency', name: 'DefaultAgency' },
  { slug: 'accenture-song-w3fj', name: 'Accenture Song' },
  { slug: 'bbdo-69p7', name: 'BBDO' },
  { slug: 'antoni-jg7e', name: 'antoni' },
  { slug: 'mother-pxqd', name: 'Mother' },
  { slug: 'kemmler-kemmler-pd2x', name: 'Kemmler Kemmler' },
  { slug: 'heimattbwa-86pw', name: 'HeimatTBWA' },
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
]

export function getClient(slug: string): ClientDeck | undefined {
  return clients.find((c) => c.slug === slug)
}
