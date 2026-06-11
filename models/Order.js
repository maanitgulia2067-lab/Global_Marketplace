import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: String,
  title: String,
  price: Number,
  quantity: Number,
  image: String,
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  shipping: {
    fullName: String,
    address1: String,
    address2: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
    phone: String,
    email: String,
  },
  amount: Number,
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
