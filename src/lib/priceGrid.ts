import type { GroupData } from "@interfaces/interfaces";

/**
 * Loads the width x drop price grid for a product category from Medusa.
 *
 * Set it in Medusa admin: Products > Categories > <blinds|curtains|shutters>
 * > Metadata, key `price_grid`, value JSON like:
 *   {"Width_values":[600,900],"Drop_values":[1200,1500],"Price_groups":[[[100,120],[130,150]]]}
 * Price_groups[g][dropIndex][widthIndex] is the price for fabric group g+1.
 * Returns {} (no pricing shown) if the grid is missing or Medusa is unreachable.
 */
export default async function fetchPriceGrid(categoryHandle: string): Promise<GroupData> {
  try {
    const url = new URL(`${import.meta.env.PUBLIC_API_URL}/store/product-categories`);
    url.searchParams.set("handle", categoryHandle);
    url.searchParams.set("fields", "handle,metadata");

    const res = await fetch(url.toString(), {
      headers: { "x-publishable-api-key": import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`Medusa responded ${res.status}`);

    const { product_categories } = await res.json();
    let grid = product_categories?.[0]?.metadata?.price_grid;
    if (typeof grid === "string") grid = JSON.parse(grid);
    if (!grid || typeof grid !== "object") return {};
    return grid as GroupData;
  } catch (err) {
    console.warn(`[priceGrid] ${categoryHandle} failed, no pricing:`, err);
    return {};
  }
}
