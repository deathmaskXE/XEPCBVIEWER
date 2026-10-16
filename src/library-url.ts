/** Build public library URLs without escaping the GitHub Pages repository prefix. */
export function libraryFileUrl(input: string): string {
  const raw = input.trim();
  const base = new URL(import.meta.env.BASE_URL, window.location.href);
  const repo = base.pathname.replace(/\/+$/, '');
  let pathname = raw;
  try {
    const url = new URL(raw);
    pathname = url.pathname;
  } catch { /* relative path */ }
  // Accept index paths, /public/biblioteca paths and older absolute-root paths.
  pathname = pathname.replace(/^\/+/, '').replace(/^public\//i, '');
  const prefix = repo.replace(/^\/+/, '') + '/';
  if (pathname.toLowerCase().startsWith(prefix.toLowerCase())) pathname = pathname.slice(prefix.length);
  // Preserve existing percent escapes; encode each path segment only once.
  const encoded = pathname.split('/').map(segment => {
    try { return encodeURIComponent(decodeURIComponent(segment)); }
    catch { return encodeURIComponent(segment); }
  }).join('/');
  return new URL(encoded, base).href;
}
