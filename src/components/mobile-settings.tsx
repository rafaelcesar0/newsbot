'use client'

import { HelpCircle, Info, Palette } from 'lucide-react'

import { ThemeToggle } from './theme-toggle'

export default function MobileSettings() {
  return (
    <div className="h-full bg-white p-5 dark:bg-gray-800">
      <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Configurações
      </h2>

      <div className="space-y-6">
        {/* Seção de Tema */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Aparência
            </h3>
          </div>
          <div className="pl-7">
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Escolha como você quer que a interface apareça.
            </p>
            <ThemeToggle />
          </div>
        </div>

        {/* Seção de Informações */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Sobre o App
            </h3>
          </div>
          <div className="pl-7">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Chat com Notícias - Uma interface para conversar com IA sobre
              notícias atuais.
            </p>
          </div>
        </div>

        {/* Seção de Ajuda */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Como usar
            </h3>
          </div>
          <div className="pl-7">
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                • <strong>Notícias:</strong> Navegue pelo feed de notícias
              </li>
              <li>
                • <strong>Chat IA:</strong> Converse com a inteligência
                artificial
              </li>
              <li>
                • <strong>Arrastar:</strong> Arraste notícias para o chat
                (apenas desktop)
              </li>
              <li>
                • <strong>Busca:</strong> A IA pode buscar informações na web
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
