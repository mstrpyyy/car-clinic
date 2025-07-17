"use client"


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useRouter } from "next/navigation"
import { SelectCustomerSchemaType } from "@/domain/customer/schema"

type Props = {
    data: SelectCustomerSchemaType[],
}

export default function CustomerTable({ data }: Props) {
  const router = useRouter()

  const columnHeadersArray: Array<keyof SelectCustomerSchemaType> = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "city",
    "address",
  ]

  const columnHelper = createColumnHelper<SelectCustomerSchemaType>()

  const columns = [
    columnHelper.display({
      id: 'row-number',
      header: 'No.',
      cell: ({ row }) => row.index + 1, 
    }),

    ...columnHeadersArray.map((columnName) =>
      columnHelper.accessor(columnName, {
        id: columnName,
        header: columnName[0].toUpperCase() + columnName.slice(1),
      })
    ),

    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const customer = row.original
        return (
          <button
            className="text-blue-600 hover:underline"
            onClick={() => router.push(`/customers/form?customerId=${customer.id}`)}
          >
            Edit
          </button>
        )
      },
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-secondary text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            )}
          )}
        </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer"
                onClick={() => router.push(`/dashboard/customers/form?c=${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </div>
  )
}