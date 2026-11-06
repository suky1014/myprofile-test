const fs = require('node:fs/promises');
const path = require('node:path');

async function build() {
  const root = path.resolve(__dirname, '..');
  const output = path.join(root, 'dist');
  await fs.mkdir(output, { recursive: true });
  for (const file of ['index.html', 'style.css']) {
    await fs.copyFile(path.join(root, file), path.join(output, file));
  }
  console.log('Vercel 배포 파일 생성 완료: dist/index.html, dist/style.css');
}

build().catch((error) => {
  console.error('빌드 실패:', error.message);
  process.exitCode = 1;
});
