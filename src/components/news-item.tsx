'use client'

import { CalendarDays } from 'lucide-react'
import Image from 'next/image'
import type React from 'react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export interface NewsArticle {
  id: string
  title: string
  summary: string
  imageUrl?: string
  category: string
  date: string
  url: string
}

interface NewsItemProps {
  article: NewsArticle
}

export default function NewsItem({ article }: NewsItemProps) {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    // Transfere apenas a URL da notícia como texto simples
    event.dataTransfer.setData('text/plain', article.url)
    event.currentTarget.style.opacity = '0.6' // Feedback visual
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.opacity = '1' // Restaura opacidade
  }

  return (
    <Card
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="dark:hover:shadow-primary/20 mb-4 cursor-grab transition-shadow hover:shadow-xl active:cursor-grabbing md:mb-6"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight text-gray-800 md:text-xl dark:text-gray-200">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {article.imageUrl && (
          <div className="relative h-40 w-full overflow-hidden rounded-md md:h-48">
            <Image
              src={article.imageUrl || '/placeholder.svg'}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <p className="text-sm leading-relaxed text-gray-600 md:text-base dark:text-gray-400">
          {article.summary}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
        <Badge variant="outline" className="self-start">
          {article.category}
        </Badge>
        <div className="flex items-center space-x-1">
          <CalendarDays className="h-3 w-3 md:h-4 md:w-4" />
          <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
