import { ofetch, FetchContext } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",

  async onResponseError(context: FetchContext) {
    const { request, response, options } = context;
    if (!response) return;

    const requestUrl = request.toString();

    const isAuthRoute =
      requestUrl.includes("/auth/refresh-token") ||
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/me");

    if (response.status === 401 && !isAuthRoute) {
      try {
        await ofetch(`${BASE_URL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
        });

      
        await ofetch(request, options);
        return;
      } catch (error) {
        throw error;
      }
    }

    throw response._data || new Error("An error occurred");
  },
});

export default apiClient;