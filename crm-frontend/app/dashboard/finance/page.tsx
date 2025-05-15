"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { Invoice } from "./partials/invoice";

import StatsCards from "./partials/stats-card";
import { DataTable } from "@/components/CommonTable";
import { addExpense, getAllTransactions, getStatistics } from "./finance.api";
import { useAxios } from "@/services/axios/axios.hook";
import { RecentTransaction } from "./finance.constants";
import { useQuery } from "@tanstack/react-query";
import { requestData } from "./finance.types";
import RevenueChart from "./partials/revenue-chart";
import FinancePageSkeleton from "./partials/finance-skelaten";
import { expenseDto } from "./finance.schema";
import AddExpenserForm from "./partials/add-expense-form";
import { toast } from "react-toastify";

export default function Finance() {
  const [statsData, setStatsData] = useState<requestData | null>(null);
  const [openExpenseCreateDialog, setOpenExpenseCreateDialog] = useState(false);

  const { axios } = useAxios();
  const {
    data: revenueStats,
    isFetching,
    refetch: refetchDashboardData,
  } = useQuery<any>({
    queryKey: ["statsReport"],
    queryFn: async () => {
      const data = await getStatistics(axios);
      setStatsData(data);
      return data;
    },
  });

  useEffect(() => {
    refetchDashboardData();
  }, [refetchDashboardData]);

  const createExpenseDialog = useCallback(
    ({ refetch: refetchTransactions }: { refetch: any }) => {
      const handleSubmit = async (data: expenseDto) => {
        try {
          const response = await addExpense(data, axios);
          if (response) {
            toast.success("Expense Added successfully");
          }
        } catch (error: any) {
          toast.error("Something went wrong");
        } finally {
          refetchTransactions();
          refetchDashboardData();
          setOpenExpenseCreateDialog(false);
        }
      };

      return <AddExpenserForm onSubmit={handleSubmit} title="Add Expense" />;
    },
    [axios, refetchDashboardData]
  );

  if (isFetching) return <FinancePageSkeleton />;

  return (
    <div className="flex flex-col p-4 md:p-10 space-y-6 w-full">
      <h1 className="text-3xl md:text-4xl font-bold">Financial Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCards statsData={statsData} />
      </div>
      <div className="grid grid-cols-1">
        <RevenueChart monthlyRevenue={statsData?.graphData ?? []} />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold">Transactions</h2>

      <DataTable
        fetcher={async (
          page: number,
          pageSize: number,
          searchQuery: string
        ) => {
          return await getAllTransactions(axios, page, pageSize, searchQuery);
        }}
        getColumns={RecentTransaction}
        title="Expense"
        queryKey={["transactions"]}
        CreateEntryComponent={createExpenseDialog}
        createEntryDialogOpen={openExpenseCreateDialog}
        setCreateEntryDialogOpen={setOpenExpenseCreateDialog}
      />
    </div>
  );
}