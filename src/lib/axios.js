import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  "https://synapse.app.damzymike.com",
  withCredentials: true,
});
