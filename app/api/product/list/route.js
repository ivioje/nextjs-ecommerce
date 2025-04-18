import connectToDB from "@/config/db";
import Product from "@/models/product.models";
import { NextResponse } from "next/server";

// fetch the seller's products
export async function GET(req) {
    try {
        await connectToDB();
        const products = await Product.find({});
        return NextResponse.json({ success: true, products });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}