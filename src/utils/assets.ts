/**
 * Asset URL resolver supporting both local dev and GitHub Pages base path deployment (/hopelandestates/)
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  let cleanPath = path;

  // Map legacy /src/assets/images/ to public assets/images/
  if (cleanPath.startsWith('/src/assets/images/')) {
    cleanPath = cleanPath.replace('/src/assets/images/', 'assets/images/');
  } else if (cleanPath.startsWith('src/assets/images/')) {
    cleanPath = cleanPath.replace('src/assets/images/', 'assets/images/');
  }

  // Remove leading slash so we can cleanly prepend cleanBase
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }

  // If already prefixed with base path without leading slash, ensure leading slash
  if (cleanBase !== '/' && cleanPath.startsWith(cleanBase.slice(1))) {
    return `/${cleanPath}`;
  }

  return `${cleanBase}${cleanPath}`;
};
