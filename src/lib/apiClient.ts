import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",

  async onResponseError({ request, response, options }) {
    const requestUrl = request.toString();

    const isAuthRoute =
      requestUrl.includes("/auth/refresh-token") ||
      requestUrl.includes("/auth/login");

    if (response.status === 401 && !isAuthRoute) {
      try {
        await ofetch(`${BASE_URL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
        });

        await ofetch(request, options);
        return;
      } catch (error) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw error;
      }
    }

    throw response._data || new Error("An error occurred");
  },
});

export default apiClient;
