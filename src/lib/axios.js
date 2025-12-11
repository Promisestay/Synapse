import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://synapse.app.damzymike.com",
  // baseURL: "http://localhost:3000",
  withCredentials: true,
})
