import { Link } from 'react-router-dom'
import { company, videoTopics } from '../data/site'
import Icon from './Icon'
import Placeholder from './Placeholder'

// rest03 스타일 — 상단 white + 하단 black 2단 구조
export default function Footer() {
  return (
    <footer className="relative">
      {/* 상단 — 로고 + 소개 (rest03 스타일) */}
      <div className="mx-auto max-w-container px-4 py-20 md:px-10 lg:px-40">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
          {/* 로고 */}
          <div className="w-48 shrink-0">
            <div className="flex items-center gap-1 text-3xl font-extrabold">
              <span className="text-brand-800">AI</span>
              <span className="text-brand-950 dark:text-slate-800">Learn</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-400">{company.nameKo}</p>
          </div>
          <div className="flex-grow text-base leading-7 text-slate-600 md:text-[1.05rem]">
            {company.description.map((p, i) => (
              <p key={i} className="mb-3 last:mb-0">{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 — 다크 영역 (rest03 스타일) */}
      <div className="bg-black px-4 py-12 md:px-10 lg:px-40">
        <div className="mx-auto flex max-w-container flex-col gap-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            {/* 연락처 */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex flex-col gap-1 md:flex-row md:gap-8">
                <div className="w-14 shrink-0 font-bold text-slate-300">이메일</div>
                <a href={`mailto:${company.email}`} className="font-medium text-slate-400 transition hover:text-white">
                  {company.email}
                </a>
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:gap-8">
                <div className="w-14 shrink-0 font-bold text-slate-300">전화</div>
                <span className="font-medium text-slate-400">{company.phone}</span>
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:gap-8">
                <div className="w-14 shrink-0 font-bold text-slate-300">주소</div>
                <span className="font-medium text-slate-400">{company.address}</span>
              </div>
            </div>

            {/* 강의 주제 링크 */}
            <div className="w-full md:w-64">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">강의 주제</p>
              <ul className="grid grid-cols-2 gap-1.5">
                {videoTopics.map(t => (
                  <li key={t.key}>
                    <Link to={`/videos/${t.key}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-white">
                      <Icon name={t.icon} size="text-sm" />
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 정책 + 카피라이트 */}
          <div className="flex flex-col justify-between gap-4 border-t border-slate-800 pt-4 text-sm md:flex-row md:items-center">
            <ul className="flex">
              {company.footerLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.to}
                    className={[
                      'px-6 first:pl-0',
                      l.strong ? 'font-black text-white' : 'font-medium text-slate-400 hover:text-white',
                    ].join(' ')}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-slate-600">{company.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
