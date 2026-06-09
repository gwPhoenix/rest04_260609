import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, company } from '../data/site'
import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-800 dark:text-slate-400 dark:hover:bg-dark-surface dark:hover:text-brand-300"
    >
      {isDark ? (
        // Sun icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const { isDark, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="bg-white shadow-sm dark:bg-dark-surface dark:shadow-none dark:border-b dark:border-dark-border"
        onMouseLeave={() => setHovered(null)}
      >
        <div className="mx-auto flex h-20 max-w-container items-center justify-between px-4 md:px-10 lg:px-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center gap-1 text-2xl font-extrabold tracking-tight">
            <span className="text-brand-800 dark:text-brand-300">AI</span>
            <span className="text-brand-950 dark:text-white">Learn</span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map((item) => (
              <li
                key={item.label}
                className="flex items-center"
                onMouseEnter={() => setHovered(item.label)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'px-5 py-7 text-base font-semibold transition-colors',
                      isActive
                        ? 'text-brand-800 dark:text-brand-300'
                        : 'text-slate-700 hover:text-brand-800 dark:text-slate-300 dark:hover:text-brand-300',
                    ].join(' ')
                  }
                >
                  {item.label}
                  {item.children && (
                    <span className="ml-1 text-xs opacity-60">▾</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 우측: 다크모드 토글 + 모바일 햄버거 */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label="메뉴 열기"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surface lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <span className="h-0.5 w-5 bg-slate-700 dark:bg-slate-300" />
              <span className="h-0.5 w-5 bg-slate-700 dark:bg-slate-300" />
              <span className="h-0.5 w-5 bg-slate-700 dark:bg-slate-300" />
            </button>
          </div>
        </div>

        {/* 데스크탑 드롭다운 */}
        <div
          className={[
            'hidden overflow-hidden border-t border-slate-100 bg-white transition-all duration-200 dark:border-dark-border dark:bg-dark-surface lg:block',
            hovered ? 'max-h-60 opacity-100' : 'max-h-0 border-t-0 opacity-0',
          ].join(' ')}
        >
          <div className="mx-auto flex max-w-container px-20">
            {nav.map((item) =>
              item.children ? (
                <ul
                  key={item.label}
                  className="flex w-36 flex-col gap-2 py-6"
                  onMouseEnter={() => setHovered(item.label)}
                >
                  {hovered === item.label &&
                    item.children.map((c) => (
                      <li key={c.label + c.to}>
                        <Link
                          to={c.to}
                          className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-800 dark:text-slate-400 dark:hover:bg-brand-950/50 dark:hover:text-brand-300"
                          onClick={() => setHovered(null)}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              ) : (
                <div key={item.label} className="w-36" onMouseEnter={() => setHovered(item.label)} />
              )
            )}
          </div>
        </div>
      </nav>

      {/* 모바일 슬라이드 패널 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto bg-white p-6 shadow-2xl dark:bg-dark-surface">
            <div className="mb-6 flex items-center justify-between">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-1 text-xl font-extrabold">
                <span className="text-brand-800 dark:text-brand-300">AI</span>
                <span className="text-brand-950 dark:text-white">Learn</span>
              </Link>
              <button
                type="button"
                aria-label="메뉴 닫기"
                className="text-2xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.label} className="border-b border-slate-100 pb-1 dark:border-dark-border">
                  <Link
                    to={item.to}
                    className="block py-2.5 text-base font-bold text-slate-900 dark:text-slate-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-2 flex flex-col gap-0.5">
                      {item.children.map((c) => (
                        <li key={c.label + c.to}>
                          <Link
                            to={c.to}
                            className="block rounded py-1.5 pl-4 text-sm text-slate-500 transition hover:text-brand-800 dark:text-slate-400 dark:hover:text-brand-300"
                            onClick={() => setMobileOpen(false)}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {/* 모바일 다크모드 토글 */}
            <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-dark-card">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {isDark ? '다크 모드' : '라이트 모드'}
              </span>
              <button
                type="button"
                onClick={toggle}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm dark:bg-dark-surface dark:text-slate-300"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
