import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marek Janasek - Digital Architect',
  description: 'Portfolio showcasing modern web development and design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* min-h-screen ensures the page is at least the height of the browser */}
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}