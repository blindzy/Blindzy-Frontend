// Bilinear interpolation function for dynamic price calculation
export function interpolate2D(
  width: number,
  drop: number,
  widthVals: number[],
  dropVals: number[],
  matrix: number[][],
): number | null {
  // Find index bounds
  const i = widthVals.findIndex((w) => w > width)
  const j = dropVals.findIndex((d) => d > drop)

  // Out of range check
  if (i <= 0 || j <= 0) return null

  const x1 = widthVals[i - 1] ?? 0
  const x2 = widthVals[i] ?? 0
  const y1 = dropVals[j - 1] ?? 0
  const y2 = dropVals[j] ?? 0

  const row1 = matrix[j - 1]
  const row2 = matrix[j]

  if (!row1 || !row2) return null

  const Q11 = row1[i - 1] ?? 0
  const Q21 = row1[i] ?? 0
  const Q12 = row2[i - 1] ?? 0
  const Q22 = row2[i] ?? 0

  // Bilinear interpolation formula
  const price =
    (Q11 * (x2 - width) * (y2 - drop) +
      Q21 * (width - x1) * (y2 - drop) +
      Q12 * (x2 - width) * (drop - y1) +
      Q22 * (width - x1) * (drop - y1)) /
    ((x2 - x1) * (y2 - y1) || 1)

  return isNaN(price) ? null : Math.round(price)
}
