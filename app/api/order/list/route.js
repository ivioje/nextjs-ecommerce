import connectToDB from "@/config/db";
import Address from "@/models/address.model";
import Order from "@/models/order.model";
import Product from "@/models/product.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        await connectToDB();

        Address.length;
        Product.length;

        const orders = await Order.find({userId}).populate('address items.product');
        return NextResponse.json({ success: true, orders });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}