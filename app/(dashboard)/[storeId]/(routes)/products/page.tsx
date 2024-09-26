import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import { Product } from "@prisma/client"; // Import the Product type


const ProductsPage = async ({
    params
}: {
    params: {storeId: string}
}) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    
    // const formattedProducts: ProductColumn[] = products.map(( item ) => ({
    const formattedProducts: ProductColumn[] = products.map((item: Product) => ({ // Specify the type for item
        id: item.id,
        name: item.name,
        isFutured: item.isFutured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts}/>
            </div>
        </div>
    )
}

export default ProductsPage;