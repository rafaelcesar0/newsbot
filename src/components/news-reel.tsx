'use client'

import NewsItem, { type NewsArticle } from './news-item'

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Avanços em Inteligência Artificial Transformam a Medicina',
    summary:
      'Novas ferramentas de IA estão ajudando no diagnóstico precoce de doenças e na personalização de tratamentos.',
    imageUrl: '/placeholder.svg?width=300&height=200&text=IA+Medicina',
    category: 'Tecnologia',
    date: '2025-06-10',
    url: 'https://noticias.example.com/ia-medicina',
  },
  {
    id: '2',
    title: 'Economia Global Mostra Sinais de Recuperação Pós-Pandemia',
    summary:
      'Indicadores econômicos de diversos países apontam para um crescimento gradual, impulsionado pela reabertura de setores.',
    imageUrl: '/placeholder.svg?width=300&height=200&text=Economia',
    category: 'Economia',
    date: '2025-06-09',
    url: 'https://noticias.example.com/economia-global',
  },
  {
    id: '3',
    title: 'Descoberta Nova Espécie Marinha em Águas Profundas',
    summary:
      'Cientistas anunciaram a descoberta de uma criatura bioluminescente única durante uma expedição no Oceano Pacífico.',
    imageUrl: '/placeholder.svg?width=300&height=200&text=Vida+Marinha',
    category: 'Ciência',
    date: '2025-06-08',
    url: 'https://noticias.example.com/nova-especie',
  },
  {
    id: '4',
    title: 'Cúpula do Clima: Nações Discutem Metas Mais Amiciosas',
    summary:
      'Líderes mundiais se reúnem para debater novas estratégias de combate às mudanças climáticas e redução de emissões.',
    imageUrl: '/placeholder.svg?width=300&height=200&text=Clima',
    category: 'Meio Ambiente',
    date: '2025-06-11',
    url: 'https://noticias.example.com/cupula-clima',
  },
]

export default function NewsReel() {
  return (
    <div className="space-y-6">
      {mockNews.map((article) => (
        <NewsItem key={article.id} article={article} />
      ))}
    </div>
  )
}
