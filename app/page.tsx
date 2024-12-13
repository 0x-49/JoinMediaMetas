"use client";

import React, { Suspense, lazy, useEffect, useState } from 'react';
import thumbnailsByVideo from "../components/thumbnails.json";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Lazy load components
const VimeoPlayer = dynamic(() => import("../components/vimeo-player"), {
  loading: () => (
    <div className="w-full aspect-[9/16] bg-gray-900 animate-pulse rounded-lg" />
  ),
  ssr: false
});

const ThumbnailSlideshow = dynamic(() => import("../components/thumbnail-slideshow"), {
  loading: () => (
    <div className="w-full aspect-[9/16] bg-gray-900 animate-pulse rounded-lg" />
  )
});

const FAQSection = dynamic(() => import("../components/faq-section").then(mod => ({ default: mod.FAQSection })), {
  ssr: false
});

const AFFILIATE_LINK = "https://whop.com/media-metas-f4/?a=digitalartlab";

const videos = [
  {
    id: "v1",
    title: "🚀 Your First $10K Blueprint - 100% Faceless",
    description: "Ready to make your first $10K without showing your face? This simple strategy has helped thousands get started. No experience needed - just follow the steps.",
    src: "1038944983",
    cta: "🔥 Start Your Journey | 💎 Join The Movement"
  },
  {
    id: "v2",
    title: "📱 $10K/Month Using Just Your Phone",
    description: "Turn your phone into a money-making machine. Learn how to leverage CapCut and the TikTok creator program to earn $1,000 per million views.",
    src: "1039028078", 
    cta: "🎯 Get Started Now | 🚀 Level Up Today"
  },
  {
    id: "v3",
    title: "🎯 The Truth About TikTok Saturation",
    description: "Worried about competition? Don't be. Learn how the algorithm really works and why there's never been a better time to start.",
    src: "1039037244",
    cta: "💡 Learn More | 🔓 Unlock Success"
  },
  {
    id: "v4",
    title: "💪 Values-Driven Success Story",
    description: "18, no drink, no smoke - pure hustle. See how staying true to your values can lead to massive success in the digital space.",
    src: "1039037326",
    cta: "🌟 Join The Movement | 💎 Start Your Journey"
  },
  {
    id: "v5",
    title: "🔥 The Burn The Boats Story",
    description: "From intentionally failing exams to paying off parents' mortgage at 21. This is what real commitment looks like.",
    src: "1039005846",
    cta: "🚀 Take Action Now | ⚡ Transform Your Life"
  },
  {
    id: "v6",
    title: "🏠 Inside My Dream Penthouse",
    description: "21 years old, living in a luxury penthouse. This could be your reality with the right mindset and strategy.",
    src: "1039008807",
    cta: "🔑 Get The Keys | 💫 Live Your Dream"
  },
  {
    id: "v7",
    title: "💰 $10K/Month TikTok Strategy Revealed",
    description: "Top creators are using this exact strategy. Learn how to create viral content that pays thousands per month.",
    src: "1038945453",
    cta: "🎯 Start Creating | 💸 Get Paid"
  },
  {
    id: "v8",
    title: "⚡ The Real Work Behind Success",
    description: "10 clips in an hour, not 30 days. Learn what real hustle looks like and how to fast-track your success.",
    src: "1039009724",
    cta: "💪 Start Grinding | 🚀 Level Up"
  },
  {
    id: "v9",
    title: "👑 JiDion Confirms: $22K in One Month",
    description: "Even JiDion knows what's up. See how I turned content creation into a $22K/month business using Crayo AI.",
    src: "1039007181",
    cta: "🔥 Join Now | 💰 Scale Your Income"
  },
  {
    id: "v10",
    title: "📈 $60K/Month Success Blueprint",
    description: "From zero to $60K/month with multiple TikTok pages. Learn the exact system that makes it possible.",
    src: "1039013113",
    cta: "🎯 Get Started | 🚀 Scale Your Success"
  },
  {
    id: "v11",
    title: "🏖️ How 16M Views Got Me This Villa",
    description: "TikTok is paying stupid money right now. Learn how I turned views into a luxury lifestyle.",
    src: "1039014891",
    cta: "🔑 Get Access | 💎 Transform Your Life"
  },
  {
    id: "v12",
    title: "🤫 $35K/Month TikTok Secrets Exposed",
    description: "The smartest people on TikTok are using this strategy. Time to join them and claim your piece.",
    src: "1039016952",
    cta: "🎯 Start Today | 🚀 Join The Elite"
  },
  {
    id: "v13",
    title: "🎮 Even Speed Knows What's Up",
    description: "When Speed recognizes the hustle, you know it's real. See how I'm making $40K/month with simple clips.",
    src: "1039010786",
    cta: "💪 Join Now | 🔥 Level Up"
  },
  {
    id: "v14",
    title: "💰 How I Made Sneako Bank",
    description: "The same strategies that quadrupled Sneako's revenue can work for you. Ready to learn?",
    src: "1039010617",
    cta: "🎯 Start Now | 🚀 Scale Your Success"
  }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Media Metas',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Professional social media management tools to grow your online presence',
  offers: {
    '@type': 'Offer',
    price: '19.99',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
  },
};

