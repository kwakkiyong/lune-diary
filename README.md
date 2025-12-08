# LuneDiary 🌙

#### 📝 감정 일기 & AI 요약 대시보드 서비스

LuneDiary는 사용자가 하루의 감정을 텍스트로 기록하면 OpenAI GPT API가 감정을 분석하고 요약해주는 서비스입니다.  
감정에 따라 배경 애니메이션이 변경되고, YouTube API를 통해 감정에 맞는 음악을 추천합니다.

## API 키 발급

---

- **OpenAI API 키**: https://platform.openai.com/api-keys
- **YouTube Data API v3 키**: https://console.cloud.google.com/apis/credentials

## 기술 스택

---

- **React 19** - 최신 React 기능
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 개발 서버 및 빌드
- **pnpm** - 효율적인 패키지 관리
- **React Router** - 클라이언트 사이드 라우팅
- **Tailwind CSS** - 유틸리티 기반 CSS
- **Zustand** - 경량 상태 관리
- **Zod** - 스키마 검증
- **Axios** - HTTP 클라이언트
- **Shadcn UI** - UI 컴포넌트 라이브러리
- **Recharts** - 차트 라이브러리
- **Framer Motion** - 애니메이션 라이브러리

## 1. 기능

---
메뉴는 **``Home``, ``Calendar``, ``Insights``** 로 구성되어 있습니다.

### 1-1) 📔 ``Home`` : 감정 일기 작성 및 AI 분석

- 일기 텍스트 입력
- OpenAI GPT API를 통한 감정 분석
- 감정 이름, 점수(0~100), 한 줄 요약, 키워드 3개 제공
- 감정에 따라 배경 색상과 애니메이션 패턴 변경
- Youtube API Key 설정 시 감정 라벨 기반으로 YouTube에서 음악 검색 및 추천 음악 리스트 표시

### 1-2) 📅 ``Calendar`` : 일기 달력 및 상세보기

- 날짜별 일기 목록 확인
- 일기 상세 내용 모달로 확인
- 감정 점수 및 키워드 시각화

### 1-3) 📊 ``Insights`` : 감정 통계 대시보드

- 최근 7일, 30일, 전체 필터
- 감정별 비율 원형 차트
- 감정 점수 추이 라인 차트
- 키워드 빈도 막대 차트

## 2. 환경 변수 설정

---
`.env.example` 파일을 참고하여 `.env` 파일을 프로젝트 루트에 생성하고 다음 변수를 설정하세요:

```
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
VITE_YOUTUBE_API_KEY=your-youtube-api-key-here
```

## 3. 구현

---

### 3-1) 상태 관리

데이터의 상태 관리는 **Zustand**를 이용하였습니다.

- **useEntryStore**: 일기 데이터를 관리하며, `zustand/middleware`의 `persist`를 사용하여 localStorage에 자동 저장됩니다. 새로고침하여도 일기 데이터가 유지됩니다.
- **useAnalysisStore**: 현재 분석 중인 감정 분석 결과를 전역으로 관리하여 Layout 컴포넌트에서 배경 애니메이션에 활용합니다.
- **useMusicStore**: 현재 재생 중인 음악, 플레이리스트, 볼륨 상태를 관리하며, 볼륨과 음소거 상태는 localStorage에 저장됩니다.
- **useSettingsStore**: 감정 분석에 사용되는 프롬프트 템플릿을 관리하며 localStorage에 저장됩니다.

### 3-2) API 호출 및 감정 분석

**Axios**를 이용하여 API 요청을 처리합니다.

- 사용자가 일기 텍스트를 입력하고 분석 버튼을 클릭하면, `useEmotionAnalysis` 훅에서 `.env` 파일의 `VITE_OPENAI_API_KEY`를 읽어 OpenAI GPT-4o-mini API를
  호출합니다.
- API 요청이 성공적으로 이루어졌을 경우 감정 분석 결과(감정 라벨, 점수, 요약, 키워드)가 나타나며, 분석된 감정에 따라 배경 애니메이션이 동적으로 변경됩니다.
- 분석된 감정 라벨을 기반으로 YouTube Data API v3를 호출하여 감정에 맞는 음악을 검색하고 추천 플레이리스트를 생성합니다. YouTube API 키는 선택사항이며, `.env` 파일의
  `VITE_YOUTUBE_API_KEY`에서 읽어옵니다.

### 3-3) 배경 애니메이션

**Framer Motion**을 이용하여 감정에 따른 배경 애니메이션을 구현하였습니다.

- `MoodBackground` 컴포넌트에서 현재 분석된 감정(`emotionLabel`)에 따라 다른 애니메이션 패턴을 보여줍니다.
- 각 감정별로 비, 별, 꽃잎, 불꽃, 안개 등 다양한 애니메이션 효과가 적용되며, `useMemo`를 활용하여 성능을 최적화했습니다.

### 3-4) 음악 재생 기능

- 분석된 감정에 맞는 음악 추천 결과를 `map()`을 이용하여 카드 형태로 표시합니다.
- 사용자가 원하는 음악을 클릭하면 `useMusicStore`의 `setCurrentVideo`를 통해 현재 재생 음악으로 설정됩니다.
- `MusicPlayerFooter` 컴포넌트에서 YouTube IFrame API를 이용하여 음악을 재생/정지할 수 있고, 볼륨 조절도 가능합니다.
- 이전/다음 곡 재생 기능을 제공하며, 플레이리스트 내에서 자동으로 이동합니다.

### 3-5) 달력 및 일기 조회

- `react-calendar` 라이브러리를 사용하여 달력을 구현하였습니다.
- 일기가 있는 날짜는 `tileClassName`을 통해 시각적으로 강조 표시됩니다.
- 선택한 날짜의 일기 목록을 `useEntryStore`에서 필터링하여 표시하며, 각 일기 카드를 클릭하면 모달로 상세 내용을 확인할 수 있습니다.
- 일기 삭제 기능을 제공하며, 삭제 시 localStorage의 데이터도 함께 업데이트됩니다.

### 3-6) 통계 대시보드

**Recharts**를 이용하여 감정 통계를 시각화합니다.

- `useInsightsData` 커스텀 훅에서 일기 데이터를 필터링하고 집계하여 차트 데이터를 생성합니다.
- 날짜 범위 필터(7일, 30일, 전체)를 선택하면 해당 기간의 데이터만 표시됩니다.
- 감정별 비율은 `PieChart`로, 감정 점수 추이는 `LineChart`로, 키워드 빈도는 `BarChart`로 시각화됩니다.

### 3-7) 데이터 상태 관리

- Zustand의 `persist` 미들웨어를 이용하여 새로고침하여도 데이터가 localStorage에 저장되도록 하였습니다.
- 일기 데이터(`lune-diary-entries`), 음악 설정(`lune-diary-music`), 프롬프트 템플릿(`lune-diary-settings`)이 각각 localStorage에 저장됩니다.
