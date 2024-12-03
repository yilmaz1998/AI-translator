'use client'

import { useState } from "react"
import Link from "next/link"
import { motion } from 'framer-motion'

const Translation = () => {
  const [inputText, setInputText] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("en-es")
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
          <option value="en-es">English to Spanish</option>
          <option value="en-po">English to Portuguese</option>
          <option value="en-fr">English to French</option>
          <option value="en-de">English to German</option>
          <option value="en-it">English to Italian</option>
          <option value="en-tr">English to Turkish</option>
          <option value="en-ru">English to Russian</option>
          <option value="en-nl">English to Dutch</option>
          <option value="en-ar">English to Arabic</option>
          <option value="en-zh">English to Chinese</option>
          <option value="en-jap">English to Japanese</option>
          <option value="en-ko">English to Korean</option>
          <option value="en-ur">English to Urdu</option>
          <option value="en-hi">English to Hindi</option>
          <option value="en-id">English to Indonesian</option>
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