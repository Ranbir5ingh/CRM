import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { requestData } from "../finance.types";

interface statusCardProps {
  statsData: requestData | null;
}
export default function StatsCards({ statsData }: statusCardProps) {
  function calculatePercentageChange(current: number, previous: number) {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
  }


  const data = statsData?.graphData;
  const rentals = statsData?.activeRentals?.[0];

  const current = data?.[data.length - 1];
  const previous = data?.[data.length - 2];

  const profit = current ? current?.revenue - current?.expenses : "_";

  const revenueChange =
    current && previous
      ? calculatePercentageChange(current.revenue, previous.revenue)
      : 0;

  const expensesChange =
    current && previous
      ? calculatePercentageChange(current.expenses, previous.expenses)
      : 0;

  const profitChange =
    current && previous
      ? calculatePercentageChange(
          current.revenue - current.expenses,
          previous.revenue - previous.expenses
        )
      : 0;

  const rentalChange = rentals
    ? calculatePercentageChange(
        rentals.current_week_active_count,
        rentals.last_week_completed_count
      )
    : 0;

  const formatPercent = (value: number) =>
    `${value > 0 ? "+" : "-"}${value.toFixed(1)}%`;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{current?.revenue}</div>
          <p
            className={`text-xs flex items-center ${
              revenueChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {revenueChange >= 0 ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {formatPercent(revenueChange)} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{current?.expenses}</div>
          <p
            className={`text-xs flex items-center ${
              revenueChange <= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {expensesChange <= 0 ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {formatPercent(expensesChange)} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{profit}</div>
          <p
            className={`text-xs flex items-center ${
              profitChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {profitChange >= 0 ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {formatPercent(profitChange)} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statsData?.activeRentals[0].current_week_active_count}
          </div>
          <p
            className={`text-xs flex items-center ${
              rentalChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {rentalChange >= 0 ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {formatPercent(rentalChange)} from last week
          </p>
        </CardContent>
      </Card>
    </>
  );
}
