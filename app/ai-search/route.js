import { GoogleGenAI } from "@google/genai";
import connectDB from "../../lib/db";
import Product from "../../models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { query } = await request.json();
    await connectDB();

    let keyword = query;

    // Use Gemini to extract the main search keyword if API key is present
    if (process.env.GEMINI_API_KEY?.trim()) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Extract the main product keyword from this search query: "${query}". Return only the keyword.`,
        });

        if (response?.text) {
          keyword = response.text.trim() || query;
        }
      } catch (aiErr) {
        console.error("Gemini API error, falling back to query search:", aiErr);
      }
    }

    console.log("Searching for keyword:", keyword);

    // Escape regex operators to prevent injection and parsing errors
    const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    // Search across title, category, and description fields in MongoDB
    const products = await Product.find({
      $or: [
        { title: { $regex: escapedKeyword, $options: "i" } },
        { category: { $regex: escapedKeyword, $options: "i" } },
        { description: { $regex: escapedKeyword, $options: "i" } },
      ],
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("AI Search route error:", err);
    return NextResponse.json({ error: "Search query failed" }, { status: 500 });
  }
}