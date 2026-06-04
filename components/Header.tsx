// components/Header.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export default function Header() {
  const [dark, setDark] = useState<boolean>(false);

  // Initialise from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
  }, []);

  // Toggle dark mode and persist
  const toggle = () => {
    setDark(!dark);
    const root = window.document.documentElement;
    if (!dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-glass backdrop-blur-sm shadow-md">
      <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-warm-500">
        Siddu Portfolio
      </Link>
      <nav className="flex space-x-4">
        <Link href="/about" className="text-lg hover:text-primary-400 transition-colors">About</Link>
        <Link href="/experience" className="text-lg hover:text-primary-400 transition-colors">Experience</Link>
        <Link href="/projects" className="text-lg hover:text-primary-400 transition-colors">Projects</Link>
        <Link href="/contact" className="text-lg hover:text-primary-400 transition-colors">Contact</Link>
      </nav>
      <button onClick={toggle} aria-label="Toggle dark mode" className="p-2 rounded-full hover:bg-white/10 transition-colors">
        {dark ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-600" />}
      </button>
    </header>
  );
}
