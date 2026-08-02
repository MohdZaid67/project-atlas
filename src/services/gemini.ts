const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function generateCommitMessage(
  changes: string
): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
You are an experienced software engineer.

Generate ONE professional Conventional Commit message.

Rules:
- Return only the commit message.
- Do not explain anything.
- No markdown.
- Maximum 72 characters.

User Changes:
${changes}
                `,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Status:", response.status);
      console.error("Response:", errorText);

      throw new Error(`Gemini API request failed (${response.status})`);
    }

    const data = await response.json();

    console.log("Gemini Response:", data);

    const message = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!message) {
      console.error("No message found:", data);
      throw new Error("No commit message returned.");
    }

    return message.trim();
  } catch (error) {
    console.error("Error generating commit message:", error);
    throw error;
  }
}

