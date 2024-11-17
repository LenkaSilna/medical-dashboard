'use client'

import React from 'react'
import { useTheme } from '@/app/context/ThemeContext'
import { FaMoon, FaSun } from 'react-icons/fa'
import { FaSuitcaseMedical } from 'react-icons/fa6'
import Link from 'next/link'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="flex justify-between items-center p-4">
      <Link href="/">
        <div className="flex items-center">
          <FaSuitcaseMedical
            className="m-2"
            style={{ color: theme === 'dark' ? '#f0f0f0' : '#171717' }}
          />
          <h1 className="text-lg font-bold">Medical Dashboard</h1>
        </div>
      </Link>
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
