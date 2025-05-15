import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// We keep the original interface
interface graphEntry {
  name: string;
  revenue: number;
  expenses: number;
}

interface chartProp {
  monthlyRevenue: graphEntry[];
}

export default function RevenueChart({ monthlyRevenue }: chartProp) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-xl">Revenue Overview</CardTitle>
        <p className="text-xs md:text-sm text-muted-foreground">
          Monthly revenue and expenses
        </p>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64 md:h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyRevenue}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickMargin={8}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value}`, ""]}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "6px",
                  padding: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 10 }}
                iconSize={10}
                fontSize={12}
              />
              <Bar dataKey="revenue" name="Revenue" fill="#0088FE" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#FF8042" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}