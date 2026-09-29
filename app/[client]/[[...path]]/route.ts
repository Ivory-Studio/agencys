import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { getClient } from '@/lib/clients'

const siteRoot = path.join(process.cwd(), 'public', 'munichre')
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
  const filePath = path.resolve(siteRoot, requestedPath)

  if (!filePath.startsWith(`${siteRoot}${path.sep}`) && filePath !== siteRoot) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const extension = path.extname(filePath).toLowerCase()
    let file = await readFile(filePath)

    if (extension === '.html') {
      let html = file
        .toString()
        .replaceAll('Munich Re', client.name)
        .replaceAll('Munich%20Re', encodeURIComponent(client.name))
        .replaceAll('/munichre/', `/${slug}/`)
        .replaceAll('href="portraits-', `href="/${slug}/portraits-`)

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

export function HEAD() {
  return new NextResponse(null, { status: 200 })
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
