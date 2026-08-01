function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 120 120" role="img" aria-label="GrowthPilot AI logo">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="12" y="12" width="96" height="96" rx="28" fill="rgba(255,255,255,0.08)" stroke="url(#logoGradient)" strokeWidth="4" />
      <path d="M36 74c10-24 23-38 48-38" fill="none" stroke="url(#logoGradient)" strokeWidth="10" strokeLinecap="round" />
      <circle cx="36" cy="74" r="8" fill="#5eead4" />
      <circle cx="84" cy="36" r="8" fill="#3b82f6" />
      <path d="M40 42h20" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <path d="M58 58h18" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export default LogoMark;
