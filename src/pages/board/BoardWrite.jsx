import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const BOARD_CONFIG = {
  notice: '공지사항',
  qna: 'Q&A',
  free: '자유게시판',
}

export default function BoardWrite() {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [boardType, setBoardType] = useState(type || 'free')
  const [submitting, setSubmitting] = useState(false)
  const isEdit = !!id

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  useEffect(() => {
    if (isEdit) loadPost()
  }, [id])

  async function loadPost() {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single()
    if (data) {
      setTitle(data.title)
      setContent(data.content)
      setBoardType(data.board_type)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    setSubmitting(true)
    try {
      const authorName = profile?.username || user.email?.split('@')[0] || '익명'
      if (isEdit) {
        await supabase.from('posts').update({
          title: title.trim(),
          content: content.trim(),
          board_type: boardType,
          updated_at: new Date().toISOString(),
        }).eq('id', id)
        navigate(`/board/${boardType}/${id}`)
      } else {
        const { data, error } = await supabase.from('posts').insert({
          board_type: boardType,
          title: title.trim(),
          content: content.trim(),
          author_id: user.id,
          author_name: authorName,
        }).select().single()
        if (!error) navigate(`/board/${boardType}/${data.id}`)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <h1 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        {isEdit ? '글 수정' : '글쓰기'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">게시판</label>
          <select
            value={boardType}
            onChange={e => setBoardType(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-500 dark:border-dark-border dark:bg-dark-surface dark:text-slate-300"
          >
            {Object.entries(BOARD_CONFIG).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            maxLength={100}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-500 dark:border-dark-border dark:bg-dark-surface dark:text-slate-300"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">내용</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={14}
            required
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-500 dark:border-dark-border dark:bg-dark-surface dark:text-slate-300 dark:placeholder-slate-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-dark-border dark:text-slate-300 dark:hover:bg-dark-surface"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-brand-800 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-900 disabled:opacity-50"
          >
            {submitting ? '저장 중...' : isEdit ? '수정 완료' : '글 올리기'}
          </button>
        </div>
      </form>
    </div>
  )
}
