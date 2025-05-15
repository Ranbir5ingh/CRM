import { AxiosUrls } from "@/services/axios/axiox.constant";
import { AxiosInstance } from "axios";
import { CreateRentalDto } from "./rentals.schema";
import { statusDto } from "./rental.dto";

export async function fetchRentalData(axios: AxiosInstance,page: number, pageSize: number, searchQuery: string) {
  const res = await axios.get(`/rentals/all?page=${page}&pageSize=${pageSize}&searchValue=${searchQuery}`);
  const rows = res?.data?.data ?? [];
  const total = res?.data?.total ?? 1;
  return { rows, total };
}

export async function createRentalData(
  axios: AxiosInstance,
  bodydata: CreateRentalDto
) {
  return await axios.post("/rentals/create", bodydata);
}

export async function updateRentalData(
  axios: AxiosInstance,
  bodydata: CreateRentalDto
) {
  return await axios.put("/rentals/update", bodydata);
}

export async function getRentalById(axios: AxiosInstance, id: string) {
  const res = await axios.get(`/rentals/get-rental?rentalId=${id}`);
  return res.data;
}

export async function getCustomerByNameOrphone(
  axios: AxiosInstance,
  value: string
) {
  const res = await axios.get(`/customers/search?searchValue=${value}`);

  return res?.data;
}
export async function getVehicleByModalOrBrand(
  axios: AxiosInstance,
  value: string
) {
  const res = await axios.get(`/vehicles/search?searchValue=${value}`);

  return res?.data;
}

export async function changeRentalStatus(
  axios: AxiosInstance,
  status: statusDto,
  id: string
) {
  const res = await axios.patch(`/rentals/change-status?rentalId=${id}`, {
    status: status,
  });
  return res.data;
}

export async function deleteRental(axios:AxiosInstance,id:string){
  const res = await axios.delete(`rentals/delete?rentalId=${id}`)
  return res.data;
}
