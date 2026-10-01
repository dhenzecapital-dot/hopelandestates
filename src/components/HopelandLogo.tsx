import React from 'react';

export const OFFICIAL_LOGO_PATH = `${import.meta.env.BASE_URL}logo.svg`;
export const OFFICIAL_LOGO_TRANSPARENT_PATH = `${import.meta.env.BASE_URL}logo.svg`;

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

  const image = (
    <img
      src={OFFICIAL_LOGO_PATH}
      alt={alt}
      className="w-full h-full object-contain"
      loading="eager"
      decoding="async"
    />
  );

  if (variant === 'header' || variant === 'sidebar' || variant === 'footer') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white px-2.5 py-1 rounded ${className}`}
        style={{
          width: defaultWidth,
          height: defaultHeight
        }}
      >
        {image}
      </div>
    );
  }

  if (variant === 'compact' || variant === 'symbol') {
    return (
      <div
        className={`inline-flex items-center justify-center ${
          inverted !== false ? 'bg-white p-1 rounded-md' : ''
        } ${className}`}
        style={{
          width: defaultWidth,
          height: defaultHeight
        }}
      >
        {image}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center ${
        showBadgeBackground ? 'bg-white p-2.5 rounded-lg shadow-sm' : ''
      } ${className}`}
      style={defaultWidth ? { width: defaultWidth } : undefined}
    >
      <img
        src={OFFICIAL_LOGO_PATH}
        alt={alt}
        style={{
          width: defaultWidth || 'auto',
          height: defaultHeight || 'auto',
          maxWidth: '100%',
          objectFit: 'contain'
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
