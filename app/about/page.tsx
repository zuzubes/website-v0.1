"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Home, PenTool, User, Lightbulb } from "lucide-react"

// Custom hook for responsive navigation
const useResponsiveNav = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return isMobile
}

// Custom X (formerly Twitter) icon
const XIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-[#707070] hover:text-[#ffffff] transition-colors"
  >
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
      fill="currentColor"
    />
  </svg>
)

// Navigation links configuration - updated to redirect Writing to Substack
const navLinks = [
  {
    name: "Home",
    icon: <Home className="w-5 h-5" />,
    url: "/",
  },
  {
    name: "Work",
    icon: <Lightbulb className="w-5 h-5" />, // Changed from Briefcase to Lightbulb
    url: "/work",
  },
  {
    name: "Writing",
    icon: <PenTool className="w-5 h-5" />,
    url: "https://muditairan.substack.com",
    external: true,
  },
  {
    name: "About",
    icon: <User className="w-5 h-5" />,
    url: "/about",
  },
]

// Tag component for hobbies, likes, dislikes, etc.
const Tag = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colorMap: Record<string, string> = {
    blue: "bg-[#0f3d63] hover:bg-[#1a4d78]",
    green: "bg-[#1a472a] hover:bg-[#235c37]",
    red: "bg-[#5c1a1a] hover:bg-[#7a2222]",
    orange: "bg-[#5c3a1a] hover:bg-[#7a4c22]",
    purple: "bg-[#3a1a5c] hover:bg-[#4c227a]",
    teal: "bg-[#1a5c5c] hover:bg-[#227a7a]",
    yellow: "bg-[#5c5c1a] hover:bg-[#7a7a22]",
    pink: "bg-[#5c1a5c] hover:bg-[#7a227a]",
    gray: "bg-[#343434] hover:bg-[#454545]",
  }

  return (
    <span
      className={`inline-block px-3 py-1 text-sm text-white rounded-md mr-2 mb-2 cursor-pointer transition-colors ${
        colorMap[color] || colorMap.blue
      }`}
    >
      {children}
    </span>
  )
}

