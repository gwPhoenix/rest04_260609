export default function Placeholder({
  label = 'IMAGE',
  ratio = '16/9',
  className = '',
  rounded = false,
  dark = false,
}) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={[
        'relative flex w-full items-center justify-center overflow-hidden',
        dark
          ? 'bg-brand-950 text-brand-400'
          : 'bg-slate-100 text-slate-400 dark:bg-dark-card dark:text-slate-600',
        rounded ? 'rounded-xl' : '',
        className,
      ].join(' ')}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg,transparent,transparent 14px,rgba(0,0,0,0.04) 14px,rgba(0,0,0,0.04) 28px)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-1 px-2 text-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="text-xs font-semibold tracking-wide md:text-sm">{label}</span>
        <span className="text-[10px] opacity-60">{ratio}</span>
      </div>
    </div>
  )
}
