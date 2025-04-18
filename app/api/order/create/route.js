import { inngest } from "@/config/inngest";
import Product from "@/models/product.model";
import User from "@/models/user.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const { address, items } = await req.json();

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' });
        }

        //calculate amount using items
        const amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return acc + product.offerPrice * item.quantity;
        }, 0);

        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                address,
                items,
                amount: amount + Math.floor( amount * 0.02),
                date: Date.mow()
            }
        });

        //clear user cart
        const user = await User.findById(userId);
        user.cartItms = {};
        await user.save();

        return NextResponse.json({ success: true, message: 'Order Placed' });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}