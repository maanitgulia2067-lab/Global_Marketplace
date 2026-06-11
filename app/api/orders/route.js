import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(request) {
  try {
    const body = await request.json();
    const { shipping, items } = body;

    if (!shipping || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Order payload must include shipping information and at least one item." }, { status: 400 });
    }

    await connectDB();

    const amount = items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);

    const order = await Order.create({
      shipping,
      items,
      amount,
      status: "pending",
    });

    return NextResponse.json({ success: true, orderId: order._id, amount }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: error?.message || "Unable to create order." }, { status: 500 });
  }
}
