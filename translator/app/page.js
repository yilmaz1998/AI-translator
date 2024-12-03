'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const Page = () => {
  return (
      <motion.div
        initial={{ opacity: 0, y: -170 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-center min-h-screen"
      >
        <div className="text-center">
          <h1>Welcome to AI Translator</h1>
          <p className="mt-3">
            This project supports translation in 15 of the world's most spoken languages. Let AI bridge the gap and bring your words to life.
          </p>
          <div>
            <Link className="btn btn-secondary" href={'/english-translation'}>
              English to Chosen Language
            </Link>
          </div>
          <div className="mt-2">
            <Link className="btn btn-secondary" href={'/translation-to-english'}>
              Chosen Language to English
            </Link>
          </div>
        </div>
      </motion.div>
  )
}

export default Page