import {  AxiosInstance } from "axios";

export async function getDashboardData(axios: AxiosInstance) {
  const { data } = await axios.get("/dashboard/data");
  return data;
}