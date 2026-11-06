const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const port = 3000;
// 공개할 파일만 지정해 서버 소스나 설정 파일의 노출을 방지합니다.
const routes = new Map([
  ['/', { file: 'index.html', type: 'text/html; charset=utf-8' }],
  ['/index.html', { file: 'index.html', type: 'text/html; charset=utf-8' }],
  ['/style.css', { file: 'style.css', type: 'text/css; charset=utf-8' }],
]);

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end('Method Not Allowed');
    return;
  }

  let pathname;
  try {
    pathname = new URL(req.url, 'http://localhost').pathname;
  } catch {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  const resource = routes.get(pathname);
  if (!resource) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(req.method === 'HEAD' ? undefined : '페이지를 찾을 수 없습니다.');
    return;
  }

  try {
    const content = await fs.readFile(path.join(__dirname, resource.file));
    res.writeHead(200, {
      'Content-Type': resource.type,
      'Content-Length': content.length,
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch (error) {
    console.error('파일 읽기 실패:', error.message);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(req.method === 'HEAD' ? undefined : '서버 오류가 발생했습니다.');
  }
});

server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE'
    ? '3000번 포트가 이미 사용 중입니다. 해당 서버를 종료한 뒤 다시 실행해 주세요.'
    : `서버 실행 실패: ${error.message}`);
  process.exit(1);
});

server.listen(port, 'localhost', () => {
  console.log(`프로필 웹사이트: http://localhost:${port}`);
  console.log('종료하려면 Ctrl+C를 누르세요.');
});
