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
  alt = 'Hopeland Estates and Realty Corporation',
  showBadgeBackground = false
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

  const logoSrc =
    variant === 'symbol'
      ? OFFICIAL_EMBLEM_TRANSPARENT_PATH
      : showBadgeBackground
      ? OFFICIAL_LOGO_PATH
      : OFFICIAL_LOGO_TRANSPARENT_PATH;

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`w-auto object-contain object-center block select-none shrink-0 ${
        showBadgeBackground ? 'bg-white p-2 rounded-[4px]' : ''
      } ${className}`}
      style={{
        height: defaultHeight ? `${defaultHeight}px` : undefined,
        maxWidth: defaultMaxWidth ? `${defaultMaxWidth}px` : undefined,
        objectFit: 'contain',
        objectPosition: 'center'
      }}
      loading="eager"
      decoding="async"
    />
  );
};
