import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PhysioLution³ - Team Dashboard',
  description: 'Interaktives Training & Symmetrie Tracking für dein ganzes Team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
