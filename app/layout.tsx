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
      <body>{children}</body>
    </html>
  )
}