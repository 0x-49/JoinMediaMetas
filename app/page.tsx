"use client";

import thumbnailsByVideo from "@/components/thumbnails.json";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ThumbnailSlideshow from "@/components/thumbnail-slideshow";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FAQSection } from "@/components/faq-section";
import { JsonLd } from 'react-jsonld';

const AFFILIATE_LINK = "https://whop.com/media-metas-f4/?a=digitalartlab";

const videos = [
  {
    id: "v1",
    title: "🚀 Your First $10K Blueprint - 100% Faceless",
    description: "Ready to make your first $10K without showing your face? This simple strategy has helped thousands get started. No experience needed - just follow the steps.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487119/nn3hvl7nko7oy9wlcycx.mp4",
    cta: "🔥 Start Your Journey | 💎 Join The Movement"
  },
  {
    id: "v2",
    title: "📱 $10K/Month Using Just Your Phone",
    description: "Turn your phone into a money-making machine. Learn how to leverage CapCut and the TikTok creator program to earn $1,000 per million views.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487173/jy6zczkuquodkufzejyb.mov",
    cta: "🎯 Get Started Now | 🚀 Level Up Today"
  },
  {
    id: "v3",
    title: "🎯 The Truth About TikTok Saturation",
    description: "Worried about competition? Don't be. Learn how the algorithm really works and why there's never been a better time to start.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733486947/bcmosa1paublgrcntr8s.mov",
    cta: "💡 Learn More | 🔓 Unlock Success"
  },
  {
    id: "v4",
    title: "💪 Values-Driven Success Story",
    description: "18, no drink, no smoke - pure hustle. See how staying true to your values can lead to massive success in the digital space.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733486951/uyrysf0ofweymfskdkz8.mov",
    cta: "🌟 Join The Movement | 💎 Start Your Journey"
  },
  {
    id: "v5",
    title: "🔥 The Burn The Boats Story",
    description: "From intentionally failing exams to paying off parents' mortgage at 21. This is what real commitment looks like.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487374/tjbxafhm44jxjbgyirny.mp4",
    cta: "🚀 Take Action Now | ⚡ Transform Your Life"
  },
  {
    id: "v6",
    title: "🏠 Inside My Dream Penthouse",
    description: "21 years old, living in a luxury penthouse. This could be your reality with the right mindset and strategy.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733486958/d5dp0ams9tw1funjs9sy.mp4",
    cta: "🔑 Get The Keys | 💫 Live Your Dream"
  },
  {
    id: "v7",
    title: "💰 $10K/Month TikTok Strategy Revealed",
    description: "Top creators are using this exact strategy. Learn how to create viral content that pays thousands per month.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733486997/ttwzlghkhbb56veegicv.mov",
    cta: "🎯 Start Creating | 💸 Get Paid"
  },
  {
    id: "v8",
    title: "⚡ The Real Work Behind Success",
    description: "10 clips in an hour, not 30 days. Learn what real hustle looks like and how to fast-track your success.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733486976/kbcc4wmvjmccnjqlhs0y.mov",
    cta: "💪 Start Grinding | 🚀 Level Up"
  },
  {
    id: "v9",
    title: "👑 JiDion Confirms: $22K in One Month",
    description: "Even JiDion knows what's up. See how I turned content creation into a $22K/month business using Crayo AI.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487367/xxzbhhlr5i1a35mr76gl.mp4",
    cta: "🔥 Join Now | 💰 Scale Your Income"
  },
  {
    id: "v10",
    title: "📈 $60K/Month Success Blueprint",
    description: "From zero to $60K/month with multiple TikTok pages. Learn the exact system that makes it possible.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487387/w1hdbcs3wta86afruyum.mp4",
    cta: "🎯 Get Started | 🚀 Scale Your Success"
  },
  {
    id: "v11",
    title: "🏖️ How 16M Views Got Me This Villa",
    description: "TikTok is paying stupid money right now. Learn how I turned views into a luxury lifestyle.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487034/yisagttysjksj3amvyqd.mp4",
    cta: "🔑 Get Access | 💎 Transform Your Life"
  },
  {
    id: "v12",
    title: "🤫 $35K/Month TikTok Secrets Exposed",
    description: "The smartest people on TikTok are using this strategy. Time to join them and claim your piece.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733484194/ejwpxx20gx2rq2z7ats6.mp4",
    cta: "🎯 Start Today | 🚀 Join The Elite"
  },
  {
    id: "v13",
    title: "🎮 Even Speed Knows What's Up",
    description: "When Speed recognizes the hustle, you know it's real. See how I'm making $40K/month with simple clips.",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733487042/rmw3vng6zwp4tiolh5cg.mp4",
    cta: "💪 Join Now | 🔥 Level Up"
  },
  {
    id: "v14",
    title: "💰 How I Made Sneako Bank",
    description: "The same strategies that quadrupled Sneako's revenue can work for you. Ready to learn?",
    src: "https://res.cloudinary.com/ddazcwtju/video/upload/v1733488858/y1vyhijuj6ydo31bow8p.mov",
    cta: "🎯 Start Now | 🚀 Scale Your Success"
  }
];

