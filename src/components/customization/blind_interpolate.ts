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

  const x1 = widthVals[i - 1]
  const x2 = widthVals[i]
  const y1 = dropVals[j - 1]
  const y2 = dropVals[j]

  const Q11 = matrix[j - 1][i - 1]
  const Q21 = matrix[j - 1][i]
  const Q12 = matrix[j][i - 1]
  const Q22 = matrix[j][i]

  // Bilinear interpolation formula
  const price =
    (Q11 * (x2 - width) * (y2 - drop) +
      Q21 * (width - x1) * (y2 - drop) +
      Q12 * (x2 - width) * (drop - y1) +
      Q22 * (width - x1) * (drop - y1)) /
    ((x2 - x1) * (y2 - y1))

  return Math.round(price)
}

// Pricing data
export const widthValues = [600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000]
export const dropValues = [1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000]
export const priceMatrix = [
  [100, 105, 110, 120, 135, 145, 160, 170, 200, 220, 260, 275, 290],
  [105, 110, 115, 130, 150, 160, 170, 190, 220, 235, 275, 290, 305],
  [110, 115, 125, 140, 155, 170, 185, 200, 135, 255, 295, 310, 325],
  [120, 125, 130, 145, 165, 180, 200, 220, 250, 270, 310, 330, 350],
  [125, 130, 135, 155, 175, 195, 215, 235, 270, 290, 330, 350, 370],
  [130, 140, 150, 165, 190, 205, 225, 245, 285, 305, 350, 370, 390],
  [135, 145, 150, 175, 195, 220, 240, 265, 300, 320, 370, 390, 410],
  [140, 155, 165, 180, 205, 230, 250, 280, 315, 340, 385, 410, 435],
  [145, 165, 170, 190, 315, 240, 265, 285, 330, 355, 405, 430, 455],
  [150, 170, 175, 200, 225, 255, 275, 305, 350, 380, 420, 450, 480],
]
