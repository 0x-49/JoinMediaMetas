"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from 'next'
import FeatureSection from '@/app/components/feature-section'

const AFFILIATE_LINK = "https://whop.com/media-metas-f4/?a=digitalartlab";

const features = [
  {
    title: "🎯 Proven TikTok Strategy",
    description: "Our battle-tested approach has helped thousands of creators generate consistent income through TikTok's creator program.",
  },
  {
    title: "🤖 AI-Powered Content",
    description: "Leverage cutting-edge AI tools to create viral content that resonates with your audience and drives engagement.",
  },
  {
    title: "💰 Monetization Blueprint",
    description: "Learn exactly how to turn views into revenue with our comprehensive monetization strategies.",
  },
  {
    title: "📱 Mobile-First Workflow",
    description: "Create professional content using just your phone. No expensive equipment needed.",
  },
  {
    title: "🎓 Step-by-Step Training",
    description: "Follow our detailed tutorials and templates to start generating income from day one.",
  },
  {
    title: "👥 Community Support",
    description: "Join our exclusive community of successful creators who are ready to help you succeed.",
  }
];

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

export default function FeaturesPage() {
  const handleCTAClick = () => {
    window.open(AFFILIATE_LINK, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Everything You Need to Succeed
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our comprehensive system provides all the tools, training, and support you need to build a successful TikTok business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="relative overflow-hidden border-2 hover:border-pink-500 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          size="lg"
          onClick={handleCTAClick}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        >
          Get Started Today
        </Button>
      </div>
    </div>
  );
}