const metadata = {
  title: 'Media Metas - Professional Social Media Management Tools',
  description: 'Streamline your social media presence with Media Metas. Schedule posts, analyze performance, and grow your audience with our powerful tools.',
  openGraph: {
    title: 'Media Metas - Professional Social Media Management Tools',
    description: 'Streamline your social media presence with Media Metas',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Media Metas Dashboard',
      },
    ],
  }
}

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
}

export default function Page() {
  const handleCTAClick = () => {
    window.open(AFFILIATE_LINK, '_blank');
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
              onClick={() => handleCTAClick()}
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleCTAClick()}
            >
              Learn More
            </Button>
          </div>
          <div className="mx-auto mt-8 max-w-xl text-center">
            <p className="text-lg text-muted-foreground">
              See why thousands trust Musa & Media Metas. No hype, just real results! 💫
            </p>
          </div>
        </section>

        {/* Videos Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[736/1316] w-full">
                    <ThumbnailSlideshow
                      thumbnails={thumbnailsByVideo[video.id as keyof typeof thumbnailsByVideo] || []}
                      videoSrc={video.src}
                      className="rounded-lg"
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {video.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                    onClick={() => window.open(AFFILIATE_LINK, "_blank")}
                  >
                    {video.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <FAQSection />
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
                onClick={() => handleCTAClick()}
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

        {/* Final Call to Action Sections */}
        <section className="relative overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>

          <div className="relative container mx-auto px-4 py-24">
            {/* Main CTA Content */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Transform Your Life Today
              </h2>
              <div className="max-w-3xl mx-auto mb-12">
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
                  Every second you wait is a moment of potential success slipping away. 
                  While you're reading this, others are already taking action and changing their lives.
                </p>
              </div>

              {/* Comparison Grid */}
              <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur border-2 border-red-500/20">
                  <div className="text-2xl font-bold text-red-500 mb-4">❌ Without Media Metas</div>
                  <ul className="space-y-4 text-left">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">😓</span>
                      <span>Wasting months figuring out what works</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">💸</span>
                      <span>Losing money on failed experiments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">😪</span>
                      <span>Struggling with low views and engagement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">🤔</span>
                      <span>Confused by constant algorithm changes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">😢</span>
                      <span>Watching others succeed while you struggle</span>
                    </li>
                  </ul>
                </div>

                <div className="p-8 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur border-2 border-green-500/20">
                  <div className="text-2xl font-bold text-green-500 mb-4">✅ With Media Metas</div>
                  <ul className="space-y-4 text-left">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">🚀</span>
                      <span>Start earning in your first 30 days</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">💰</span>
                      <span>Proven system making $10K-$40K monthly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">🎯</span>
                      <span>Step-by-step blueprint to viral content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">🤖</span>
                      <span>Access to AI tools and automation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">👥</span>
                      <span>24/7 support from proven experts</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Single CTA Button */}
              <div className="mb-12 text-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg w-full max-w-md"
                  onClick={() => handleCTAClick()}
                >
                  🔥 Join Media Metas Now
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✨</span>
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💯</span>
                  <span>Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-pink-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        </section>
      </div>
    </>
  );
}