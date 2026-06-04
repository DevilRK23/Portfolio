// components/Footer.tsx
import Link from 'next/link';
import { GithubIcon, LinkedInIcon, MailIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-6 bg-glass backdrop-blur-sm border-t border-white/10">
      <div className="flex space-x-4 mb-2">
        <Link href="https://github.com/siddu" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
          <GithubIcon className="w-6 h-6" />
        </Link>
        <Link href="https://linkedin.com/in/siddu" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
          <LinkedInIcon className="w-6 h-6" />
        </Link>
        <Link href="mailto:siddu@example.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
          <MailIcon className="w-6 h-6" />
        </Link>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Siddu. All rights reserved.</p>
    </footer>
  );
}
