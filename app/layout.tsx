import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClientLayout } from '@/components/client-layout'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { GoogleAnalytics } from '@/components/google-analytics'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://getmediametas.com'),
  title: {
    default: 'Media Metas | Your Gateway to Financial Freedom Through Short-Form Content',
    template: '%s | Media Metas'
  },
  description: 'Transform your TikTok presence into a 6-figure business. Join thousands making $10K+ monthly with our proven short-form content strategies.',
  keywords: ['tiktok monetization', 'social media income', 'content creation', 'financial freedom', 'make money online', 'short form content'],
  authors: [{ name: 'Media Metas' }],
  creator: 'Media Metas',
  publisher: 'Media Metas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Media Metas | Your Gateway to Financial Freedom',
    description: 'Turn TikTok Views Into Real Money. Join thousands making $10K+ monthly with our proven system.',
    url: 'https://getmediametas.com',
    siteName: 'Media Metas',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Metas | Financial Freedom Through TikTok',
    description: 'Turn TikTok Views Into Real Money. Join thousands making $10K+ monthly with our proven system.',
    creator: '@mussy.02',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <link rel="canonical" href="https://getmediametas.com" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          value={{
            light: "light",
            dark: "dark",
          }}
          enableSystem={false}
          disableTransitionOnChange
          storageKey="musa-theme"
        >
          <ClientLayout>
            {children}
          </ClientLayout>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
