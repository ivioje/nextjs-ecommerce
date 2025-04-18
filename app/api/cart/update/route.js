import connectToDB from "@/config/db";
import User from "@/models/user.models";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        const { cartData } = await req.json();

        await connectToDB();
        await User.updateOne({ _id: userId }, { cartItems: cartData });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}