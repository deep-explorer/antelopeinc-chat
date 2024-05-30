import '@/app/globals.css'
import '@/app/satoshi.css'
import '@radix-ui/themes/styles.css'
import 'react-multi-carousel/lib/styles.css'

import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { Footer } from '@/components/footer'
import { Suspense } from 'react'
import { openGraphImage } from './shared-metadata'
import { Metadata } from 'next'

export const metadata: Metadata = {
  // metadataBase: new URL('https://chat.antelopeinc.com'),
  title: 'Antelope Chatbot',
  description: 'Antelope Chatbot',
  keywords: ['Chatbot', 'Antelope', 'Analyzer', 'AI', 'NLP', 'ML', 'Next.js'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  // openGraph: {
  //   images: '/thumbnail.png'
  // }
  openGraph: {
    title: 'Antelope Chatbot',
    description: 'Antelope Chatbot',
    siteName: 'Antelope Chatbot',
    images: [
      {
        url: 'https://chat.antelopeinc.com/og.png',
        width: 1200,
        height: 630
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <body>
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-[#071920]">
            <Header />
            <div className="flex justify-center">
              <main className="px-4 md:px-8 max-w-[940px] w-full min-h-[100vh]">
                {children}
              </main>
            </div>
            {/* <Footer className="py-8" /> */}
          </div>
          {/* <TailwindIndicator /> */}
        </Providers>
      </body>
    </html>
  )
}
