const API_BASE_URL = 'https://api.trello.com/1';
const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN = import.meta.env.VITE_TOKEN;

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type ApiRequestOptions = {
  endpoint: string;
  method?: Method;
  body?: object;
};

export const apiRequest = async <T>(options: ApiRequestOptions): Promise<T> => {
  const url = new URL(`${API_BASE_URL}${options.endpoint}`);

  url.searchParams.set('key', API_KEY);
  url.searchParams.set('token', TOKEN);

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};
