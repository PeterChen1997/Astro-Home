import { execFileSync } from 'node:child_process'
import { readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const [qshell, mode, refreshFile] = process.argv.slice(2)
const domain = 'https://blog.peterchen97.cn'
const bucket = 'peter-blog'
const contentType = 'application/x-www-form-urlencoded'

const encode = (value) => Buffer.from(value).toString('base64').replaceAll('+', '-').replaceAll('/', '_')

async function setCacheControl(key, cacheControl) {
  const url = `https://rs.qiniuapi.com/chgm/${encode(`${bucket}:${key}`)}/cacheControl/${encode(cacheControl)}`
  let authorization
  try {
    authorization = execFileSync(
      qshell, ['token', 'qiniu', url, '-m', 'POST', '-t', contentType, '-b', ''],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 10000 }
    ).trim()
  } catch {
    throw new Error(`Could not sign cache update for ${key}`)
  }
  if (!/^Qiniu [\w-]+:[\w=-]+$/.test(authorization)) {
    throw new Error(`Invalid Qiniu authorization for ${key}`)
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: authorization, 'Content-Type': contentType },
    redirect: 'error',
    signal: AbortSignal.timeout(15000)
  })
  if (!response.ok) {
    throw new Error(`Cache update for ${key} failed (HTTP ${response.status})`)
  }
}

async function htmlKeys(directory = '') {
  const entries = await readdir(join('dist', directory), { withFileTypes: true })
  const keys = await Promise.all(entries.map((entry) => {
    const key = join(directory, entry.name)
    if (entry.isDirectory()) return htmlKeys(key)
    return entry.isFile() && key.endsWith('.html') ? [key] : []
  }))
  return keys.flat()
}

if (mode === 'assets') {
  const assets = await readdir('dist/_astro')
  for (const asset of assets.filter((name) => /\.[a-f0-9]{8}\.(js|css)$/.test(name))) {
    await setCacheControl(`_astro/${asset}`, 'public, max-age=31536000, immutable')
  }
} else if (mode === 'html' && refreshFile) {
  const urls = []
  for (const key of (await htmlKeys()).sort()) {
    await setCacheControl(key, 'no-cache')
    const encodedPath = key.split('/').map(encodeURIComponent).join('/')
    urls.push(`${domain}/${encodedPath}`)
    if (key === 'index.html' || key.endsWith('/index.html')) {
      urls.push(`${domain}/${encodedPath.slice(0, -'index.html'.length)}`)
    }
  }
  await writeFile(refreshFile, `${urls.join('\n')}\n`)
} else {
  throw new Error('Use assets or html with a refresh-list path')
}
