import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import VideoCard from '../components/VideoCard'
import { videoTopics, featuredVideos, allVideos } from '../data/site'

// ─── 슬라이드 데이터 ─────────────────────────────────────────
const slides = [
  { copy: 'AI를 배우고,\n미래를 만들다',    accent: '70% 50%' },
  { copy: '누구나 쉽게,\n인공지능의 세계로', accent: '30% 60%' },
]

// ─── 히어로 배경: 항상 중립 다크 + 팔레트 컬러 글로우 ────────
// bg: 실제 이미지 URL이 있으면 아래 bg prop에 넣으세요 (예: '/images/hero1.jpg')
function HeroBg({ slide, bg }) {
  if (bg) return <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
  return (
    <div className="absolute inset-0 bg-neutral-900">
      {/* 팔레트 컬러 글로우 — 배경 자체는 neutral, 미묘한 색감 힌트만 */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at ${slide.accent}, var(--brand-700) 0%, transparent 55%)`,
        opacity: 0.22,
      }} />
      {/* 격자 패턴 */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-neutral-900 to-transparent" />
    </div>
  )
}

// ─── 히어로 슬라이더 (rest03 스타일) ─────────────────────────
function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])
  const go = dir => setIdx(i => (i + dir + slides.length) % slides.length)

  return (
    <section className="relative h-[calc(100vh-5rem)] min-h-[520px] w-full overflow-hidden">
      {slides.map((s, i) => (
        <div key={i} className={[
          'absolute inset-0 transition-opacity duration-1000',
          i === idx ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}>
          <HeroBg slide={s} bg={s.bg ?? null} />
          <div className="absolute inset-0 flex items-end">
            <p className="relative z-10 whitespace-pre-line px-[5%] pb-32 text-5xl font-medium leading-tight text-white drop-shadow md:text-7xl lg:text-8xl xl:text-[8rem]">
              {s.copy}
            </p>
          </div>
        </div>
      ))}

      <button type="button" aria-label="이전 슬라이드" onClick={() => go(-1)}
        className="absolute bottom-10 left-[5%] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white/20">‹</button>
      <button type="button" aria-label="다음 슬라이드" onClick={() => go(1)}
        className="absolute bottom-10 left-[calc(5%+52px)] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white/20">›</button>

      <div className="absolute bottom-10 right-[5%] z-10 hidden gap-3 md:flex">
        <Link to="/videos/ai-basics"
          className="flex items-center gap-3 rounded-full bg-brand-800 px-6 py-3.5 font-bold text-white transition hover:brightness-125">
          강의 시작하기 <span>→</span>
        </Link>
        <Link to="/curriculum"
          className="flex items-center gap-3 rounded-full bg-white/20 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/30">
          커리큘럼 <span>→</span>
        </Link>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button key={i} type="button" onClick={() => setIdx(i)}
            className={['h-1.5 rounded-full transition-all', i === idx ? 'w-8 bg-white' : 'w-2 bg-white/50'].join(' ')} />
        ))}
      </div>
    </section>
  )
}

// ─── 주제 링크 (rest03 IntroLinks — 화이트 배경) ─────────────
function TopicLinks() {
  return (
    <section className="bg-white py-24 dark:bg-zinc-900 md:py-32">
      <p className="mx-auto mb-12 max-w-2xl px-6 text-center text-2xl font-bold leading-snug text-slate-800 dark:text-slate-100 md:text-3xl">
        AI 기초부터 딥러닝까지,<br className="hidden md:block" /> 누구나 쉽게 배울 수 있습니다.
      </p>
      <ul className="flex flex-wrap justify-center gap-4 px-4">
        {videoTopics.map(t => (
          <li key={t.key}>
            <Link to={`/videos/${t.key}`}
              className="relative inline-flex items-center gap-2 rounded-full bg-neutral-100 py-4 pl-5 pr-12 font-bold transition hover:bg-neutral-200 dark:bg-zinc-800 dark:text-slate-100 dark:hover:bg-zinc-700">
              <Icon name={t.icon} size="text-base" className="text-brand-800 dark:text-brand-300" />
              {t.label}
              <span className="absolute right-5 text-neutral-400">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ─── 강의 카드 (rest03 OurBusiness — 화이트 배경 + 다크 카드) ─
function OurVideos() {
  return (
    <section className="bg-white py-24 dark:bg-zinc-900 md:py-32">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        <h2 className="mb-12 text-4xl font-bold leading-tight text-brand-800 dark:text-brand-300 md:text-6xl">
          AI 강의 영상<br />주제별로 배우세요
        </h2>
      </div>
      <div className="flex gap-6 overflow-x-auto px-4 pb-4 md:px-10 lg:px-40">
        {videoTopics.map(t => (
          <Link key={t.key} to={`/videos/${t.key}`}
            className="group relative h-[366px] w-64 shrink-0 overflow-hidden rounded-xl bg-neutral-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name={t.icon} size="text-[8rem]" className="text-neutral-700" />
            </div>
            {/* 팔레트 컬러 글로우 — 카드 안에서 브랜드 색 힌트 */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at 50% 80%, var(--brand-700) 0%, transparent 60%)',
              opacity: 0.18,
            }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <Icon name={t.icon} size="text-2xl" className="mb-3 text-brand-300" />
              <p className="mb-3 text-2xl font-bold">{t.label}</p>
              <p className="text-xs font-semibold text-brand-300">{t.count}개 강의</p>
              <p className="mt-2 text-sm leading-6 text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {t.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ─── 배너 (rest03 SustainabilityBand — 항상 중립 다크) ────────
function FeaturedBand() {
  return (
    <section className="relative h-[480px] w-full overflow-hidden md:h-[600px]">
      <div className="absolute inset-0 bg-zinc-900">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 20% 60%, var(--brand-700) 0%, transparent 55%)',
          opacity: 0.2,
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-10 lg:px-40">
        <p className="mb-4 text-sm font-semibold tracking-widest text-white/60">FEATURED VIDEOS</p>
        <h2 className="mb-8 text-4xl font-bold leading-tight text-white md:text-6xl">
          엄선된 AI 강의로<br />오늘 바로 시작하세요
        </h2>
        <div>
          <Link to="/videos/ai-basics"
            className="inline-flex items-center gap-3 rounded-full bg-white/90 px-6 py-3.5 font-bold text-brand-800 transition hover:bg-white">
            강의 바로가기 <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── 최신 강의 목록 (rest03 MoreToDiscover — 화이트 배경) ─────
function LatestVideos() {
  const latest = allVideos.slice(0, 4)
  return (
    <section className="bg-white py-24 dark:bg-zinc-900 md:py-32">
      <div className="mx-auto flex max-w-container flex-col px-4 md:px-10 lg:px-40">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b-2 border-slate-200 pb-10 dark:border-zinc-700 md:flex-row md:items-center">
          <p className="text-4xl font-bold text-brand-800 dark:text-brand-300 md:text-6xl">
            최신 강의 영상
          </p>
          <Link to="/videos/ai-basics"
            className="relative inline-flex items-center gap-3 rounded-full bg-neutral-100 py-4 pl-6 pr-12 font-bold transition hover:bg-neutral-200 dark:bg-zinc-800 dark:text-slate-100 dark:hover:bg-zinc-700">
            전체보기 <span className="absolute right-5 text-neutral-400">→</span>
          </Link>
        </div>
        <ul className="flex flex-col divide-y divide-slate-100 dark:divide-zinc-700">
          {latest.map(v => (
            <li key={v.id}>
              <Link to={`/videos/${v.topic}`}
                className="flex flex-col justify-between gap-1 py-5 transition hover:text-brand-800 dark:hover:text-brand-300 md:flex-row md:items-center">
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-100 md:text-xl">{v.title}</span>
                <span className="text-sm text-slate-400">{v.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <TopicLinks />
      <OurVideos />
      <FeaturedBand />
      <LatestVideos />
    </>
  )
}
