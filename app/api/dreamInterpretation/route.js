import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { dreamText } = await req.json();

    if (!dreamText) {
      console.error("Error: Dream text is required.");
      return NextResponse.json(
        { error: "Dream text is required" },
        { status: 400 }
      );
    }

    // Initialize OpenAI API client
    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is set in the environment
      })
    );

    // Request dream interpretation from OpenAI
    console.log("Sending request to OpenAI...");

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a dream interpretation expert." },
        { role: "user", content: dreamText },
      ],
    });

    // Check if we got a valid response
    console.log("OpenAI response:", response.data);

    const interpretation = response.data.choices[0]?.message?.content.trim();

    if (!interpretation) {
      console.error("Error: No interpretation returned by OpenAI.");
      return NextResponse.json(
        { error: "Failed to interpret the dream" },
        { status: 500 }
      );
    }

    return NextResponse.json({ interpretation }, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error during dream interpretation:", error);
    return NextResponse.json(
      { error: "Failed to interpret the dream" },
      { status: 500 }
    );
  }
}
