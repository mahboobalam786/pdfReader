async function getAnswerFromPdf(pdfText, question) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OpenRouter API key is missing. Add OPENROUTER_API_KEY to backend/.env"
    );
  }

  const systemPrompt =
    "You are answering questions about a PDF. " +
    "Use only the information provided from the PDF. " +
    "If the answer cannot be found in the PDF, " +
    "say that the information is not available in the PDF.";

  const userPrompt = `PDF Content:
${pdfText}

Question: ${question}`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:5174",
          "X-Title": "PDF Question Answer App",
        },

        body: JSON.stringify({
          model: "nvidia/nemotron-3.5-lightning:free",

          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userPrompt,
            },
          ],

          temperature: 0.2,  //Temperature controls how much variation/randomness the AI uses when generating an answer.
        }),
      }
    );

    const data = await response.json();

    console.log("OpenRouter status:", response.status);
    console.log("OpenRouter response:", data);

    if (!response.ok) {
      const apiError =
        data.error?.message || "OpenRouter API request failed.";

      throw new Error(apiError);
    }

    const answer = data.choices?.[0]?.message?.content;

    if (!answer) {
      throw new Error("Gemma did not return an answer.");
    }

    return answer.trim();

  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw error;
  }
}

module.exports = {
  getAnswerFromPdf,
};