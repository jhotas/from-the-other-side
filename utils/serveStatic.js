import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, baseDir) {

    const publicDir = path.join(baseDir, 'public')
    const filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url)
    const ext = path.extname(filePath)
    const contentType = getContentType(ext)

    try {
        const content = await fs.readFile(filePath)
        sendResponse(res, contentType, 200, content)
    } catch(err) {
        if (err.code === 'ENOENT') {
            const content = await fs.readFile(path.join(publicDir, '404.html'))
            sendResponse(res, 'text/html', 404, content)
        } else {
            sendResponse(res, 'text/html', 500, '<html><h1>Server Error: ${err.code}</h1></html>')
        }
    }
}