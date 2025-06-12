import { openai } from '@ai-sdk/openai'
import { streamText, tool } from 'ai'
import { z } from 'zod'

export const maxDuration = 60

interface SearchResult {
  title: string
  link: string
  snippet: string
}

async function performWebSearch(query: string): Promise<SearchResult[]> {
  console.log(`🔍 [Busca Web] Iniciando busca por: "${query}"`)

  // Simula latência da API
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes('next.js') || lowerQuery.includes('nextjs')) {
    console.log('📄 Retornando resultados sobre Next.js')
    return [
      {
        title: 'Next.js 15: Novidades e Recursos | Blog Vercel',
        link: 'https://vercel.com/blog/next-js-15',
        snippet:
          'O Next.js 15 introduz o React Compiler (experimental), melhorias no caching, otimizações no Turbopack e muito mais. Principais novidades incluem suporte aprimorado para React 19 e melhor performance.',
      },
      {
        title: 'Documentação Oficial do Next.js',
        link: 'https://nextjs.org/docs',
        snippet:
          'A documentação oficial para aprender sobre os recursos do Next.js, incluindo App Router, Server Components e muito mais.',
      },
    ]
  }

  if (lowerQuery.includes('tempo') || lowerQuery.includes('clima')) {
    console.log('🌤️ Retornando resultados sobre clima')
    return [
      {
        title: 'Previsão do Tempo para São Paulo, SP - Climatempo',
        link: 'https://www.climatempo.com.br/previsao-do-tempo/cidade/558/saopaulo-sp',
        snippet:
          'Confira a previsão do tempo atualizada para São Paulo: Parcialmente nublado com máximas de 28°C e mínimas de 18°C. Possibilidade de chuva à tarde.',
      },
    ]
  }

  if (
    lowerQuery.includes('brasil') ||
    lowerQuery.includes('notícias') ||
    lowerQuery.includes('política')
  ) {
    console.log('📰 Retornando resultados sobre notícias do Brasil')
    return [
      {
        title: 'Portal G1 - Principais Notícias do Brasil',
        link: 'https://g1.globo.com/',
        snippet:
          'Acompanhe as principais notícias do Brasil e do mundo em tempo real. Política, economia, esportes e muito mais.',
      },
      {
        title: 'Folha de S.Paulo - Notícias',
        link: 'https://www1.folha.uol.com.br/',
        snippet:
          'Jornal Folha de S.Paulo online. Notícias sobre política, economia, cultura, esporte, cotidiano e opinião.',
      },
    ]
  }

  if (
    lowerQuery.includes('inteligência artificial') ||
    lowerQuery.includes('ia') ||
    lowerQuery.includes('ai')
  ) {
    console.log('🤖 Retornando resultados sobre IA')
    return [
      {
        title: 'OpenAI - Inteligência Artificial Avançada',
        link: 'https://openai.com/',
        snippet:
          'A OpenAI desenvolve IA segura e benéfica para a humanidade. Conheça o ChatGPT, GPT-4 e outras tecnologias revolucionárias.',
      },
      {
        title: 'Google AI - Pesquisa e Desenvolvimento',
        link: 'https://ai.google/',
        snippet:
          'Pesquisa de ponta em inteligência artificial do Google, incluindo machine learning, deep learning e aplicações práticas.',
      },
    ]
  }

  // Resultado genérico para outras consultas
  console.log('🔍 Retornando resultado genérico')
  return [
    {
      title: `Resultados de busca para: ${query}`,
      link: 'https://www.google.com/search?q=' + encodeURIComponent(query),
      snippet: `Encontrei informações relacionadas a "${query}". Esta é uma simulação de busca - em um sistema real, aqui apareceriam resultados reais da web sobre este tópico.`,
    },
  ]
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    console.log('💬 Recebendo mensagens:', messages.length)

    const systemMessage = {
      role: 'system',
      content: `Você é um assistente prestativo em português brasileiro que pode:

1. **Analisar notícias** quando um link for fornecido
2. **Responder perguntas gerais** sobre qualquer tópico
3. **Realizar buscas na web** quando necessário para obter informações atualizadas

## Quando usar a ferramenta de busca web:
- O usuário perguntar sobre eventos recentes ou atuais
- Precisar de informações específicas que podem ter mudado recentemente
- O usuário solicitar explicitamente uma busca ("busque", "pesquise", "procure")
- Não tiver certeza sobre informações que podem estar desatualizadas
- O usuário perguntar sobre notícias, clima, cotações, etc.

## Como responder:
- Use **markdown** para formatar suas respostas
- Quando usar resultados de busca, sempre mencione que obteve as informações através de uma pesquisa na web
- Cite as fontes quando possível usando links
- Seja sempre útil, preciso e responda em português brasileiro
- Use formatação markdown para destacar informações importantes

Exemplo de resposta com busca:
**Baseado em uma busca na web, encontrei as seguintes informações:**

1. **[Título da fonte](link)**
   - Informação relevante aqui

2. **[Outra fonte](link)**
   - Mais informações aqui

**Resumo:** Sua análise e conclusão aqui.`,
    }

    const messagesWithSystem = [systemMessage, ...messages]

    console.log('🤖 Iniciando streamText com ferramentas')

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: messagesWithSystem,
      temperature: 0.7,
      maxTokens: 2000,
      tools: {
        searchWeb: tool({
          description: `Busca informações atualizadas na web sobre qualquer tópico.

          Use esta ferramenta quando:
          - O usuário perguntar sobre eventos recentes
          - Precisar de informações que podem ter mudado
          - O usuário solicitar explicitamente uma busca
          - Perguntas sobre notícias, clima, cotações, etc.

          Sempre formate os resultados em markdown e cite as fontes.`,
          parameters: z.object({
            query: z
              .string()
              .describe(
                'A consulta de busca detalhada em português para encontrar informações na web',
              ),
          }),
          execute: async ({ query }) => {
            console.log(
              `🔧 Ferramenta searchWeb executada com query: "${query}"`,
            )
            try {
              const searchResults = await performWebSearch(query)
              const formattedResults = searchResults
                .map(
                  (r, index) =>
                    `${index + 1}. **[${r.title}](${r.link})**\n   ${r.snippet}`,
                )
                .join('\n\n')

              const result = `## Resultados da busca na web para "${query}":

${formattedResults}

---
*Informações obtidas através de busca na web*`

              console.log(
                '✅ Busca concluída, retornando resultados formatados',
              )
              return result
            } catch (error) {
              console.error('❌ Erro na busca web:', error)
              return `**Erro na busca:** Desculpe, ocorreu um erro ao buscar informações sobre "${query}". Tente novamente ou reformule sua pergunta.`
            }
          },
        }),
      },
    })

    console.log('📤 Retornando resposta stream')
    return result.toDataStreamResponse()
  } catch (error) {
    console.error('❌ Erro na API do chat:', error)
    return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
