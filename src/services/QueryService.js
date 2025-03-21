import { useQuery } from "@tanstack/react-query";
import QueryConnApi from "./QueryConnApi";

export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["totalClicks", token],
    queryFn: async () => {

        const currentDate = new Date();
        const fourteenDaysAgo = new Date(currentDate.getTime() - (14 * 24 * 60 * 60 * 1000));
        const todayDateString = currentDate.toISOString().substring(0,10);
        const pastDateString = fourteenDaysAgo.toISOString().substring(0,10);

        const response = await QueryConnApi.get(
          `/api/urls/totalClicks?fromDate=${pastDateString}&toDate=${todayDateString}`,
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

        return response_arr.sort((date1, date2)=>
          new Date(date2.clickDate) - new Date(date1.clickDate)
        );
      },
    onError
  });
};

export const useFetchAllUrlData = (token, onError) => {
  return useQuery({
    queryKey: ["urlData", token],
    queryFn: async () => {
        const response = await QueryConnApi.get(
          "/api/urls/active-urls",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data.sort((date1,date2) => 
          new Date(date2.createdAt) - new Date(date1.createdAt));
      },
    onError
  });
};