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
    onRowClick: (row: TData) => void
}

const ProductTable = <TData, TValue>({ columns, data, onRowClick }: DataTableProps<TData, TValue>) => {
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

    const handleReset = () => {
        table.getColumn('productName')?.setFilterValue('')
    }

    return (
        <div>
            <div className='min-h-[730px] bg-white py-2 rounded-3xl mt-5 flex flex-col items-end'>
                <div className="w-full flex justify-end my-4">
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
                    <form
                        onReset={handleReset}
                        className='w-[270px] flex justify-between items-center my-3 mr-3 border rounded-lg'
                    >
                        <input
                            placeholder="Search products by product name or ID"
                            value={(table.getColumn('productName')?.getFilterValue() as string) ?? ''}
                            onChange={(event) =>
                                table.getColumn('productName')?.setFilterValue(event.target.value)
                            }
                            className="w-full p-3 max-w-sm text-sm bg-transparent focus:outline-none"
                        />
                        <button type='reset' className='w-7 h-7 p-2 mr-4 flex justify-center items-center focus:outline-none cursor-pointer'>
                            <Image src='/images/cross.png' alt='delete' width={20} height={20} />
                        </button>
                    </form>
                </div>
                <Table>
                    {/* Columns */}
                    <TableHeader>
                        {table.getHeaderGroups()?.map((headerGroup) => (
                            <TableRow key={headerGroup.id} className=''>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="py-3 bg-background hover:bg-background text-center">
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
                    {/* Rows */}
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} onClick={() => onRowClick(row.original)}>
                                {row.getVisibleCells().map(cell => (
                                    <TableHead key={cell.id} className="text-center py-1">
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