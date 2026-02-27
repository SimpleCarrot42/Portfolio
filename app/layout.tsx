import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marek Janasek - Digital Architect',
  description: 'Portfolio showcasing modern web development and design',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cz" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.backgroundColor = '#ffffff';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.backgroundColor = '#ffffff';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-white transition-colors duration-500">
        {children}
      </body>
    </html>
  )
}
