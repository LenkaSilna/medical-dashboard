'use client'

import React from 'react'
import { useTheme } from '@/app/context/ThemeContext'
import { FaMoon, FaSun } from 'react-icons/fa'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-lg font-bold">Medical Dashboard</h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none"
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </header>
  )
}

export default Header
