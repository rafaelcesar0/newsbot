import { Chatbot } from '@/components/chat-bot'

export default function Home() {
  return (
    <main className="bg-background h-dvh w-full">
      <div className="mx-auto h-full max-w-4xl">
        <Chatbot />
      </div>
    </main>
  )
}
