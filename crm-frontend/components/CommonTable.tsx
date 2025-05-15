"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationBar } from "./Paginationbar";
import useDebounce from "./Debouncehook";
import { AxiosInstance } from "axios";

export interface AddAndCreateComponenetProps {
  refetch: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DataTableProps<TData, TValue> {
  title: string;
  getColumns: (refetch: any) => ColumnDef<TData, TValue>[];
  fetcher: (page:number,pageSize:number,searchInput:string) => Promise<{ rows: TData[]; total: number }>;
  queryKey: string[];
  createEntryDialogOpen?: boolean;
  setCreateEntryDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  addEntryDialogOpen?: boolean;
  setAddEntryDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  CreateEntryComponent?: React.FC<AddAndCreateComponenetProps>;
  AddEntryComponent?: React.FC<AddAndCreateComponenetProps>;
}

export function DataTable<TData, TValue>({
  title,
  getColumns,
  fetcher,
  queryKey,
  createEntryDialogOpen,
  setCreateEntryDialogOpen,
  CreateEntryComponent,
  AddEntryComponent,
  addEntryDialogOpen,
  setAddEntryDialogOpen,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(1);
  const [searchInput, setSearchInput] = React.useState<string>("");
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const { rows, total } = await fetcher(page, pageSize, debouncedSearchInput);
      setTotalPages(Math.ceil(total / pageSize));
      return rows;
    },
  });
  const columns = getColumns(refetch);
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  React.useEffect(() => {
    refetch();
  }, [page, pageSize, debouncedSearchInput]);

  return (
    <div className="space-y-4 pb-20 w-full">
      <div className="flex items-center justify-between gap-5">
        <Input
          placeholder={`Search ${title.toLowerCase()}...`}
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value.trim());
          }}
        />

        <div className="flex items-center space-x-2">
          {!!CreateEntryComponent && setCreateEntryDialogOpen && (
            <Dialog
              modal={false}
              open={createEntryDialogOpen}
              onOpenChange={setCreateEntryDialogOpen}
            >
              <DialogTrigger className="bg-gradient-btn font-bold flex items-center w-max bg-slate-900 text-white px-3 py-1.5 rounded-sm">
                <Plus className="md:mr-1 h-4 w-4" /> <span className="hidden md:block">Create {title}</span>
              </DialogTrigger>
              <DialogContent
                className="w-full max-w-md md:max-w-4xl h-[90vh] bg-white text-black overflow-y-scroll"
              >
                <DialogTitle className="hidden" />
                <CreateEntryComponent
                  refetch={refetch}
                  setIsOpen={setCreateEntryDialogOpen}
                />
              </DialogContent>
            </Dialog>
          )}
          <Button onClick={() => refetch()} variant="outline" >
            <RefreshCw className="md:mr-2 h-4 w-4" /> <span className="hidden md:block">Refresh</span> 
          </Button>
        </div>
      </div>

      {isError ? (
        <div className="text-center py-4 text-red-500">Error loading data</div>
      ) : isFetching ? (
        <div className="border rounded-lg">
          <div className="border-b">
            <div className="flex p-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-1">
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              ))}
            </div>
          </div>
          <div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex p-4 border-b last:border-b-0">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="flex-1">
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : table && table.getHeaderGroups ? (
        <div className="rounded-md border border-gray-200 shadow-sm">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-gray-300 text-white"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-semibold text-center text-black"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : null}

      <div className="flex items-center justify-center">
        <PaginationBar
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}