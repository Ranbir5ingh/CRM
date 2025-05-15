import { AxiosInstance } from "axios";
import { CreateVehicleDto } from "./vehicle.schema";
import { uploadImage } from "@/lib/upload-image";

export async function fetchVehicle(axios: AxiosInstance,page: number, pageSize: number, searchquery: string) {
  const res = await axios.get(`/vehicles/all?page=${page}&pageSize=${pageSize}&searchValue=${searchquery}`);
  const rows = res?.data?.data ?? [];
  const total = res?.data?.total ?? 1;

  return { rows, total };
}

export async function createVehicle(
  axios: AxiosInstance,
  data: CreateVehicleDto
) {
  let bodyData: any = {};
  if (data.vehicle_image)
    bodyData.vehicle_image = await uploadImage(axios, data.vehicle_image);
  if (data.registration_doc)
    bodyData.registration_doc = await uploadImage(axios, data.registration_doc);
  const res = await axios.post("/vehicles/create", { ...data, ...bodyData });
  return res.data;
}

export async function updateVehicle(
  id: string,
  axios: AxiosInstance,
  data: CreateVehicleDto
) {
  let bodyData: any = {};
  if (data.vehicle_image)
    bodyData.vehicle_image = await uploadImage(axios, data.vehicle_image);
  if (data.registration_doc)
    bodyData.registration_doc = await uploadImage(axios, data.registration_doc);
  const res = await axios.put(`/vehicles/update-vehicle?vechicleId=${id}`, {
    ...data,
    ...bodyData,
  });
  return res.data;
}

export async function deleteVehicle(axios: AxiosInstance, id: string) {
  const res = await axios.patch(`/vehicles/delete-vehilce?vechicleId=${id}`);
  return res.data;
}
