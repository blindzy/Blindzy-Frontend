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

// // Pricing data
// export const widthValues = [600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000]
// export const dropValues = [1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000]
// export const priceMatrix = [
//   [
//     [450, 550, 650, 750, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1650],
//     [550, 550, 650, 750, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1650],
//     [650, 650, 650, 750, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1650],
//     [750, 750, 750, 750, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1650],
//     [850, 850, 850, 850, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1650],
//     [950, 950, 950, 950, 950, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1650],
//     [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1150, 1250, 1350, 1450, 1550, 1650],
//     [1150, 1150, 1150, 1150, 1150, 1150, 1150, 1150, 1250, 1350, 1450, 1550, 1650],
//     [1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250, 1350, 1450, 1550, 1650],
//     [1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1450, 1550, 1650]
//   ]
// ]
