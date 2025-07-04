"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Home, PenTool, User, Lightbulb, ArrowLeft, ArrowRight } from "lucide-react"

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

// Blog post type
type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  readTime: string
  image: string
  content?: string
  category?: string
}

// Update the navigation links to remove the Triangle icon
const navLinks = [
  {
    name: "Home",
    icon: <Home className="w-5 h-5" />,
    url: "/",
  },
  {
    name: "Work",
    icon: <Lightbulb className="w-5 h-5" />,
    url: "/work",
  },
  {
    name: "Writing",
    icon: <PenTool className="w-5 h-5" />,
    url: "/writing",
  },
  {
    name: "About",
    icon: <User className="w-5 h-5" />,
    url: "/about",
  },
]

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "dear brothers, let's talk about periods",
    slug: "dear-brothers-lets-talk-about-periods",
    excerpt: "A candid discussion about menstruation and why men should understand it better.",
    date: "May 1, 2022",
    readTime: "25 min read",
    image: "/placeholder.svg?height=200&width=400",
    category: "HEALTH",
  },
  {
    id: "2",
    title: "How I (almost) never miss prayer when I'm out",
    slug: "how-i-almost-never-miss-prayer-when-im-out",
    excerpt: "Practical tips for maintaining your prayer schedule while traveling.",
    date: "Dec 4, 2021",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
    category: "FAITH",
  },
  {
    id: "3",
    title: "Ola | عُلا",
    slug: "ola",
    excerpt: "Reflections on family, heritage, and the meaning of names.",
    date: "Jul 4, 2021",
    readTime: "12 min read",
    image: "/placeholder.svg?height=200&width=400",
    category: "FAMILY",
  },
  {
    id: "4",
    title: "Why I love doing the dishes",
    slug: "why-i-love-doing-the-dishes",
    excerpt: "Finding mindfulness and peace in everyday chores.",
    date: "Nov 27, 2020",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400",
    category: "LIFE",
    content: `
      When I started living on my own as a graduate student in 2015, I had to learn how to cook, clean, and do laundry. I was lucky enough to have a dishwasher, but I never used it. I found that I actually enjoyed washing dishes by hand.

      The first benefit is that of course the work is being done. But there's another benefit: doing the dishes is a form of meditation for me.

      The first step of a zen practice is to focus on breathing. As you breathe, you notice your thoughts, but you don't engage with them. You just let them float by. I've found that doing the dishes is a perfect time to practice this.

      There are so many sensations to focus on: the warm water on my hands, the soap bubbles, the texture of the sponge, the sound of the water. It's a full sensory experience that helps me stay present.

      ## It's a great way to start off my day

      When I wake up, I usually have a few dishes from the night before. I make myself a cup of coffee, and then I do the dishes. It's a nice way to ease into the day.

      The dishes are always there, waiting for me. They're a constant in my life, a reminder that there are simple tasks that need to be done, and that I can do them.

      ## It helps me "reset" (bonus: cleaner kitchen!)

      One of the unexpected benefits of doing the dishes is that it helps me reset my mental space. If I'm feeling overwhelmed or stressed, I can go to the kitchen and do the dishes. It's a simple task that I can complete, and it gives me a sense of accomplishment.

      Plus, a clean kitchen is just generally a nicer to work in. It's a lot easier to cook when you have clean dishes and a clean counter.

      ## Your family and friends will LOVE you!

      If you live with your spouse, family, or roommates, doing the dishes is a great way to contribute to the household. It's a simple task that makes a big difference.

      Even if you don't live with others, having a clean kitchen when friends come over is always appreciated. It's one less thing to worry about when you're hosting.

      So next time you're feeling stressed or overwhelmed, try doing the dishes. It might just be the reset you need.
    `,
  },
  {
    id: "5",
    title: "I asked my manager for a prayer space",
    slug: "i-asked-my-manager-for-a-prayer-space",
    excerpt: "Navigating religious accommodations in the workplace.",
    date: "Nov 4, 2020",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
    category: "WORK",
  },
  {
    id: "6",
    title: "Hey friends 👋 Welcome to my Blog!",
    slug: "welcome-to-my-blog",
    excerpt: "An introduction to my writing journey and what you can expect.",
    date: "Oct 9, 2020",
    readTime: "3 min read",
    image: "/placeholder.svg?height=200&width=400",
    category: "GENERAL",
  },
]

export default function BlogPostPage() {
  const isMobile = useResponsiveNav()
  const params = useParams()
  const slug = params.slug as string

  // Find the current post
  const post = blogPosts.find((p) => p.slug === slug)

  // Find the previous and next posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  if (!post) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/writing" className="text-[#4a9eff] hover:underline">
            Back to all posts
          </Link>
        </div>
      </div>
    )
  }

  // Change the navigation rendering to only show the first 4 links (removing Contact)
  return (
    <div className={`min-h-screen bg-[#080808] text-[#ffffff] font-sans ${isMobile ? "flex flex-col" : "flex"}`}>
      {/* Left sidebar navigation */}
      <nav className="w-16 border-r border-[#1a1a1a] flex flex-col py-6 sticky top-0 h-screen">
        <div className="flex flex-col items-center justify-center flex-grow">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className={`p-2 my-3 rounded-md transition-colors flex justify-center ${
                link.url === "/writing"
                  ? "bg-[#1a1a1a] text-white"
                  : "hover:bg-[#1a1a1a] text-[#707070] hover:text-white"
              }`}
              aria-label={link.name}
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex-1 max-w-3xl mx-auto px-6 py-12">
        {/* Blog header */}
        <div className="mb-2">
          <Link href="/writing" className="text-[#707070] hover:text-white text-sm">
            ← All Posts
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-white">{post.title}</h1>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs bg-[#1a1a1a] text-[#707070] px-2 py-1 rounded">{post.category}</span>
          <span className="text-sm text-[#707070]">{post.date}</span>
          <span className="text-sm text-[#707070]">·</span>
          <span className="text-sm text-[#707070]">{post.readTime}</span>
        </div>

        {/* Featured image */}
        <div className="relative h-64 w-full mb-8">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover rounded-lg" />
        </div>

        {/* Blog content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {post.content ? (
            <div className="space-y-6">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  )
                }
                return (
                  <p key={index} className="text-[#e0e0e0] leading-relaxed">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-[#e0e0e0] leading-relaxed">
                This is a sample blog post. The content for this specific post hasn't been fully written yet.
              </p>
              <p className="text-[#e0e0e0] leading-relaxed">
                In a real implementation, each blog post would have its own content stored in a database or CMS.
              </p>
            </div>
          )}
        </div>

        {/* Navigation between posts */}
        <div className="mt-16 border-t border-[#1a1a1a] pt-8 flex justify-between">
          {prevPost ? (
            <Link href={`/writing/${prevPost.slug}`} className="flex items-center text-[#707070] hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Previous</span>
            </Link>
          ) : (
            <div></div>
          )}

          {nextPost ? (
            <Link href={`/writing/${nextPost.slug}`} className="flex items-center text-[#707070] hover:text-white">
              <span>Next</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        {/* Comments section */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-6">Comments</h3>
          <div className="bg-[#111] rounded-lg p-6 text-center">
            <p className="text-[#707070]">Comments are disabled for this post.</p>
          </div>
        </div>

        <footer className="mt-16 text-center text-[#707070] text-sm">© 2025 — Mudit Airan</footer>
      </div>
    </div>
  )
}
