// Get the asset base URL from environment or use relative paths for GitHub Pages compatibility
function getAssetBase(): string {
  // Use environment variable if set, otherwise use relative path for GitHub Pages
  const envBase = import.meta.env.VITE_ASSET_BASE
  if (envBase) return envBase
  
  // For GitHub Pages: if deployed to waldronlab.io, this will be empty
  // If deployed to github.io subdomain, this will be the subdomain path
  return ''
}

export function assetUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  
  const p = path.startsWith('/') ? path : `/${path}`
  const base = getAssetBase()
  
  // If no base is set, return relative path (for GitHub Pages)
  if (!base) return p
  
  return `${base}${p}`
}
