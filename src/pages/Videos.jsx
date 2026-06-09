import { useState, useEffect } from 'react'
import { useParams, NavLink, Navigate, Link } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { videoTopics, videosByTopic } from '../data/site'

const PER_PAGE = 6 // 2열 × 3행

function TopicTabs({ activeTopic }) {
  return (
    <div className="sticky top-20 z-30 border-b border-slate-200 bg-white dark:border-dark-border dark:bg-dark-surface">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
        <ul className="flex overflow-x-auto">
          {videoTopics.map(t => (
            <li key={t.key} className="shrink-0">
              <NavLink
                to={`/videos/${t.key}`}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-4 text-sm font-semibold transition md:px-6',
                    isActive
                      ? 'border-brand-800 text-brand-800 dark:border-brand-400 dark:text-brand-300'
                      : 'border-transparent text-slate-500 hover:text-brand-800 dark:text-slate-400 dark:hover:text-brand-300',
                  ].join(' ')
                }
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="페이지 네비게이션">
      <button
        type="button"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-800 hover:text-brand-800 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-border dark:text-slate-400"
        aria-label="이전 페이지"
      >
        ‹
      </button>

      {pages.map(p => (
        <button
          key={p}
          type="button"
          onClick={() => onPage(p)}
          className={[
            'flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-bold transition',
            p === page
              ? 'border-brand-800 bg-brand-800 text-white dark:border-brand-400 dark:bg-brand-800'
              : 'border-slate-200 text-slate-600 hover:border-brand-800 hover:text-brand-800 dark:border-dark-border dark:text-slate-400 dark:hover:border-brand-400',
          ].join(' ')}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-800 hover:text-brand-800 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-border dark:text-slate-400"
        aria-label="다음 페이지"
      >
        ›
      </button>
    </nav>
  )
}

export default function Videos() {
  const { topic } = useParams()
  const [page, setPage] = useState(1)

  const topicMeta = videoTopics.find(t => t.key === topic)
  const videos = videosByTopic[topic] || []
  const totalPages = Math.ceil(videos.length / PER_PAGE)
  const visible = videos.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // 주제 변경 시 첫 페이지로
  useEffect(() => setPage(1), [topic])

  if (!topicMeta) return <Navigate to="/videos/ai-basics" replace />

  return (
    <div>
      <TopicTabs activeTopic={topic} />

      <div className="mx-auto max-w-container px-4 py-10 md:px-10 md:py-14 lg:px-20">
        {/* 페이지 헤더 */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-slate-100 pb-8 sm:flex-row sm:items-center dark:border-dark-border">
          <div>
            <nav className="mb-2 text-xs text-slate-400" aria-label="breadcrumb">
              <Link to="/" className="hover:text-brand-800 dark:hover:text-brand-300">홈</Link>
              <span className="mx-2">›</span>
              <span>강의 영상</span>
              <span className="mx-2">›</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{topicMeta.label}</span>
            </nav>
            <h1 className="section-title flex items-center gap-3">
              <span>{topicMeta.icon}</span>
              {topicMeta.label}
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">{topicMeta.desc}</p>
          </div>
          <span className="shrink-0 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-bold text-slate-600 dark:bg-dark-card dark:text-slate-300">
            총 {videos.length}개 영상
          </span>
        </div>

        {/* 2열 × 3행 영상 그리드 */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {visible.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-400">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-lg font-semibold">등록된 영상이 없습니다.</p>
          </div>
        )}

        {/* 페이지네이션 */}
        <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      </div>
    </div>
  )
}
