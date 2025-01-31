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

기본적으로 위 환경이 필요합니다.\
MacOS, WSL2, VSCode에서 구동이 확인되었습니다.

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
#### 2-1 Mac 환경
1. mkcert 설치
   - `brew install mkcert`

2. 인증서 설치 (설치 이후 브라우저 전체 재시작 필요)
   - `mkcert -install`
   
3. 인증서 설치 폴더 이동
   - `cd apps/gugbab-next-admin`

4. 인증서 발급
   - `mkcert -key-file cert/local-key.pem -cert-file cert/local-cert.pem gugbab.co.kr local.gugbab.co.kr`
   
5. 호스트 추가
   - 호스트 설정파일 열기
     `sudo vim /private/etc/hosts`
   - 호스트 추가
     `127.0.0.1 local.gugbab.co.kr`

#### 2-2 Window 환경
1. chocolatey 설치 ([다운로드](https://chocolatey.org/))

2. mkcert 설치
    - `choco install mkcert`
3. 인증서 설치 폴더 이동
   - `cd apps/gugbab-next-admin`

4. 인증서 발급
   - `mkcert -key-file cert/local-key.pem -cert-file cert/local-cert.pem gugbab.co.kr local.gugbab.co.kr`
   
5. 호스트 추가
   - 호스트 설정파일 열기
     `sudo vim /private/etc/hosts`
   - 호스트 추가
     `127.0.0.1 local.gugbab.co.kr`


### 3. 패키지 설치

```
pnpm install --frozen-lockfile
```

### 4. Icons, Utils,UI Package 빌드

```
pnpm generate-icons
pnpm build:utils
pnpm build:ui
```

### 5. Git Hook 설정

1. terminal 아래 명령어 실행
```
pnpm use-hook
```

2. 생성된 githooks.config.json파일에 아래 내용 적용하기
```
{
  "checkQualityBeforePush": true,
  "checkTypeBeforePush": true
}
```

## Script Description

```bash
# 모든 서비스 개발 서버 실행
pnpm dev

# App 서비스 개발 서버 실행
pnpm dev:app

# Storybook 서비스 개발 서버 실행
pnpm dev:storybook

# Ui Sass 서비스 개발 서버 실행
pnpm dev:ui:sass

# Ui Vanilla Extract 서비스 개발 서버 실행
pnpm dev:vanilla

# 모든 서비스 빌드 실행
pnpm build

# App 서비스 빌드
pnpm build:app

# App 서비스 Docker 빌드
pnpm build:docker

# App 서비스 Docker 실행
pnpm start:docker

# Storybook 서비스 빌드
pnpm build:storybook

# Ui Sass 서비스 빌드
pnpm build:ui:sass

# Ui Vanilla Extract 서비스 빌드
pnpm build:ui:vanilla

# 공통 Utils 서비스 빌드
pnpm build:utils

# 모든 서비스 타입 체크
pnpm typecheck

# App 서비스 타입 체크
pnpm typecheck:app

# Storybook 서비스 타입 체크
pnpm typecheck:storybook

# Ui Sass 서비스 타입 체크
pnpm typecheck:ui:sass

# Ui Vanilla Extract 서비스 타입 체크
pnpm typecheck:ui:vanilla

# 공통 Utils 서비스 타입 체크
pnpm typecheck:utils

# 모든 서비스 테스트
pnpm test

# App 서비스 테스트
pnpm test:app

# Storybook에서 사용하기 위해 Ui Sass Compile
pnpm compile:storybook:sass

# 공통 컴포넌트 생성 Generate
pnpm generate-component

# Svg Icon 아이콘 폰트 Generate
pnpm generate-icons

# Svg Icon 정리
pnpm fix-svg

# Cache/ Node Module 제거후 재설치
pnpm clear-install

# Commit Push Check Git Hook
pnpm use-hook
```

## Git Commit Naming

---

### 구조

- body 와 footer 는 생략 가능

```
service : Service

type: Subject

body

footer
```

### Service

```
app: 통합 어드민 애플리케이션
storybook: 디자인 시스템 Storybook
ui: 공통 UI 라이브러리
utils: 공통 유틸리티 패키지
icons: 아이콘 웹폰트 패키지
eslint:프로젝트 eslint 설정 패키지
tsconfig:프로젝트 ts 설정 패키지
all: 공통 설정 수정
```

### Type

```
Add: 새로운 기능 추가
Remove: 파일 및 코드 삭제
Fix: 버그 수정
Modify: 기존 코드의 기능을 추가하거나 변경
Improve: 호환성, 테스트 커버리지, 성능, 검증 기능, 접근성 등의 향상
Refactor: 중복 코드 제거나 변수명 변경, 가독성 향상 등 기존 코드 개선
Simplify: Refactor와 유사하지만 약한 수정, 코드 단순화
Move: 코드나 파일 이동
Rename: 코드나 파일 이름 변경
Merge: 코드 병합
```

### Subject

- 제목. 코드 변경사항에 대한 짧은 요약
- 마침표 및 특수 기호는 사용하지 않음
- 영문으로 표기하는 경우 동사를 가장 앞에 두고 첫 글자는 대문자로 표기

### Body

- 한 줄에 72자 이내로 작성
- 어떻게 보다는 무엇을, 왜 변경했는지를 작성
- 최대한 자세히 작성

### Footer

- issue tracker id 를 명시할 때 사용
- 여러 개의 이슈를 참조할 때는 콤마로 구분하여 사용

```
Fixes: 이슈 수정 중
Resolves: 이슈를 해결했을 때
Ref: 참고할 이슈가 있을 때
Related to: 해당 커밋에 관련된 이슈가 있을 때
```

## Application 프로젝트 구조

- [Feature-Sliced Design(FSD)](https://feature-sliced.design/) 아키텍처를 기반으로 구축한 Next POC 프로젝트
- **관심사의 분리**: 기능(Feature)별로 코드를 구성하여 관심사를 명확히 분리합니다.
- **레이어 기반 구조**: 애플리케이션을 여러 레이어(`app`, `widgets`, `features`, `shared`)로 나누어 구성합니다.
  - 표준 FSD에서 권장하는 `processes`, `entities` 레이어는 **미사용**합니다.
- **단방향 의존성**: 상위 레이어는 하위 레이어에 의존할 수 있지만, 하위 레이어가 상위 레이어에 의존하는 것은 지양합니다.
- **App Router 사용**: Next.js App Router를 사용함으로써 별도의 `pages` 폴더 대신 `app` 폴더에서 라우팅과 UI를 정의합니다.

### Application 폴더 구조

```
.
├── src
│   ├── app
│   │   ├── _providers
│   │   ├── _styles
│   │   ├── api
│   │   ├── login
│   │   │   ├── page.tsx
│   │   │   ├── client.tsx
│   │   │   ├── index.module.scss
│   │   │   └── ...
│   │   ├── page.tsx
│   │   ├── client.tsx
│   │   └── ...
│   ├── widgets
│   │   ├── layout
│   │   │   ├── ui
│   │   │   └── ...
│   │   └── ...
│   ├── features
│   │   ├── login
│   │   │   ├── ui
│   │   │   ├── api
│   │   │   ├── types
│   │   │   ├── index.ts
│   │   │   └── ...
│   │   └── ...
│   └── shared
│       ├── fetch
│       │   ├── consts
│       │   ├── types
│       │   ├── utils
│       │   ├── index.ts
│       │   └── ...
│       └── ...
├── server.js
├── next.config.mjs
├── jest.config.ts
├── DockerFile
├── package.json
├── .eslintrc.json
├── tsconfig.json
└── ...
```

### 각 레이어 설명

- app
  - Next.js App Router가 동작하는 최상위 레이어입니다.
  - 전역 스타일(\_styles), 전역 프로바이더(\_providers), 라우팅(page.tsx 등), 전역 타입 선언 등을 포함합니다.
- widgets
  - 페이지를 구성하는 독립적인 UI 블록입니다.
  - Header, Footer, Sidebar, Layout 등 여러 곳에서 재사용될 수 있는 UI 컨테이너를 정의합니다.
- features
  - 비즈니스 가치를 전달하는 사용자 시나리오와 기능을 다룹니다.
  - 로그인, 회원가입, 게시물 작성 등 하나의 기능으로 묶이는 UI 및 로직을 포함합니다.
- shared
  - 특정 비즈니스 로직에 종속되지 않은, 범용적이고 재사용 가능한 코드를 모아둡니다.

### 의존성 규칙

#### can use

- app : shared, features,widgets
- widgets : shared, features
- features : shared

#### can be used by

- shared : feature, widgets, app
- feature : widgets, app
- widgets : app

### 각 세그먼트 설명

- api - 서버 요청/응답 처리를 담당합니다
- ui - 특정 슬라이스(폴더) 내에서 사용하는 UI 컴포넌트를 관리합니다.
- types - 타입스크립트 타입 정의를 모아둡니다
- hooks - 커스텀 React 훅을 정의합니다
- utils - 해당 슬라이스에서만 사용되는 유틸 함수나 헬퍼 함수를 정의합니다.
- consts - 상수(Constant)들을 정의합니다.
