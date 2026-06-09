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
      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-800 dark:text-slate-400 dark:hover:bg-dark-surface dark:hover:text-brand-300"
    >
      <span className="material-symbols-rounded text-xl">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}

function PalettePicker() {
  const { palette, setPalette, palettes } = useTheme()
  return (
    <div className="flex items-center gap-1.5" title="컬러 팔레트 선택">
      {palettes.map(p => (
        <button
          key={p.id}
          type="button"
          onClick={() => setPalette(p.id)}
          aria-label={`${p.name} 팔레트`}
          aria-pressed={palette === p.id}
          title={p.name}
          className="h-5 w-5 rounded-full transition-transform hover:scale-110 focus:outline-none"
          style={{
            backgroundColor: p.swatch,
            boxShadow: palette === p.id
              ? `0 0 0 2px white, 0 0 0 4px ${p.swatch}`
              : 'none',
            transform: palette === p.id ? 'scale(1.2)' : undefined,
          }}
        />
      ))}
    </div>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const { isDark, toggle, palette, setPalette, palettes } = useTheme()

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
              <li key={item.label} className="flex items-center" onMouseEnter={() => setHovered(item.label)}>
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
                  {item.children && <span className="ml-1 text-xs opacity-50">▾</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 우측: 팔레트 + 다크모드 + 햄버거 */}
          <div className="flex items-center gap-3">
            <PalettePicker />
            <div className="h-5 w-px bg-slate-200 dark:bg-dark-border hidden md:block" />
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
                <ul key={item.label} className="flex w-36 flex-col gap-2 py-6" onMouseEnter={() => setHovered(item.label)}>
                  {hovered === item.label &&
                    item.children.map((c) => (
                      <li key={c.label + c.to}>
                        <Link
                          to={c.to}
                          className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-800 dark:text-slate-400 dark:hover:bg-brand-900 dark:hover:text-brand-300"
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
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto bg-white p-6 shadow-2xl dark:bg-dark-surface">
            <div className="mb-6 flex items-center justify-between">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-1 text-xl font-extrabold">
                <span className="text-brand-800 dark:text-brand-300">AI</span>
                <span className="text-brand-950 dark:text-white">Learn</span>
              </Link>
              <button type="button" aria-label="메뉴 닫기" className="text-2xl text-slate-400" onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.label} className="border-b border-slate-100 pb-1 dark:border-dark-border">
                  <Link to={item.to} className="block py-2.5 text-base font-bold text-slate-900 dark:text-slate-100" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-2 flex flex-col gap-0.5">
                      {item.children.map((c) => (
                        <li key={c.label + c.to}>
                          <Link to={c.to} className="block rounded py-1.5 pl-4 text-sm text-slate-500 transition hover:text-brand-800 dark:text-slate-400 dark:hover:text-brand-300" onClick={() => setMobileOpen(false)}>
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* 모바일 팔레트 + 다크모드 */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-dark-card">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">컬러 팔레트</p>
              <div className="flex items-center gap-2.5 mb-4">
                {palettes.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPalette(p.id)}
                    title={p.name}
                    className="h-7 w-7 rounded-full transition-transform hover:scale-110"
                    style={{
                      backgroundColor: p.swatch,
                      boxShadow: palette === p.id ? `0 0 0 2px white, 0 0 0 4px ${p.swatch}` : 'none',
                      transform: palette === p.id ? 'scale(1.2)' : undefined,
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {isDark ? '다크 모드' : '라이트 모드'}
                </span>
                <button type="button" onClick={toggle} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-dark-surface">
                  <span className="material-symbols-rounded text-lg text-slate-600 dark:text-slate-300">
                    {isDark ? 'light_mode' : 'dark_mode'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
