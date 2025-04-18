import { getAuth } from "@clerk/nextjs/server";
import connectToDB from "@/config/db";
import User from "@/models/user.models";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const { name, email, imageUrl } = await req.json();

        await connectToDB();

        const existingUser = await User.findById(userId);
        if (existingUser) {
            return NextResponse.json({ success: true, user: existingUser });
        }

        const emailConflict = await User.findOne({ email });
        if (emailConflict) {
            return NextResponse.json({
                success: false,
                message: "A user with this email already exists.",
            });
        }

        const newUser = await User.create({
            _id: userId,
            name,
            email,
            imageUrl,
            cartItems: {}
        });

        return NextResponse.json({ success: true, user: newUser, message: 'Account created successfully' });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
