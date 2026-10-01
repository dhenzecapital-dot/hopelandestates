import React from 'react';

const rawBase = import.meta.env.BASE_URL || '/hopelandestates/';
const normalizedBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export const OFFICIAL_LOGO_PATH = `${normalizedBase}assets/branding/hopeland-official-logo.png`;
export const OFFICIAL_LOGO_TRANSPARENT_PATH = `${normalizedBase}assets/branding/hopeland-official-logo-transparent.png`;
export const OFFICIAL_LOGO_MASTER_PATH = `${normalizedBase}assets/branding/hopeland-official-logo-master.png`;
export const OFFICIAL_EMBLEM_TRANSPARENT_PATH = `${normalizedBase}assets/branding/hopeland-emblem-transparent.png`;

interface LogoProps {
  variant?: 'full' | 'header' | 'footer' | 'sidebar' | 'symbol' | 'compact';
  inverted?: boolean;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
  showBadgeBackground?: boolean;
}

export const HopelandLogo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  width,
  height,
  alt = 'Hopeland Estates and Realty Corporation'
}) => {
  let defaultMaxWidth = width;
  let defaultHeight = height;

  if (variant === 'header') {
    defaultMaxWidth = width || 170;
    defaultHeight = height || 56;
  } else if (variant === 'sidebar') {
    defaultMaxWidth = width || 155;
    defaultHeight = height || 48;
  } else if (variant === 'compact') {
    defaultMaxWidth = width || 160;
    defaultHeight = height || 52;
  } else if (variant === 'footer') {
    defaultMaxWidth = width || 170;
    defaultHeight = height || 58;
  } else if (variant === 'symbol') {
    defaultMaxWidth = width || 52;
    defaultHeight = height || 52;
  }

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        height: defaultHeight ? `${defaultHeight}px` : undefined,
        maxWidth: defaultMaxWidth ? `${defaultMaxWidth}px` : undefined
      }}
    >
      <img
        src={OFFICIAL_LOGO_PATH}
        alt={alt}
        className="h-full w-auto max-w-full object-contain object-center bg-white px-2 py-1 rounded-[3px] block select-none"
        style={{
          objectFit: 'contain',
          objectPosition: 'center'
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
