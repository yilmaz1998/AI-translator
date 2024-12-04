'use client'

import { useState } from "react"
import Link from "next/link"
import { motion } from 'framer-motion'
import axios from "axios"

const Translation = () => {
  const [mode, setMode] = useState("en-to-other")
  const [inputText, setInputText] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("en-es") 
  const [translation, setTranslation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTranslate = async (e) => {
    e.preventDefault()

    if (!inputText.trim()) {
      setError("Please enter text to translate.")
      return
    }
    setLoading(true)
    setError("")
    setTranslation("")

    try {
      const response = await axios.post("/api/huggingface", {
        inputs: inputText,
        language: targetLanguage,
      })

      const data = response.data
      setTranslation(data[0]?.translation_text || "No translation found.")
    } catch (err) {
      setError(err.response?.data?.error || "Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 170 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="trans p-24"
    >
      <h1 className="text-4xl text-center font-bold">
        AI Translator
      </h1>
      <div className="mt-12">
        <button
          className={`px-4 py-2 mx-2 border text-black ${mode === "en-to-other" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => {
            setMode("en-to-other")
            setTargetLanguage("en-es")
            setTranslation("")
            setInputText("")
          }}
        >
          Translate from English
        </button>
        <button
          className={`but px-4 py-2 mx-2 border text-black ${mode === "other-to-en" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => {
            setMode("other-to-en")
            setTargetLanguage("es-en")
            setTranslation("")
            setInputText("")
          }}
        >
          Translate to English
        </button>
      </div>
      <form onSubmit={handleTranslate} className="mt-4 space-y-4">
        <select
          className="w-full p-2 border rounded bg-black text-white"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          {mode === "en-to-other" ? (
            <>
              <option value="en-es">Spanish</option>
              <option value="en-po">Portuguese</option>
              <option value="en-fr">French</option>
              <option value="en-de">German</option>
              <option value="en-it">Italian</option>
              <option value="en-tr">Turkish</option>
              <option value="en-ru">Russian</option>
              <option value="en-nl">Dutch</option>
              <option value="en-ar">Arabic</option>
              <option value="en-zh">Chinese</option>
              <option value="en-jap">Japanese</option>
              <option value="en-ko">Korean</option>
              <option value="en-ur">Urdu</option>
              <option value="en-hi">Hindi</option>
              <option value="en-id">Indonesian</option>
            </>
          ) : (
            <>
              <option value="es-en">Spanish</option>
              <option value="po-en">Portuguese</option>
              <option value="fr-en">French</option>
              <option value="de-en">German</option>
              <option value="it-en">Italian</option>
              <option value="tr-en">Turkish</option>
              <option value="ru-en">Russian</option>
              <option value="nl-en">Dutch</option>
              <option value="ar-en">Arabic</option>
              <option value="zh-en">Chinese</option>
              <option value="jap-en">Japanese</option>
              <option value="ko-en">Korean</option>
              <option value="ur-en">Urdu</option>
              <option value="hi-en">Hindi</option>
              <option value="id-en">Indonesian</option>
            </>
          )}
        </select>

        <textarea
          className="w-full p-2 border rounded focus:ring focus:outline-none focus:border-blue-600 bg-black text-white"
          placeholder={`${mode === 'en-to-other' ? "Translate from English" : "Translate to English"}`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Translate
        </button>
      </form>

      {loading && <p>Translating...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {translation && (
        <div className="mt-4 p-4 border rounded bg-gray-600">
          <h2 className="text-lg font-bold">Translation:</h2>
          <p>{translation}</p>
        </div>
      )}
      <Link className="mt-2 btn btn-danger" href={"/"}>
        Go Back
      </Link>
    </motion.div>
  )
}

export default Translation