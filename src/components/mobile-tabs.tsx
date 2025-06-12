'use client'
import { Home, MessageSquareText, Newspaper, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type TabType = 'sidebar' | 'news' | 'chat' | 'settings'

interface MobileTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export default function MobileTabs({
  activeTab,
  onTabChange,
}: MobileTabsProps) {
  const tabs = [
    { id: 'news' as TabType, label: 'Notícias', icon: Newspaper },
    { id: 'chat' as TabType, label: 'Chat IA', icon: MessageSquareText },
    { id: 'sidebar' as TabType, label: 'Menu', icon: Home },
    { id: 'settings' as TabType, label: 'Config', icon: Settings },
  ]

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex h-auto flex-col items-center space-y-1 px-3 py-2',
              activeTab === tab.id
                ? 'text-primary bg-primary/10 dark:bg-primary/20'
                : 'text-gray-600 dark:text-gray-400',
            )}
          >
            <tab.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
