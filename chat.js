import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Sadece POST istekleri destekleniyor." });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Senin adın FOCUS. Kibar, akıllı ve samimi bir kişisel asistansın." },
        { role: "user", content: req.body.message },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "Hata oluştu: " + err.message });
  }
}
