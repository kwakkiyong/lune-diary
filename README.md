# LuneDiary 🌙

감정 일기 & AI 요약 대시보드 서비스

## 개요

LuneDiary는 사용자가 하루의 감정을 텍스트로 기록하면 OpenAI GPT API가 감정을 분석하고 요약해주는 서비스입니다. 감정에 따라 배경 애니메이션이 변경되고, YouTube API를 통해 감정에 맞는 음악을 추천합니다.

## 기술 스택

- **React 19** - 최신 React 기능
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 개발 서버 및 빌드
- **pnpm** - 효율적인 패키지 관리
- **React Router** - 클라이언트 사이드 라우팅
- **Tailwind CSS** - 유틸리티 기반 CSS (다크모드 지원)
- **Zustand** - 경량 상태 관리
- **Zod** - 스키마 검증
- **Axios** - HTTP 클라이언트
- **Shadcn UI** - UI 컴포넌트 라이브러리
- **Recharts** - 차트 라이브러리
- **Framer Motion** - 애니메이션 라이브러리

## 주요 기능

### 1. 감정 일기 작성 및 AI 분석
- 일기 텍스트 입력
- OpenAI GPT API를 통한 감정 분석
- 감정 이름, 점수(0~100), 한 줄 요약, 키워드 3개 제공

### 2. 감정별 배경 애니메이션
- 감정에 따라 배경 색상과 애니메이션 패턴 변경
  - 행복/기쁨: 부드러운 노랑/분홍 파동 애니메이션
  - 슬픔/우울: 천천히 흐르는 어두운 파랑/보라 그래디언트
  - 분노: 붉은 색 파형 효과
  - 평온/불안: 차분한 그라디언트

### 3. YouTube 음악 추천
- 감정 라벨 기반으로 YouTube에서 음악 검색
- 추천 음악 리스트 표시 (썸네일, 제목, 채널)

### 4. 감정 통계 대시보드
- 최근 7일/30일/전체 필터
- 감정별 비율 원형 차트
- 감정 점수 추이 라인 차트
- 키워드 빈도 막대 차트

### 5. 설정 관리
- OpenAI API 키 설정
- YouTube API 키 설정 (선택사항)
- 감정 분석 프롬프트 템플릿 수정

## 시작하기

### 필수 요구사항

- Node.js 18 이상
- pnpm 설치 (`npm install -g pnpm`)

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd lune-diary

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

### 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
VITE_YOUTUBE_API_KEY=your-youtube-api-key-here
```

또는 Settings 페이지에서 직접 입력할 수 있습니다.

### API 키 발급

- **OpenAI API 키**: https://platform.openai.com/api-keys
- **YouTube Data API v3 키**: https://console.cloud.google.com/apis/credentials

## 프로젝트 구조

```
lune-diary/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── ui/              # Shadcn UI 컴포넌트
│   │   ├── EmotionBackground.tsx
│   │   └── Layout.tsx
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── Insights.tsx
│   │   └── Settings.tsx
│   ├── stores/             # Zustand 스토어
│   │   ├── useEntryStore.ts
│   │   ├── useSettingsStore.ts
│   │   └── useUIStore.ts
│   ├── lib/                 # 유틸리티 및 클라이언트
│   │   ├── openaiClient.ts
│   │   ├── youtubeClient.ts
│   │   └── storage/
│   ├── types/               # TypeScript 타입 정의
│   └── hooks/               # 커스텀 훅
├── public/
└── package.json
```

## 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

## 배포

Vercel에 배포할 수 있습니다:

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

## 데이터 저장

현재는 LocalStorage에 데이터를 저장합니다. 추후 IndexedDB로 확장 가능하도록 설계되어 있습니다.

## 라이선스

MIT

## 기여

이슈 및 Pull Request를 환영합니다!
