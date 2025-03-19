import { useQuery } from "@tanstack/react-query";
import QueryConnApi from "./QueryConnApi";

export const useFetchTotalClicks = (token, onError) => {
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

        const response_arr = Object.keys(response.data).map((key)=>(
          { 
            clickDate : key,
            clickCount : response.data[key]
          }
        ));

        return response_arr;
      },
    onError
  });
};
