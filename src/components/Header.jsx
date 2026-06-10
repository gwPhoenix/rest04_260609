import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { nav, videoTopics } from '../data/site'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import Icon from './Icon'

function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <button type="button" onClick={toggle}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-surface">
      <span className="material-symbols-rounded text-xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
    </button>
  )
}

function PalettePicker() {
  const { palette, setPalette, palettes } = useTheme()
  return (
    <div className="flex items-center gap-1.5">
      {palettes.map(p => (
        <button key={p.id} type="button" onClick={() => setPalette(p.id)}
          aria-label={p.name} title={p.name}
          className="h-5 w-5 rounded-full transition-transform hover:scale-110 focus:outline-none"
          style={{
            backgroundColor: p.swatch,
            boxShadow: palette === p.id ? `0 0 0 2px white, 0 0 0 4px ${p.swatch}` : 'none',
            transform: palette === p.id ? 'scale(1.2)' : undefined,
          }} />
      ))}
    </div>
  )
}

function VideoDropdown({ onClose }) {
  return (
    <div className="absolute left-0 top-full z-50 pt-1">
      <div className="w-[480px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl dark:border-dark-border dark:bg-dark-surface">
        <div className="grid grid-cols-2 gap-0.5 p-3">
          {videoTopics.map(t => (
            <Link key={t.key} to={`/videos/${t.key}`} onClick={onClose}
              className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-brand-50 dark:hover:bg-brand-900 group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900 group-hover:bg-brand-100 dark:group-hover:bg-brand-800 transition">
                <Icon name={t.icon} size="text-xl" className="text-brand-800 dark:text-brand-300" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{t.label}</p>
                <p className="text-xs text-slate-400">{t.count}개 강의</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="border-t border-slate-100 dark:border-dark-border px-3 py-2">
          <Link to="/videos/ai-basics" onClick={onClose}
            className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-bold text-brand-800 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900 transition">
            전체 강의 영상 보기
            <span className="material-symbols-rounded text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

function BoardDropdown({ items, onClose }) {
  return (
    <div className="absolute left-0 top-full z-50 pt-1">
      <div className="w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl dark:border-dark-border dark:bg-dark-surface">
        {items.map(item => (
          <Link key={item.to} to={item.to} onClick={onClose}
            className="flex items-center gap-2.5 px-4 py-3 transition hover:bg-brand-50 dark:hover:bg-brand-900 group">
            <span className="material-symbols-rounded text-base text-brand-800 dark:text-brand-300">{item.icon}</span>
            <span className="text-sm font-semibold text-slate-800 dark:text-white">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function AuthButton() {
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  if (!user) return (
    <Link to="/login"
      className="rounded-xl bg-brand-800 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-900">
      로그인
    </Link>
  )

  const displayName = profile?.username || user.email?.split('@')[0] || '사용자'

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-dark-surface">
        <span className="material-symbols-rounded text-xl text-brand-800 dark:text-brand-300">account_circle</span>
        <span className="max-w-[80px] truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
          {displayName}
        </span>
        <span className="text-xs text-slate-400">▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 w-36 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl dark:border-dark-border dark:bg-dark-surface">
            <div className="border-b border-slate-100 px-4 py-2.5 dark:border-dark-border">
              <p className="truncate text-xs font-bold text-slate-700 dark:text-slate-200">{displayName}</p>
              <p className="truncate text-xs text-slate-400">{user.email}</p>
            </div>
            <button
              onClick={() => { signOut(); setOpen(false) }}
              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-500 transition hover:bg-slate-50 dark:hover:bg-dark-card"
            >
              <span className="material-symbols-rounded text-base">logout</span>
              로그아웃
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function Header() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [boardOpen, setBoardOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isDark, toggle, palette, setPalette, palettes } = useTheme()

  const navLinkCls = ({ isActive }) => [
    'flex items-center gap-1 px-5 py-7 text-base font-semibold transition-colors',
    isActive
      ? 'text-brand-800 dark:text-brand-300'
      : 'text-slate-700 hover:text-brand-800 dark:text-slate-300 dark:hover:text-brand-300',
  ].join(' ')

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-white shadow-sm dark:bg-dark-surface dark:border-b dark:border-dark-border">
        <div className="mx-auto flex h-20 max-w-container items-center justify-between px-4 md:px-10 lg:px-20">

          {/* 로고 */}
          <Link to="/" className="flex items-center gap-0.5 text-2xl font-extrabold tracking-tight">
            <span className="text-brand-800 dark:text-brand-300">AI</span>
            <span className="text-brand-950 dark:text-white">Learn</span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map(item => (
              item.children ? (
                <li key={item.label} className="relative flex items-center"
                  onMouseEnter={() => { setVideoOpen(true); setBoardOpen(false) }}
                  onMouseLeave={() => setVideoOpen(false)}
                >
                  <NavLink to={item.to} className={navLinkCls}>
                    {item.label}
                    <span className={`text-xs opacity-60 transition-transform duration-200 ${videoOpen ? 'rotate-180' : ''}`}>▾</span>
                  </NavLink>
                  {videoOpen && <VideoDropdown onClose={() => setVideoOpen(false)} />}
                </li>
              ) : item.boardChildren ? (
                <li key={item.label} className="relative flex items-center"
                  onMouseEnter={() => { setBoardOpen(true); setVideoOpen(false) }}
                  onMouseLeave={() => setBoardOpen(false)}
                >
                  <NavLink to={item.to} className={navLinkCls}>
                    {item.label}
                    <span className={`text-xs opacity-60 transition-transform duration-200 ${boardOpen ? 'rotate-180' : ''}`}>▾</span>
                  </NavLink>
                  {boardOpen && <BoardDropdown items={item.boardChildren} onClose={() => setBoardOpen(false)} />}
                </li>
              ) : (
                <li key={item.label} className="flex items-center"
                  onMouseEnter={() => { setVideoOpen(false); setBoardOpen(false) }}
                >
                  <NavLink to={item.to} className={navLinkCls}>{item.label}</NavLink>
                </li>
              )
            ))}
          </ul>

          {/* 우측: 팔레트 + 다크모드 + 로그인 + 햄버거 */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-3 md:flex">
              <PalettePicker />
              <div className="h-5 w-px bg-slate-200 dark:bg-dark-border" />
              <ThemeToggle />
              <div className="h-5 w-px bg-slate-200 dark:bg-dark-border" />
            </div>
            <div className="hidden lg:block">
              <AuthButton />
            </div>
            <button type="button" aria-label="메뉴 열기"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-surface lg:hidden"
              onClick={() => setMobileOpen(true)}>
              <span className="h-0.5 w-5 bg-slate-700 dark:bg-slate-300" />
              <span className="h-0.5 w-5 bg-slate-700 dark:bg-slate-300" />
              <span className="h-0.5 w-5 bg-slate-700 dark:bg-slate-300" />
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 슬라이드 패널 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto bg-white p-6 shadow-2xl dark:bg-dark-surface">
            <div className="mb-6 flex items-center justify-between">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-0.5 text-xl font-extrabold">
                <span className="text-brand-800 dark:text-brand-300">AI</span>
                <span className="text-brand-950 dark:text-white">Learn</span>
              </Link>
              <button type="button" onClick={() => setMobileOpen(false)} className="text-2xl text-slate-400">✕</button>
            </div>

            <ul className="flex flex-col gap-1">
              {nav.map(item => (
                <li key={item.label} className="border-b border-slate-100 pb-1 dark:border-dark-border">
                  <Link to={item.to} className="block py-2.5 text-base font-bold text-slate-900 dark:text-slate-100"
                    onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-2 grid grid-cols-2 gap-0.5">
                      {item.children.map(c => (
                        <li key={c.to}>
                          <Link to={c.to} onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-1.5 rounded-lg py-1.5 pl-3 text-sm text-slate-500 hover:text-brand-800 dark:text-slate-400">
                            <Icon name={videoTopics.find(t => `/videos/${t.key}` === c.to)?.icon || 'play_circle'} size="text-sm" />
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.boardChildren && (
                    <ul className="mb-2 flex flex-col gap-0.5">
                      {item.boardChildren.map(c => (
                        <li key={c.to}>
                          <Link to={c.to} onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-1.5 rounded-lg py-1.5 pl-3 text-sm text-slate-500 hover:text-brand-800 dark:text-slate-400">
                            <span className="material-symbols-rounded text-sm">{c.icon}</span>
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* 모바일 로그인 버튼 */}
            <div className="mt-4 mb-2">
              <AuthButton />
            </div>

            {/* 팔레트 + 다크모드 */}
            <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-dark-card">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">컬러 팔레트</p>
              <div className="flex items-center gap-2.5 mb-4">
                {palettes.map(p => (
                  <button key={p.id} type="button" onClick={() => setPalette(p.id)} title={p.name}
                    className="h-7 w-7 rounded-full transition-transform hover:scale-110"
                    style={{
                      backgroundColor: p.swatch,
                      boxShadow: palette === p.id ? `0 0 0 2px white, 0 0 0 4px ${p.swatch}` : 'none',
                    }} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {isDark ? '다크 모드' : '라이트 모드'}
                </span>
                <button type="button" onClick={toggle}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-dark-surface">
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
