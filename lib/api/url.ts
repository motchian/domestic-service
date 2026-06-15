export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export function apiUrl(path: string) {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}
