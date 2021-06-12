import { BASE_URL } from "./constants";
import axios from "axios";

// config axios for sending requests with authetication token
export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Token ${localStorage.getItem("key")}` },
});
