import connectToDB from "@/config/db";
import User from "@/models/user.models";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { userId } = getAuth(req);
        await connectToDB();
        const user = await User.findById(userId);
        
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" })
        } else return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
 }
