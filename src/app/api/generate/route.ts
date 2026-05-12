import { NextRequest, NextResponse } from "next/server";
import { getEmbedding } from "../../../../lib/embedding";

export const runtime = "nodejs";

export async function POST(request:NextRequest) { 
    try {
        const data = await request.json();
        const embedding = await getEmbedding(data);
        return NextResponse.json(
            {
                text: data,
                embedding: embedding
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