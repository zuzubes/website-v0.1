"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Linkedin, Home, PenTool, User, FileText, Lightbulb, GraduationCap } from "lucide-react"

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

// Company logo component
const CompanyLogo = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="w-8 h-8 rounded-md overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
      <Image src={src || "/placeholder.svg"} alt={alt} width={32} height={32} className="object-contain" />
    </div>
  )
}

// Project card component
const ProjectCard = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
      <div className="relative h-40 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-3">
        <h3 className="text-sm text-white">{title}</h3>
      </div>
    </div>
  )
}

// Skill tag component - styled like the Countries visited section
const SkillTag = ({ children, color = "teal" }: { children: React.ReactNode; color?: string }) => {
  const colorMap = {
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
        colorMap[color as keyof typeof colorMap] || colorMap.teal
      }`}
    >
      {children}
    </span>
  )
}

// Replace the TechIcon component with a new StackCard component
const StackCard = ({
  logo,
  name,
  category,
}: {
  logo: string
  name: string
  category: "BROWSER" | "PRODUCTIVITY" | "DESIGN" | "UX RESEARCH" | "ANALYTICS" | "COMMUNICATION"
}) => {
  return (
    <div
      className="bg-[#222] rounded-lg p-3 flex flex-col items-center justify-between"
      style={{ width: "135px", height: "170px" }}
    >
      <div className="mb-2 w-16 h-16 flex items-center justify-center bg-[#333] rounded-md">
        {/* Use the first letter of the name as a placeholder */}
        <span className="text-3xl font-bold text-white">{name.charAt(0)}</span>
      </div>
      <h3 className="text-lg font-medium text-white mb-2 text-center">{name}</h3>
      <span className="bg-[#0f3d63] text-white text-xs font-medium px-3 py-1 rounded-md">{category}</span>
    </div>
  )
}

// Experience item component with consistent layout
const ExperienceItem = ({
  logo,
  role,
  company,
  location,
  period,
}: {
  logo: string
  role: string
  company: string
  location: string
  period: string
}) => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <CompanyLogo src={logo} alt={company} />
      <div className="flex-1">
        <div className="flex justify-between items-start w-full">
          <div className="flex-1">
            <h3 className="text-white font-medium">{role}</h3>
            <p className="text-sm text-[#707070]">{company}</p>
            <p className="text-xs text-[#707070]">{location}</p>
          </div>
          <span className="text-xs text-[#707070] whitespace-nowrap text-right">{period}</span>
        </div>
      </div>
    </div>
  )
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
]

export default function WorkPage() {
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
                link.url === "/work" ? "bg-[#1a1a1a] text-white" : "hover:bg-[#1a1a1a] text-[#707070] hover:text-white"
              }`}
              aria-label={link.name}
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Left-aligned header */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold mb-2 text-white">Work</h1>
            <p className="text-[#707070] text-xl">an overview of my career</p>
          </div>

          {/* Profile section */}
          <div className="flex flex-col items-center mb-12">
            <div className="rounded-full overflow-hidden w-32 h-32 mb-4">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Profile photo"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Mudit Airan</h2>
            <p className="text-[#707070] mb-4">Product Leader</p>

            {/* Buttons styled as per screenshot */}
            <div className="flex gap-4 mb-4">
              <Link
                href="https://drive.google.com/file/d/1l4tA_PjN9WTugYQnkbF16wVd_DcSQUf9/view"
                target="_blank"
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] px-6 py-3 rounded-md text-white text-sm transition-colors flex items-center justify-center gap-2 w-40"
              >
                <span>Résumé</span>
                <FileText className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/muditairan"
                target="_blank"
                className="bg-white hover:bg-[#f0f0f0] px-6 py-3 rounded-md text-black text-sm transition-colors flex items-center justify-center gap-2 w-40"
              >
                <span>LinkedIn</span>
                <Linkedin className="w-5 h-5 text-black" />
              </Link>
            </div>
            {/* Removed the redundant LinkedIn URL text */}
          </div>

          {/* Two-column layout for the rest of the content */}
          <div className="grid grid-cols-[150px_1fr] gap-x-8 gap-y-12">
            {/* BIO section */}
            <div className="text-right text-sm uppercase tracking-wider text-[#707070]">BIO</div>
            <div className="space-y-4">
              <p className="text-white">
                I'm a Product Manager based in Berlin, and currently exploring the world of GTM.
              </p>
              <p className="text-white">
                My work involves understanding user needs, identifying pain points, and creating solutions that address
                them. I work with a talented and dedicated product development team to build, optimize, and ship
                features that create good product experiences.
              </p>
              <p className="text-white">
                With an Engineering in Electronics & Telecommunications and a Product Management certificate, I've honed
                my ability to bridge the gap between technical and business requirements. I'm passionate about creating
                products that solve real problems, and always keep the end user in mind when designing solutions.
              </p>
              <p className="text-white">
                If you're interested in learning more about what I do outside of work, feel free to check out my{" "}
                <Link href="/about" className="text-[#4a9eff] hover:underline">
                  about
                </Link>{" "}
                page.
              </p>
            </div>

            {/* EXPERIENCE section */}
            <div className="text-right text-sm uppercase tracking-wider text-[#707070]">EXPERIENCE</div>
            <div className="space-y-6">
              <ExperienceItem
                logo="/placeholder.svg?height=32&width=32"
                role="Head of Product"
                company="Sprouts.ai"
                location="Berlin, Germany"
                period="May 2023 — Present"
              />
              <ExperienceItem
                logo="/placeholder.svg?height=32&width=32"
                role="Senior Product Manager"
                company="Adjust"
                location="Berlin, Germany"
                period="Feb 2020 — Apr 2023"
              />
              <ExperienceItem
                logo="/placeholder.svg?height=32&width=32"
                role="Product Owner"
                company="ING/OCBC/Lloyds Bank (On behalf of HCL Technologies)"
                location="Hyderabad, India & Amsterdam, Netherlands"
                period="Jan 2019 — Aug 2020"
              />
              <ExperienceItem
                logo="/placeholder.svg?height=32&width=32"
                role="Software Developer"
                company="American Express (on behalf of Infosys)"
                location="Pune, India & Brighton, UK"
                period="Dec 2009 — Apr 2015"
              />
            </div>
            {/* SKILLS section - styled like Countries visited */}
            <div className="text-right text-sm uppercase tracking-wider text-[#707070]">SKILLS</div>
            <div>
              <div className="mb-4">
                <h3 className="text-white mb-2">Product Management</h3>
                <div className="flex flex-wrap">
                  <SkillTag color="blue">Product Strategy</SkillTag>
                  <SkillTag color="blue">Prioritization</SkillTag>
                  <SkillTag color="blue">Roadmapping</SkillTag>
                  <SkillTag color="blue">Competitive Analysis</SkillTag>
                  <SkillTag color="blue">Communication</SkillTag>
                  <SkillTag color="blue">Design Thinking</SkillTag>
                  <SkillTag color="blue">User Research</SkillTag>
                  <SkillTag color="blue">Market Research</SkillTag>
                  <SkillTag color="blue">A/B Testing</SkillTag>
                  <SkillTag color="blue">UX Testing</SkillTag>
                  <SkillTag color="blue">Rapid Prototyping</SkillTag>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-white mb-2">Design</h3>
                <div className="flex flex-wrap">
                  <SkillTag color="green">Figma</SkillTag>
                  <SkillTag color="green">Framer</SkillTag>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-white mb-2">Programming</h3>
                <div className="flex flex-wrap">
                  <SkillTag color="purple">HTML</SkillTag>
                  <SkillTag color="purple">CSS</SkillTag>
                  <SkillTag color="purple">Python</SkillTag>
                </div>
              </div>

              <div>
                <h3 className="text-white mb-2">Languages</h3>
                <div className="flex flex-wrap">
                  <SkillTag color="yellow">English</SkillTag>
                  <SkillTag color="yellow">Hindi</SkillTag>
                  <SkillTag color="yellow">Spanish</SkillTag>
                  <SkillTag color="yellow">German</SkillTag>
                </div>
              </div>
            </div>

            {/* EDUCATION section - consistent with experience section */}
            <div className="text-right text-sm uppercase tracking-wider text-[#707070]">EDUCATION</div>
            <div className="space-y-6">
              <ExperienceItem
                logo="/placeholder.svg?height=32&width=32"
                role="Masters of Business Administration, Entrepreneurship & Innovation"
                company="esade business school"
                location="Barcelona, Spain"
                period="Aug 2018 — Mar 2020"
              />
              <ExperienceItem
                logo="/placeholder.svg?height=32&width=32"
                role="Bachelor of Engineering, Electronics & Telecommunication"
                company="Mumbai University"
                location="Mumbai, India"
                period="Jul 2005 — Jun 2009"
              />
              <div className="mt-6">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Graduation photo"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* STACK section */}
            <div className="text-right text-sm uppercase tracking-wider text-[#707070]">STACK</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 justify-items-center">
              <StackCard logo="/icons/arc.png" name="Arc" category="BROWSER" />
              <StackCard logo="/icons/notion.png" name="Notion" category="PRODUCTIVITY" />
              <StackCard logo="/icons/todoist.png" name="Todoist" category="PRODUCTIVITY" />
              <StackCard logo="/icons/framer.png" name="Framer" category="DESIGN" />
              <StackCard logo="/icons/figma.png" name="Figma" category="DESIGN" />
              <StackCard logo="/icons/asana.png" name="Asana" category="PRODUCTIVITY" />
              <StackCard logo="/icons/usertesting.png" name="UserTesting" category="UX RESEARCH" />
              <StackCard logo="/icons/amplitude.png" name="Amplitude" category="ANALYTICS" />
              <StackCard logo="/icons/firebase.png" name="Firebase" category="ANALYTICS" />
              <StackCard logo="/icons/segment.png" name="Segment" category="ANALYTICS" />
              <StackCard logo="/icons/slack.png" name="Slack" category="COMMUNICATION" />
              <StackCard logo="/icons/miro.png" name="Miro" category="PRODUCTIVITY" />
            </div>

            {/* CONTACT section */}
            <div className="text-right text-sm uppercase tracking-wider text-[#707070]">CONTACT</div>
            <div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Link
                  href="https://drive.google.com/file/d/1l4tA_PjN9WTugYQnkbF16wVd_DcSQUf9/view"
                  target="_blank"
                  className="bg-[#1a1a1a] hover:bg-[#2a2a2a] px-4 py-3 rounded-md text-white text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>Hire Me</span>
                  <FileText className="w-5 h-5" />
                </Link>
                <Link
                  href="https://topmate.io/muditairan/"
                  target="_blank"
                  className="bg-[#1a1a1a] hover:bg-[#2a2a2a] px-4 py-3 rounded-md text-white text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>Coffee Chat</span>
                  <span>☕</span>
                </Link>
                <Link
                  href="https://topmate.io/muditairan/"
                  target="_blank"
                  className="bg-[#1a1a1a] hover:bg-[#2a2a2a] px-4 py-3 rounded-md text-white text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>1:1 Mentorship</span>
                  <GraduationCap className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-16 text-center text-[#707070] text-sm">© 2025 — Mudit Airan</footer>
        </div>
      </div>
    </div>
  )
}
