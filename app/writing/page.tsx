"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function WritingRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to Substack
    window.location.href = "https://muditairan.substack.com"
  }, [])

  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to my blog...</h1>
        <p className="text-[#707070] mb-4">If you are not redirected automatically, please click the link below:</p>
        <a href="https://muditairan.substack.com" className="text-[#4a9eff] hover:underline">
          muditairan.substack.com
        </a>
      </div>
    </div>
  )
}
