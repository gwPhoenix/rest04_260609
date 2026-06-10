import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const BOARD_LABELS = { notice: '공지사항', qna: 'Q&A', free: '자유게시판' }

export default function BoardDetail() {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadPost()
    loadComments()
  }, [id])

  async function loadPost() {
    setLoading(true)
    await supabase.rpc('increment_views', { post_id: id })
    const { data } = await supabase.from('posts').select('*').eq('id', id).single()
    setPost(data)
    setLoading(false)
  }

  async function loadComments() {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    setComments(data || [])
  }

  async function handleDeletePost() {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return
    await supabase.from('posts').delete().eq('id', id)
    navigate(`/board/${type}`)
  }

  async function handleCommentSubmit(e) {
    e.preventDefault()
    if (!commentText.trim() || !user) return
    setSubmitting(true)
    const authorName = profile?.username || user.email?.split('@')[0] || '익명'
    await supabase.from('comments').insert({
      post_id: id,
      content: commentText.trim(),
      author_id: user.id,
      author_name: authorName,
    })
    if (type === 'qna') {
      await supabase.from('posts').update({ is_answered: true }).eq('id', id)
      setPost(p => p ? { ...p, is_answered: true } : p)
    }
    setCommentText('')
    await loadComments()
    setSubmitting(false)
  }

  async function handleCommentDelete(commentId) {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return
    await supabase.from('comments').delete().eq('id', commentId)
    await loadComments()
  }

  if (loading) return (
    <div className="py-40 text-center text-sm text-slate-400">불러오는 중...</div>
  )
  if (!post) return (
    <div className="py-40 text-center text-sm text-slate-400">게시글을 찾을 수 없습니다.</div>
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">

      {/* 뒤로가기 */}
      <Link
        to={`/board/${type}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-brand-800 dark:hover:text-brand-300"
      >
        <span className="material-symbols-rounded text-base">arrow_back</span>
        {BOARD_LABELS[type] || '게시판'}으로 돌아가기
      </Link>

      {/* 게시글 본문 */}
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-dark-border dark:bg-dark-surface md:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl leading-snug">
            {post.title}
          </h1>
          {user?.id === post.author_id && (
            <div className="flex shrink-0 items-center gap-1">
              <Link
                to={`/board/${type}/${id}/edit`}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-card"
              >
                수정
              </Link>
              <button
                onClick={handleDeletePost}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-dark-card"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-6 text-xs text-slate-400 dark:border-dark-border">
          <span className="font-medium text-slate-600 dark:text-slate-300">{post.author_name}</span>
          <span>{new Date(post.created_at).toLocaleString('ko-KR')}</span>
          <span className="flex items-center gap-0.5">
            <span className="material-symbols-rounded" style={{ fontSize: '13px' }}>visibility</span>
            {post.views}
          </span>
          {type === 'qna' && (
            <span className={[
              'rounded px-1.5 py-0.5 font-bold',
              post.is_answered ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500 dark:bg-dark-card',
            ].join(' ')}>
              {post.is_answered ? '답변완료' : '미답변'}
            </span>
          )}
        </div>

        <div className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">
          {post.content}
        </div>
      </article>

      {/* 댓글 섹션 */}
      <section className="mt-8">
        <h2 className="mb-4 text-sm font-bold text-slate-700 dark:text-slate-200">
          {type === 'qna' ? '답변' : '댓글'}{' '}
          <span className="text-brand-800 dark:text-brand-300">{comments.length}</span>
        </h2>

        {comments.length > 0 && (
          <div className="mb-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white dark:divide-dark-border dark:border-dark-border dark:bg-dark-surface">
            {comments.map(c => (
              <div key={c.id} className={[
                'px-5 py-4',
                c.is_answer ? 'bg-emerald-50 dark:bg-emerald-950/20' : '',
              ].join(' ')}>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {c.is_answer && (
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-700">
                        채택답변
                      </span>
                    )}
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.author_name}</span>
                    <span className="text-xs text-slate-400">
                      {new Date(c.created_at).toLocaleString('ko-KR')}
                    </span>
                  </div>
                  {user?.id === c.author_id && (
                    <button
                      onClick={() => handleCommentDelete(c.id)}
                      className="text-xs text-red-400 transition hover:text-red-600"
                    >
                      삭제
                    </button>
                  )}
                </div>
                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {c.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 댓글 작성 폼 */}
        {user ? (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder={type === 'qna' ? '답변을 입력하세요...' : '댓글을 입력하세요...'}
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none transition focus:border-brand-500 dark:border-dark-border dark:bg-dark-surface dark:text-slate-300 dark:placeholder-slate-500"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!commentText.trim() || submitting}
                className="rounded-xl bg-brand-800 px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-900 disabled:opacity-50"
              >
                {submitting ? '등록 중...' : type === 'qna' ? '답변 등록' : '댓글 등록'}
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-400 dark:border-dark-border">
            <Link to="/login" className="font-semibold text-brand-800 hover:underline dark:text-brand-300">
              로그인
            </Link>
            하면 {type === 'qna' ? '답변을' : '댓글을'} 작성할 수 있습니다.
          </div>
        )}
      </section>
    </div>
  )
}
