/** @format */

import axios from "axios";

export const serverAxios = axios.create({
  baseURL: "https://narrate-server.loca.lt",
  withCredentials: true,
});
