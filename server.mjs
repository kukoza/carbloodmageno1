import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import fetch from 'node-fetch'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // เพิ่ม CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      
      // จัดการ OPTIONS requests
      if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
      }

      const parsedUrl = parse(req.url, true)
      
      // จัดการ API requests
      if (parsedUrl.pathname.startsWith('/api/')) {
        const apiUrl = `http://43.229.132.209${parsedUrl.pathname.replace('/api', '')}`
        const apiRes = await fetch(apiUrl, {
          method: req.method,
          headers: req.headers,
          body: req.method !== 'GET' ? req : undefined
        })
        const data = await apiRes.json()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
        return
      }

      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
}) 