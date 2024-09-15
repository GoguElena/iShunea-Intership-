"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "@/app/(dashboard)/[storeId]/(routes)/orders/components/cell-action";

export type OrderColumn = {
    phone: string
    address: string
    isPaid: boolean
    totalPrice: string
    products: string
    createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: 'products',
        header: 'Products',
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'totalPrice',
        header: 'Total Price',
    },
    {
        accessorKey: 'isPaid',
        header: 'Paid',
    },
]