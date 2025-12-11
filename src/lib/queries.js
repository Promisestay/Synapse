import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "./axios"

export function getWalletDetails() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/wallet/details")
      return data
    },
  })
}
