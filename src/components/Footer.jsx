import { Link } from 'react-router-dom'
import { company, videoTopics } from '../data/site'
import Icon from './Icon'

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-950 text-slate-400">
      {/* 상단 */}
      <div className="mx-auto max-w-container px-4 py-14 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* 브랜드 */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-1 text-2xl font-extrabold">
              <span className="text-brand-300">AI</span>
              <span className="text-white">Learn</span>
            </div>
            <p className="mb-4 text-sm leading-7 text-slate-400">
              {company.description[0]}
            </p>
            <div className="flex gap-3">
              {company.socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-900 text-sm font-bold text-slate-300 transition hover:bg-brand-800 hover:text-white"
                  aria-label={s.name}
                >
                  {s.name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* 강의 주제 */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              강의 영상
            </p>
            <ul className="flex flex-col gap-2">
              {videoTopics.map((t) => (
                <li key={t.key}>
                  <Link
                    to={`/videos/${t.key}`}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    <Icon name={t.icon} size="text-base" /> {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              연락처
            </p>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li>
                <a href={`mailto:${company.email}`} className="transition hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>{company.phone}</li>
              <li className="leading-6">{company.address}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div className="border-t border-brand-900 px-4 py-6 md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-3 text-sm md:flex-row">
          <ul className="flex gap-1">
            {company.footerLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className={[
                    'px-3 transition',
                    l.strong
                      ? 'font-bold text-slate-300 hover:text-white'
                      : 'text-slate-500 hover:text-slate-300',
                  ].join(' ')}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-slate-600">{company.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
