"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function FeaturesPage() {
  const handleCTAClick = () => {
    window.open(AFFILIATE_LINK, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Features</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Everything you need to succeed on TikTok
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-2">
            <CardHeader>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button onClick={handleCTAClick} size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
          Get Started Now
        </Button>
      </div>
    </div>
  );
}
