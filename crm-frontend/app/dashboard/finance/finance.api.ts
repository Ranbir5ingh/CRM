import { AxiosInstance } from "axios";
import { expenseDto } from "./finance.schema";

export async function getAllTransactions(
  axios: AxiosInstance,
  page: number,
  pageSize: number,
  searchQuery: string
) {
  const res = await axios.get(
    "finance/transactions/all?page=" +
      page +
      "&pageSize=" +
      pageSize +
      "&searchValue=" +
      searchQuery
  );
  const rows = res.data?.data ?? [];
  const total = res.data?.total ?? 1;
  return { rows, total };
}
export async function getStatistics(axios: AxiosInstance) {
  const res = await axios.get("finance/statistics");

  return res.data;
}

export async function addExpense(data: expenseDto, axios: AxiosInstance) {
  return await axios.post("finance/add-expense", data);
}
