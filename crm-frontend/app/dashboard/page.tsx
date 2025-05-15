"use client";

import React, { useMemo } from "react";
import { useAxios } from "@/services/axios/axios.hook";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "./dashboard.api";
import StatsCard from "./partials/stats-card";
import { Overview } from "./partials/overview";
import { VehicleStatus } from "./partials/vehicle-status";
import {RecentRental} from "./partials/recent-rental";
import {UpcomingExpiration} from "./partials/upcoming-expiration";
import DashboardSkeleton from "./partials/dashboard-skeleton";

export default function Dashboard() {
  const { axios } = useAxios();
  const {
    data: dashboardData,
    isFetching,
    refetch,
    error,
  } = useQuery<any>({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const data = await getDashboardData(axios);
      return data;
    },
  });

  const statsData = useMemo(() => {
    if (!dashboardData?.statsData) return null;
    return dashboardData.statsData.map(
      (item: { name: string; expenses: number; revenue: number }) => ({
        name: item.name,
        total: item.revenue,
      })
    );
  }, [dashboardData]);

  const availableVehicleCount = useMemo(() => {
    if (!dashboardData?.vehicleStatusCount) return 0;
    const available = dashboardData.vehicleStatusCount.find(
      (item: any) => item.vehicle_status === "AVAILABLE"
    );
    return available ? available.count : 0;
  }, [dashboardData]);

  const activeCustomerCount = useMemo(() => {
    return dashboardData?.activeCustomerCount ?? 0;
  }, [dashboardData]);

  if (isFetching) return <DashboardSkeleton />;
  if (error) return <>error Loading data </>;

  return (
    <div className="flex flex-col p-4 md:p-10 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          revenue={statsData ? statsData[statsData.length - 1]?.total : null}
          availableVehicles={availableVehicleCount}
          activeCustomers={activeCustomerCount}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Overview graphData={statsData} />

        <VehicleStatus graphData={dashboardData?.vehicleStatusCount} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentRental rentalData={dashboardData?.recentRental} />
        <UpcomingExpiration notification={dashboardData?.notification} />
      </div>
    </div>
  );
}