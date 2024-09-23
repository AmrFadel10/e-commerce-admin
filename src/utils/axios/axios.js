import axios from "axios";

const request = axios.create({
  baseURL: "https://x-ecommerce-backend.vercel.app/",
});
export default request;
