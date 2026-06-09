import { useState } from 'react'

// YouTube 썸네일 → 클릭 시 iframe으로 전환하는 영상 카드 컴포넌트
// youtubeId 가 null 이면 플레이스홀더 표시
export default function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)

  const { youtubeId, title, desc, duration, date, level } = video
  const thumbUrl = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : null

  return (
    <article className="card group overflow-hidden">
      {/* 썸네일 / 플레이어 영역 (16:9) */}
      <div className="relative w-full overflow-hidden bg-slate-200 dark:bg-dark-surface" style={{ aspectRatio: '16/9' }}>
        {playing && youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : (
          <button
            type="button"
            onClick={() => youtubeId && setPlaying(true)}
            className="absolute inset-0 flex h-full w-full items-center justify-center"
            aria-label={`${title} 재생`}
          >
            {/* 썸네일 이미지 */}
            {thumbUrl ? (
              <img
                src={thumbUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-900 to-brand-950">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,.05) 20px,rgba(255,255,255,.05) 40px)',
                  }}
                />
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#93AFFD" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <polygon points="10,8 16,12 10,16" fill="#93AFFD" stroke="none" />
                </svg>
                <span className="relative z-10 px-3 text-center text-xs font-semibold text-brand-300">
                  영상 ID를 교체하면 썸네일이 표시됩니다
                </span>
              </div>
            )}

            {/* 재생 버튼 오버레이 */}
            {youtubeId && (
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-black/60 transition group-hover:bg-gold-ai group-hover:scale-110">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </div>
            )}

            {/* 재생 시간 배지 */}
            <span className="absolute bottom-2 right-2 z-10 rounded bg-black/75 px-1.5 py-0.5 text-xs font-bold text-white">
              {duration}
            </span>
          </button>
        )}
      </div>

      {/* 영상 정보 */}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className={`badge-${level} rounded-full px-2 py-0.5 text-xs font-bold`}>
            {level}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{date}</span>
        </div>
        <h3 className="mb-1.5 line-clamp-2 text-base font-bold leading-snug text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {desc}
        </p>
      </div>
    </article>
  )
}
