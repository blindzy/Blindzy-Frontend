interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

export default async function fetchMedusaApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:9000";
  const url = new URL(`${baseUrl}/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

//   console.log('Fetching Medusa API:', url.toString());

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || "pk_a31225b5bdde2ed0e28d918ac3467479184b1cffe21edca686b1a2a72217c210",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url.toString()} - ${res.status}`);
  }

  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}
