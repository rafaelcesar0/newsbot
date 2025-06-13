'use client'

import { useState } from 'react'

import AiChat from '@/components/ai-chat'
import LeftSidebar from '@/components/left-sidebar'
import MobileTabs, { type TabType } from '@/components/mobile-tabs'
import NewsReel from '@/components/news-reel'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('news')

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100 text-gray-900 md:flex-row dark:bg-gray-900 dark:text-gray-100">
      {/* Layout Desktop - Três Colunas */}
      <div className="hidden h-full w-full md:flex">
        {/* Barra De Navegação */}
        <aside className="w-64 flex-shrink-0 bg-white p-5 shadow-lg dark:bg-gray-800">
          <LeftSidebar />
        </aside>

        {/* Feed de Notícias */}
        <main className="min-w-0 flex-1 overflow-y-auto p-6">
          <h1 className="mb-6 text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Feed de Notícias
          </h1>
          <NewsReel />
        </main>

        {/* Chat com IA */}
        <aside className="w-96 flex-shrink-0 border-l border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <AiChat />
        </aside>
      </div>

      {/* Layout Mobile - Abas */}
      <div className="flex h-full flex-col md:hidden">
        {/* Conteúdo das Abas */}
        <div className="flex-1 overflow-hidden pb-16">
          {/* Aba Menu/Sidebar */}
          {activeTab === 'sidebar' && (
            <div className="h-full bg-white p-5 dark:bg-gray-800">
              <LeftSidebar />
            </div>
          )}

          {/* Aba Notícias */}
          {activeTab === 'news' && (
            <div className="h-full overflow-y-auto p-4">
              <h1 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Feed de Notícias
              </h1>
              <NewsReel />
            </div>
          )}

          {/* Aba Chat */}
          {activeTab === 'chat' && (
            <div className="h-full bg-white dark:bg-gray-800">
              <AiChat />
            </div>
          )}
        </div>

        {/* Navegação por Abas (Mobile) */}
        <MobileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
