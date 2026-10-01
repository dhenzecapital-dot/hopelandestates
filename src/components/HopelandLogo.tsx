import React from 'react';

export const OFFICIAL_LOGO_PATH = '/assets/branding/hopeland-official-logo.png';
export const OFFICIAL_LOGO_TRANSPARENT_PATH = '/assets/branding/hopeland-official-logo-transparent.png';
export const OFFICIAL_EMBLEM_PATH = '/assets/branding/hopeland-emblem-transparent.png';

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
  inverted,
  className = '',
  width,
  height,
  alt = 'Hopeland Estates and Realty Corporation',
  showBadgeBackground
}) => {
  // Determine dimensions based on variant
  let defaultWidth = width;
  let defaultHeight = height;

  if (variant === 'header') {
    defaultWidth = width || 165;
    defaultHeight = height || 50;
  } else if (variant === 'sidebar') {
    defaultWidth = width || 150;
    defaultHeight = height || 42;
  } else if (variant === 'compact') {
    defaultWidth = width || 160;
    defaultHeight = height || 44;
  } else if (variant === 'footer') {
    defaultWidth = width || 170;
    defaultHeight = height || 48;
  } else if (variant === 'symbol') {
    defaultWidth = width || 46;
    defaultHeight = height || 46;
  }

  // Header display: directly against navy background with zero card/box/border clutter.
  // Perfectly proportioned horizontal lockup: official emblem on the left, refined company typography on the right.
  // Target dimensions: width 150-175px, height 48-56px.
  if (variant === 'header') {
    return (
      <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none text-left shrink-0 ${className}`}>
        <img
          src={OFFICIAL_EMBLEM_PATH}
          alt="Hopeland Architectural Emblem"
          style={{ height: defaultHeight ? `${defaultHeight}px` : '50px' }}
          className="w-auto object-contain shrink-0"
          loading="eager"
          decoding="async"
        />
        <div className="flex flex-col justify-center leading-none shrink-0">
          <span className="font-serif font-bold text-white text-[16.5px] sm:text-[17.5px] tracking-[0.14em] leading-tight drop-shadow-xs">
            HOPELAND
          </span>
          <span className="font-serif font-semibold text-[#D8B65B] text-[8px] sm:text-[8.5px] tracking-[0.18em] uppercase leading-tight mt-0.5">
            ESTATES AND REALTY CORPORATION
          </span>
        </div>
      </div>
    );
  }

  // Compact / Sidebar display: for admin console sidebar and mobile headers
  if (variant === 'sidebar' || variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none text-left shrink-0 ${className}`}>
        <img
          src={OFFICIAL_EMBLEM_PATH}
          alt="Hopeland Emblem"
          style={{ height: defaultHeight ? `${defaultHeight}px` : '42px' }}
          className="w-auto object-contain shrink-0"
          loading="eager"
        />
        <div className="flex flex-col justify-center leading-none shrink-0">
          <span className="font-serif font-bold text-white text-[14.5px] tracking-[0.14em] leading-tight">
            HOPELAND
          </span>
          <span className="font-serif font-semibold text-[#D8B65B] text-[7.5px] tracking-[0.16em] uppercase leading-tight mt-0.5">
            ESTATES AND REALTY CORPORATION
          </span>
        </div>
      </div>
    );
  }

  // Footer display: seamless integration directly on dark navy footer
  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center gap-3 select-none text-left shrink-0 ${className}`}>
        <img
          src={OFFICIAL_EMBLEM_PATH}
          alt="Hopeland Emblem"
          style={{ height: defaultHeight ? `${defaultHeight}px` : '48px' }}
          className="w-auto object-contain shrink-0"
          loading="eager"
        />
        <div className="flex flex-col justify-center leading-none shrink-0">
          <span className="font-serif font-bold text-white text-[16px] tracking-[0.14em] leading-tight">
            HOPELAND
          </span>
          <span className="font-serif font-semibold text-[#D8B65B] text-[8px] tracking-[0.18em] uppercase leading-tight mt-0.5">
            ESTATES AND REALTY CORPORATION
          </span>
        </div>
      </div>
    );
  }

  // Standalone Symbol: clean architectural mark with transparent background
  if (variant === 'symbol') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src={OFFICIAL_EMBLEM_PATH}
          alt={alt}
          style={{
            height: defaultHeight ? `${defaultHeight}px` : '46px',
            width: defaultWidth ? `${defaultWidth}px` : 'auto',
            objectFit: 'contain'
          }}
          className="max-h-full max-w-full"
          loading="eager"
        />
      </div>
    );
  }

  // Default / Full rendering: pristine responsive image adhering to Section 2 rules
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${showBadgeBackground ? 'bg-white p-3 rounded-lg shadow-sm' : ''} ${className}`}
      style={defaultWidth ? { width: `${defaultWidth}px` } : undefined}
    >
      <img
        src={showBadgeBackground ? OFFICIAL_LOGO_PATH : OFFICIAL_LOGO_TRANSPARENT_PATH}
        alt={alt}
        style={{
          width: defaultWidth ? `${defaultWidth}px` : 'auto',
          height: defaultHeight ? `${defaultHeight}px` : 'auto',
          maxWidth: '100%',
          objectFit: 'contain'
        }}
        className="w-auto h-auto max-w-full"
        loading="eager"
      />
    </div>
  );
};

