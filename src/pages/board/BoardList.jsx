import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const BOARD_CONFIG = {
  notice: { label: '공지사항', icon: 'campaign', desc: '최신 공지사항을 확인하세요' },
  qna:    { label: 'Q&A',    icon: 'help',     desc: '질문하고 답변을 받으세요' },
  free:   { label: '자유게시판', icon: 'forum',  desc: '자유롭게 이야기를 나누세요' },
}

const PAGE_SIZE = 15

export default function BoardList() {
  const { type = 'free' } = useParams()
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const cfg = BOARD_CONFIG[type] || BOARD_CONFIG.free

  useEffect(() => { setPage(1) }, [type])

  useEffect(() => { loadPosts() }, [type, page])

  async function loadPosts() {
    setLoading(true)
    const from = (page - 1) * PAGE_SIZE
    const { data, count, error } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('board_type', type)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, from + PAGE_SIZE - 1)

    if (!error) { setPosts(data || []); setTotal(count || 0) }
    setLoading(false)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">

      {/* 상단 헤더 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{cfg.label}</h1>
          <p className="mt-0.5 text-sm text-slate-500">{cfg.desc}</p>
        </div>
        {user && (
          <Link
            to={`/board/${type}/write`}
            className="flex items-center gap-1.5 rounded-xl bg-brand-800 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-900"
          >
            <span className="material-symbols-rounded text-base">edit</span>
            글쓰기
          </Link>
        )}
      </div>

      {/* 탭 */}
      <div className="mb-0 flex gap-0 border-b border-slate-200 dark:border-dark-border">
        {Object.entries(BOARD_CONFIG).map(([key, c]) => (
          <Link
            key={key}
            to={`/board/${key}`}
            className={[
              'px-5 py-3 text-sm font-semibold transition border-b-2 -mb-px',
              type === key
                ? 'border-brand-800 text-brand-800 dark:border-brand-300 dark:text-brand-300'
                : 'border-transparent text-slate-500 hover:text-brand-800 dark:text-slate-400 dark:hover:text-brand-300',
            ].join(' ')}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {/* 목록 */}
      <div className="min-h-[300px]">
        {loading ? (
          <div className="py-20 text-center text-sm text-slate-400">불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <span className="material-symbols-rounded mb-2 block text-4xl">inbox</span>
            <p className="text-sm">첫 번째 게시글을 작성해 보세요.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-dark-border">
            {posts.map(post => (
              <li key={post.id}>
                <Link to={`/board/${type}/${post.id}`} className="group block py-4">
                  <div className="flex items-start gap-2">
                    {post.is_pinned && (
                      <span className="mt-0.5 shrink-0 rounded bg-brand-100 px-1.5 py-0.5 text-xs font-bold text-brand-800 dark:bg-brand-900 dark:text-brand-300">
                        공지
                      </span>
                    )}
                    {type === 'qna' && (
                      <span className={[
                        'mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs font-bold',
                        post.is_answered
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-500 dark:bg-dark-card',
                      ].join(' ')}>
                        {post.is_answered ? '답변완료' : '미답변'}
                      </span>
                    )}
                    <p className={[
                      'flex-1 font-semibold transition',
                      post.is_pinned
                        ? 'text-brand-800 dark:text-brand-300'
                        : 'text-slate-900 group-hover:text-brand-800 dark:text-white dark:group-hover:text-brand-300',
                    ].join(' ')}>
                      {post.title}
                    </p>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-400">
                    <span>{post.author_name}</span>
                    <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-rounded" style={{ fontSize: '13px' }}>visibility</span>
                      {post.views}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-dark-surface"
          >‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={[
                'rounded-lg px-3 py-2 text-sm font-semibold transition',
                p === page
                  ? 'bg-brand-800 text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-dark-surface',
              ].join(' ')}
            >{p}</button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-dark-surface"
          >›</button>
        </div>
      )}
    </div>
  )
}
