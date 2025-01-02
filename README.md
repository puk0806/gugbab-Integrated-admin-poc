# gugbab-integrated-admin-poc
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-3A33D1?style=for-the-badge&logo=eslint)
![Turborepo](https://img.shields.io/badge/-Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![VSCode](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=fff)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=none&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white)
![Vanilla Extract](https://img.shields.io/badge/Vanilla_Extract-FFD700?style=for-the-badge&logo=none&logoColor=black)

## System Requirements
- Node >= 20 ([다운로드](https://nodejs.org/ko/download))
- pnpm 9.12.2 ([설치 가이드](https://pnpm.io/installation))
- Python ([다운로드](https://www.python.org/downloads))

## 프로젝트 구성
- **apps**
  - **gugbab-next-admin**: 통합 어드민 애플리케이션
  - **storybook**: 디자인 시스템 Storybook
- **packages**
  - **eslint-config**: 프로젝트 eslint 설정 패키지
  - **icons**: 아이콘 웹폰트 패키지
  - **tsconfig**: 프로젝트 ts 설정 패키지
  - **ui-sass**: Sass UI 라이브러리
  - **ui-vanilla-extract**: Vanilla Extract UI 라이브러리 (미사용)
  - **utils**: 공통 유틸리티 패키지

## Getting Started

### 1. Clone with HTTPS
```bash
git clone https://github.com/puk0806/gugbab-Integrated-admin-poc.git
```


### 2. local https ssl 인증
1. mkcert 설치
    - ```brew install mkcert```
2. 인증서 설치 (설치 이후 브라우저 전체 재시작 필요)
    - ```mkcert -install```
3. 인증서 설치 폴더 이동
    - ```cd apps/gugbab-next-admin```
4. 인증서 발급
    - ```mkcert -key-file cert/local-key.pem -cert-file cert/local-cert.pem gugbab.co.kr local.gugbab.co.kr```
5. 호스트 추가
    - 호스트 설정파일 열기
        ```sudo vim /private/etc/hosts```
    - 호스트 추가
        ```127.0.0.1 local.gugbab.co.kr```

### 3. 패키지 설치
```
pnpm install --frozen-lockfile
```
