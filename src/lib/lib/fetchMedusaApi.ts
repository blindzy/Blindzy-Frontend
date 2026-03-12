interface Props {
  endpoint: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  query?: Record<string, string>;
  body?: any;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

export default async function fetchMedusaApi<T>({
  endpoint,
  method = "GET",
  query,
  body,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {

  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const baseUrl = import.meta.env.PUBLIC_API_URL || "http://localhost:9000";
  const url = new URL(`${baseUrl}/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
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