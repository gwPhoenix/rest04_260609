import { Link } from 'react-router-dom'
import { curriculum, videoTopics } from '../data/site'

export default function Curriculum() {
  return (
    <div>
      {/* 헤더 */}
      <section className="bg-brand-950 py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="section-label">CURRICULUM</p>
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">학습 커리큘럼</h1>
          <p className="text-lg text-slate-300">
            입문부터 고급까지 — 나의 수준에 맞는 커리큘럼으로 체계적으로 학습하세요.
          </p>
        </div>
      </section>

      {/* 레벨별 커리큘럼 */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
          <p className="section-label">LEVELS</p>
          <h2 className="section-title mb-12">4단계 학습 경로</h2>

          <div className="flex flex-col gap-8">
            {curriculum.map((c, i) => (
              <div key={c.level} className="card overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* 레벨 인디케이터 */}
                  <div className={`flex min-w-[180px] flex-col items-center justify-center gap-2 p-8 text-white ${c.colorCls}`}>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                      Level {i + 1}
                    </span>
                    <span className="text-3xl font-extrabold">{c.level}</span>
                    <span className="text-sm opacity-80">{c.levelEn}</span>
                  </div>

                  {/* 내용 */}
                  <div className="flex flex-1 flex-col gap-4 p-8">
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-slate-500 dark:text-slate-400">{c.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="text-brand-800 dark:text-brand-300">⏱</span>
                        {c.duration}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="text-brand-800 dark:text-brand-300">🎬</span>
                        강의 {c.courses}개
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {c.topics.map(t => (
                        <span
                          key={t}
                          className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 dark:bg-brand-950 dark:text-brand-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 주제별 강의 안내 */}
      <section className="bg-slate-50 py-20 dark:bg-dark-surface">
        <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
          <p className="section-label">BY TOPIC</p>
          <h2 className="section-title mb-12">주제별 강의 바로 가기</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {videoTopics.map(t => (
              <Link
                key={t.key}
                to={`/videos/${t.key}`}
                className="card flex flex-col items-center gap-3 p-6 text-center"
              >
                <span className="text-4xl">{t.icon}</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{t.label}</span>
                <span className="text-xs text-slate-400">{t.count}개 영상</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 학습 시작 CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-container px-6 text-center md:px-10">
          <h2 className="section-title mb-4">나에게 맞는 강의를 찾으세요</h2>
          <p className="mb-8 text-slate-500 dark:text-slate-400">
            AI를 처음 접하신다면 'AI 기초'부터, 프로그래밍 경험이 있으시면 '머신러닝'이나 '실습 튜토리얼'을 추천합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/videos/ai-basics" className="btn-primary px-8 py-3.5">
              AI 기초 강의 보기
            </Link>
            <Link to="/contact" className="btn-outline px-8 py-3.5">
              학습 상담 문의
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
