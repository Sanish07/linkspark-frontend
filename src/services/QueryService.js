import { useQuery } from "@tanstack/react-query";
import QueryConnApi from "./QueryConnApi";

export const useGetTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["totalClicks", token],
    queryFn: async () => {
      const response = await QueryConnApi.get(
        "/api/urls/totalClicks?fromDate=2025-03-10&toDate=2025-03-19",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onError,
  });
};
