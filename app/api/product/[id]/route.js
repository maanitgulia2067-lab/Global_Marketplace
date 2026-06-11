import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Validate ObjectId format to prevent database query errors
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    await connectDB();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("Error fetching product details:", err);
    return NextResponse.json({ error: "Failed to load product details" }, { status: 500 });
  }
}
