import { useState } from 'react'
import { company } from '../data/site'
import Icon from '../components/Icon'

function ContactInfo({ icon, label, value, href }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900">
        <Icon name={icon} size="text-xl" className="text-brand-800 dark:text-brand-300" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
        {href ? (
          <a href={href} className="font-semibold text-slate-800 transition hover:text-brand-800 dark:text-slate-100 dark:hover:text-brand-300">{value}</a>
        ) : (
          <p className="font-semibold text-slate-800 dark:text-slate-100">{value}</p>
        )}
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = (e) => { e.preventDefault(); setSubmitted(true) }

  const inputCls = 'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-800/20 dark:border-dark-border dark:bg-dark-card dark:text-slate-100 dark:placeholder-slate-600 dark:focus:border-brand-400'

  return (
    <div>
      <section className="relative overflow-hidden bg-neutral-900 py-20 text-center">
        <div className="pointer-events-none absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 100%, var(--brand-700) 0%, transparent 60%)',
          opacity: 0.2,
        }} />
        <div className="mx-auto max-w-xl px-6">
          <p className="section-label">CONTACT</p>
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">문의하기</h1>
          <p className="text-slate-300">궁금한 점이 있으신가요? 언제든지 문의해 주세요.</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-container px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="section-label">INFO</p>
              <h2 className="section-title mb-8">연락처 정보</h2>
              <div className="flex flex-col gap-6">
                <ContactInfo icon="mail"        label="이메일" value={company.email}   href={`mailto:${company.email}`} />
                <ContactInfo icon="phone"       label="전화"   value={company.phone}   href={`tel:${company.phone}`} />
                <ContactInfo icon="location_on" label="주소"   value={company.address} />
              </div>
              <div className="mt-10">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">SNS</p>
                <div className="flex gap-3">
                  {company.socialLinks.map(s => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand-800 transition hover:bg-brand-800 hover:text-white dark:bg-brand-900 dark:text-brand-300">
                      {s.name[0]}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="section-label">FORM</p>
              <h2 className="section-title mb-8">문의 양식</h2>
              {submitted ? (
                <div className="card rounded-2xl p-10 text-center">
                  <Icon name="check_circle" size="text-5xl" className="mb-3 text-brand-800 dark:text-brand-300" />
                  <h3 className="mb-2 text-xl font-extrabold text-slate-900 dark:text-white">문의가 접수되었습니다!</h3>
                  <p className="text-slate-500 dark:text-slate-400">빠른 시일 내에 이메일({form.email})로 답변을 드리겠습니다.</p>
                  <button type="button" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }} className="mt-6 btn-outline">
                    다시 문의하기
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">이름 <span className="text-red-500">*</span></label>
                      <input name="name" value={form.name} onChange={handle} required placeholder="홍길동" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">이메일 <span className="text-red-500">*</span></label>
                      <input name="email" type="email" value={form.email} onChange={handle} required placeholder="example@email.com" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">문의 유형 <span className="text-red-500">*</span></label>
                    <select name="subject" value={form.subject} onChange={handle} required className={inputCls}>
                      <option value="">선택하세요</option>
                      <option value="강의 문의">강의 문의</option>
                      <option value="커리큘럼 상담">커리큘럼 상담</option>
                      <option value="콘텐츠 제안">콘텐츠 제안</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">문의 내용 <span className="text-red-500">*</span></label>
                    <textarea name="message" value={form.message} onChange={handle} required rows={6} placeholder="문의 내용을 작성해 주세요." className={inputCls + ' resize-none'} />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">문의 보내기 →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
