import { NextRequest, NextResponse } from "next/server";

// OpenRouter model IDs — verify at https://openrouter.ai/models
export const IMAGE_MODELS: Record<string, { id: string; pricePerImage: number }> = {
  seedream: { id: "bytedance-seed/seedream-4.5", pricePerImage: 0.06 },
  flux_schnell: { id: "black-forest-labs/flux-schnell", pricePerImage: 0.003 },
  flux_dev: { id: "black-forest-labs/flux-dev", pricePerImage: 0.025 },
  flux_pro: { id: "black-forest-labs/flux.2-pro", pricePerImage: 0.04 },
  nano_banana_2: { id: "google/nano-banana-2", pricePerImage: 0.05 }, // ⚠️ verify model ID on OpenRouter
  gpt5_image: { id: "openai/gpt-5-image", pricePerImage: 0.08 }, // ⚠️ verify model ID on OpenRouter
};

const stylePrompts: Record<string, string> = {
  anime: "anime style, vibrant colors, detailed illustration",
  photorealistic: "photorealistic, ultra HD, 8k, cinematic lighting",
  watercolor: "watercolor painting, soft colors, artistic brushstrokes",
  cyberpunk: "cyberpunk style, neon lights, futuristic, dark atmosphere",
  fantasy: "fantasy art, magical, ethereal, painterly",
  cute: "kawaii style, cute, pastel colors, adorable",
};

export async function POST(req: NextRequest) {
  try {
    const { prompt, style, model = "seedream", width = 1024, height = 1024 } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY not configured in .env.local" },
        { status: 500 }
      );
    }

    const styleEnhancer = stylePrompts[style] || "";
    const basePrompt = styleEnhancer ? `${prompt}, ${styleEnhancer}` : prompt;

    // Tell the model what aspect ratio / dimensions we want
    const aspectLabel =
      width > height ? `16:9 landscape, wide horizontal image, ${width}x${height} pixels` :
        height > width ? `9:16 portrait, tall vertical image, ${width}x${height} pixels` :
          `1:1 square image, ${width}x${height} pixels`;
    const enhancedPrompt = `${basePrompt}. Aspect ratio: ${aspectLabel}.`;

    const modelConfig = IMAGE_MODELS[model] || IMAGE_MODELS.seedream;
    const selectedModelId = modelConfig.id;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModelId,
        messages: [{ role: "user", content: enhancedPrompt }],
        modalities: ["image"],
        image_size: `${width}x${height}`,
      }),
    });

    // Read as text first to avoid JSON.parse crash on HTML error pages
    const rawText = await response.text();

    if (!response.ok) {
      let errorMessage = `Generation failed (HTTP ${response.status})`;
      try {
        const error = JSON.parse(rawText);
        errorMessage = error.error?.message || error.message || errorMessage;
      } catch {
        console.error("OpenRouter non-JSON error:", response.status, rawText.slice(0, 300));
        if (response.status === 401) errorMessage = "Invalid API key — check OPENROUTER_API_KEY";
        else if (response.status === 402) errorMessage = "Insufficient credits on OpenRouter";
        else if (response.status === 429) errorMessage = "Rate limit exceeded, please wait";
        else if (response.status === 404) errorMessage = `Model "${selectedModelId}" not found on OpenRouter`;
      }
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    let result: {
      choices?: Array<{
        message?: {
          images?: Array<{ image_url?: { url?: string } }>;
        };
      }>;
      usage?: {
        prompt_tokens?: number;
        completion_tokens?: number;
        total_tokens?: number;
      };
    };

    try {
      result = JSON.parse(rawText);
    } catch {
      console.error("Failed to parse OpenRouter response:", rawText.slice(0, 300));
      return NextResponse.json({ error: "Invalid response from OpenRouter" }, { status: 502 });
    }

    const imageUrl = result.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(result).slice(0, 500));
      return NextResponse.json({ error: "No image returned from API" }, { status: 500 });
    }

    // ── Token usage & cost estimation ─────────────────────────────────────
    const usage = result.usage ?? {};
    const promptTokens = usage.prompt_tokens ?? 0;
    const completionTokens = usage.completion_tokens ?? 0;
    const totalTokens = usage.total_tokens ?? 0;
    const estimatedCostUSD = modelConfig.pricePerImage; // per-image flat rate

    console.log("─────────────────────────────────────────");
    console.log(`[PixieDream] Generation complete`);
    console.log(`  Model      : ${selectedModelId}`);
    console.log(`  Size       : ${width}x${height}`);
    console.log(`  Prompt     : "${enhancedPrompt.slice(0, 80)}..."`);
    console.log(`  Tokens     : prompt=${promptTokens} | completion=${completionTokens} | total=${totalTokens}`);
    console.log(`  Est. Cost  : $${estimatedCostUSD.toFixed(4)} USD (~฿${(estimatedCostUSD * 35).toFixed(3)} THB)`);
    console.log("─────────────────────────────────────────");

    return NextResponse.json({
      imageUrl,
      prompt: enhancedPrompt,
      model: selectedModelId,
      width,
      height,
      usage: {
        promptTokens,
        completionTokens,
        totalTokens,
        estimatedCostUSD,
        estimatedCostTHB: parseFloat((estimatedCostUSD * 35).toFixed(4)),
      },
    });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
