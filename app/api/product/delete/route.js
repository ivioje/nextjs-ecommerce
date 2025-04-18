import connectToDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/product.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


//delete a product
export async function DELETE(req) {
    try {
        const { userId } = getAuth(req);
        const isSeller = authSeller(userId);
        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'Not authorized' });
        }

        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json({ success: false, message: 'No product ID provided' });
        }

        await connectToDB();
        await Product.findByIdAndDelete(productId);

        return NextResponse.json({ success: true, message: 'Deleted successfully' });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}