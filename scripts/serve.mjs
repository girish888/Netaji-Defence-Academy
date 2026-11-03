import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
const headersText = await readFile('dist/_headers', 'utf8');
const headers = Object.fromEntries(
  headersText
    .split('\n')
    .filter((line) => line.startsWith('  '))
    .map((line) => {
      const separator = line.indexOf(':');
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }),
);

http
  .createServer(async (request, response) => {
    try {
      const url = new URL(request.url || '/', 'http://localhost');
      let file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
      if (file !== root && !file.startsWith(root + path.sep)) {
        response.writeHead(403);
        response.end();
        return;
      }
      let status = 200;
      try {
        if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
      } catch {
        file = path.join(root, '404.html');
        status = 404;
      }
      const data = await readFile(file);
      response.writeHead(status, {
        ...headers,
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      });
      response.end(data);
    } catch {
      response.writeHead(500);
      response.end('Unable to serve this request.');
    }
  })
  .listen(4173, '127.0.0.1', () => console.log('Local preview: http://127.0.0.1:4173'));
