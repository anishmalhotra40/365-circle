interface LogoProps {
  size?: "small" | "default" | "large"
  light?: boolean
}

export default function Logo({ size = "default", light = false }: LogoProps) {
  const sizeMap = {
    small: "w-8 h-8",
    default: "w-12 h-12",
    large: "w-20 h-20",
  }

  return (
    <div className={`${sizeMap[size]} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer Circle with gradient */}
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={light ? "#ffffff" : "currentColor"} stopOpacity="1" />
            <stop offset="100%" stopColor={light ? "#ffffff" : "currentColor"} stopOpacity="0.6" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="45" stroke="url(#circleGradient)" strokeWidth="3" fill="none" />

        {/* Inner Circles representing connections */}
        <circle cx="30" cy="30" r="6" fill={light ? "#ffffff" : "currentColor"} opacity="0.9" />
        <circle cx="70" cy="30" r="6" fill={light ? "#ffffff" : "currentColor"} opacity="0.9" />
        <circle cx="50" cy="50" r="6" fill={light ? "#ffffff" : "currentColor"} />
        <circle cx="30" cy="70" r="6" fill={light ? "#ffffff" : "currentColor"} opacity="0.9" />
        <circle cx="70" cy="70" r="6" fill={light ? "#ffffff" : "currentColor"} opacity="0.9" />

        {/* Connection lines with gradient */}
        <line x1="30" y1="30" x2="50" y2="50" stroke={light ? "#ffffff" : "currentColor"} strokeWidth="2" opacity="0.7" />
        <line x1="70" y1="30" x2="50" y2="50" stroke={light ? "#ffffff" : "currentColor"} strokeWidth="2" opacity="0.7" />
        <line x1="30" y1="70" x2="50" y2="50" stroke={light ? "#ffffff" : "currentColor"} strokeWidth="2" opacity="0.7" />
        <line x1="70" y1="70" x2="50" y2="50" stroke={light ? "#ffffff" : "currentColor"} strokeWidth="2" opacity="0.7" />

        {/* 365 text in the center */}
        <text x="50" y="58" textAnchor="middle" className="text-xs font-bold" fill={light ? "#ffffff" : "currentColor"}>
          365
        </text>
      </svg>
    </div>
  )
}
