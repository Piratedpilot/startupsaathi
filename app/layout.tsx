import type { Metadata } from 'next'
import './globals.css'

import { Toaster } from "@/components/ui/toaster"

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
      <body>
        {children}
        <Toaster /> 
      </body>
    </html>
  )
}
