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


export function getSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const {data} = await axiosInstance.get("/user/skills")
      return data
    },
  })
}

export function getLearn() {
  return useQuery({
    queryKey: ["learn"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/user/learn")
      return data
    },
  })
}