export default function AboutPage() {
  const isMobile = useResponsiveNav()

  return (
    <div className={`min-h-screen bg-[#080808] text-[#ffffff] font-sans ${isMobile ? "flex flex-col" : "flex"}`}>
      {/* Left sidebar navigation */}
      <nav className="w-16 border-r border-[#1a1a1a] flex flex-col py-6 sticky top-0 h-screen">
        <div className="flex flex-col items-center justify-center flex-grow">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`p-2 my-3 rounded-md transition-colors flex justify-center ${
                link.url === "/about" ? "bg-[#1a1a1a] text-white" : "hover:bg-[#1a1a1a] text-[#707070] hover:text-white"
              }`}
              aria-label={link.name}
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex-1 max-w-5xl mx-auto px-6 py-12">
        {/* Left-aligned header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-2 text-white">About</h1>
          <p className="text-[#707070] text-xl">Welcome to my home on the internet</p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-[150px_1fr] gap-x-8 gap-y-12">
          {/* INTRO section */}
          <div className="text-right text-sm uppercase tracking-wider text-[#707070]">INTRO</div>
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden max-w-[600px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Profile photo"
                width={600}
                height={400}
                className="object-cover w-full"
              />
            </div>
            <div>
              <p className="mb-4 text-white">Hi there 👋 I'm Mudit!</p>
              <p className="mb-4 text-white">
                I was born and raised in India - lived in 5 cities within India and then 5 countries once I stepped out.
                After graduating with a degree in engineering, I began working as a Software developer. After 8 years of
                corporate career, took a break and went back to school to pursue MBA from esade business school and
                navigated to Product Management in startups and scaleups. I'm currently based in Berlin, Germany.
              </p>
              <p className="mb-4 text-white">
                While I love my day job, what gives me life is all the work I do after my 9-5. I spend most of my spare
                time writing, reading, discussing business ideas, taking photos, creating digital art, cooking or
                travelling. Most of my content I make is targeted towards teaching others whatever humble knowledge or
                experience I was able to attain as I journey through life.
              </p>
              <p className="text-white">
                I'd be delighted if you read my{" "}
                <Link
                  href="https://muditairan.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4a9eff] hover:underline"
                >
                  blog.
                </Link>
              </p>
            </div>
          </div>

          {/* HOBBIES section */}
          <div className="text-right text-sm uppercase tracking-wider text-[#707070]">HOBBIES</div>
          <div>
            <Tag color="blue">Learning 📝</Tag>
            <Tag color="blue">Writing ✍️</Tag>
            <Tag color="blue">Design 🎨</Tag>
            <Tag color="green">Cooking 🍳</Tag>
            <Tag color="green">Baking 🧁</Tag>
            <Tag color="yellow">Football ⚽</Tag>
            <Tag color="yellow">Swimming 🏊</Tag>
            <Tag color="yellow">Cricket 🏏</Tag>
            <Tag color="yellow">Table Tennis 🏓</Tag>
            <Tag color="yellow">Scuba Diving 🤿</Tag>
            <Tag color="purple">Piano 🎹</Tag>
            <Tag color="purple">Potrait photography 📷</Tag>
            <Tag color="purple">Debates 🎯</Tag>
            <Tag color="purple">Hiking 🥾</Tag>
            <Tag color="purple">DIY 💪</Tag>
          </div>

          {/* I Enjoy section */}
          <div className="text-right text-sm uppercase tracking-wider text-[#707070]">I ENJOY</div>
          <div>
            <Tag color="green">Ideation</Tag>
            <Tag color="green">Critical Thinking</Tag>
            <Tag color="green">Stand-up Comedy</Tag>
            <Tag color="green">Dark Humor</Tag>
            <Tag color="green">Poha</Tag>
            <Tag color="green">The Sea/Ocean</Tag>
            <Tag color="green">Board Games</Tag>
            <Tag color="green">Kürtőskalács (Chimney Cake)</Tag>
            <Tag color="green">Meditation</Tag>
            <Tag color="green">Adrenaline</Tag>
            <Tag color="green">Cheese</Tag>
            <Tag color="green">Burrito</Tag>
            <Tag color="green">Driving</Tag>
          </div>

          {/* COUNTRIES VISITED section */}
          <div className="text-right text-sm uppercase tracking-wider text-[#707070]">COUNTRIES VISITED</div>
          <div>
            <Tag color="teal">India 🇮🇳</Tag>
            <Tag color="teal">UAE 🇦🇪</Tag>
            <Tag color="teal">England 🏴󠁧󠁢󠁥󠁮󠁧󠁿</Tag>
            <Tag color="teal">Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿</Tag>
            <Tag color="teal">The Netherlands 🇳🇱</Tag>
            <Tag color="teal">France 🇫🇷</Tag>
            <Tag color="teal">Belgium 🇧🇪</Tag>
            <Tag color="teal">Switzerland 🇨🇭</Tag>
            <Tag color="teal">Malaysia 🇲🇾</Tag>
            <Tag color="teal">Germany 🇩🇪</Tag>
            <Tag color="teal">Finland 🇫🇮</Tag>
            <Tag color="teal">Austria 🇦🇹</Tag>
            <Tag color="teal">Czech Republic 🇨🇿</Tag>
            <Tag color="teal">Italy 🇮🇹</Tag>
            <Tag color="teal">Spain 🇪🇸</Tag>
            <Tag color="teal">Ireland 🇮🇪</Tag>
            <Tag color="teal">Sweden 🇸🇪</Tag>
            <Tag color="teal">Portugal 🇵🇹</Tag>
            <Tag color="teal">Norway 🇳🇴</Tag>
          </div>

          {/* LET'S CONNECT section */}
          <div className="text-right text-sm uppercase tracking-wider text-[#707070]">LET'S CONNECT</div>
          <div>
            <p className="mb-6 text-white">
              Set up time to chat online or meet together in person if you're in Berlin. Coffee's on me :)
            </p>

            <Link href="https://topmate.io/muditairan/" target="_blank" className="inline-block">
              <div className="bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors px-4 py-2 rounded-md mb-8 inline-flex items-center">
                <span className="text-white">Coffee Chat</span>
                <span className="ml-2">☕</span>
              </div>
            </Link>
          </div>
        </div>

        <footer className="mt-16 text-center text-[#707070] text-sm">© 2025 — Mudit Airan</footer>
      </div>
    </div>
  )
}
