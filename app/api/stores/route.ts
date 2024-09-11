import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import prismdb from "@/lib/prismadb";

export async function POST(
    req: Request,
){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {name} = body;
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }
        const store = await prismdb.store.create({
            data: {
                name,
                userId
            }
        });
        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_POST]', error);
        return new NextResponse("Inteeral error", { status: 500 });
    }
}