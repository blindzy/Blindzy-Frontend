interface Props {
    endpoint: string;
    query?: Record<string, string>;
    wrappedByKey?: string;
    wrappedByList?: boolean;
    /**
     * Returned instead of throwing when Strapi is unreachable, slow, or
     * answers with a non-OK / non-JSON response. Omit it to keep throwing.
     */
    fallback?: unknown;
}
  
  /**
   * Fetches data from the Strapi API check now
   * @param endpoint - The endpoint to fetch from
   * @param query - The query parameters to add to the url
   * @param wrappedByKey - The key to unwrap the response from
   * @param wrappedByList - If the response is a list, unwrap it
   * @returns
   */
    export default async function fetchApi<T>({
        endpoint,
        query,
        wrappedByKey,
        wrappedByList,
        fallback,
    }: Props): Promise<T> {
    if (endpoint.startsWith('/')) {
      endpoint = endpoint.slice(1);
    }
  
    const strapiUrl = import.meta.env.PUBLIC_STRAPI_API_URL;
    console.log(strapiUrl)
    const url = new URL(`${strapiUrl}/api/${endpoint}`);
    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    console.log(url.toString());
    let data;
    if (fallback !== undefined) {
      try {
        const res = await fetch(url.toString(), { signal: AbortSignal.timeout(5000) });
        if (!res.ok) throw new Error(`Strapi responded ${res.status}`);
        data = await res.json();
      } catch (err) {
        console.warn(`[strapi] ${endpoint} failed, using fallback:`, err);
        return fallback as T;
      }
    } else {
      const res = await fetch(url.toString());
      data = await res.json();
    }
  
    if (wrappedByKey) {
      data = data[wrappedByKey];
    }
  
    if (wrappedByList) {
      data = data[0];
    }
  
    return data as T;
}