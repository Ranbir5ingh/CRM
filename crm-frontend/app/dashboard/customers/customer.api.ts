import { AxiosInstance } from "axios";
import { CreateCustomerDto } from "./customer.schema";
import { uploadImage } from "@/lib/upload-image";

export async function fetchCustomers(
  axios: AxiosInstance,
  page: number,
  pageSize: number,
  searchquery: string
) {
  const data = await axios.get(`customers/all?page=${page}&pageSize=${pageSize}&searchValue=${searchquery}`);

  const rows = data?.data?.data ?? [];
  const total = data?.data?.total ?? 1;

  console.log({ data });

  return { rows, total };
}

export async function updateCustomer(
  axios: AxiosInstance,
  data: CreateCustomerDto,
  id: string
) {
  let bodyData: any = {};

  if (data.profile) bodyData.profile = await uploadImage(axios, data.profile);
  if (data.aadharFront)
    bodyData.aadharFront = await uploadImage(axios, data.aadharFront);
  if (data.aadharBack)
    bodyData.aadharBack = await uploadImage(axios, data.aadharBack);
  if (data.drivingLic)
    bodyData.drivingLic = await uploadImage(axios, data.drivingLic);

  const customerRes = await axios.put(
    `/customers/update-customer?customerId=${id}`,
    { ...bodyData, ...data }
  );

  return customerRes.data;
}
export async function createCustomer(
  axios: AxiosInstance,
  data: CreateCustomerDto
) {
  let profileUrl = "";
  let addharFrontUrl = "";
  let addharbackUrl = "";
  let drivingUrl = "";

  if (data.profile) profileUrl = await uploadImage(axios, data.profile);

  if (data.aadharFront)
    addharFrontUrl = await uploadImage(axios, data.aadharFront);
  if (data.aadharBack)
    addharbackUrl = await uploadImage(axios, data.aadharBack);
  if (data.drivingLic) drivingUrl = await uploadImage(axios, data.drivingLic);

  const bodyData = {
    ...data,
    profile: profileUrl,
    aadharFront: addharFrontUrl,
    aadharBack: addharbackUrl,
    drivingLic: drivingUrl,
  };

  const customerRes = await axios.post("/customers/create", bodyData);

  return customerRes.data;
}

export async function getcustomerDetails(axiox: AxiosInstance, id: string) {
  const res = await axiox.get(`/customers/profile?customerId=${id}`);

  return res.data;
}

export async function deleteCustomer(axios: AxiosInstance, id: string) {
  const res = await axios.patch(`/customers/delete-customer?customerId=${id}`);
  return res.data;
}
