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

  const url = new URL(`http://208.87.135.120:9000/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

//   console.log('Fetching Medusa API:', url.toString());

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": "pk_35f5ace6ac7d3be739f9edbf5a4ee494f93bf53432f8673a6446da2556e826c7",
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
