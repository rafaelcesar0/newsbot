'use client'

import { readStreamableValue } from 'ai/rsc'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpIcon,
  BrainCircuit,
  Newspaper,
  Search,
  Trophy,
} from 'lucide-react'
import { useRef, useState } from 'react'

import { chat, Message } from '@/actions/chat'
import { cn } from '@/lib/utils'

import MarkdownRenderer from './markdown-renderer'
import { Button } from './ui/button'

const prompts = [
  {
    icon: <Newspaper strokeWidth={1.8} className="size-5" />,
    text: 'Me atualize sobre as últimas notícias',
  },
  {
    icon: <Trophy strokeWidth={1.8} className="size-5" />,
    text: 'Quero um resumo sobre o que está acontecendo no futebol',
  },
  {
    icon: <BrainCircuit strokeWidth={1.8} className="size-5" />,
    text: 'Crie um artigo sobre o impacto da IA na educação',
  },
  {
    icon: <Search strokeWidth={1.8} className="size-5" />,
    text: 'Preciso saber quais noticias estão em alta hoje',
  },
]

export function Chatbot() {
  const inputRef = useRef<HTMLDivElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)

  const [hasChatStarted, setHasChatStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState('')
  const [conversation, setConversation] = useState<Message[]>([])

  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
    if (inputRef.current) {
      inputRef.current.textContent = prompt
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    }

    setInput('')
    setIsLoading(true)
    setConversation((prev) => [...prev, userMessage])
    setHasChatStarted(true)

    try {
      const { newMessage } = await chat([...conversation, userMessage])

      let textContent = ''

      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
      }

      setConversation((prev) => [...prev, assistantMessage])

      for await (const textMessage of readStreamableValue(newMessage)) {
        textContent += textMessage
        setConversation((prev) => {
          const newConversation = [...prev]
          newConversation[newConversation.length - 1] = {
            role: 'assistant',
            content: textContent,
          }
          return newConversation
        })
      }
    } catch (error) {
      console.error(error)
      setConversation((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="relative flex h-full flex-col items-center space-y-4 pb-4">
      <div className="w-full max-w-3xl flex-1 px-4">
        {!hasChatStarted ? (
          <div className="flex h-full flex-col justify-end space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-semibold">Olá, me chamo Juli👋</h1>
              <span className="text-muted-foreground text-xl">
                Sou uma assitente expecializada em pesquisar noticais, resumlas
                e criar artigos. <br />
                Como posso te ajudar hoje?
              </span>
            </div>

            <div className="grid grid-cols-1 gap-x-3 gap-y-4 md:grid-cols-2">
              <AnimatePresence>
                {prompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      duration: 0.2,
                      type: 'spring',
                      bounce: 0.3,
                      delay: index * 0.05,
                    }}
                    onClick={() => handlePromptClick(prompt.text)}
                    className="hover:bg-muted flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all"
                  >
                    {prompt.icon}
                    <span>{prompt.text}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <motion.div
            animate={{
              paddingBottom: input
                ? input.split('\n').length > 3
                  ? '206px'
                  : '110px'
                : '80px',
            }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-8"
          >
            {conversation.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('flex', {
                  'justify-end': message.role === 'user',
                  'justify-start': message.role === 'assistant',
                })}
              >
                <div
                  className={cn('max-w-[80%] rounded-xl px-4 py-2', {
                    'bg-foreground text-background': message.role === 'user',
                    'bg-muted': message.role === 'assistant',
                  })}
                >
                  {message.role === 'assistant' ? (
                    <MarkdownRenderer message={message} />
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messageEndRef} />
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          position: hasChatStarted ? 'fixed' : 'relative',
        }}
        className="pb-4pt-6 bottom-0 mt-auto w-full bg-linear-to-t from-white via-white to-transparent"
      >
        <div className="mx-auto max-w-3xl px-4">
          <motion.div
            animate={{ height: 'auto' }}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="bg-background relative flex items-end gap-2 rounded-2xl border p-2.5 lg:rounded-e-3xl"
          >
            <div
              contentEditable
              role="textbox"
              ref={(element) => {
                inputRef.current = element
                if (element && !input) {
                  element.textContent = ''
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              onInput={(e) => setInput(e.currentTarget.textContent || '')}
              data-placeholder="Type a message..."
              className="bg-background empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]) min-h-[36px] flex-1 overflow-y-auto rounded-md px-3 py-2 text-sm break-words whitespace-pre-wrap focus:outline-hidden"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="mb-0.5 shrink-0 rounded-full"
            >
              <ArrowUpIcon strokeWidth={2.5} className="size-5" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
