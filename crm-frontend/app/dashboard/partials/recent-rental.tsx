"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RentalRecord } from "../dashboard.types";
import { Eye } from "lucide-react";
import Link from "next/link";

interface props {
  rentalData: RentalRecord[] | null;
}
export function RecentRental({ rentalData }: props) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Rentals</CardTitle>
        <p className="text-sm text-muted-foreground">
          Recent vehicle rentals and their status
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {rentalData && rentalData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentalData.map((rental, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-amber-50 text-amber-900">
                            {rental.customers.full_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{rental.customers.full_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {rental.customers.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {rental.vehicles.vehicle_number +
                        " " +
                        rental.vehicles.brand +
                        " " +
                        rental.vehicles.model}
                    </TableCell>
                    <TableCell>
                      {rental.startDate + " - " + rental.endDate}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`font-bold ${
                          rental.status == "CREATED"
                            ? "text-orange-500"
                            : rental.status == "COMPLETED"
                            ? "text-green-500"
                            : rental.status == "INPROGRESS"
                            ? "text-blue-600"
                            : "text-red-500"
                        }`}
                      >
                        {rental.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/dashboard/rentals/view/${rental.id}`}
                        className="p-2 bg-gray-300 rounded-sm"
                      >
                       View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p> Not Any Rental Found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
