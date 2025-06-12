'use client'

import {
  Home,
  Info,
  MessageSquareText,
  Newspaper,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '#news', label: 'Notícias', icon: Newspaper },
  { href: '#chat', label: 'Chat IA', icon: MessageSquareText },
  { href: '#settings', label: 'Configurações', icon: Settings },
  { href: '#about', label: 'Sobre', icon: Info },
]

export default function LeftSidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-2">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Chat com Notícias
      </h2>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Arraste notícias para o chat e converse com a IA sobre elas.
      </p>

      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center space-x-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors duration-150 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700',
              pathname === item.href &&
                'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90',
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm md:text-base">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
        <h3 className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          Como usar:
        </h3>
        <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <li>• Arraste notícias para o chat</li>
          <li>• Faça perguntas sobre as notícias</li>
          <li>• A IA pode buscar na web</li>
        </ul>
      </div>
    </nav>
  )
}
