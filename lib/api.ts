const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
};

export async function postForm<T>(path: string, payload: T): Promise<ApiResponse<unknown>> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = (await response.json().catch(() => null)) as ApiResponse<unknown> | null;
  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Unable to submit the form. Please try again.");
  }

  return result;
}