import { GoogleGenAI } from "@google/genai";
import connectDB from "../../lib/db";
import Product from "../../models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { query } = await request.json();

        await connectDB();

        let keyword = query;

        // Check if API key is present before attempting GoogleGenAI calls
        if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "") {
            try {
                const ai = new GoogleGenAI({
                    apiKey: process.env.GEMINI_API_KEY,
                });

                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Extract the main product keyword from this search query: "${query}".
                    Return only the keyword.`,
                });

                if (response && response.text) {
                    const extracted = response.text.trim();
                    if (extracted) {
                        keyword = extracted;
                    }
                }
            } catch (aiErr) {
                console.error("Gemini API error, falling back to direct search:", aiErr);
            }
        }
        console.log("AI keyword:", keyword);
        // Search in database using keyword with fallback across multiple fields
        const products = await Product.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        });

        return NextResponse.json(products);
    } catch (err) {
        console.error("AI Search route error:", err);
        return NextResponse.json(
            { error: "Search failed", details: err.message },
            { status: 500 }
        );
    }
}