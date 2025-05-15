"use client"

import { useQuery } from "@tanstack/react-query"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type ColumnDef,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RecentTransaction } from "@/app/dashboard/finance/finance.constants"


interface Transaction {
  id: string
  date: string
  customer: string
  description: string
  amount: number
  type: "income" | "expense"
}

// Mock API function
const fetchTransactions = async (): Promise<Transaction[]> => {
  return [
    {
      id: "TRX-001",
      date: "2023-03-01",
      customer: "Rahul Sharma",
      description: "Rental payment for KA-01-AB-1234",
      amount: 5600,
      type: "income",
    },
    {
      id: "TRX-002",
      date: "2023-03-02",
      customer: "Priya Patel",
      description: "Rental payment for KA-01-CD-5678",
      amount: 7500,
      type: "income",
    },
    {
      id: "TRX-003",
      date: "2023-03-03",
      customer: "Admin",
      description: "Fuel expense for KA-01-AB-1234",
      amount: 1200,
      type: "expense",
    },
    {
      id: "TRX-004",
      date: "2023-03-04",
      customer: "Admin",
      description: "Vehicle maintenance - KA-01-EF-9012",
      amount: 3500,
      type: "expense",
    },
    {
      id: "TRX-005",
      date: "2023-03-05",
      customer: "Sneha Reddy",
      description: "Rental payment for KA-01-GH-3456",
      amount: 8500,
      type: "income",
    },
  ]
}

export function RecentTransactions() {
  const { data: transactions = [] ,refetch} = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  })

 
const columns = RecentTransaction(refetch)
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
