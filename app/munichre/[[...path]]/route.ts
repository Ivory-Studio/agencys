import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

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
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const segments = (await params).path ?? []
  const requestedPath = segments.length === 0 ? 'index.html' : segments.join('/')
  const filePath = path.resolve(siteRoot, requestedPath)

  if (!filePath.startsWith(`${siteRoot}${path.sep}`) && filePath !== siteRoot) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const file = await readFile(filePath)
    const extension = path.extname(filePath).toLowerCase()

    return new NextResponse(file, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Type': contentTypes[extension] ?? 'application/octet-stream',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
