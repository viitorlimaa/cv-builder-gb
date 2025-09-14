const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

interface GenerateContentResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export async function enhanceTextWithAI(
  textToEnhance: string,
  context: "personal-summary" | "experience-description" | "skill-description"
): Promise<string> {
  if (!apiKey) {
    console.error("API Key for Gemini is not set or is invalid.");
    return Promise.reject("API Key for Gemini is not set or is invalid.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  let prompt = "";
  if (context === "personal-summary") {
    prompt = `Melhore o seguinte resumo profissional para um currículo, tornando-o mais impactante e profissional, mantendo o significado original. O texto deve ser conciso e persuasivo. Se o texto for muito curto, expanda-o ligeiramente. Se já for bom, faça apenas pequenos ajustes para polir. Aqui está o resumo: "${textToEnhance}"`;
  } else if (context === "experience-description") {
    prompt = `Melhore a seguinte descrição de experiência profissional para um currículo, usando verbos de ação e quantificando conquistas sempre que possível. Torne-o mais profissional e impactante, mantendo a essência. Se o texto for muito curto, expanda-o ligeiramente. Se já for bom, faça apenas pequenos ajustes para polir. Aqui está a descrição: "${textToEnhance}"`;
  } else if (context === "skill-description") {
    prompt = `Melhore a seguinte descrição de habilidade para um currículo, tornando-a mais clara e profissional. Se o texto for muito curto, expanda-o ligeiramente. Se já for bom, faça apenas pequenos ajustes para polir. Aqui está a descrição: "${textToEnhance}"`;
  } else {
    prompt = `Melhore o seguinte texto, tornando-o mais profissional e gramaticalmente correto: "${textToEnhance}"`;
  }

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);
      throw new Error(
        `Erro da API Gemini: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const data: GenerateContentResponse = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Resposta da API Gemini não contém candidatos de texto.");
    }
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw error;
  }
}
