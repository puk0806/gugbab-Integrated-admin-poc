# Cursor AI 개발 가이드

이 문서는 Gugbab Integrated Admin POC 프로젝트에서 Cursor AI를 활용한 개발을 위한 가이드입니다.

## 📁 커서룰 구조

프로젝트에는 다음과 같은 커서룰들이 설정되어 있습니다:

### 🔧 프로젝트 전체 규칙

#### 1. **project-overview.mdc** (항상 적용)
- 프로젝트 전체 개요 및 아키텍처 가이드라인
- 모노레포 구조, 기술 스택, 아키텍처 원칙 정의

#### 2. **development-workflow.mdc** (항상 적용)
- 개발 워크플로우 및 코드 품질 관리
- TypeScript 규칙, 테스트, 빌드, 성능 최적화

### 🎯 기술별 규칙

#### 3. **nextjs-admin.mdc** (Next.js 관리자 시스템)
- Next.js App Router 기반 관리자 시스템 개발 가이드라인
- Feature-based 구조, 컴포넌트 개발 규칙, API 개발 규칙

#### 4. **nextjs-16-docs.mdc** (Next.js 16 문서)
- Next.js 16 주요 변경사항 및 새로운 기능
- Turbopack 기본화, Cache Components, 새로운 캐싱 API

#### 5. **react-19-docs.mdc** (React 19 문서)
- React 19 새로운 기능: 액션, 낙관적 업데이트, 리소스 사전 로드
- 액션 패턴, useOptimistic, 커스텀 엘리먼트 지원

#### 6. **ui-components.mdc** (UI 컴포넌트 라이브러리)
- UI 컴포넌트 라이브러리 개발 가이드라인
- 컴포넌트 구조, 스타일링 규칙, 개발 워크플로우

#### 7. **types-and-utils.mdc** (타입 정의 및 유틸리티)
- 타입 정의와 유틸리티 개발 가이드라인
- gugbab-types와 utils 패키지 개발 규칙

#### 8. **api-development.mdc** (API 개발)
- API 개발 및 데이터 관리 가이드라인
- TanStack Query 사용법, 에러 처리, 캐싱 전략

#### 9. **feature-sliced-design.mdc** (FSD 아키텍처)
- Feature-Sliced Design 아키텍처 가이드라인
- 레이어 구조, 의존성 규칙, 슬라이스 구조

#### 10. **tanstack-query.mdc** (TanStack Query v5)
- TanStack Query v5 개발 가이드라인
- 새로운 API 구조, 무한 쿼리, 병렬 쿼리, 캐싱 전략

#### 11. **zod-validation.mdc** (Zod 스키마 검증)
- Zod 스키마 검증 가이드라인
- 스키마 정의, React Hook Form 통합, API 검증

#### 12. **ag-grid.mdc** (AG Grid 데이터 그리드)
- AG Grid 데이터 그리드 가이드라인
- 기본 설정, 커스텀 렌더러, 서버 사이드 처리

#### 13. **zustand-state.mdc** (Zustand 상태 관리)
- Zustand 상태 관리 가이드라인
- 스토어 생성, 미들웨어 활용, 성능 최적화

#### 14. **jest-testing.mdc** (Jest 테스팅)
- Jest 테스팅 가이드라인
- 컴포넌트 테스트, API 테스트, 통합 테스트

## 🚀 사용 방법

### 자동 적용 규칙
- `alwaysApply: true`로 설정된 규칙들은 자동으로 적용됩니다
- 프로젝트 전체 규칙과 개발 워크플로우 규칙이 항상 적용됩니다

### 파일별 적용 규칙
- `globs` 패턴에 따라 특정 파일에서만 적용됩니다
- 예: `**/api/**/*` 패턴은 API 관련 파일에서만 적용

### 수동 호출
- `@ruleName`으로 특정 규칙을 수동으로 호출할 수 있습니다
- 예: `@nextjs-16-docs`로 Next.js 16 관련 가이드라인 호출

## 📚 주요 기술 문서

