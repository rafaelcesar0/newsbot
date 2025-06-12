"use client"

export function ThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('chat-noticias-theme') || 'system';
        var root = document.documentElement;
        
        if (theme === 'system') {
          var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
        }
      } catch (e) {
        console.warn('Erro ao aplicar tema inicial:', e);
      }
    })();
  `

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
