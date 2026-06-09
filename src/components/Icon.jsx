// Material Symbols Rounded 아이콘 컴포넌트
// 사용법: <Icon name="smart_toy" size="text-2xl" className="..." />
export default function Icon({ name, size = 'text-2xl', className = '' }) {
  return (
    <span
      className={`material-symbols-rounded ${size} ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