### 프레임워크 및 라이브러리
- **[Next.js 16 (beta)](https://nextjs.org/blog/next-16-beta)** - Next.js 16 주요 변경사항 및 새로운 기능
- **[React 19](https://ko.react.dev/blog/2024/12/05/react-19)** - React 19 새로운 기능 및 업그레이드 가이드
- **[Feature-Sliced Design](https://feature-sliced.design/kr/docs/get-started/overview)** - 프로젝트 아키텍처 패턴

### 상태 관리 및 데이터
- **[TanStack Query v5](https://tanstack.com/query/v5/docs/framework/react/overview)** - 서버 상태 관리
- **[Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)** - 클라이언트 상태 관리
- **[Zod](https://zod.dev/)** - 스키마 검증

### UI 및 컴포넌트
- **[AG Grid](https://www.ag-grid.com/javascript-data-grid/getting-started/)** - 데이터 그리드
- **[Storybook](https://storybook.js.org/)** - UI 컴포넌트 문서화

### 테스팅
- **[Jest](https://jestjs.io/docs/getting-started)** - 테스팅 프레임워크

## 📋 기술 문서 목록

### 프레임워크 및 라이브러리
- **[Next.js 16 (beta)](https://nextjs.org/blog/next-16-beta)** - Next.js 16 주요 변경사항 및 새로운 기능
- **[Next.js 16 업그레이드 가이드](https://nextjs.org/docs/app/guides/upgrading/version-16)** - Next.js 15에서 16으로 업그레이드 방법
- **[@next/codemod CLI 문서](https://nextjs.org/docs/app/building-your-application/upgrading/codemods)** - 자동 코드 마이그레이션 도구
- **[React 19](https://ko.react.dev/blog/2024/12/05/react-19)** - React 19 새로운 기능 및 업그레이드 가이드
- **[Feature-Sliced Design](https://feature-sliced.design/kr/docs/get-started/overview)** - 프로젝트 아키텍처 패턴

### 상태 관리 및 데이터
- **[TanStack Query v5](https://tanstack.com/query/v5/docs/framework/react/overview)** - 서버 상태 관리
- **[TanStack Query 마이그레이션 가이드](https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5)** - v4에서 v5로 마이그레이션
- **[TanStack Query 베스트 프랙티스](https://tanstack.com/query/v5/docs/react/guides/best-practices)** - 최적화 가이드
- **[Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)** - 클라이언트 상태 관리
- **[Zustand 미들웨어 가이드](https://zustand.docs.pmnd.rs/guides/middleware)** - 미들웨어 활용법
- **[Zustand 베스트 프랙티스](https://zustand.docs.pmnd.rs/guides/best-practices)** - 개발 가이드라인
- **[Zod](https://zod.dev/)** - 스키마 검증
- **[Zod React Hook Form 통합](https://zod.dev/?id=react-hook-form)** - 폼 검증 통합
- **[Zod 베스트 프랙티스](https://zod.dev/?id=best-practices)** - 스키마 설계 가이드

### UI 및 컴포넌트
- **[AG Grid](https://www.ag-grid.com/javascript-data-grid/getting-started/)** - 데이터 그리드
- **[AG Grid React 가이드](https://www.ag-grid.com/react-data-grid/)** - React 통합
- **[AG Grid 성능 최적화](https://www.ag-grid.com/javascript-data-grid/performance/)** - 성능 튜닝
- **[Storybook](https://storybook.js.org/)** - UI 컴포넌트 문서화

### 테스팅
- **[Jest](https://jestjs.io/docs/getting-started)** - 테스팅 프레임워크
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** - React 컴포넌트 테스트
- **[MSW (Mock Service Worker)](https://mswjs.io/docs/)** - API 모킹

## 🎯 개발 시나리오별 가이드

### 새 기능 개발
1. **아키텍처 확인**: `@feature-sliced-design` 규칙 참조
2. **API 개발**: `@api-development` 규칙 참조
3. **상태 관리**: `@zustand-state` 또는 `@tanstack-query` 규칙 참조
4. **UI 컴포넌트**: `@ui-components` 규칙 참조
5. **테스트 작성**: `@jest-testing` 규칙 참조

### Next.js 16 마이그레이션
1. **변경사항 확인**: `@nextjs-16-docs` 규칙 참조
2. **React 19 업그레이드**: `@react-19-docs` 규칙 참조
3. **자동 마이그레이션**: `npx @next/codemod@canary upgrade beta`

### 데이터 그리드 구현
1. **AG Grid 설정**: `@ag-grid` 규칙 참조
2. **서버 사이드 처리**: TanStack Query와 연동
3. **커스텀 렌더러**: 프로젝트 디자인 시스템 적용

### 폼 검증 구현
1. **Zod 스키마**: `@zod-validation` 규칙 참조
2. **React Hook Form**: Zod와 통합
3. **에러 처리**: 사용자 친화적 에러 메시지

## 🔧 커서룰 커스터마이징

### 새 규칙 추가
1. `.cursor/rules/` 폴더에 `.mdc` 파일 생성
2. YAML 프론트매터로 메타데이터 설정
3. 마크다운으로 가이드라인 작성

### 규칙 수정
1. 기존 `.mdc` 파일 편집
2. `description`, `globs`, `alwaysApply` 설정 조정
3. 프로젝트 특성에 맞게 가이드라인 업데이트

### 규칙 비활성화
- `alwaysApply: false`로 설정
- `globs` 패턴에서 제외
- 파일명에 `.disabled` 접미사 추가

## 📖 추가 리소스

### 공식 문서
- [Cursor Rules 공식 문서](https://docs.cursor.com/en/context/rules)
- [Cursor AI 가이드](https://docs.cursor.com/)

### 커뮤니티 리소스
- [Cursor 커뮤니티](https://community.cursor.com/)
- [GitHub 커서룰 컬렉션](https://github.com/topics/cursor-rules)

---

**참고**: 이 가이드는 프로젝트의 현재 상태를 반영하며, 새로운 기술이나 도구가 추가될 때마다 업데이트됩니다.
