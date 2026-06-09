import { Link } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { videoTopics, featuredVideos, stats } from '../data/site'

// ── 히어로 ─────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-brand-950">
      {/* 배경 장식 원 */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-800/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-sky-ai/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-container px-6 py-24 md:px-10 lg:px-20">
        <p className="section-label">AI 온라인 교육 플랫폼</p>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
          AI를 배우고,
          <br />
          <span className="text-sky-ai">미래를 만들다</span>
        </h1>
        <p className="mb-10 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
          AI 기초부터 딥러닝, AI 리터러시까지 — 전문가가 엄선한 영상 강의로
          <br className="hidden md:block" />
          누구나 인공지능을 이해하고 활용할 수 있습니다.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/videos/ai-basics" className="btn-gold px-8 py-4 text-lg">
            강의 시작하기 →
          </Link>
          <Link to="/curriculum" className="btn-outline border-white/50 text-white px-8 py-4 text-lg hover:bg-white/10 dark:border-white/50 dark:text-white dark:hover:bg-white/10">
            커리큘럼 보기
          </Link>
        </div>

        {/* 주제 태그 */}
        <div className="mt-12 flex flex-wrap gap-2">
          {videoTopics.map(t => (
            <Link
              key={t.key}
              to={`/videos/${t.key}`}
              className="rounded-full border border-brand-800/60 px-4 py-1.5 text-sm font-medium text-slate-300 transition hover:border-sky-ai hover:text-sky-ai"
            >
              {t.icon} {t.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 통계 밴드 ──────────────────────────────────────────────
function StatsBand() {
  return (
    <section className="bg-brand-800 py-12">
      <div className="mx-auto grid max-w-container grid-cols-2 gap-6 px-6 text-center md:grid-cols-4 md:px-10 lg:px-20">
        {stats.map(s => (
          <div key={s.label}>
            <p className="text-4xl font-extrabold text-white md:text-5xl">{s.value}</p>
            <p className="mt-1 text-sm font-semibold text-brand-200 md:text-base">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── 강의 주제 ──────────────────────────────────────────────
function TopicsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
        <p className="section-label">TOPICS</p>
        <h2 className="section-title mb-4">6가지 주제로 배우는 AI</h2>
        <p className="mb-12 text-slate-500 dark:text-slate-400">
          입문부터 고급까지, 원하는 주제를 선택하여 자신만의 학습 경로를 만들어보세요.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videoTopics.map(t => (
            <Link
              key={t.key}
              to={`/videos/${t.key}`}
              className="card group flex gap-5 p-6 transition"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-3xl dark:bg-brand-950">
                {t.icon}
              </div>
              <div className="min-w-0">
                <p className="mb-1 font-extrabold text-slate-900 dark:text-white">{t.label}</p>
                <p className="text-sm leading-6 text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t.desc}
                </p>
                <p className="mt-2 text-xs font-bold text-sky-ai">영상 {t.count}개 →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 추천 강의 영상 ─────────────────────────────────────────
function FeaturedVideos() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-dark-surface md:py-28">
      <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-label">FEATURED</p>
            <h2 className="section-title">추천 강의 영상</h2>
          </div>
          <Link
            to="/videos/ai-basics"
            className="shrink-0 text-sm font-bold text-brand-800 transition hover:text-brand-600 dark:text-brand-300"
          >
            전체 영상 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVideos.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── AILearn 특징 ───────────────────────────────────────────
const features = [
  {
    icon: '🎬',
    title: '고품질 영상 강의',
    desc: '전문가가 제작한 체계적인 강의를 유튜브 플랫폼으로 언제 어디서나 시청하세요.',
  },
  {
    icon: '📚',
    title: '단계별 커리큘럼',
    desc: '입문부터 고급까지 4단계로 구성된 학습 경로로 효율적으로 실력을 쌓으세요.',
  },
  {
    icon: '🔓',
    title: '무료 공개 콘텐츠',
    desc: '선별된 AI 교육 콘텐츠를 비용 없이 바로 학습할 수 있습니다.',
  },
  {
    icon: '📱',
    title: '모바일 최적화',
    desc: '스마트폰·태블릿·PC 어디서든 최적화된 화면으로 학습 경험을 제공합니다.',
  },
]

function WhySection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
        <p className="section-label">WHY AILEARN</p>
        <h2 className="section-title mb-12">왜 AILearn인가요?</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(f => (
            <div key={f.title} className="card p-6">
              <div className="mb-4 text-4xl">{f.icon}</div>
              <h3 className="mb-2 font-extrabold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA 배너 ───────────────────────────────────────────────
function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-20">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-sky-ai/20 blur-3xl" />
      <div className="relative mx-auto max-w-container px-6 text-center md:px-10">
        <h2 className="mb-4 text-3xl font-extrabold text-white md:text-5xl">
          지금 바로 AI를 시작하세요
        </h2>
        <p className="mb-8 text-lg text-brand-200">
          48개 이상의 강의가 무료로 제공됩니다.
        </p>
        <Link to="/videos/ai-basics" className="btn-gold px-10 py-4 text-lg">
          무료 강의 시작하기 →
        </Link>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <TopicsSection />
      <FeaturedVideos />
      <WhySection />
      <CtaBanner />
    </>
  )
}
