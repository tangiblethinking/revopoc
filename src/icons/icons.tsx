type IconProps = { size?: number };

function Glyph({ size = 18, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

export function PulseMark({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="8" fill="#0f1d30" />
      <path d="M6 17h5l2.2-6 3.2 10L19 14h7" fill="none" stroke="#f5f6f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25" cy="9" r="2.2" fill="#2f7d5b" />
    </svg>
  );
}

export const IconSearch = (p: IconProps) => (
  <Glyph {...p}>
    <circle cx="116" cy="116" r="52" />
    <path d="M156 156 196 196" />
  </Glyph>
);
export const IconBell = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M56 112c0-40 32-64 72-64s72 24 72 64v36l16 24H40l16-24z" />
    <path d="M104 188a24 24 0 0 0 48 0" />
  </Glyph>
);
export const IconGear = (p: IconProps) => (
  <Glyph {...p}>
    <circle cx="128" cy="128" r="36" />
    <path d="M128 44v24M128 188v24M44 128h24M188 128h24M68 68l17 17M171 171l17 17M188 68l-17 17M85 171l-17 17" />
  </Glyph>
);
export const IconClose = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M64 64 192 192M192 64 64 192" />
  </Glyph>
);
export const IconUsers = (p: IconProps) => (
  <Glyph {...p}>
    <circle cx="92" cy="92" r="28" />
    <circle cx="168" cy="104" r="22" />
    <path d="M44 196c8-32 32-48 56-48s48 16 56 48M156 148c18-2 40 8 50 40" />
  </Glyph>
);
export const IconChart = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M44 204h168" />
    <path d="M68 164v28M108 124v68M148 148v44M188 92v100" />
  </Glyph>
);
export const IconTrophy = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M72 52h112v48c0 36-24 60-56 60s-56-24-56-60z" />
    <path d="M72 76H48c0 28 12 40 28 40M184 76h24c0 28-12 40-28 40M128 160v28M96 204h64" />
  </Glyph>
);
export const IconChat = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M48 64h160v96H96l-32 32V64z" />
  </Glyph>
);
export const IconBook = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M48 56h72c16 0 24 8 24 20v124H72c-16 0-24-8-24-20zM208 56h-64c-16 0-24 8-24 20v124h72c16 0 24-8 24-20z" />
  </Glyph>
);
export const IconSpark = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M128 40 146 104 208 128 146 152 128 216 110 152 48 128 110 104z" />
  </Glyph>
);
export const IconMenu = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M48 72h160M48 128h160M48 184h160" />
  </Glyph>
);
export const IconSun = (p: IconProps) => (
  <Glyph {...p}>
    <circle cx="128" cy="128" r="36" />
    <path d="M128 48v16M128 192v16M48 128h16M192 128h16M72 72l12 12M172 172l12 12M184 72l-12 12M84 172l-12 12" />
  </Glyph>
);
export const IconMoon = (p: IconProps) => (
  <Glyph {...p}>
    <path d="M148 48a72 72 0 1 0 60 108 68 68 0 0 1-60-108z" />
  </Glyph>
);