export default function Page() {
  const [playingVideo, setPlayingVideo] = React.useState<string | null>(null);
  
  const handleCTAClick = () => {
    window.open(AFFILIATE_LINK, '_blank');
  };

  // Preload videos that are likely to be played
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const preloadVideos = () => {
        videos.slice(0, 3).forEach(video => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'video';
          link.href = `https://vimeo.com/${video.src}`;
          document.head.appendChild(link);
        });
      };
      
      // Delay preloading to not block initial page load
      setTimeout(preloadVideos, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Add meta tags for SEO */}
      <head>
        <meta name="description" content="Learn how to make $10K+ monthly with our proven TikTok monetization system. Join thousands of successful creators today!" />
        <meta name="keywords" content="TikTok monetization, make money online, content creation, social media income, digital marketing" />
        <meta property="og:title" content="Turn TikTok Views Into Real Money" />
        <meta property="og:description" content="Learn how to make $10K+ monthly with our proven TikTok monetization system." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://vimeo.com" />
        <link rel="dns-prefetch" href="https://vimeo.com" />
      </head>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Turn TikTok Views Into Real Money
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands who are making $10K+ monthly with our proven system
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              onClick={handleCTAClick}
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleCTAClick}
            >
              Learn More
            </Button>
          </div>
        </section>

        {/* Videos Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Suspense
                key={video.id}
                fallback={
                  <div className="w-full aspect-[9/16] bg-gray-900 animate-pulse rounded-lg" />
                }
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-[9/16] w-full mb-4 bg-gray-900 rounded-lg overflow-hidden">
                      <div className="absolute inset-0">
                        {playingVideo !== video.id && (
                          <div className="absolute inset-0 z-10">
                            <ThumbnailSlideshow
                              thumbnails={thumbnailsByVideo[video.id as keyof typeof thumbnailsByVideo] || []}
                              className="absolute inset-0"
                            />
                          </div>
                        )}
                        <div className="absolute inset-0 z-20">
                          <VimeoPlayer 
                            videoId={video.src} 
                            thumbnails={thumbnailsByVideo[video.id as keyof typeof thumbnailsByVideo] || []}
                            onPlayingChange={(playing) => {
                              if (playing) {
                                setPlayingVideo(video.id);
                              } else if (playingVideo === video.id) {
                                setPlayingVideo(null);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {video.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
                      onClick={handleCTAClick}
                    >
                      {video.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </Suspense>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <span className="text-pink-500 mr-2">🎯</span>
                    Do I need experience to start?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Absolutely not! Our program is specifically designed for complete beginners. We start from the basics and guide you through every step. Whether you've never edited a video or used social media for business, our comprehensive training covers everything from setting up your accounts to advanced monetization strategies.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <span className="text-pink-500 mr-2">⏰</span>
                    How long does it take to make money?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Many of our members start seeing their first earnings within 30 days of implementing our system. We've seen members make their first $1,000 within the first week, while others have scaled to $10K+ monthly within 60-90 days. Success speed varies based on dedication and implementation, but our proven framework accelerates your journey significantly.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <span className="text-pink-500 mr-2">💻</span>
                    What tools do I need?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    You only need a smartphone and internet connection to start. We provide access to all necessary software, including our premium AI tools, video editors, and automation systems. Our members get exclusive access to CapCut presets, trending sound libraries, and our proprietary content optimization tools.
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <span className="text-pink-500 mr-2">💰</span>
                    How much can I realistically earn?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our members typically earn between $5K-$40K monthly, with top performers reaching $100K+. The key factors are consistency and scaling strategies. We teach you multiple revenue streams: TikTok Creator Fund, brand deals, affiliate marketing, and our proven scaling systems. Many members start part-time and scale to full-time income within months.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <span className="text-pink-500 mr-2">🎓</span>
                    What support do I get?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    You get comprehensive 24/7 support through our private community. This includes direct access to me and my team, weekly live Q&A sessions, regular strategy updates, and our exclusive Discord community. We also provide done-for-you templates, scripts, and trending topic alerts to keep you ahead of the curve.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <span className="text-pink-500 mr-2">🔒</span>
                    Is there a guarantee?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Yes! We offer a 30-day action-based guarantee. If you follow our system, implement the strategies, and don't see results, we'll work with you personally to ensure your success. We're committed to your growth and have a 94% success rate among active members who follow our program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Time is Now Section */}
        <section className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Your Time is Now – Stop Watching Others Win
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg">
            <p className="text-gray-600 dark:text-gray-300">
              Have you ever felt like life is passing you by? Like everyone else is finding success, while you're stuck wondering how they did it? 
              Here's the truth: They didn't wait. They didn't let fear or self-doubt hold them back. They took action.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              I know what it's like to start from nothing. To have people doubt you. To feel like success is out of reach. 
              But here's the thing: You already have everything you need to succeed. The tools, the guidance, and the community are right here.
            </p>
            <div className="py-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                onClick={handleCTAClick}
              >
                Start Building Your Future Today
              </Button>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="mb-16 bg-gradient-to-r from-pink-500/5 to-purple-500/5 py-16 rounded-3xl">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Real People, Real Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>From $0 to $12,000 in One Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    "I had zero experience and no idea where to start. But thanks to Musa and Media Metas, 
                    I made $12,000 in my first month clipping TikToks. It's a game-changer."
                  </p>
                  <p className="mt-4 font-semibold">- Alex, 22</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>College Dropout to Penthouse Owner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    "I was lost, failing classes, and unsure of my future. Media Metas gave me a roadmap. 
                    Now, at 21, I'm living in my dream penthouse."
                  </p>
                  <p className="mt-4 font-semibold">- Musa (Founder)</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Making $7K/Month Part-Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    "I was skeptical at first, but the results speak for themselves. Working just 2-3 hours a day, 
                    I'm consistently making $7,000+ every month."
                  </p>
                  <p className="mt-4 font-semibold">- Sarah, 34</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Transform Your Life Section */}
        <section className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Transform Your Life Today
          </h2>
          <p className="text-xl mb-12 text-gray-600 dark:text-gray-300">
            Every second you wait is a moment of potential success slipping away. 
            While you're reading this, others are already taking action and changing their lives.
          </p>

          {/* Final CTA Button */}
          <div className="mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg w-full max-w-md"
              onClick={handleCTAClick}
            >
              🔥 Join Media Metas Now
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
