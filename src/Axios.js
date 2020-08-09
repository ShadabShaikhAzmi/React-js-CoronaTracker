import axios from "axios";

const axiosInstance = axios.create({
  baseUrl: "https://api.covid19api.com",
});

export default axiosInstance;
