import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }
    setLoading(true)
    try {
      await signUp(email, password, username)
      setSuccess(true)
    } catch (err) {
      setError(err.message || '회원가입에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-dark-border dark:bg-dark-surface">
        <span className="material-symbols-rounded mb-4 block text-5xl text-brand-800 dark:text-brand-300">
          mark_email_read
        </span>
        <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">이메일을 확인해 주세요</h2>
        <p className="mb-6 text-sm text-slate-500">
          <strong className="text-slate-700 dark:text-slate-300">{email}</strong>로 인증 메일을 발송했습니다.<br />
          메일의 링크를 클릭하면 로그인할 수 있습니다.
        </p>
        <Link to="/login" className="text-sm font-bold text-brand-800 hover:underline dark:text-brand-300">
          로그인 페이지로 이동
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-dark-border dark:bg-dark-surface">
          <h1 className="mb-2 text-2xl font-extrabold text-slate-900 dark:text-white">회원가입</h1>
          <p className="mb-8 text-sm text-slate-500">AILearn과 함께 AI를 배워보세요</p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">닉네임</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="사용할 닉네임"
                required
                maxLength={20}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-500 dark:border-dark-border dark:bg-dark-card dark:text-slate-300"
              />
            </div>
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
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                비밀번호 <span className="text-xs font-normal text-slate-400">(6자 이상)</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-500 dark:border-dark-border dark:bg-dark-card dark:text-slate-300"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-800 py-2.5 text-sm font-bold text-white transition hover:bg-brand-900 disabled:opacity-50"
            >
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="font-bold text-brand-800 hover:underline dark:text-brand-300">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
