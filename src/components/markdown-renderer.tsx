'use client'

import { CheckIcon, CopyIcon } from 'lucide-react'
import React, { FC, memo } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  atomDark,
  nightOwl,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface CodeBlockProps {
  language: string
  value: string
}

interface MarkdownRendererProps {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
}

const CodeBlock: FC<CodeBlockProps> = memo(({ language, value }) => {
  const [isCopied, setIsCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="scrollbar-hide relative my-4 w-full rounded-lg font-sans">
      <div className="border-border flex w-full items-center justify-between rounded-t-lg border-b px-6 py-2 pr-4">
        <span className="flex items-center rounded bg-neutral-300 px-2.5 py-1 text-xs lowercase">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="font-base flex items-center rounded bg-neutral-300 px-2.5 py-1 text-xs transition-colors hover:bg-neutral-400"
        >
          {isCopied ? (
            <>
              <CheckIcon className="mr-1.5 size-3.5" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon className="mr-1.5 size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        PreTag="div"
        showLineNumbers={true}
        customStyle={{
          margin: 0,
          width: '100%',
          background: '#333',
          padding: '1.5rem',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          fontFamily: 'JetBrains Mono, monospace',
          scrollbarWidth: 'none',
        }}
        lineNumberStyle={{
          minWidth: '2.5em',
          paddingRight: '1em',
          color: '#495162',
          textAlign: 'right',
          userSelect: 'none',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'JetBrains Mono, monospace',
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
})

CodeBlock.displayName = 'CodeBlock'

const MarkdownRenderer: FC<MarkdownRendererProps> = memo(({ message }) => {
  const components: Partial<Components> = {
    h1: ({ node, ...props }) => (
      <h1 className="mt-8 mb-6 text-3xl font-bold lg:text-4xl" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="mt-8 mb-4 text-2xl font-semibold lg:text-3xl" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="mt-6 mb-3 text-xl font-semibold lg:text-2xl" {...props} />
    ),
    h4: ({ node, ...props }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold lg:text-xl" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p
        className="mb-4 text-base leading-relaxed whitespace-pre-wrap last:mb-0 lg:text-lg"
        {...props}
      />
    ),
    // @ts-ignore
    ul: ({ node, ordered, ...props }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6" {...props} />
    ),
    // @ts-ignore
    ol: ({ node, ordered, ...props }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6" {...props} />
    ),
    // @ts-ignore
    li: ({ node, ordered, ...props }) => (
      <li className="text-base lg:text-lg" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="my-4 border-l-4 border-neutral-400 pl-4 italic"
        {...props}
      />
    ),
    a: ({ node, href, ...props }) => (
      <a
        href={href}
        className="text-blue-400 transition-colors hover:text-blue-300"
        {...props}
      />
    ),
    // @ts-ignore
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const content = String(children).replace(/\n$/, '')

      if (inline || (!match && !content.includes('\n'))) {
        return (
          <code
            className="scrollbar-hide rounded-md bg-neutral-400 px-2 py-1 font-mono text-sm"
            {...props}
          >
            {content}
          </code>
        )
      }

      return <CodeBlock language={(match && match[1]) || ''} value={content} />
    },
    table: ({ node, ...props }) => (
      <div className="my-4 overflow-x-auto">
        <table
          className="min-w-full divide-y divide-neutral-400 border border-neutral-400"
          {...props}
        />
      </div>
    ),
    th: ({ node, ...props }) => (
      <th
        className="border-b border-neutral-400 bg-neutral-300 px-4 py-3 text-left text-sm font-semibold"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td
        className="border-t border-neutral-400 px-4 py-2 text-sm"
        {...props}
      />
    ),
  }

  return (
    <div className="mb-8 w-full pb-12 lg:py-8 lg:pb-16">
      <div className="px- prose prose-invert max-w-none lg:px-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {message?.content || message?.content}
        </ReactMarkdown>
      </div>
    </div>
  )
})

MarkdownRenderer.displayName = 'MarkdownRenderer'

export default MarkdownRenderer
