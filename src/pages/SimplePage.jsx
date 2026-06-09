import { Link } from 'react-router-dom'

export default function SimplePage({ title }) {
  return (
    <div>
      <div className="bg-neutral-900 py-16 text-center">
        <div className="mx-auto max-w-container px-4 md:px-10">
          <nav className="mb-4 text-xs text-slate-500" aria-label="breadcrumb">
            <Link to="/" className="hover:text-brand-300">홈</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-300">{title}</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-white md:text-4xl">{title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-container px-4 py-24 text-center md:px-10 lg:px-40">
        <p className="text-xl font-semibold text-slate-500 dark:text-slate-400">
          "{title}" 페이지 콘텐츠가 들어갈 영역입니다.
        </p>
        <p className="mt-3 text-slate-400 dark:text-slate-500">
          실제 내용으로 교체하세요.
        </p>
        <div className="mt-10">
          <Link to="/" className="btn-primary">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
