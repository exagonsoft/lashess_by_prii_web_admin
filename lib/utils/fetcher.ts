/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ApiFetcher {
  static async request<T>(
    url: string,
    options: RequestInit = {},
    token?: string | null
  ): Promise<T> {
    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(url, { ...options, headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  static get<T>(url: string, token?: string | null) {
    return this.request<T>(url, {}, token);
  }

  static post<T>(url: string, body: any, token?: string | null) {
    return this.request<T>(url, { method: "POST", body: JSON.stringify(body) }, token);
  }

  static put<T>(url: string, body: any, token?: string | null) {
    return this.request<T>(url, { method: "PUT", body: JSON.stringify(body) }, token);
  }

  static delete<T>(url: string, token?: string | null) {
    return this.request<T>(url, { method: "DELETE" }, token);
  }
}
