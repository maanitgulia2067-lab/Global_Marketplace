import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find();
        return NextResponse.json(products);
    } catch (err) {
        console.error("Database error in GET /api/products:", err);
        return NextResponse.json(
            { error: "Database error", details: err.message },
            { status: 500 }
        );
    }
}
