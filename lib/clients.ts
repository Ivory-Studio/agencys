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

export const clients: ClientDeck[] = [{ slug: 'munichre', name: 'Munich Re' }]

export function getClient(slug: string): ClientDeck | undefined {
  return clients.find((c) => c.slug === slug)
}
