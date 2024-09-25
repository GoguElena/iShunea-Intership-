// import prismadb from "@/lib/prismadb";
// import { Order } from "@prisma/client";
//
//
// export const getTotalRevenue=async (storeId:string)=>{
//     const paidOrders = await prismadb.order.findMany({
//         where:{
//             storeId,
//             isPaid:true,
//         },
//         include:{
//             orderItems:{
//                 include:{
//                     product:true
//                 }
//             }
//         }
//     });
//     const totalRevenue = paidOrders.reduce((total: number, order: Order) => {
//         const orderTotal = order.orderItems.reduce((orderSum: number, item) => {
//           return orderSum+item.product.price.toNumber();
//        },0)
//         return total + orderTotal;
//     },0)
//     return totalRevenue;
// }

import prismadb from "@/lib/prismadb";
import { Order } from "@prisma/client";

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    // Directly return the result of the reduce function
    return paidOrders.reduce((total: number, order: Order) => {
        const orderTotal = order.orderItems.reduce((orderSum: number, item) => {
            return orderSum + item.product.price.toString();
        }, 0);
        return total + orderTotal;
    }, 0);
};
