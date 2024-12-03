'use client'

import { useState } from "react"
import Link from "next/link"
import { motion } from 'framer-motion'

const Translation = () => {
  const [inputText, setInputText] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("es-en")
  const [translation, setTranslation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/huggingface", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: inputText, language: targetLanguage }),
      });

      const data = await response.json()

      if (response.ok) {
        setTranslation(data[0]?.translation_text || "No translation found.")
      } else {
        setError(data.error || "An error occurred.")
      }
    } catch (err) {
      setError("Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
    initial={{ opacity: 0, y: 170 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="trans p-24">
      <h1 className="text-4xl text-center font-bold">AI Translator</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">

      <select
          className="w-full p-2 border rounded bg-black text-white"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="es-en">Spanish to English</option>
          <option value="po-en">Potuguese to English</option>
          <option value="fr-en">French to English</option>
          <option value="de-en">German to English</option>
          <option value="it-en">Italian to English</option>
          <option value="tr-en">Turkish to English</option>
          <option value="ru-en">Russian to English</option>
          <option value="nl-en">Dutch to English</option>
          <option value="ar-en">Arabic to English</option>
          <option value="zh-en">Chinese to English</option>
          <option value="jap-en">Japanese to English</option>
          <option value="ko-en">Korean to English</option>
          <option value="ur-en">Urdu to English</option>
          <option value="hi-en">Hindi to English</option>
          <option value="id-en">Indonesian to English</option>
        </select>

        <textarea
          className="w-full p-2 border rounded focus:ring focus:outline-none focus:border-blue-600 bg-black text-white"
          placeholder="Enter text to translate"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          className="btn btn-primary"
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {translation && (
        <div className="mt-4 p-4 border rounded bg-gray-600">
          <h2 className="text-lg font-bold">Translation:</h2>
          <p>{translation}</p>
        </div>
      )}
      <Link className="mt-2 btn btn-danger" href={'/'}>Go Back</Link>
    </motion.div>
  )
}

export default Translation