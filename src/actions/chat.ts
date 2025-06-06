'use server'

import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'

// import { gemini } from '@/lib/gemini'
import { openai } from '@/lib/openai'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const chat = async (messages: Message[]) => {
  const stream = createStreamableValue();

  (async () => {
    const { textStream } = streamText({
      model: openai('gpt-4.1-mini'),
      messages: messages,
    })

    for await (const text of textStream) {
      stream.update(text)
    }

    stream.done()
  })()

  return {
    messages: messages,
    newMessage: stream.value
  }
}
