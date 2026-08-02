const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function generateCommitMessage(
  changes: string
): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content:
              "You are a senior software engineer. Generate only one professional Conventional Commit message. Do not explain anything.",
          },

          {
            role: "user",
            content: changes,
          },
        ],

        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const error = await response.text();

      console.error(error);

      throw new Error("Groq API Failed");
    }

    const data = await response.json();

    return data.choices[0].message.content.trim();

  } catch (error) {

    console.error(error);

    throw error;

  }
}