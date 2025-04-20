import { NextResponse } from 'next/server';
import connectToDB from '@/config/db';
import Product from '@/models/product.model';

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    if (!query) return NextResponse.json({ results: [] });

    const results = await Product.find({
      name: { $regex: query, $options: "i" }
    }).limit(10);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 });
  }
}
