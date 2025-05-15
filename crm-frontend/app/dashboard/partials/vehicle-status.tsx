"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Define types
type VehicleStatus = "AVAILABLE" | "RENTAL" | "MAINTENANCE" | "INACTIVE";

interface VehicleStatusItem {
  vehicle_status: string;
  count: number;
}

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

// Define constants
const statusColors: Record<VehicleStatus, string> = {
  AVAILABLE: "#22c55e",
  RENTAL: "#3b82f6",
  MAINTENANCE: "#f59e0b",
  INACTIVE: "#ef4444",
};

const defaultData: VehicleStatusItem[] = [
  { vehicle_status: "AVAILABLE", count: 12 },
  { vehicle_status: "MAINTENANCE", count: 5 },
  { vehicle_status: "RENTAL", count: 10 },
  { vehicle_status: "INACTIVE", count: 2 },
];

function getColor(status: string): string {
  return statusColors[status as VehicleStatus] || "#6b7280";
}

function VehicleStatusComponent({ graphData = defaultData }: { graphData?: VehicleStatusItem[] }) {
  const [chartSize, setChartSize] = useState({
    innerRadius: 60,
    outerRadius: 80,
  });

  // Adjust chart size based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setChartSize({ innerRadius: 25, outerRadius: 60 });
      } else if (width < 768) {
        setChartSize({ innerRadius: 35, outerRadius: 70 });
      } else {
        setChartSize({ innerRadius: 45, outerRadius: 80 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderCustomizedLabel = useCallback(
    ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: LabelProps) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-xs md:text-sm"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    },
    []
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-xl">Vehicle Status</CardTitle>
        <p className="text-xs md:text-sm text-muted-foreground">
          Current status of your vehicle fleet
        </p>
      </CardHeader>
      <CardContent>
        {graphData && graphData.length > 0 ? (
          <div className="flex flex-col space-y-4">
            <div className="h-48 sm:h-64 md:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={graphData}
                    cx="50%"
                    cy="50%"
                    innerRadius={chartSize.innerRadius}
                    outerRadius={chartSize.outerRadius}
                    paddingAngle={2}
                    dataKey="count"
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {graphData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(entry.vehicle_status)} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value} vehicles`, ""]} contentStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {graphData.map((item) => (
                <div key={item.vehicle_status} className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getColor(item.vehicle_status) }} />
                  <span className="text-xs capitalize truncate">
                    {item.vehicle_status.toLowerCase()}
                    <span className="hidden sm:inline"> ({item.count})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-48 w-full flex items-center justify-center">
            <p className="text-muted-foreground">No Data Found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const VehicleStatus = React.memo(VehicleStatusComponent);
export { VehicleStatus };