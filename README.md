# 개인 프로필 웹사이트

HTML과 CSS로 만든 반응형 개인 프로필 사이트입니다. Node.js 내장 HTTP 모듈로 실행하며 추가 패키지가 필요하지 않습니다.

## 실행

Node.js가 설치된 환경에서 프로젝트 폴더로 이동한 뒤 실행하세요.

```sh
npm start
```

브라우저에서 http://localhost:3000 에 접속하세요. 종료하려면 `Ctrl+C`를 누르세요.

## 파일

- `index.html`: 이름, 소개, 관심 분야, 연락처
- `style.css`: 디자인 및 모바일 레이아웃
- `server.js`: 로컬 HTTP 서버

사진과 Google Fonts는 외부 서비스를 사용하므로 인터넷 연결이 필요합니다. 예시 사진과 이메일은 본인의 정보로 교체하세요.

## Vercel 배포

Vercel에서는 `vercel.json` 설정에 따라 `npm run build`를 실행하고 `dist` 폴더의 HTML과 CSS를 정적 파일로 제공합니다. 로컬 실행에는 계속 `npm start`를 사용합니다.

- Git 저장소: `suky1014/myprofile-test`, Production 브랜치: `main`
- Root Directory: 저장소 최상위 (기본값)
- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `dist`

GitHub 연동이 활성화되어 있으면 Push 후 자동 배포됩니다. 수동 재배포 시에는 수정 커밋이 포함된 최신 배포를 선택하세요.
