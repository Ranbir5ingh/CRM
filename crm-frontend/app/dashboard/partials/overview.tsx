"use client";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { graphData } from "../dashboard.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface props {
  graphData: graphData[] | null;
}

function OverviewComponent({ graphData }: props) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {graphData && graphData.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={graphData || []}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                formatter={(value: number) => [`₹${value}`, "Revenue"]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar
                dataKey="total"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

const Overview = React.memo(OverviewComponent);
export { Overview };