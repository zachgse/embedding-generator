// lib/embedding.js

import { pipeline, env } from "@xenova/transformers";

// FORCE WASM ONLY
env.backends.onnx = false;
env.allowLocalModels = false;

let extractor:any = null;

export async function getEmbedding(text:string) {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
      {
        quantized: true,
      }
    );
  }

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}