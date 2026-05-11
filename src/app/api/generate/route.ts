import { pipeline } from "@xenova/transformers";
import { NextRequest, NextResponse } from "next/server";

const extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2'
);

export async function POST(request:NextRequest) { 
    try {
        const data = await request.json();
        const output = await extractor(data,{
            pooling:"mean",
            normalize:true
        });
        return NextResponse.json(
            {
                text: data,
                embedding: output.tolist()[0]
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