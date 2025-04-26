import Link from "next/link"
import { TinderApp } from "@/components/tinder-app"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center px-4 mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-rose-500"
            >
              <path d="M18 13c.6 0 1.1.2 1.5.7.4.4.5 1 .5 1.8 0 .5-.1 1-.4 1.5-.3.5-.7.9-1.1 1.2-.9.6-1.7 1.1-2.5 1.5-.8.4-1.6.8-2.4 1.1-.8.3-1.5.5-2.3.6-.7.1-1.4.2-2 .2-.5 0-1.2-.1-1.9-.2-.7-.1-1.4-.3-2.1-.6-.7-.3-1.4-.6-2.1-1-.7-.4-1.3-.9-1.9-1.4-.6-.5-1-.9-1.3-1.3-.2-.4-.3-.8-.3-1.3 0-.9.3-1.6.8-2 .4-.3.9-.5 1.5-.5.5 0 1 .1 1.5.4.5.3.9.6 1.2 1 .3.4.6.8.8 1.2.2.4.4.7.5 1 .1.3.2.5.3.5.1.1.2.1.3.1.1 0 .2 0 .3-.1l.3-.3c.1-.1.2-.2.3-.4.1-.2.2-.3.3-.5.1-.2.2-.4.3-.7.1-.3.2-.5.3-.8.1-.3.2-.6.3-.9.1-.3.2-.7.3-1 .1-.3.2-.7.3-1 .1-.3.2-.7.3-1 .1-.3.2-.6.3-.9.1-.3.2-.5.3-.8.1-.2.2-.5.3-.7.1-.2.2-.4.3-.5.1-.1.2-.3.3-.4.1-.1.2-.1.3-.1.1 0 .2 0 .3.1.1.1.2.2.3.3.1.1.2.3.3.5.1.2.2.4.3.6.1.2.2.5.3.7.1.3.2.5.3.8.1.3.2.6.3.9.1.3.2.6.3.9.1.3.2.6.3.9.1.3.2.6.3.9.1.3.2.5.3.8.1.2.2.5.3.7.1.2.2.4.3.5.1.1.2.3.3.4.1.1.2.1.3.1.1 0 .2 0 .3-.1s.2-.2.3-.4c.1-.2.2-.4.3-.6.1-.2.2-.5.3-.8.1-.3.2-.6.3-.9.1-.3.2-.6.3-.9.1-.3.2-.6.3-.8.1-.2.2-.5.3-.7.1-.2.2-.4.3-.5.1-.1.2-.3.3-.4.1-.1.2-.1.3-.1.1 0 .2 0 .3.1.1.1.2.2.3.4.1.2.2.4.3.6.1.2.2.5.3.8.1.3.2.6.3.9.1.3.2.7.3 1 .1.3.2.7.3 1 .1.3.2.7.3 1 .1.3.2.6.3.9.1.3.2.5.3.8.1.2.2.5.3.7.1.2.2.4.3.5.1.1.2.3.3.4.1.1.2.1.3.1.1 0 .2 0 .3-.1.1-.1.2-.2.3-.4.1-.2.2-.4.3-.7.1-.3.2-.5.4-.9.1-.3.3-.7.4-1 .2-.4.3-.7.5-1 .2-.3.4-.6.6-.9.2-.3.5-.5.8-.7.3-.2.6-.3 1-.3z" />
            </svg>
            <span className="font-semibold text-rose-500">tinder</span>
          </Link>
          <nav className="ml-auto flex gap-4">
            <Link href="#" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Products
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Learn
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Safety
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Support
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Download
            </Link>
          </nav>
          <div className="ml-4 flex items-center gap-4">
            <Link href="#" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Log in
            </Link>
            <Link
              href="#"
              className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-rose-600 hover:to-pink-600"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <TinderApp />
      </main>
    </div>
  )
}
