import { pipeline, env } from "@xenova/transformers";

env.allowLocalModels = false;

let extractorInstance:any = null;

export async function getEmbedding(text: string) {
  if (!extractorInstance) {
    extractorInstance = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
      { quantized: true }
    );
  }
  
  const output = await extractorInstance(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}