// components/Navbar.tsx
'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  // Load theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const current = saved || (prefersDark ? 'dark' : 'light')

    if (current === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    setTheme(current)
  }, [])


  const toggleTheme = () => {
    if (!theme) return
    const newTheme = theme === 'dark' ? 'light' : 'dark'

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }


  if (theme === null) return null // avoid hydration mismatch

  return (
    <nav className="bg-white dark:bg-[#4d4d4f] text-[#273860] dark:text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold tracking-wide">Damen App</div>

        <div className="hidden md:flex gap-6 items-center">
          <a href="#" className="hover:text-gray-200 transition font-medium">Home</a>
          <button onClick={toggleTheme} className="ml-4">
            {theme === 'dark' ? (
  <Sun className="text-yellow-400 stroke-yellow-500 fill-yellow-300" size={20} />
) : (
  <Moon className="text-gray-600 stroke-gray-500 fill-gray-100" size={20} />
)}
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0033a0] dark:bg-[#4d4d4f] px-4 pb-4 space-y-2">
          <a href="#" className="block text-white hover:text-gray-200">Home</a>
          <a href="#" className="block text-white hover:text-gray-200">About</a>
          <a href="#" className="block text-white hover:text-gray-200">Services</a>
          <a href="#" className="block text-white hover:text-gray-200">Contact</a>
          <button onClick={toggleTheme} className="mt-2">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}
    </nav>
  )
}
