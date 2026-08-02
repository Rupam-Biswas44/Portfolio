import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "Groq API key not configured on server." },
                { status: 500 }
            );
        }

        const openai = new OpenAI({ 
            apiKey,
            baseURL: "https://api.groq.com/openai/v1"
        });
        const { messages, systemPrompt } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
        }

        // Dynamically fetch available models to prevent deprecation errors
        const models = await openai.models.list();
        // Prefer a llama-3.3 model, then llama-3.1, then anything else
        let selectedModel = "llama3-8b-8192"; // Fallback
        if (models.data && models.data.length > 0) {
            const modelNames = models.data.map(m => m.id);
            selectedModel = modelNames.find(m => m.includes("llama-3.3")) || 
                            modelNames.find(m => m.includes("llama-3.1")) || 
                            modelNames.find(m => m.includes("llama3")) || 
                            modelNames[0];
        }

        const completion = await openai.chat.completions.create({
            model: selectedModel,
            messages: [
                {
                    role: "system",
                    content: systemPrompt || "You are a helpful AI assistant for Rupam Biswas's portfolio.",
                },
                ...messages,
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        const reply = completion.choices[0]?.message?.content || "No response generated.";
        return NextResponse.json({ reply });
    } catch (error: unknown) {
        console.error("Chat API error:", error);
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
