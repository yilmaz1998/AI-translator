'use client'

import { motion } from 'framer-motion'
import Link from "next/link"

export default function NotFound() {
  return (
    <motion.div
    initial={{ opacity: 0, y: -170 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link className='mt-2 btn btn-secondary' href={'/'}>Go Back to Home Page</Link> 
    </motion.div>
  )
}
