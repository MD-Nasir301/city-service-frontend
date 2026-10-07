import apiClient from "@/lib/apiClient";


export const categories = async () => {
  return await apiClient("/categories");
};
