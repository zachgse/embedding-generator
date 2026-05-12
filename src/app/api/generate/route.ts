import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY=process.env.GOOGLE_GEMINI_API_KEY

export async function POST(request:NextRequest) { 
    try {
        const data = await request.json();
        const ai = new GoogleGenAI({
            apiKey:GEMINI_API_KEY
        });
        const embedding = await ai.models.embedContent({
            model: 'gemini-embedding-2',
            contents: data
        });
        return NextResponse.json(
            {
                text: data,
                embedding: embedding.embeddings ? embedding.embeddings[0].values : []
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Something went wrong",
                details: error instanceof Error ? error.message : "Something went wrong",

            },
            {
                status: 500
            }
        )
    }
}