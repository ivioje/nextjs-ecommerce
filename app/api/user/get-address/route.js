import connectToDB from "@/config/db";
import Address from "@/models/address.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { userId } = getAuth(req);
        await connectToDB();
        const addresses = await Address.find({userId});

        return NextResponse.json({ success: true, addresses })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}