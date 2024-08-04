'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { PaginationBar } from '@/components'
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const ProductTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div>
            <div className='bg-white p-2 rounded-3xl mt-5 flex flex-col items-end'>
                <div className="w-full flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="w-[150px] flex justify-between items-center my-3 mr-3 border rounded-lg">
                                <Button className='w-full h-full flex justify-between items-center bg-transparent text-[#757575] hover:bg-transparent'>
                                    Filter
                                    <div className='flex justify-center items-center'>
                                        <Image src='/images/arrow-down.png' alt='delete' width={13} height={13} />
                                    </div>
                                </Button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="w-[270px] flex justify-between items-center my-3 mr-3 border rounded-lg">
                        <input
                            placeholder="Search products by name or ID"
                            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                            onChange={(event) =>
                                table.getColumn('name')?.setFilterValue(event.target.value)
                            }
                            className="w-full p-3 max-w-sm text-sm bg-transparent focus:outline-none"
                        />
                        <div className='mr-4 flex justify-center items-center'>
                            <Image src='/images/cross.png' alt='delete' width={8} height={8} />
                        </div>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups()?.map((headerGroup) => (
                            <TableRow key={headerGroup.id} className=''>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="bg-background hover:bg-background text-center">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableHead key={cell.id} className="text-center">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <PaginationBar table={table} />
        </div>
    )
}

export default ProductTable;