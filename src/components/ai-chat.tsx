'use client'

import { useChat } from '@ai-sdk/react'
import { Bot, CornerDownLeft, NewspaperIcon, Send, User } from 'lucide-react'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import MarkdownRenderer from './markdown-renderer'

export default function AiChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading,
  } = useChat()
  const [isDropZoneActive, setIsDropZoneActive] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDropZoneActive(false)
    try {
      const newsUrl = event.dataTransfer.getData('text/plain')
      if (newsUrl) {
        setInput(newsUrl)
      }
    } catch (error) {
      console.error('Erro ao processar o link da notícia:', error)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDropZoneActive(true)
  }

  const handleDragLeave = () => {
    setIsDropZoneActive(false)
  }

  const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() && messages.length === 0) return
    handleSubmit(e)
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col transition-colors duration-300',
        'md:rounded-lg md:border',
        isDropZoneActive
          ? 'border-primary bg-primary/5 dark:bg-primary/10'
          : 'md:border-transparent',
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <header className="flex-shrink-0 border-b p-4 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Chat com IA
        </h2>
        {isDropZoneActive && (
          <p className="text-primary dark:text-primary-light mt-1 flex items-center text-sm">
            <CornerDownLeft className="mr-1 h-4 w-4" /> Solte a notícia aqui
            para adicionar o link ao chat.
          </p>
        )}
      </header>

      {/* Área de mensagens com scroll único */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !isLoading && (
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
            <NewspaperIcon className="mx-auto mb-2 h-12 w-12" />
            <p className="text-sm md:text-base">
              Arraste uma notícia ou comece a digitar.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                'mb-6 flex',
                m.role === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] rounded-xl shadow-sm md:max-w-[75%]',
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground p-3'
                    : 'bg-gray-50 p-1 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                )}
              >
                <div
                  className={cn(
                    'mb-2 flex items-center',
                    m.role === 'user'
                      ? 'text-primary-foreground'
                      : 'px-3 pt-2 text-gray-600 dark:text-gray-400',
                  )}
                >
                  {m.role === 'user' ? (
                    <User className="mr-2 h-4 w-4 flex-shrink-0" />
                  ) : (
                    <Bot className="mr-2 h-4 w-4 flex-shrink-0" />
                  )}
                  <span className="text-sm font-semibold">
                    {m.role === 'user' ? 'Você' : 'IA'}
                  </span>
                </div>

                {m.role === 'user' ? (
                  <div className="text-sm break-words whitespace-pre-wrap">
                    {m.content}
                  </div>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <MarkdownRenderer message={m} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === 'user' && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-xl bg-gray-200 p-3 text-gray-800 shadow-sm md:max-w-[75%] dark:bg-gray-700 dark:text-gray-200">
                  <div className="mb-1 flex items-center">
                    <Bot className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-semibold">IA</span>
                  </div>
                  <p className="text-sm italic">Buscando informações...</p>
                </div>
              </div>
            )}
        </div>

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={customHandleSubmit}
        className="flex flex-shrink-0 items-center space-x-2 border-t p-4 dark:border-gray-700"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Digite sua mensagem..."
          className="focus:ring-primary dark:focus:ring-primary-light flex-1 border-gray-300 bg-white text-sm md:text-base dark:border-gray-600 dark:bg-gray-700"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading}
          className="flex-shrink-0"
        >
          <Send className="h-4 w-4 md:h-5 md:w-5" />
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
    </div>
  )
}
