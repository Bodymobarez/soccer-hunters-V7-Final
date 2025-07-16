import { QueryClient, QueryFunction } from "@tanstack/react-query";
import config from "./config";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Helper function to construct full API URL
function getApiUrl(endpoint: string): string {
  // If the endpoint already includes the full URL, use it as-is
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }

  // Otherwise, prepend the API base URL
  const baseUrl = config.apiBaseUrl;
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = `${baseUrl}${cleanEndpoint}`;

  // Log the constructed URL for debugging
  console.log(
    "Constructed API URL:",
    fullUrl,
    "from baseUrl:",
    baseUrl,
    "endpoint:",
    endpoint,
  );

  // Validate the URL
  if (!baseUrl || baseUrl.trim() === "") {
    console.warn("Empty API base URL detected, API calls will likely fail");
  }

  return fullUrl;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Top-level try-catch to ensure no errors escape
  try {
    console.log(`Starting apiRequest: ${method} ${url}`);
    const fullUrl = getApiUrl(url);
    console.log(`About to fetch: ${fullUrl}`);

    // Pre-check: if API base URL is empty or invalid, return mock response immediately
    const baseUrl = config.apiBaseUrl;
    if (!baseUrl || baseUrl.trim() === "" || baseUrl === "/") {
      console.warn("Invalid API base URL, returning mock response immediately");
      return new Response(
        JSON.stringify({
          error: "API_NOT_AVAILABLE",
          message: "Backend API is not available. Using demo mode.",
        }),
        {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    try {
      const res = await fetch(fullUrl, {
        method,
        headers: data ? { "Content-Type": "application/json" } : {},
        body: data ? JSON.stringify(data) : undefined,
        credentials: "include",
      }).catch((fetchError) => {
        console.log("Fetch promise rejection caught:", fetchError);
        // Re-throw to be handled by the outer catch block
        throw fetchError;
      });

      // Don't throw on authentication errors, let the caller handle them
      if (res.status === 401) {
        return res;
      }

      await throwIfResNotOk(res);
      return res;
    } catch (error) {
      console.log(
        "apiRequest caught error:",
        error,
        "type:",
        typeof error,
        "instanceof TypeError:",
        error instanceof TypeError,
      );
      console.log(
        "Error message:",
        error instanceof Error ? error.message : "No message",
      );

      // Handle network errors (Failed to fetch, etc.)
      if (
        (error instanceof TypeError && error.message.includes("fetch")) ||
        (error instanceof Error &&
          (error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError") ||
            error.message.includes("ERR_NETWORK") ||
            error.message.includes("ERR_INTERNET_DISCONNECTED")))
      ) {
        console.warn(
          `Network error for ${method} ${url}, returning mock error response`,
        );

        // Return a mock Response object that indicates the API is not available
        return new Response(
          JSON.stringify({
            error: "API_NOT_AVAILABLE",
            message: "Backend API is not available. Using demo mode.",
          }),
          {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // For any other error, also return a mock response to prevent crashes
      console.warn(
        `Unhandled error for ${method} ${url}, returning mock error response as fallback:`,
        error,
      );

      return new Response(
        JSON.stringify({
          error: "UNKNOWN_ERROR",
          message: "An unknown error occurred. Using demo mode.",
          originalError: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (topLevelError) {
    // Final catch-all for any error that escapes inner handling
    console.error("Top-level apiRequest error caught:", topLevelError);
    return new Response(
      JSON.stringify({
        error: "TOP_LEVEL_ERROR",
        message: "A critical error occurred. Using demo mode.",
        originalError:
          topLevelError instanceof Error
            ? topLevelError.message
            : String(topLevelError),
      }),
      {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options?: {
  on401?: UnauthorizedBehavior;
}) => QueryFunction<T> =
  (options) =>
  async ({ queryKey }) => {
    const unauthorizedBehavior = options?.on401 || "throw";
    const fullUrl = getApiUrl(queryKey[0] as string);

    try {
      const res = await fetch(fullUrl, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      // Handle network errors for queries
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.warn(
          `Network error for query ${queryKey[0]}, returning empty data`,
        );
        // Return empty data for queries when API is not available
        return [];
      }

      // Re-throw non-network errors
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
