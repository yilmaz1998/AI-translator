import { HfInference } from "@huggingface/inference"

const client = new HfInference(process.env.HUGGINGFACE_API_KEY)

const languages = {
    "en-tr": "opus-mt-tc-big-en-tr",
    "tr-en": "opus-mt-tr-en",
    "en-es": "opus-mt-en-es",
    "es-en": "opus-mt-es-en",
    "en-fr": "opus-mt-en-fr",
    "fr-en": "opus-mt-fr-en",
    "en-it": "opus-mt-en-it",
    "it-en": "opus-mt-it-en",
    "en-ru": "opus-mt-en-ru",
    "ru-en": "opus-mt-ru-en",
    "en-jap": "opus-mt-en-jap",
    "jap-en": "opus-mt-jp-en",
    "en-ar": "opus-mt-en-ar",
    "ar-en": "opus-mt-ar-en",
    "en-zh": "opus-mt-en-zh",
    "zh-en": "opus-mt-zh-en",
    "en-de": "opus-mt-en-de",
    "de-en": "opus-mt-de-en",
    "en-nl": "opus-mt-en-nl",
    "nl-en": "opus-mt-nl-en",
    "en-ko": "opus-mt-tc-big-en-ko",
    "ko-en": "opus-mt-tc-big-ko-en",
    "en-ur": "opus-mt-en-ur",
    "ur-en": "opus-mt-ur-en",
    "en-hi": "opus-mt-en-hi",
    "hi-en": "opus-mt-hi-en",
    "en-po": "opus-mt-en-bzs",
    "po-en": "opus-mt-bzs-en",
    "en-id": "opus-mt-en-id",
    "id-en": "opus-mt-id-en",
}


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { inputs, language } = req.body;

  if (!inputs || !language) {
    return res.status(400).json({ error: 'Input and target language are required' })
  }

  const model = languages[language]

  if(!model) {
    return res.status(400).json({ error: "Unsupported target language" })
  }

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/Helsinki-NLP/${model}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, 
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs }),
      }
    );

    const result = await response.json()
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Translation failed' })
  }
}
