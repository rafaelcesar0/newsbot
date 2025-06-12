'use client'
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
  MessageSquareText,
  Newspaper,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { ThemeToggle } from './theme-toggle'
import { ThemeToggleCompact } from './theme-toggle-compact'

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '#news', label: 'Notícias', icon: Newspaper },
  { href: '#chat', label: 'Chat IA', icon: MessageSquareText },
  { href: '#settings', label: 'Configurações', icon: Settings },
  { href: '#about', label: 'Sobre', icon: Info },
]

interface CollapsibleSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export default function CollapsibleSidebar({
  isCollapsed,
  onToggle,
}: CollapsibleSidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'flex flex-col border-r border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* Header com botão de toggle */}
      <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
        {!isCollapsed && (
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Chat com Notícias
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="flex-shrink-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navegação */}
      <nav className="flex-1 p-4">
        {!isCollapsed && (
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Arraste notícias para o chat e converse com a IA sobre elas.
          </p>
        )}

        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center rounded-lg text-gray-700 transition-colors duration-150 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700',
                isCollapsed ? 'justify-center p-3' : 'space-x-3 px-3 py-2.5',
                pathname === item.href &&
                  'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90',
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm md:text-base">{item.label}</span>
              )}
            </Link>
          ))}
        </div>

        {!isCollapsed && (
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
        )}
      </nav>

      {/* Seletor de Tema */}
      <div className="border-t p-4 dark:border-gray-700">
        {isCollapsed ? <ThemeToggleCompact /> : <ThemeToggle />}
      </div>
    </div>
  )
}
