const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const OrderBook = require('./orderBook');

const orderBook = new OrderBook();

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  if (req.method === 'GET' && parsed.pathname === '/orders') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(orderBook.getState()));
  } else if (req.method === 'POST' && parsed.pathname === '/orders') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const order = JSON.parse(body);
        const result = orderBook.addOrder(order);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    let filePath = path.join(
      __dirname,
      'public',
      parsed.pathname === '/' ? 'index.html' : parsed.pathname
    );
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      const contentType = ext === '.js' ? 'application/javascript' : 'text/html';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
