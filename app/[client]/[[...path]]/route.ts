import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { getClient } from '@/lib/clients'

const siteRoot = path.join(process.cwd(), 'public', 'munichre')
const langRoots: Record<string, string> = {
  zh: path.join(process.cwd(), 'public', 'munichre-zh'),
  'en-eb': path.join(process.cwd(), 'public', 'munichre-en-eb'),
  'de-eb': path.join(process.cwd(), 'public', 'munichre-de-eb'),
  'de-buch': path.join(process.cwd(), 'public', 'munichre-de-buch'),
}
const contentTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ client: string; path?: string[] }> },
) {
  const { client: slug, path: segments = [] } = await params
  const client = getClient(slug)

  if (!client) {
    return new NextResponse('Not found', { status: 404 })
  }

  const requestedPath = segments.length === 0 ? 'index.html' : segments.join('/')

  // Guard against path traversal using the shared root, then pick the
  // language root for HTML. Assets always come from the shared root.
  const safePath = path.resolve(siteRoot, requestedPath)
  if (!safePath.startsWith(`${siteRoot}${path.sep}`) && safePath !== siteRoot) {
    return new NextResponse('Not found', { status: 404 })
  }

  const extension = path.extname(safePath).toLowerCase()
  const langRoot = client.lang ? langRoots[client.lang] : undefined
  const filePath =
    langRoot && extension === '.html'
      ? path.join(langRoot, path.relative(siteRoot, safePath))
      : safePath

  try {
    let file = await readFile(filePath)

    if (extension === '.html') {
      let html = file
        .toString()
        .replaceAll('Munich Re', client.name)
        .replaceAll('Munich%20Re', encodeURIComponent(client.name))
        .replaceAll('/munichre/', `/${slug}/`)
        .replaceAll('href="portraits-', `href="/${slug}/portraits-`)

      // Einzelne Abschnitte pro Kunde ausblenden (die Abschnitte sind
      // Geschwister, verschachtelte <section> gibt es im Deck nicht).
      for (const id of client.removeSections ?? []) {
        html = html.replace(
          new RegExp(`\\n?[ \\t]*<section id="${id}"[\\s\\S]*?\\n[ \\t]*</section>\\n?`, 'g'),
          '\n',
        )
      }

      // Zwei Referenz-Abschnitte tauschen. Der eingetauschte Abschnitt übernimmt
      // id, Nummer ("Referenz 01", "01 / 04") und den "Nächste"-Link seines Platzes.
      for (const [a, b] of client.swapSections ?? []) {
        html = swapSections(html, a, b)
      }

      for (const [from, to] of client.extraReplacements ?? []) {
        html = html.replaceAll(from, to)
      }

      file = Buffer.from(html)
    }

    return new NextResponse(file, {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': contentTypes[extension] ?? 'application/octet-stream',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}

function sectionPattern(id: string) {
  return new RegExp(`<section id="${id}"[\\s\\S]*?\\n[ \\t]*</section>`)
}

function slotInfo(section: string) {
  const id = section.match(/<section id="([^"]+)"/)?.[1] ?? ''
  const num = id.match(/(\d+)$/)?.[1]?.padStart(2, '0') ?? ''
  const next = section.match(/<a href="(#[^"]+)"[^>]*>Nächste/)?.[1] ?? ''
  return { id, num, next }
}

function fitToSlot(section: string, from: ReturnType<typeof slotInfo>, to: ReturnType<typeof slotInfo>) {
  let out = section.replace(`<section id="${from.id}"`, `<section id="${to.id}"`)
  if (from.num && to.num) {
    out = out.replace(`Referenz ${from.num}`, `Referenz ${to.num}`).replace(`>${from.num} / `, `>${to.num} / `)
  }
  if (from.next && to.next) {
    out = out.replace(new RegExp(`<a href="${from.next}"([^>]*>Nächste)`), `<a href="${to.next}"$1`)
  }
  return out
}

function swapSections(html: string, a: string, b: string) {
  const sa = html.match(sectionPattern(a))?.[0]
  const sb = html.match(sectionPattern(b))?.[0]
  if (!sa || !sb) return html
  const ia = slotInfo(sa)
  const ib = slotInfo(sb)
  const placeholder = '\u0000SWAP\u0000'
  return html
    .replace(sa, placeholder)
    .replace(sb, () => fitToSlot(sa, ia, ib))
    .replace(placeholder, () => fitToSlot(sb, ib, ia))
}

export function HEAD() {
  return new NextResponse(null, { status: 200 })
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
