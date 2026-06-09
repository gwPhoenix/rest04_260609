import { useEffect, useRef } from 'react'

// ── 파티클 신경망 캔버스 ──────────────────────────────────────
// 파티클이 떠다니며 가까운 파티클끼리 선으로 연결됩니다.
// 마우스를 올리면 가까운 파티클들이 연결선을 그립니다.
// 팔레트 색상(--brand-400)을 실시간으로 읽어 색상이 따라 바뀝니다.

const COUNT = 65       // 파티클 수 (모바일은 절반으로 줄임)
const MAX_DIST = 160   // 연결선 최대 거리
const MOUSE_DIST = 260 // 마우스 연결선 최대 거리
const SPEED = 0.35

// hex → "r,g,b" 변환
function hexToRgb(hex) {
  const h = hex.replace(/\s/g, '')
  if (!/^#[0-9a-fA-F]{6}$/.test(h)) return '96,137,250'
  return [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)).join(',')
}

// CSS 변수에서 현재 팔레트 색상 읽기
function readBrandRgb() {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue('--brand-400').trim()
  return hexToRgb(v || '#6089FA')
}

export default function ParticleCanvas({ mouseRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let colorCache = readBrandRgb()
    let colorFrame = 0

    // 캔버스 크기를 부모에 맞춤
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // 파티클 생성 (모바일은 수 감소)
    const count = window.innerWidth < 768 ? Math.floor(COUNT * 0.55) : COUNT
    const pts = Array.from({ length: count }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r:  Math.random() * 1.4 + 0.6,
    }))

    const draw = () => {
      // 60프레임마다 색상 갱신 (팔레트 전환 반영)
      if (++colorFrame % 60 === 0) colorCache = readBrandRgb()

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const rgb = colorCache
      const { x: mx, y: my } = mouseRef?.current ?? { x: -9999, y: -9999 }

      // 파티클 이동
      pts.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })

      // 파티클 간 연결선
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / MAX_DIST) * 0.22})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }

        // 마우스 연결선
        if (mx > -9000) {
          const dx = pts[i].x - mx
          const dy = pts[i].y - my
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MOUSE_DIST) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(mx, my)
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / MOUSE_DIST) * 0.55})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // 파티클 점
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},0.75)`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [mouseRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: 'none' }}   // 버튼 클릭 방해 안 함
    />
  )
}
