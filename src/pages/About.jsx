import { Link } from 'react-router-dom'
import { company, stats } from '../data/site'
import Icon from '../components/Icon'

const values = [
  { icon: 'accessibility',        title: '접근성',   desc: '복잡한 AI 개념을 누구나 이해할 수 있는 언어로 풀어냅니다.' },
  { icon: 'science',              title: '전문성',   desc: '현장 경험을 갖춘 전문가들이 엄선하고 제작한 콘텐츠를 제공합니다.' },
  { icon: 'eco',                  title: '지속 성장', desc: '최신 AI 트렌드에 맞춰 지속적으로 콘텐츠를 업데이트합니다.' },
  { icon: 'volunteer_activism',   title: '공공 기여', desc: 'AI 교육의 민주화를 위해 핵심 콘텐츠를 무료로 공개합니다.' },
]

const history = [
  { year: '2026', events: ['AILearn 플랫폼 론칭', 'AI 기초·리터러시 강의 공개'] },
  { year: '2025', events: ['AI 교육 콘텐츠 기획·제작 시작', '유튜브 채널 개설'] },
  { year: '2024', events: ['AI 교육 연구 팀 구성', '커리큘럼 설계 시작'] },
]

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-neutral-900 py-20 text-center">
        <div className="pointer-events-none absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 100%, var(--brand-700) 0%, transparent 60%)',
          opacity: 0.2,
        }} />
        <div className="mx-auto max-w-2xl px-6">
          <p className="section-label">ABOUT US</p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            AI 교육의 문턱을<br />낮추는 플랫폼
          </h1>
          <p className="text-lg leading-8 text-slate-300">
            {company.description[0]}<br />{company.description[1]}
          </p>
        </div>
      </section>

      <section className="bg-zinc-800 py-10">
        <div className="mx-auto grid max-w-container grid-cols-2 gap-6 px-6 text-center md:grid-cols-4 md:px-10 lg:px-20">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-white md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm font-semibold text-brand-200">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p className="section-label">MISSION</p>
              <h2 className="section-title mb-6">우리의 미션</h2>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                AI 기술의 혜택이 소수가 아닌 모든 사람에게 돌아갈 수 있도록, 고품질 AI 교육 콘텐츠를 쉽고 무료로 제공합니다.
              </p>
            </div>
            <div>
              <p className="section-label">VISION</p>
              <h2 className="section-title mb-6">우리의 비전</h2>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                2030년까지 10만 명의 AI 리터러시 향상을 이끌고, 대한민국 AI 교육의 표준이 되는 플랫폼을 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-dark-surface">
        <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
          <p className="section-label">CORE VALUES</p>
          <h2 className="section-title mb-12">AILearn이 추구하는 가치</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(v => (
              <div key={v.title} className="card p-6">
                <Icon name={v.icon} size="text-4xl" className="mb-4 text-brand-800 dark:text-brand-300" />
                <h3 className="mb-2 font-extrabold text-slate-900 dark:text-white">{v.title}</h3>
                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
          <p className="section-label">HISTORY</p>
          <h2 className="section-title mb-12">걸어온 길</h2>
          <div className="flex flex-col gap-8">
            {history.map(h => (
              <div key={h.year} className="flex flex-col gap-4 border-b border-slate-100 pb-8 md:flex-row md:gap-16 dark:border-dark-border">
                <p className="text-4xl font-extrabold text-brand-800 dark:text-brand-300 md:w-32">{h.year}</p>
                <ul className="flex flex-1 flex-col gap-2 text-base font-medium text-slate-600 dark:text-slate-300">
                  {h.events.map((e, i) => <li key={i}>· {e}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 py-16 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-sky-ai">지금 시작하세요</p>
        <h2 className="mb-6 text-3xl font-extrabold text-white">AI 강의 무료로 보기</h2>
        <Link to="/videos/ai-basics" className="btn-gold px-8 py-3.5">강의 바로가기 →</Link>
      </section>
    </div>
  )
}
