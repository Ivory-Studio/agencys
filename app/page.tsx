import { clients } from '@/lib/clients'

export default function Home() {
  const decks = clients.map((c) => ({ slug: c.slug, name: c.name }))

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0b] px-6 py-16 text-[#f5f4ef]">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a77ff]">
            IVORY Productions
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Agency presentations.
          </h1>
          <p className="max-w-lg text-pretty text-lg leading-8 text-[#b4b3ad]">
            Each client has a unique link below. New presentations are added here automatically.
          </p>
        </div>

        <ul className="flex flex-col divide-y divide-[#26262a] border-y border-[#26262a]">
          {decks.map((deck) => (
            <li key={deck.slug}>
              <a
                href={`/${deck.slug}/`}
                className="group flex items-center justify-between gap-4 py-5 transition-opacity hover:opacity-70"
              >
                <span className="text-lg font-semibold sm:text-xl">{deck.name}</span>
                <span className="flex items-center gap-3 text-sm text-[#b4b3ad]">
                  <span className="font-mono">/{deck.slug}</span>
                  <span aria-hidden className="text-[#5a77ff]">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
