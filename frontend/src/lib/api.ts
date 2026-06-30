export type ApiRecord = Record<string, unknown>;

const defaultBaseUrl = "/api/v1";

function getBaseUrl() {
  const configured = import.meta.env.VITE_API_URL as string | undefined;
  return configured?.trim() || defaultBaseUrl;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : (payload as { message?: string | string[] }).message;
    const errorMessage = Array.isArray(message)
      ? message.join(" • ")
      : message || `Falha na requisição (${response.status})`;

    throw new Error(errorMessage);
  }

  return payload as T;
}

export function listRecords<T extends ApiRecord>(route: string) {
  return request<T[]>(`/${route}`);
}

export function createRecord<T extends ApiRecord>(route: string, data: ApiRecord) {
  return request<T>(`/${route}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateRecord<T extends ApiRecord>(
  route: string,
  path: string,
  data: ApiRecord,
) {
  return request<T>(`/${route}${path}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteRecord(route: string, path: string) {
  return request<void>(`/${route}${path}`, { method: "DELETE" });
}