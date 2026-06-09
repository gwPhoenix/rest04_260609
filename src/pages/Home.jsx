import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import ParticleCanvas from '../components/ParticleCanvas'
import { videoTopics, allVideos } from '../data/site'

// ─── 슬라이드 데이터 ─────────────────────────────────────────
const slides = [
  { copy: 'AI를 배우고,\n미래를 만들다',    accent: '70% 50%' },
  { copy: '누구나 쉽게,\n인공지능의 세계로', accent: '30% 60%' },
]

// ─── 히어로 배경 ──────────────────────────────────────────────
// bg: 실제 이미지 URL 입력 시 이미지 사용 (예: '/images/hero1.jpg')
function HeroBg({ slide, bg }) {
  if (bg) return <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
  return (
    <div className="absolute inset-0 bg-neutral-900">
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at ${slide.accent}, var(--brand-700) 0%, transparent 55%)`,
        opacity: 0.22,
      }} />
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-neutral-900 to-transparent" />
    </div>
  )
}

// ─── 히어로 슬라이더 ──────────────────────────────────────────
function Hero() {
  const [idx, setIdx] = useState(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])
  const go = dir => setIdx(i => (i + dir + slides.length) % slides.length)

  const handleMouseMove = useCallback(e => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 }
  }, [])

  return (
    <section
      className="relative h-[calc(100vh-5rem)] min-h-[520px] w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {slides.map((s, i) => (
        <div key={i} className={[
          'absolute inset-0 transition-opacity duration-1000',
          i === idx ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}>
          <HeroBg slide={s} bg={s.bg ?? null} />
        </div>
      ))}

      {/* 파티클 신경망 애니메이션 — 배경 위, 텍스트 아래 */}
      <ParticleCanvas mouseRef={mouseRef} />

      {slides.map((s, i) => (
        <div key={`txt-${i}`} className={[
          'absolute inset-0 flex items-end transition-opacity duration-1000',
          i === idx ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}>
          <p className="relative z-10 whitespace-pre-line px-[5%] pb-32 text-5xl font-medium leading-tight text-white drop-shadow md:text-7xl lg:text-8xl xl:text-[8rem]">
            {s.copy}
          </p>
        </div>
      ))}

      <button type="button" aria-label="이전" onClick={() => go(-1)}
        className="absolute bottom-10 left-[5%] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white/20">‹</button>
      <button type="button" aria-label="다음" onClick={() => go(1)}
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

// ─── 강의 주제 (통합: 소개 문구 + 6개 카드 + CTA) ─────────────
function TopicsSection() {
  return (
    <section className="bg-white py-24 dark:bg-zinc-900 md:py-32">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        {/* 헤딩 + 소개 */}
        <h2 className="mb-4 text-4xl font-bold leading-tight text-brand-800 dark:text-brand-300 md:text-6xl">
          AI 강의 영상<br />주제별로 배우세요
        </h2>
        <p className="mb-12 text-lg text-slate-500 dark:text-slate-400">
          AI 기초부터 딥러닝까지, 누구나 쉽게 배울 수 있습니다.
        </p>

        {/* 주제 카드 그리드 */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {videoTopics.map(t => (
            <Link key={t.key} to={`/videos/${t.key}`}
              className="group relative h-56 overflow-hidden rounded-xl bg-neutral-900 md:h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name={t.icon} size="text-[6rem]" className="text-neutral-700" />
              </div>
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at 50% 80%, var(--brand-700) 0%, transparent 60%)',
                opacity: 0.18,
              }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <Icon name={t.icon} size="text-xl" className="mb-2 text-brand-300" />
                <p className="mb-1 text-lg font-bold md:text-xl">{t.label}</p>
                <p className="text-xs font-semibold text-brand-300">{t.count}개 강의</p>
                <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-10 dark:border-zinc-700">
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">
            엄선된 AI 강의로 오늘 바로 시작하세요
          </p>
          <Link to="/videos/ai-basics"
            className="relative inline-flex items-center gap-3 rounded-full bg-neutral-100 py-4 pl-6 pr-12 font-bold transition hover:bg-neutral-200 dark:bg-zinc-800 dark:text-slate-100 dark:hover:bg-zinc-700">
            전체 강의 보기 <span className="absolute right-5 text-neutral-400">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── 최신 강의 목록 ───────────────────────────────────────────
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
      <TopicsSection />
      <LatestVideos />
    </>
  )
}
