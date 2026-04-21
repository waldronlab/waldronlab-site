/** Deep-merge plain objects; arrays and primitives from patch replace wholesale. */
function deepMergeObjects(base: object, patch: object): object {
  if (patch === undefined || patch === null) return base
  const p = patch as Record<string, unknown>
  const b = base as Record<string, unknown>
  const out: Record<string, unknown> = { ...b }

  for (const key of Object.keys(p)) {
    const pv = p[key]
    if (pv === undefined) continue
    const bv = b[key]
    if (Array.isArray(pv)) {
      out[key] = pv
    } else if (pv !== null && typeof pv === 'object' && !Array.isArray(pv)) {
      if (bv !== null && typeof bv === 'object' && !Array.isArray(bv)) {
        out[key] = deepMergeObjects(bv as object, pv as object)
      } else {
        out[key] = pv
      }
    } else {
      out[key] = pv
    }
  }
  return out
}

export function deepMerge<T extends object>(base: T, patch: object): T {
  return deepMergeObjects(base, patch) as T
}
