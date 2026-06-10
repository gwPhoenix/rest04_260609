import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { signIn, signInWithKakao } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } finally {
      setLoading(false)
    }
  }

  async function handleKakao() {
    setError('')
    try {
      await signInWithKakao()
    } catch {
      setError('카카오 로그인에 실패했습니다.')
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-dark-border dark:bg-dark-surface">
          <h1 className="mb-2 text-2xl font-extrabold text-slate-900 dark:text-white">로그인</h1>
          <p className="mb-8 text-sm text-slate-500">AILearn에 오신 것을 환영합니다</p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">이메일</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-500 dark:border-dark-border dark:bg-dark-card dark:text-slate-300 dark:placeholder-slate-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-500 dark:border-dark-border dark:bg-dark-card dark:text-slate-300"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-800 py-2.5 text-sm font-bold text-white transition hover:bg-brand-900 disabled:opacity-50"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-dark-border" />
            <span className="text-xs text-slate-400">또는</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-dark-border" />
          </div>

          <button
            onClick={handleKakao}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-2.5 text-sm font-bold text-[#191919] transition hover:bg-[#fdd800]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M12 3C6.477 3 2 6.694 2 11.25c0 2.918 1.794 5.487 4.521 6.987L5.4 21.5l5.061-3.327c.504.07 1.024.077 1.539.077 5.523 0 10-3.694 10-8.25S17.523 3 12 3Z"
                fill="#191919" />
            </svg>
            카카오로 로그인
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="font-bold text-brand-800 hover:underline dark:text-brand-300">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
