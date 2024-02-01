import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Startup Idea Validator India',
  description: 'Create, validate, and refine your startup ideas with AI-powered insights tailored for the Indian market.',
  generator: 'StartupSaathi',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
