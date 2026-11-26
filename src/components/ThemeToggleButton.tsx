import React, { useEffect, useState } from 'react'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5/index.js'

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })
  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', t)
    setTheme(t)
    if (window.REMARK42) {
      window.REMARK42.changeTheme(t)
    }
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
  }, [theme])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 单个线框图标按钮：浅色时显示月亮（点击切到深色），深色时显示太阳
  return isMounted ? (
    <button
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[color:var(--secondary)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
    >
      {theme === 'light' ? (
        <IoMoonOutline className="w-[18px] h-[18px]" />
      ) : (
        <IoSunnyOutline className="w-[18px] h-[18px]" />
      )}
    </button>
  ) : (
    <div className="w-9 h-9" />
  )
}
