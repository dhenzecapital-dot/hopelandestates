import React from 'react';

export const OFFICIAL_LOGO_PATH = '/assets/branding/hopeland-official-logo.png';
export const OFFICIAL_LOGO_TRANSPARENT_PATH = '/assets/branding/hopeland-official-logo-transparent.png';

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
    defaultWidth = width || 155;
    defaultHeight = height || 54;
  } else if (variant === 'sidebar') {
    defaultWidth = width || 150;
    defaultHeight = height || 50;
  } else if (variant === 'compact') {
    defaultWidth = width || 160;
    defaultHeight = height || 52;
  } else if (variant === 'footer') {
    defaultWidth = width || 180;
    defaultHeight = height || 56;
  } else if (variant === 'symbol') {
    defaultWidth = width || 48;
    defaultHeight = height || 48;
  }

  // Header display: on dark navy header, displaying inside an elegant crisp white container
  // ensures the official navy and gold colors remain 100% authentic without clipping or color mutation.
  if (variant === 'header') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white px-2.5 py-1 rounded shadow-xs transition-opacity hover:opacity-95 ${className}`}
        style={{ width: defaultWidth ? `${defaultWidth}px` : '155px', height: '56px' }}
      >
        <img
          src={OFFICIAL_LOGO_PATH}
          alt={alt}
          className="w-full h-full object-contain"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // Sidebar display: for admin console sidebar
  if (variant === 'sidebar') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white px-2 py-1 rounded shadow-xs ${className}`}
        style={{ width: defaultWidth ? `${defaultWidth}px` : '150px', height: defaultHeight ? `${defaultHeight}px` : '50px' }}
      >
        <img
          src={OFFICIAL_LOGO_PATH}
          alt={alt}
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>
    );
  }

  // Compact display: used in footer, login header, and mobile admin header
  if (variant === 'compact') {
    const isDarkBg = inverted !== false;
    return (
      <div
        className={`inline-flex items-center justify-center ${isDarkBg ? 'bg-white px-2.5 py-1.5 rounded shadow-xs' : ''} ${className}`}
        style={{
          width: defaultWidth ? `${defaultWidth}px` : '160px',
          height: defaultHeight ? `${defaultHeight}px` : '52px'
        }}
      >
        <img
          src={OFFICIAL_LOGO_PATH}
          alt={alt}
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>
    );
  }

  // Footer display
  if (variant === 'footer') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white px-3 py-1.5 rounded shadow-xs ${className}`}
        style={{
          width: defaultWidth ? `${defaultWidth}px` : '180px',
          height: defaultHeight ? `${defaultHeight}px` : '56px'
        }}
      >
        <img
          src={OFFICIAL_LOGO_PATH}
          alt={alt}
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>
    );
  }

  // Standalone Symbol / icon
  if (variant === 'symbol') {
    const isDarkBg = inverted !== false;
    return (
      <div
        className={`inline-flex items-center justify-center ${isDarkBg ? 'bg-white p-1 rounded-md shadow-xs' : ''} ${className}`}
        style={{
          width: defaultWidth ? `${defaultWidth}px` : '48px',
          height: defaultHeight ? `${defaultHeight}px` : '48px'
        }}
      >
        <img
          src={OFFICIAL_LOGO_PATH}
          alt={alt}
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>
    );
  }

  // Default / Full rendering: pristine responsive image adhering to Section 2 rules
  return (
    <div
      className={`inline-flex items-center justify-center ${showBadgeBackground ? 'bg-white p-2.5 rounded-lg shadow-sm' : ''} ${className}`}
      style={defaultWidth ? { width: `${defaultWidth}px` } : undefined}
    >
      <img
        src={OFFICIAL_LOGO_PATH}
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
