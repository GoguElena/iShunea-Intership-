import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

// Define the OrderItem interface with necessary properties
interface OrderItem {
    productId: string; // Add other properties as needed
    // Add more properties if required
}

export async function POST(req:Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    // }
    // catch (error: any) {
    //     return new NextResponse (`Webhook Error: ${error.message}`, {status: 400})
    // }

    } catch (error) {
        // Specify the type of error as Error
        return new NextResponse(`Webhook Error: ${(error as Error).message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country
    ];

    const addressString = addressComponents.filter((c) => c !== null).join(', ');

    // if (event.type === "payment_intent.succeeded") {
    //     console.log("Payment intent succeeded event received");
    //     // Можете добавить вывод event для полной информации
    //     console.log(event);
    // } else {
    //     console.log("Unhandled event type:", event.type);
    // }


    if(event.type === "checkout.session.completed") {
        const order = await prismadb.order.update({
            where: {
                id: session?.metadata?.orderId,
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || ''
            },
            include: {
                orderItems: true,
            }
        });

        // const productIds = order.orderItems.map((orderItem) => orderItem.productId);

        // Map the orderItems using the defined OrderItem type
        const productIds = order.orderItems.map((orderItem: OrderItem) => orderItem.productId);


        await prismadb.product.updateMany({
            where: {
                id: {
                    in: [...productIds]
                }
            },
            data: {
                isArchived: true,
                isFutured: false,
            }
        });
    }

    return new NextResponse(null, {status: 200})
}