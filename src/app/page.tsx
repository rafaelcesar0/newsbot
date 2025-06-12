'use client'

import { useState } from 'react'

import AiChat from '@/components/ai-chat'
import CollapsibleSidebar from '@/components/collapsible-sidebar'
import MobileSettings from '@/components/mobile-settings'
import MobileTabs, { type TabType } from '@/components/mobile-tabs'
import NewsReel from '@/components/news-reel'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('news')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [newsWidth, setNewsWidth] = useState(600) // Largura inicial do feed de notícias

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleResize = (newWidth: number) => {
    setNewsWidth(newWidth)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100 text-gray-900 md:flex-row dark:bg-gray-900 dark:text-gray-100">
      {/* Layout Desktop - Três Colunas Redimensionáveis */}
      <div className="hidden h-full w-full md:flex">
        {/* Barra Lateral Esquerda Colapsável */}
        <CollapsibleSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={handleSidebarToggle}
        />

        {/* Conteúdo Principal (Feed de Notícias) - Redimensionável */}
        <main
          className="min-w-0 overflow-y-auto border-r border-gray-200 p-6 dark:border-gray-700"
          style={{ width: `${newsWidth}px` }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Feed de Notícias
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Arraste o divisor para redimensionar →
            </div>
          </div>
          <NewsReel />
        </main>

        {/* Barra Lateral Direita (Chat com IA) */}
        <aside className="min-w-0 flex-1 bg-white shadow-lg dark:bg-gray-800">
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
              <div className="space-y-2">
                <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Chat com Notícias
                </h2>
                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                  Arraste notícias para o chat e converse com a IA sobre elas.
                </p>
                {/* Navegação mobile simplificada */}
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                    <h3 className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                      Como usar:
                    </h3>
                    <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <li>• Navegue pelas abas na parte inferior</li>
                      <li>• Arraste notícias para o chat (apenas desktop)</li>
                      <li>• Faça perguntas sobre as notícias</li>
                      <li>• A IA pode buscar na web</li>
                    </ul>
                  </div>
                </div>
              </div>
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

          {/* Aba Configurações */}
          {activeTab === 'settings' && <MobileSettings />}
        </div>

        {/* Navegação por Abas (Mobile) */}
        <MobileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
