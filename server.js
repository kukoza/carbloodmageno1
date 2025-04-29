const http = require('http');
const { parse } = require('url');
const next = require('next');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer(async (req, res) => {
    try {
      // เพิ่ม CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      // จัดการ OPTIONS requests
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      const parsedUrl = parse(req.url, true);
      
      // จัดการ API requests
      if (parsedUrl.pathname.startsWith('/api/')) {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const apiUrl = `http://43.229.132.209${parsedUrl.pathname.replace('/api', '')}`;
            const response = await axios({
              method: req.method,
              url: apiUrl,
              headers: {
                ...req.headers,
                host: '43.229.132.209'
              },
              data: body || undefined
            });

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(response.status);
            res.end(JSON.stringify(response.data));
          } catch (error) {
            console.error('API Error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          }
        });
        return;
      }

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}); 