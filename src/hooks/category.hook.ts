import { categories } from "@/api/category.api";
import { useQuery } from "@tanstack/react-query";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categories,
    retry: false,
  });
}
