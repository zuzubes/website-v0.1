"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Linkedin, Instagram, Globe, Home, PenTool, User, Lightbulb } from "lucide-react"
import Link from "next/link"

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

// Animated text component
const AnimatedText = () => {
  const roles = [
    "Board game enthusiast.",
    "Home-chef.",
    "Portrait photographer.",
    "Meditator.",
    "Father.",
    "Husband.",
    "Product Manager.",
    "Advisor.",
    "Mentor.",
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)

      // After animation out completes, change the text
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length)
        setIsAnimating(false)
      }, 500) // Match this with the animation duration
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-8 overflow-hidden">
      <p
        className={`text-xl transition-transform duration-500 ease-in-out ${
          isAnimating ? "transform translate-y-8 opacity-0" : "transform translate-y-0 opacity-100"
        }`}
      >
        {roles[currentIndex]}
      </p>
    </div>
  )
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

// Social media links configuration
type SocialLink = {
  name: string
  icon: React.ReactNode
  url: string
}

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
  {
    name: "Photography",
    icon: <Camera className="w-5 h-5" />,
    url: "/photography",
  }
]

export default function HomePage() {
  const isMobile = useResponsiveNav()
  // You can edit these URLs to point to your actual profiles
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5 text-[#707070] hover:text-[#ffffff] transition-colors" />,
      url: "https://linkedin.com/in/muditairan",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5 text-[#707070] hover:text-[#ffffff] transition-colors" />,
      url: "https://instagram.com/mezuzubes",
    },
    {
      name: "X",
      icon: <XIcon />,
      url: "https://x.com/mezuzubes",
    },
    {
      name: "Website",
      icon: <Globe className="w-5 h-5 text-[#707070] hover:text-[#ffffff] transition-colors" />,
      url: "https://your-website.com",
    },
  ])

  // Function to update a social link URL
  const updateSocialLink = (name: string, newUrl: string) => {
    setSocialLinks((prev) => prev.map((link) => (link.name === name ? { ...link, url: newUrl } : link)))
  }

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
                link.url === "/" ? "bg-[#1a1a1a] text-white" : "hover:bg-[#1a1a1a] text-[#707070] hover:text-white"
              }`}
              aria-label={link.name}
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Mudit Airan</h1>
            <AnimatedText />

            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  {link.icon}
                </Link>
              ))}
            </div>

            <p className="text-[#707070] text-sm mt-4">BERLIN, DE</p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="rounded-2xl overflow-hidden w-64 h-72">
              {/* 
                To use your own image:
                1. Add your image to the public folder (e.g., public/profile.jpg)
                2. Update the src attribute below to point to your image
                3. Adjust width and height if needed
              */}
              <Image
                src="/profile.jpg"
                alt=""
                width={256}
                height={288}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-sm uppercase tracking-wider text-[#707070] mb-8">UPDATES</h2>

          <div className="space-y-10">
            <div className="grid grid-cols-[100px_1fr] gap-4">
              <div className="text-[#707070]">Jun 2023</div>
              <div>
                <p className="mb-2">New Job! Became father to a baby boy.</p>
                <span className="inline-block px-2 py-1 text-xs bg-[#0f3d63] text-white rounded">PERSONAL</span>
              </div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4">
              <div className="text-[#707070]">Oct 2024</div>
              <div>
                <p className="mb-2">
                  Organized the first conference [Tazhiria Con] in Egypt to help high school students learn more about
                  study abroad opportunities in the US (800+ attendees)
                </p>
                <span className="inline-block px-2 py-1 text-xs bg-[#0e3250] text-white rounded">PUBLIC SPEAKING</span>
              </div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4">
              <div className="text-[#707070]">Aug 2024</div>
              <div>
                <p className="mb-2">
                  Got my PADI Deep Diver Specialty. I'm now licensed to dive the max recreational limit of 40m (130ft).
                  Onto the next adventure!
                </p>
                <span className="inline-block px-2 py-1 text-xs bg-[#343434] text-white rounded">HOBBIES</span>
              </div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4">
              <div className="text-[#707070]">Aug 2024</div>
              <div>
                <p className="mb-2">
                  Dipped my toes into voice acting by recording the IVR for AMIDEAST Egypt. Check it out by calling
                  their hotline 19263!
                </p>
                <span className="inline-block px-2 py-1 text-xs bg-[#343434] text-white rounded">HOBBIES</span>
              </div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4">
              <div className="text-[#707070]">Aug 2024</div>
              <div>
                <p className="mb-2">After 5 years of being stuck in the US, I finally was able to visit home</p>
                <span className="inline-block px-2 py-1 text-xs bg-[#ededed] text-[#080808] rounded">LIFE</span>
              </div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4">
              <div className="text-[#707070]">Feb 2024</div>
              <div>
                <p className="mb-2">
                  Had the pleasure of being a part of the judging panel for Bryn Mawr College's "Girls Who Code" Club
                  Protothon
                </p>
                <span className="inline-block px-2 py-1 text-xs bg-[#0f3d63] text-white rounded">WORK</span>
              </div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4">
              <div className="text-[#707070]">Oct 2023</div>
              <div>
                <p className="mb-2">Led a webinar on breaking into product management</p>
                <span className="inline-block px-2 py-1 text-xs bg-[#0f3d63] text-white rounded">WORK</span>
              </div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4">
              <div className="text-[#707070]">Feb 2023</div>
              <div>
                <p className="mb-2">Launched Tazhiria | تزهيرية Podcast</p>
                <span className="inline-block px-2 py-1 text-xs bg-[#0e3250] text-white rounded">CONTENT CREATION</span>
              </div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4">
              <div className="text-[#707070]">Feb 2023</div>
              <div>
                <p className="mb-2">Moved to San Francisco. Hit me up if you're in town. Coffee is on me!</p>
                <span className="inline-block px-2 py-1 text-xs bg-[#ededed] text-[#080808] rounded">LIFE</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 text-center text-[#707070] text-sm">© 2025 — Mudit Airan</footer>
      </main>
    </div>
  )
}
