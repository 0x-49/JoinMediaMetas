import { Metadata } from 'next'
import FeaturesPage from '@/app/components/features-page'

export const metadata: Metadata = {
  title: 'Features - Media Metas',
  description: 'Discover our powerful social media management features including content scheduling, analytics, and engagement tools.',
  openGraph: {
    title: 'Features - Media Metas',
    description: 'Discover our powerful social media management features',
  },
  twitter: {
    title: 'Features - Media Metas',
    description: 'Discover our powerful social media management features',
  }
}

export default function Page() {
  return <FeaturesPage />
}
